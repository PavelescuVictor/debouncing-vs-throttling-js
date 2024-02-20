import { useRef } from 'react';

interface IThrottleConfig {
    throttleTime?: number,
    maxWaitTime?: number,
    maxWaitCalls?: number,
    leading?: boolean,
    trailing?: boolean,
}

export const throttle = () => {

}

export const useThrottleCallback = (callback: Function, throttleConfig: IThrottleConfig) => {
    const {
        throttleTime = 5000,
        maxWaitTime = 1000,
        maxWaitCalls = Infinity,
        leading = false,
        trailing = false,
    } = throttleConfig;

    const timeoutId = useRef<number>(-1);
    const shouldWait = useRef<boolean>(false);
    const callbackArgs = useRef<Array<any> | null>();

    const timeoutCallback = () => {
        if (!callbackArgs.current) {
            shouldWait.current = false;
        } else {
            callback(...callbackArgs.current);
            callbackArgs.current = null;
            setTimeout(timeoutCallback, throttleTime);
        }
    }

    const throttleCallback = (...args: any) => {
        if (shouldWait.current) {
            callbackArgs.current = args;
            return;
        }

        callback(...args);
        shouldWait.current = true;
        
        timeoutId.current = setTimeout(timeoutCallback, throttleTime)
    }

    return [throttleCallback]
}

export default {
    throttle,
}