import React from 'react';

import { childrenPropType } from '../../utils/propTypes';

const App = ({ children }) => <div>{children}</div>;

App.propTypes = {
  children: childrenPropType,
};

App.defaultProps = {
  children: [],
};

export default App;
