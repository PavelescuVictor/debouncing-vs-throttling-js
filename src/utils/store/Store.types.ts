export type IStoreState<T> = T
export type IStoreActions<T> = T;

export interface ISlice<T, K> {
    key: string,
    state: T,
    actions: K,
}

type ActionReturnType = void;
    //@ts-ignore
export type ActionType = (currentState: IStoreState, actions: IStoreActions, ...rest: any[]) => ActionReturnType;

interface Slice<T> {
    state: T
        //@ts-ignore
    actions: IStoreActions
}

export interface StoreType<T> {
    [key: string]: Slice<T>;
}

export type DefaultContextStateType = {}