import { createContext } from 'react';
import { 
    IInitialState,
    ISliceActions,
} from './ThrottleControllerSlice.types';
import {
    ISlice
} from '@/utils/store/Store.types';
import {
    subscribeStoreSlice,
} from '@/utils/store';

export const initialState: IInitialState = {
    active: false,
}

export const throttleControllerSlice: ISlice<IInitialState, ISliceActions> = {
    key: 'ThrottleControllerContext',
    state: initialState,
    actions: {
        testActionThrottleController: (currentState, actions, param1, param2) => {
            console.log({
                currentState,
                actions,
                param1,
                param2,
            })
        }
    }
}

export const ThrottleControllerContext = createContext(initialState);
subscribeStoreSlice(throttleControllerSlice);
export const ThrottleControllerProvider = ThrottleControllerContext.Provider;
export const ThrottleControllerConsumer = ThrottleControllerContext.Consumer;

export default throttleControllerSlice;