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

export const getStoreState = <T extends {}>(): T => Object.keys(Store).reduce((currentState: T, sliceKey: string) => ({
    ...currentState,
    ...(Store[sliceKey].state || {})
}), {})

export const getStoreActions = <T extends {}>(): ContextActions<T> => Object.keys(Store).reduce((actions: ContextActions<T>, sliceKey: string) => ({
    ...actions,
    ...(Store[sliceKey].actions || {})
}), {})