import { 
    ISlice,
    ActionType,
} from '@/utils/store/Store.types'

export interface IInitialState {
    active: boolean
}

export interface ISliceActions {
    testActionThrottleController: ActionType
}

export type ISliceType = ISlice<IInitialState, ISliceActions>