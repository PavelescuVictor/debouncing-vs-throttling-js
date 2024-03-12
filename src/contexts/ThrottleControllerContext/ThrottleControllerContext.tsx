import { createContext } from 'react';
import { 
    IInitialContextState,
    IContextActions,
} from './ThrottleControllerContext.types';
import {
    createSlice,
} from '@/utils/store';

export const key = 'ThrottleControllerContext';

export const initialContextState: IInitialContextState = {
    active: false,
}

export const actions: IContextActions = {
    testActionThrottleController: (currentState, actions, param1, param2) => {
        console.log({
            currentState,
            actions,
            param1,
            param2,
        })
    }
}

const ThrottleControllerContext = createContext(initialContextState);
createSlice(key, initialContextState, actions);

export default ThrottleControllerContext;