import {
    useContext as defaultUseContext,
    Context as DefaultContext,
} from 'react';
import {
    DefaultContextStateType
} from '../Store.types';

    //@ts-ignore
export const useContext = <T extends ContextSlice<DefaultContextStateType>>(Context: DefaultContext<T>) => {
        //@ts-ignore
    return defaultUseContext(Context) as ContextSlice<DefaultContextStateType>;
}

    //@ts-ignore
export const useContextValues = <T extends ContextSlice<DefaultContextStateType>>(Context: DefaultContext<T>) => {
    const { state } = useContext(Context);
    return state;
}

    //@ts-ignore
export const useContextSetValues = <T extends ContextSlice<DefaultContextStateType>>(Context: DefaultContext<T>) => {
    const { setState } = useContext(Context);
    return setState;
}

    //@ts-ignore
export const useContextActions = <T extends ContextSlice<DefaultContextStateType>>(Context: DefaultContext<T>) => {
    const { actions } = useContext(Context);
    return actions;
}