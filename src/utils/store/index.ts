import { 
    Store,
    getStoreState,
    getStoreActions,
    createSlice,
} from './store';
import connect from './connect';

export { 
    Store,
    getStoreState,
    getStoreActions,
    createSlice,
} from './store';
export { default as connect } from './connect';

export default {
    Store,
    getStoreState,
    getStoreActions,
    createSlice,
    connect,
}