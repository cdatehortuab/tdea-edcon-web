import React from 'react';

import Router from './utils/Router';

import App from './routes/App';

import routes from './config/routes';

const AppRouter = () => (
  <Router
    component={App}
    routes={routes}
  />
);

export default AppRouter;
