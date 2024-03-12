import { createContext } from 'react';
import { 
    IInitialContextState, 
    IContextActions,
} from './DebounceControllerContext.types';
import {
    createSlice,
} from '@/utils/store';

export const key = 'DebounceControllerContext';

export const initialContextState: IInitialContextState = {
    active: false,
}

export const actions: IContextActions = {
    testActionDebounceController: (currentState, actions, param1, param2) => {
        console.log({
            currentState,
            actions,
            param1,
            param2,
        })
    }
}

const DebounceControllerContext = createContext(initialContextState);
createSlice(key, initialContextState, actions);

export default DebounceControllerContext;