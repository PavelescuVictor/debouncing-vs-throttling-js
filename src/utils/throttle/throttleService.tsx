interface IThrottleConfig {
    debounceTime?: number,
    maxWaitTime?: number,
    maxWaitCalls?: number,
    leading?: boolean,
    trailing?: boolean,
}

export const throttle = () => {}

export const useThrottleCallback = (func: Function, throttleConfig: IThrottleConfig) => {
    
}

export default {
    throttle,
}