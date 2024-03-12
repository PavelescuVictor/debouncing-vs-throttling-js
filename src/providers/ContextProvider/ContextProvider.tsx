import {
    useState,
    useMemo,
    useCallback,
    createContext,
    Provider,
    useContext as defaultUseContext,
    Context as DefaultContext,
} from 'react';
import {
    getStoreState,
    getStoreActions
} from '@/utils/store';

interface SetContextStateProps<T> {
    key: keyof T | null | undefined
    value: unknown
}

type SetContextState<T> = (args: SetContextStateProps<T>) => void;
export type ActionReturnType = void;
export type Action = (currentState: any, actions: IContextActions) => ActionReturnType;
export interface IContextActions {
    [key: string]: Action
}

type ContextAction<T> = (currentState?: T, actions?: IContextActions, ...rest: any) => void

interface ContextActions<T> {
    [key: string]: ContextAction<T>
}

interface ContextSlice<T> {
    state: T
    setState: SetContextState<T>
    actions: ContextActions<T>
}

const contextInitialState = {
    state: {},
    setState: (_: SetContextStateProps<unknown>) => {},
    actions: {},
}

export const Context = createContext<ContextSlice<unknown>>(contextInitialState);

interface IContextProviderProps<T> {
    key?: string,
    initialState: T,
    actions: ContextActions<T>,
    specificProvider: Provider<ContextSlice<T>>
    children: any
}

const ContextProvider = <T extends Object>(props: IContextProviderProps<T>) => {
    const {
        initialState,
        actions,
        specificProvider: Provider,
        children
    } = props;
    
    const [state, setInnerState] = useState<T>(initialState);
    const setState = useCallback<SetContextState<T>>((args: SetContextStateProps<T>) => {
        const { 
            key,
            value,
        } = args;

        if (!key) {
            return;
        }

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
    const contextActions = {};
    const storeState = getStoreState<T>();
    const storeActions = getStoreActions();
    Object.keys(actions).forEach((actionName: string) => {
        const contextAction = (...args: any) => { 
            actions[actionName](storeState, storeActions, ...args);
        }
        Object.assign(contextActions, {
            [actionName]: contextAction
        });
    }, {})
    const value = useMemo<ContextSlice<T>>(() => ({ state: state, setState, actions: contextActions }), [state])
    return <Provider value={value}>
        {children}
    </Provider>
}

interface IUseContextProviderProps<T> {
    key?: string,
    initialState: T,
    actions: ContextActions<T>,
}

export const createContextProvider = <T extends Object>(props: IUseContextProviderProps<T>) => {
    const {
        initialState,
        actions,
    } = props;
    
    const [state, setInnerState] = useState<T>(initialState);
    const setState = useCallback<SetContextState<T>>((args: SetContextStateProps<T>) => {
        const { 
            key,
            value,
        } = args;

        if (!key) {
            return;
        }

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
    const contextActions = {};
    const storeState = getStoreState<T>();
    const storeActions = getStoreActions();
    Object.keys(actions).forEach((actionName: string) => {
        const contextAction = (...args: any) => { 
            actions[actionName](storeState, storeActions, ...args);
        }
        Object.assign(contextActions, {
            [actionName]: contextAction
        });
    }, {})
    const value = useMemo<ContextSlice<T>>(() => ({ state: state, setState, actions: contextActions }), [state])
    return [value];
}

export const useContext = <T extends unknown>(Context: DefaultContext<T>): ContextSlice<T> => {
    return defaultUseContext<T>(Context) as ContextSlice<T>;
}

export const useContextValues = <T extends unknown>(Context: DefaultContext<T>): T => {
    const { state } = defaultUseContext<T>(Context) as ContextSlice<T>;
    return state;
}

export const useContextSetValues = <T extends unknown>(Context: DefaultContext<T>): SetContextState<T> => {
    const { setState } = defaultUseContext<T>(Context) as ContextSlice<T>;
    return setState;
}

export const useContextActions = <T extends unknown>(Context: DefaultContext<T>): ContextActions<T> => {
    const { actions } = defaultUseContext<T>(Context) as ContextSlice<T>;
    return actions;
}

export default ContextProvider;