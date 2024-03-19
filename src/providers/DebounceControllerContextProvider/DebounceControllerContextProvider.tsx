import {
    useState,
    useMemo,
} from 'react';
import {
    DebounceControllerContext
} from '../../contexts';
import {
    IInitialContextState
} from '../../contexts/DebounceControllerContext/DebounceControllerContext.types';

interface IDebounceControllerContextProviderProps {
    children: any
}

const DebounceControllerContextProvider = (props: IDebounceControllerContextProviderProps) => {
    const {
        children
    } = props;
    const [active, setActive] = useState<boolean>(false);
    const value = useMemo<IInitialContextState>(() => ({ active, setActive }), [active])
    return <DebounceControllerContext.Provider value={value} >
        {children}
    </DebounceControllerContext.Provider>
}

export default DebounceControllerContextProvider;