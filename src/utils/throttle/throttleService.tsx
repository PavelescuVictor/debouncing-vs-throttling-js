import { useRef } from 'react';
import { IThrottleConfig } from './throttleService.types';

export const useThrottleCallback = (callback: Function, throttleConfig: IThrottleConfig) => {
    const {
        throttleTime = 5000,
        //@ts-ignore
        maxWaitTime = 1000,
        //@ts-ignore
        maxWaitCalls = Infinity,
        //@ts-ignore
        leading = false,
        //@ts-ignore
        trailing = false,
    } = throttleConfig;

    const timeoutId = useRef<number | ReturnType<typeof setTimeout>>(-1);
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
    useThrottleCallback,
}