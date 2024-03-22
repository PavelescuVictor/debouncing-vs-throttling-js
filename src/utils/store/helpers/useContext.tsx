import {
    useContext as defaultUseContext,
    Context as DefaultContext,
} from 'react';
import {
    DefaultContextStateType
} from '../Store.types';

export const useContext = <T extends ContextSlice<DefaultContextStateType>>(Context: DefaultContext<T>) => {
    return defaultUseContext(Context) as ContextSlice<DefaultContextStateType>;
}

export const useContextValues = <T extends ContextSlice<DefaultContextStateType>>(Context: DefaultContext<T>) => {
    const { state } = useContext(Context);
    return state;
}

export const useContextSetValues = <T extends ContextSlice<DefaultContextStateType>>(Context: DefaultContext<T>) => {
    const { setState } = useContext(Context);
    return setState;
}

export const useContextActions = <T extends ContextSlice<DefaultContextStateType>>(Context: DefaultContext<T>) => {
    const { actions } = useContext(Context);
    return actions;
}