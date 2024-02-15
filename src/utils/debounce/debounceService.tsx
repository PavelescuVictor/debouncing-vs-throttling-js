import { useRef, useEffect, useCallback, useState } from 'react';

// const shallowCheck = (compare: object | Array<any>, compareTo: object | Array<any>) => {
//     if (Array.isArray(compare) && Array.isArray(compareTo)) {
//         return compare.findIndex((_: string, index: number) => compare[index] !== compareTo[index]) === -1 ? false : true
//     }
//     if (typeof compare === 'object' && typeof compareTo === 'object') {
//         Object.keys(compare).findIndex((key: string) => {
//             if (!Object.keys(compareTo).includes(key)) {
//                 return true;
//             }
//             if (compareTo[key]){
//                 return true;
//             }
//             return false;
//         })
//     }

//     return false;
// }

interface IDebounceConfig {
    debounceTime?: number,
    maxWaitTime?: number,
    maxWaitCalls?: number,
    leading?: boolean,
    trailing?: boolean,
}

export const debounce = (func: Function, debounceConfig: IDebounceConfig): Function => {
    const {
        debounceTime = 1000,
        maxWaitCalls = Infinity,
    } = debounceConfig;

    let timeoutId: number = -1;
    let currentWaitAmount: number = 0;

    const sanitizeCurrentTimeout = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            currentWaitAmount++;
        }
    }

    const maxWaitReset = (...args: any) => {
        if (currentWaitAmount >= maxWaitCalls) {
            func(...args);
            currentWaitAmount = 0;
        }
    }

    const handleNewTimeout = (...args: any) => {
        timeoutId = setTimeout(() => {
            func(...args);
        }, debounceTime)
    }

    return (...args: any) => {
        sanitizeCurrentTimeout();
        maxWaitReset(...args);
        handleNewTimeout(...args);
    };
}

export const useDebounceValue = (value: any, debounceConfig: IDebounceConfig): Array<any> => {
    const {
        debounceTime = 1000,
        maxWaitCalls = Infinity,
    } = debounceConfig;
    let [debouncedValue, setDebouncedValue] = useState<any>(undefined);
    let prevValue = useRef<any>(undefined);
    let timeoutId = useRef<number>(-1);

    const debounce = useCallback(() => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }
        timeoutId.current = setTimeout(() => {
            setDebouncedValue(value);
        }, debounceTime)
    }, [value, debounceTime, maxWaitCalls])

    useEffect(() => {
        if (value === prevValue.current) {
            return;
        }
        prevValue.current = value;
        debounce();
    }, [value, debounceTime, maxWaitCalls])

    return [debouncedValue]
}

export const useDebounceCallback = (func: Function, debounceConfig: IDebounceConfig): Array<any> => {
    const {
        debounceTime = 1000,
        maxWaitCalls = Infinity,
        maxWaitTime = 3000,
        leading = false,
        trailing = false,
    } = debounceConfig;

    let timeoutId = useRef<number>(-1);
    let currentSkippedAmount = useRef<number>(0);
    let lastDebouncedCall = useRef<number>(-1);

    /**
     * Handles func calls when leading is set to true
     * @param args
     */
    const handleLeading = (args: any) => {
        if (leading) {
            func(...args);
        }
    }

    /**
     * Clearing timouts if there is one and incrementing locally the amount of timouts were skipped since last update
     */
    const sanitizeCurrentTimeout = () => {
        if (timeoutId && !trailing) {
            clearTimeout(timeoutId.current);
            timeoutId.current = -1;
            currentSkippedAmount.current++;
            lastDebouncedCall.current = new Date().getTime();
        }
    }

    
    /**
     * Calling action when the amount of skipped calls is equal to maxWaitCalls
     * @param args
     */
    const maxWaitReset = (...args: any) => {
        if (currentSkippedAmount.current >= maxWaitCalls) {
            func(...args);
            currentSkippedAmount.current = 0;
        }
        if (lastDebouncedCall.current !== -1 && new Date(Date.now()).getTime() - lastDebouncedCall.current>= maxWaitTime) {
            func(...args);
            lastDebouncedCall.current === -1;
        }
    }

    /**
     * Creating new timeout for the most recent call
     * @param args 
     */
    const handleNewTimeout = (...args: any) => {
        handleLeading(args);
        timeoutId.current = setTimeout(() => {
            func(...args);
        }, debounceTime)
    }

    /**
     * Returning true if the debounce function is still waiting for a call to be triggered
     */
    const isPending = useCallback(() => {
        return timeoutId.current !== -1 ? true : false;
    }, [])

    /**
     * The debunced function
     */
     const debouncedFunc = (...args: any) => {
        sanitizeCurrentTimeout();
        maxWaitReset(...args);
        handleNewTimeout(...args);
    }

    return [debouncedFunc, { isPending }];
}

export default {
    debounce,
    useDebounceValue,
    useDebounceCallback,
}