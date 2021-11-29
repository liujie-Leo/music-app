import { createStore } from 'redux';

import reducers from './modules/index';

export default createStore(reducers);