import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

import { lazyFunction } from './functions';

function getFullPath(path, pathPrepend = '') {
  if (pathPrepend.constructor === Array) {
    return pathPrepend.map(pathPrependVariant => `${pathPrependVariant}${path}`);
  }
  return `${pathPrepend}${path}`;
}

const Router = ({
  component: Component,
  path = null,
  routes = [],
  ...routeProps
}) => (
  <Route
    path={path}
    render={props => (
      <Component {...props}>
        <Switch>
          {routes.map(({
            component: ChildComponent,
            path: childPath,
            routes: childRoutes,
            ...childRouteProps
          }, index) => {
            const parentPath = path || '';

            let fullPath;
            let key;

            if (!childPath) {
              fullPath = parentPath;
              key = index;
            } else if (childPath.constructor === Array) {
              fullPath = childPath.flatMap(pathVariant => getFullPath(pathVariant, parentPath));
            } else {
              fullPath = getFullPath(childPath, parentPath);
            }

            key = `${fullPath.constructor === Array ? fullPath[0] : fullPath}${key ? `/${key}` : ''}`;

            return (
              <Router
                key={key}
                component={ChildComponent}
                path={fullPath}
                routes={childRoutes}
                {...childRouteProps}
              />
            );
          })}
        </Switch>
      </Component>
    )}
    {...routeProps}
  />
);

// eslint-disable-next-line no-use-before-define
const lazyRoutePropType = lazyFunction(() => routePropType);

const routeShape = {
  component: PropTypes.elementType.isRequired,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  routes: PropTypes.arrayOf(lazyRoutePropType),
};

const routePropType = PropTypes.shape(routeShape);

Router.propTypes = routeShape;

Router.defaultProps = {
  path: null,
  routes: [],
};

export default Router;
