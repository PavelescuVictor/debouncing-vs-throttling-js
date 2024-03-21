import { createContext } from 'react';
import { 
    IInitialState,
    ISliceType,
} from './AdvanceControllerSlice.types';
import {
    DebounceSettings,
    ThrottleSettings,
} from '@/components/DebounceThrottle/components/AdvanceController/AdvanceController.types'
import {
    subscribeStoreSlice,
} from '@/utils/store';

export const initialState: IInitialState = {
    visible: false,
    selectedSetting: null,
    debounceSettings: {
        [DebounceSettings.DEBOUNCE_TIME]: null,
        [DebounceSettings.MAX_WAIT_TIME]: null,
        [DebounceSettings.MAX_WAIT_CALLS]: null,
        [DebounceSettings.LEADING]: false,
        [DebounceSettings.TRAILING]: false,
    },
    throttleSettings: {
        [ThrottleSettings.THROTTLE_TIME]: null,
        [ThrottleSettings.MAX_WAIT_TIME]: null,
        [ThrottleSettings.MAX_WAIT_CALLS]: null,
        [ThrottleSettings.LEADING]: false,
        [ThrottleSettings.TRAILING]: false,
    }
}

export const advanceControllerSlice: ISliceType= {
    key: 'AdvanceControllerSlice',
    state: initialState,
    actions: {
        testActionAdvanceController: (currentState, actions, param1, param2) => {
            console.log({
                currentState,
                actions,
                param1,
                param2,
            })
        }
    }
}

export const AdvanceControllerContext = createContext(initialState);
subscribeStoreSlice(advanceControllerSlice);
export const AdvanceControllerProvider = AdvanceControllerContext.Provider;
export const AdvanceControllerConsumer = AdvanceControllerContext.Consumer;

export default advanceControllerSlice;