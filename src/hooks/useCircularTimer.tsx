import {
    useRef,
    useEffect,
    useState,
} from 'react';

export interface CircularTimerOptions {
    stepTime?: number,
}
export interface UseCircularTimerProps {
    totalTime: number,
    options?: CircularTimerOptions,
}

export interface ReturnExtraOptions {
    startTimer: () => void,
    resetTimer: () => void,
    pauseTimer: () => void,
    unpauseTimer: () => void,
}

const useCircularTimer = (props: UseCircularTimerProps): [number, number, ReturnExtraOptions]  => {
    const {
        totalTime,
        options: {
            stepTime = 1000,
        } = {},
    } = props;

    const [shouldStart, setShouldStart] = useState(false);
    const nextTickId = useRef(-1);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [remainingTime, setRemainingTime] = useState(totalTime / 1000);
    const [reset, setReset] = useState(false);
    
    const handleTimer = () => {
        if (nextTickId.current === -1) {
            nextTickId.current = setInterval(() => {
                setTimeElapsed(prevTimeElapsed => prevTimeElapsed + stepTime);
                setRemainingTime(prevRemainingTime => prevRemainingTime - (stepTime / 1000));
            }, stepTime);
            setReset(false);
        }
    }

    const startTimer = () => {
        resetTimer(true);
        setReset(true);
    }

    const resetTimer = (start: boolean = false) => {
        if (nextTickId.current) {
            clearInterval(nextTickId.current);
        }
        nextTickId.current = -1;
        setTimeElapsed(0);
        setRemainingTime(totalTime / 1000);
        if (shouldStart !== start) {
            setShouldStart(start);
        }
    }

    const pauseTimer = () => {
        clearInterval(nextTickId.current);
    }

    const unpauseTimer = () => {
        nextTickId.current = setInterval(handleTimer, stepTime)
    }

    useEffect(() => {
        if (!shouldStart || !totalTime) {
            return;
        }
        if (timeElapsed >= totalTime) {
            if (nextTickId.current) {
                clearInterval(nextTickId.current);
            }
            setShouldStart(false);
            return;
        }
        handleTimer();
    }, [shouldStart, timeElapsed, nextTickId.current, reset])

    useEffect(() => () => {
            clearTimeout(nextTickId.current);
    }, [])

    return [timeElapsed, remainingTime, { startTimer, resetTimer, pauseTimer, unpauseTimer}];
}

export default useCircularTimer;