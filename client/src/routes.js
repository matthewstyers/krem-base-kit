import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Index from './components/views/Index';
// import ListingDeck from './components/listings/ListingDeck';

export default (
<Route
  path='/'
  component={ App }>
  <IndexRoute component={ Index } />
</Route>
);
