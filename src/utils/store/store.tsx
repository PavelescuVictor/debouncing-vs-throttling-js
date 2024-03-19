export type ActionReturnType = void;
export type Action = (currentState: any, actions: IContextActions) => ActionReturnType;
export interface IContextActions {
    [key: string]: Action
}

type ContextAction<T> = (currentState: T, actions: IContextActions, ...rest: any) => void

interface ContextActions<T> {
    [key: string]: ContextAction<T>
}

interface Slice<T> {
    state: T
    actions: IContextActions
}

interface Store {
    [key: string]: Slice<unknown>;
}

export const Store: Store = {};

export const createSlice = <T extends {}>(key: string, contextState: T, actions: ContextActions<T>) => {
    if (Object.keys(Store).includes(key)) {
        return;
    }
    const slice: Slice<T> = {
        state: contextState,
        actions,
    }
    Object.assign(Store, {
        [key]: slice,
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