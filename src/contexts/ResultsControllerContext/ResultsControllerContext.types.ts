export interface IInitialContextState {
    regularCallsAmount: number
    debounceCallsAmount: number
    throttleCallsAmount: number
}

export type ActionReturnType = void;
export type Action = (currentState: any, actions: IContextActions, ...rest: any[]) => ActionReturnType;
export interface IContextActions {
    [key: string]: Action
}

