export enum DebounceTimelinePointType {
    REGULAR = "REGULAR",
    DEBOUNCE = "DEBOUNCE",
    LEADING = "LEADING",
    TRAILING = "TRAILING",
}

export enum ThrottletimelinePointType {
    REGULAR = "REGULAR",
    THROTTLE = "THROTTLE",
    LEADING = "LEADING",
    TRAILING = "TRAILING",
}

export interface TimelineItem<T> {
    type: T;
}

export interface TimelineProps<T> {
    className?: string
    items: Array<TimelineItem<T>>
}