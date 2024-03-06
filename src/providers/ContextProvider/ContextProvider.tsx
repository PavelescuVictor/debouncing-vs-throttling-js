import {
    useState,
    useMemo,
    useCallback,
    createContext,
    Provider,
    useContext as defaultUseContext,
    Context as DefaultContext,
} from 'react';

interface SetContextStateProps<T> {
    key: keyof T
    value: unknown
}

type SetContextState<T> = (args: SetContextStateProps<T>) => void;

interface ContextSlice<T> {
    state: T,
    setState: SetContextState<T>
}

const contextInitialState = {
    state: {},
    setState: (_: SetContextStateProps<unknown>) => {}
}

export const Context = createContext<ContextSlice<unknown>>(contextInitialState);

interface IContextProviderProps<T> {
    initialState: T
    specificProvider: Provider<ContextSlice<T>>
    children: any
}

const ContextProvider = <T extends Object>(props: IContextProviderProps<T>) => {
    const {
        initialState,
        specificProvider: Provider,
        children
    } = props;
    
    const [state, setInnerState] = useState<T>(initialState);
    const setState = useCallback<SetContextState<T>>((args: SetContextStateProps<T>) => {
        const { 
            key,
            value,
        } = args;

        if (typeof key === undefined || typeof value === undefined || !key) {
            return;
        }
        const prevValue = state[key];
        setInnerState(prevState => ({
            ...prevState,
            [key]: value as typeof prevValue,
        }));
        return;
    }, [state])
    const value = useMemo<ContextSlice<T>>(() => ({ state: state, setState }), [state])
    return <Provider value={value} >
        {children}
    </Provider>
}

export const useContext = <T extends unknown>(Context: DefaultContext<T>): ContextSlice<T> => {
    return defaultUseContext<T>(Context) as ContextSlice<T>;
}

// export const useContextValue = <T extends unknown>(Context: DefaultContext<T>): ContextSlice<T> => {
//     const state = defaultUseContext<T>(Context) as ContextSlice<T>;
// }

// export const useContextAction = <T extends unknown>(Context: DefaultContext<T>): ContextSlice<T> => {
//     return defaultUseContext<T>(Context) as ContextSlice<T>;
// }

export default ContextProvider;