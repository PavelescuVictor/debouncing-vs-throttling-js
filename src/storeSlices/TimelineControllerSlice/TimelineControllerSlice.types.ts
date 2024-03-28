import { 
    ISlice,
    ActionType,
} from '@/utils/store/Store.types'

export enum RegularTimelinePointType {
    REGULAR = "REGULAR",
}

export enum DebounceTimelinePointType {
    DEBOUNCE = "DEBOUNCE",
    LEADING = "LEADING",
    TRAILING = "TRAILING",
}

export enum ThrottleTimelinePointType {
    THROTTLE = "THROTTLE",
    LEADING = "LEADING",
    TRAILING = "TRAILING",
}

export type TimelinePointType = RegularTimelinePointType | DebounceTimelinePointType | ThrottleTimelinePointType

export interface ITimelineItem<T> {
    type: T;
}

export interface IInitialState {
    active: boolean,
    points: Array<ITimelineItem<DebounceTimelinePointType | ThrottleTimelinePointType>>
}

export interface ISliceActions {
    testActionTimelineController: ActionType
}

export type ISliceType = ISlice<IInitialState, ISliceActions>