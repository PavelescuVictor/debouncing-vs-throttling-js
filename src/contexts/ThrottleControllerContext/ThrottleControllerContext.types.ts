export interface IInitialContextState {
    active: boolean
}

export type ActionReturnType = void;
export type Action = (currentState: any, actions: IContextActions, ...rest: any[]) => ActionReturnType;
export interface IContextActions {
    [key: string]: Action
}
