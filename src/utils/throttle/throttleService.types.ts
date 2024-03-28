export interface IThrottleConfig {
    throttleTime?: number,
    maxWaitTime?: number,
    maxWaitCalls?: number,
    leading?: boolean,
    trailing?: boolean,
}