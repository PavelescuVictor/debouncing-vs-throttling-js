import { 
    ISlice,
    ActionType
} from '@/utils/store/Store.types';

export interface IInitialState {
    active: boolean
}

export interface ISliceActions {
    testActionDebounceController: ActionType
}

export type ISliceType = ISlice<IInitialState, ISliceActions>