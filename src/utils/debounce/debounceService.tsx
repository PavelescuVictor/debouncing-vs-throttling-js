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

export const useDebounceFunc = (func: Function, debounceConfig: IDebounceConfig): Array<Function> => {
    const {
        debounceTime = 1000,
        maxWaitCalls = Infinity,
    } = debounceConfig;
    let debouncedFunc = useRef<Function>(func);

    useEffect(() => {
        debouncedFunc.current = debounce(func, debounceConfig);
    }, [func, debounceTime, maxWaitCalls]);

    return [debouncedFunc.current]
}

export default {
    debounce,
    useDebounceValue,
    useDebounceFunc,
}