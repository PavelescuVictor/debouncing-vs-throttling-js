import { createContext } from 'react';
import { 
    IInitialState,
    ISliceActions,
} from './ResultsControllerSlice.types';
import { ISlice } from '@/utils/store/Store.types';
import {
    subscribeStoreSlice,
} from '@/utils/store';

export const initialState: IInitialState = {
    regularCallsAmount: 0,
    debounceCallsAmount: 0,
    throttleCallsAmount: 0,
}

export const resultsControllerSlice: ISlice<IInitialState, ISliceActions> = {
    key: 'ResultsControllerContext',
    state: initialState,
    actions: {
        testActionResultsController: (currentState, actions, param1, param2) => {
            console.log({
                currentState,
                actions,
                param1,
                param2,
            })
        }
    }
}

export const ResultsControllerContext = createContext(initialState);
subscribeStoreSlice(resultsControllerSlice);
export const ResultsControllerProvider = ResultsControllerContext.Provider;
export const ResultsControllerConsumer = ResultsControllerContext.Consumer;

export default resultsControllerSlice;