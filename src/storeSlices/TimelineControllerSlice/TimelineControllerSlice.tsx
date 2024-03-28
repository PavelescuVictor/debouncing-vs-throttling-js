import { createContext } from 'react';
import { 
    IInitialState,
    ISliceActions,
} from './TimelineControllerSlice.types';
import { ISlice } from '@/utils/store/Store.types';
import {
    subscribeStoreSlice,
} from '@/utils/store';

export const initialState: IInitialState = {
    active: false,
    points: [],
}

export const timelineControllerSlice: ISlice<IInitialState, ISliceActions> = {
    key: 'TimelineControllerContext',
    state: initialState,
    actions: {
        testActionTimelineController: (currentState, actions, param1, param2) => {
            console.log({
                currentState,
                actions,
                param1,
                param2,
            })
        }
    }
}

export const TimelineControllerContext = createContext(initialState);
subscribeStoreSlice(timelineControllerSlice);
export const TimelineControllerProvider = TimelineControllerContext.Provider;
export const TimelineControllerConsumer = TimelineControllerContext.Consumer;

export default timelineControllerSlice;