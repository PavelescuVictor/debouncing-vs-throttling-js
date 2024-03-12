import { createContext } from 'react';
import { 
    IInitialContextState,
    IContextActions,
} from './ResultsControllerContext.types';
import {
    createSlice,
} from '@/utils/store';

export const key = 'ResultsControllerContext';

export const initialContextState: IInitialContextState = {
    regularCallsAmount: 0,
    debounceCallsAmount: 0,
    throttleCallsAmount: 0,
}

export const actions: IContextActions = {
    testActionResultsController: (currentState, actions, param1, param2) => {
        console.log({
            currentState,
            actions,
            param1,
            param2,
        })
    }
}

const ResultsControllerContext = createContext(initialContextState);
createSlice(key, initialContextState, actions);

export default ResultsControllerContext;