import { useCallback, useState } from 'react';

let counter = 0;
export function useForceUpdate() {
    const [_, setState] = useState(0);

    const timeoutFunc = useCallback(() => setState(++counter), []);
    return useCallback(() => setTimeout(timeoutFunc, 0), []);
}