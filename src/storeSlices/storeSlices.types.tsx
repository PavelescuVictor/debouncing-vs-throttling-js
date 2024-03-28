import {
    IInitialState as AdvanceControllerSliceInitialState
} from './AdvanceControllerSlice/AdvanceControllerSlice.types';
import {
    IInitialState as DebounceControllerSliceInitialState
} from './DebounceControllerSlice/DebounceControllerSlice.types';
import {
    IInitialState as ResultsControllerSliceInitialState
} from './ResultsControllerSlice/ResultsControllerSlice.types';
import {
    IInitialState as ThrottleControllerSliceInitialState
} from './ThrottleControllerSlice/ThrottleControllerSlice.types';
import {
    IInitialState as TimelineControllerSliceInitialState
} from './TimelineControllerSlice/TimelineControllerSlice.types';

export type StoreSlicesType = 
    AdvanceControllerSliceInitialState | 
    DebounceControllerSliceInitialState |
    ResultsControllerSliceInitialState |
    ThrottleControllerSliceInitialState |
    TimelineControllerSliceInitialState;