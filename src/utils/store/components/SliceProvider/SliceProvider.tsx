import {
    useState,
    useMemo,
    useCallback,
    createContext,
    ReactNode,
} from 'react';
import {
    getStoreState,
    getStoreActions
} from '@/utils/store';
import {
    DefaultContextStateType
} from '../../Store.types';

interface SetContextStateProps<T> {
    key: keyof T | null | undefined
    value: unknown
}
type SetContextState<T> = (args: SetContextStateProps<T>) => void;

export type ActionReturnType = void;
type ActionType<T> = (currentState?: T, actions?: IContextActions<T>, ...rest: any) => ActionReturnType
interface IContextActions<T> {
    [key: string]: ActionType<T>
}

interface ContextSlice<T> {
    state: T | DefaultContextStateType,
    setState: SetContextState<T | DefaultContextStateType>
    actions: IContextActions<T | DefaultContextStateType>
}

const contextInitialState = {
    state: {},
    setState: (_: SetContextStateProps<DefaultContextStateType>) => {},
    actions: {} as IContextActions<DefaultContextStateType>,
}
export const Context = createContext<ContextSlice<DefaultContextStateType>>(contextInitialState);

type ISliceProviderProps = {
    slice: any,
    specificProvider: any,
    children: ReactNode
}

const SliceProvider = <T extends unknown>(props: ISliceProviderProps<T>) => {
    const {
        slice,
        specificProvider: SpecificProvider,
        children
    } = props;

    const {
        key: sliceKey,
        state: sliceState,
        actions: sliceActions,
    } = slice;
    
    const [state, setInnerState] = useState<T>(sliceState);
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
    const storeActions = getStoreActions<T>();
    Object.keys(sliceActions).forEach((actionName: string) => {
        const contextAction = (...args: any) => { 
            sliceActions[actionName](storeState, storeActions, ...args);
        }
        Object.assign(contextActions, {
            [actionName]: contextAction
        });
    }, {})
    const value = useMemo<ContextSlice<T>>(() => ({ state: state, setState, actions: contextActions }), [state])
    return <SpecificProvider key={sliceKey} value={value}>
        {children}
    </SpecificProvider>
}
 
interface IUseContextProviderProps<T> {
    key?: string,
    initialState: T,
    actions: IContextActions<T>,
}
export const createContextProvider = <T extends unknown>(props: IUseContextProviderProps<T>) => {
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

export default SliceProvider;