import { createContext } from 'react';
import { 
    IInitialContextState,
    IContextActions,
} from './AdvanceControllerContext.types';
import {
    DebounceSettings,
    ThrottleSettings,
} from '@/components/DebounceThrottle/components/AdvanceController/AdvanceController.types'
import {
    createSlice,
} from '@/utils/store';

export const key = 'AdvanceControllerContext';

export const initialContextState: IInitialContextState = {
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

export const actions: IContextActions = {
    testActionAdvanceController: (currentState, actions, param1, param2) => {
        console.log({
            currentState,
            actions,
            param1,
            param2,
        })
    }
}

const AdvanceControllerContext = createContext(initialContextState)
createSlice(key, initialContextState, actions);

export default AdvanceControllerContext;