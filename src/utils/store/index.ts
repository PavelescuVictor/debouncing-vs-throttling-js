import { 
    Store,
    getStoreState,
    getStoreActions,
    createSlice,
} from './Store';
import connect from './connect';

export { 
    Store,
    getStoreState,
    getStoreActions,
    createSlice,
} from './Store';
export { default as connect } from './connect';

export default {
    Store,
    getStoreState,
    getStoreActions,
    createSlice,
    connect,
}