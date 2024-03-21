import { createContext } from 'react';
import { 
    IInitialState, 
    ISliceActions 
} from './DebounceControllerSlice.types';
import { ISlice } from '@/utils/store/Store.types';
import {
    subscribeStoreSlice,
} from '@/utils/store';

const initialState: IInitialState = {
    active: false,
}

export const debounceControllerSlice: ISlice<IInitialState, ISliceActions> = {
    key: 'DebounceControllerSlice',
    state: initialState,
    actions: {
        testActionDebounceController: (currentState, actions, param1, param2) => {
            console.log({
                currentState,
                actions,
                param1,
                param2,
            })
        }
    }
}

export const DebounceControllerContext = createContext(initialState);
subscribeStoreSlice(debounceControllerSlice);
export const DebounceControllerProvider = DebounceControllerContext.Provider;
export const DebounceControllerConsumer = DebounceControllerContext.Consumer;

export default debounceControllerSlice;

// export const DebounceControllerContextProvider = (props: IDebounceControllerContextProviderProps) => {
//     const {
//         children
//     } = props;
//     const [active, setActive] = useState<boolean>(false);
//     const value = useMemo<IInitialContextState>(() => ({ active, setActive }), [active])
//     return <DebounceControllerContext.Provider value={value} >
//         {children}
//     </DebounceControllerContext.Provider>
// }