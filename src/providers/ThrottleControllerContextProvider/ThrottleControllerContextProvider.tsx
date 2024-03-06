import {
    useState,
    useMemo,
} from 'react';
import {
    ThrottleControllerContext
} from '../../contexts';
import {
    IInitialContextState
} from '../../contexts/ThrottleControllerContext/ThrottleControllerContext.types';

interface IThrottleControllerContextProviderProps {
    children: any
}

const ThrottleControllerContextProvider = (props: IThrottleControllerContextProviderProps) => {
    const {
        children
    } = props;
    const [active, setActive] = useState<boolean>(false);
    const value = useMemo<IInitialContextState>(() => ({ active, setActive }), [active])
    return <ThrottleControllerContext.Provider value={value} >
        {children}
    </ThrottleControllerContext.Provider>
}

export default ThrottleControllerContextProvider;