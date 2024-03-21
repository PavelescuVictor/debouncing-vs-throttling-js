import { 
    StoreType,
    ISlice,
} from './Store.types';

import {
    StoreSlicesType
} from '@/storeSlices/storeSlices.types';

const createStore = () => {
    return {} as StoreType<StoreSlicesType>;
}

export const Store = createStore()

export const subscribeStoreSlice = <T extends {}, K extends {}>(slice: ISlice<T, K>) => {
    if (Object.keys(Store).includes(slice.key)) {
        return;
    }
    Object.assign(Store, {
        [slice.key]: slice,
    })
}

export const getStore = () => {
    return {...Store};
}

export const getStoreState = <T extends {}>(): T => Object
.keys(Store)
.map((sliceKey: string) => ({...(Store[sliceKey].state as T || {} as T)}))
.reduce((currentState: T, sliceState: T) => ({
    ...currentState,
    ...(sliceState || {})
}), {} as T)

export const getStoreActions = <T extends {}>(): ContextActions<T> => Object
.keys(Store)
.map((sliceKey: string) => ({...(Store[sliceKey].actions as ContextActions<T> || {} as ContextActions<T>)}))
.reduce((actions: ContextActions<T>, sliceActions: ContextActions<T>) => ({
    ...actions,
    ...(sliceActions || {})
}), {} as ContextActions<T>)

export default getStore();