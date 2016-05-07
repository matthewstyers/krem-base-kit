import { combineReducers } from 'redux';
import ListingsReducer from './components/listings/reducers';
import { reducer as formReducer } from 'redux-form';
import SearchReducer from './components/search/SearchReducers';
import GalleryReducer from './components/utils/reducers';

const RootReducer = combineReducers({
  listings: ListingsReducer,
  form: formReducer,
  search: SearchReducer,
  galleries: GalleryReducer
});

export default RootReducer;
