export interface IResultsControllerProps {
    useDebounce: boolean
    useThrottle: boolean
    remainingTime: number
    resetTimer: () => void
    toggleTimeline: (_event: any) => void;
}