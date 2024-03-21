import { 
    Store,
    getStoreState,
    getStoreActions,
    subscribeStoreSlice,
} from './Store';
import connect from './helpers/connect';

export { 
    Store,
    getStoreState,
    getStoreActions,
    subscribeStoreSlice,
} from './Store';
export { default as connect } from './helpers/connect';

export default {
    Store,
    getStoreState,
    getStoreActions,
    subscribeStoreSlice,
    connect,
}