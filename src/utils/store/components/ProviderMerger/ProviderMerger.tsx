import {
    createContext,
    // ReactNode,
} from 'react';
// import {
//     createContextProvider,
// } from '@/utils/store/components/SliceProvider/SliceProvider';

export type ActionReturnType = void;
export type ContextAction<T> = (currentState: any, actions: IContextActions<T>) => ActionReturnType;
export interface IContextActions<T> {
    [key: string]: ContextAction<T>
}

interface ProviderItem<T> {
    key?: string
    initialState: T
    actions: IContextActions<T>
    children: ChildrenType
}

type CustomProvider<T> = T extends any ? ProviderItem<T> : never;

export type ProviderItems<T> = CustomProvider<T>[];

type ChildrenType = string | JSX.Element | JSX.Element[] | (() => JSX.Element)

// interface MergerProps {
//     children: ChildrenType
// }

interface SetContextStateProps<T> {
    key: keyof T | null | undefined
    value: unknown
}

type SetContextState<T> = (args: SetContextStateProps<T>) => void;

interface ContextSlice<T> {
    state: T
    setState: SetContextState<T>
    actions: IContextActions<T>
}

const contextInitialState = {
    state: {},
    setState: (_: SetContextStateProps<unknown>) => {},
    actions: {},
}

export const Context = createContext<ContextSlice<unknown>>(contextInitialState);

const ProviderMerger = <T extends {}>(providers: ProviderItems<T>) => providers.forEach((_SliceProvider: any) => {
    // const [value] = createContextProvider<T>({ initialState:, contextInitialState.actions });
    // return ({ children }: { children: ReactNode}) => {
    //     return <Context.Provider value={value as any}>
    //         { children }
    //     </Context.Provider>
    // }
    return null;
});

export default ProviderMerger;