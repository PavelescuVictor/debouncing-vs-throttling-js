import { 
    ISlice,
    ActionType,
} from '@/utils/store/Store.types'

export interface IInitialState {
    regularCallsAmount: number
    debounceCallsAmount: number
    throttleCallsAmount: number
}

export interface ISliceActions {
    testActionResultsController: ActionType
}

export type ISliceType = ISlice<IInitialState, ISliceActions>