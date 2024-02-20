import { 
    useEffect,
    useRef,
    useState,
    useCallback,
} from 'react';
import "./CircularTimer.css";

interface CircularTimerProps {
    styles?: object,
    totalTime: number,
    stepTime?: number,
    showRemainingTime?: boolean,
}

const CircularTimer = (props: CircularTimerProps) => {
    const {
        totalTime,
        stepTime = 1000,
        showRemainingTime = false,
        styles,
    } = props;

    const timeElapsed = useRef(0);
    const nextTickId = useRef(-1);
    const [remainingTime, setRemainingTime] = useState(totalTime / 1000);
    
    const handleCountDown = useCallback(() => {
        timeElapsed.current = timeElapsed.current + stepTime;
        setRemainingTime((totalTime - timeElapsed.current) / 1000);

        if (timeElapsed.current >= totalTime) {
            clearInterval(nextTickId.current);
            return;
        }
    }, [timeElapsed, totalTime, stepTime])

    useEffect(() => {
        if (!totalTime) {
            return;
        }

        if (nextTickId.current) {
            clearInterval(nextTickId.current);
        }

        nextTickId.current = setInterval(handleCountDown, stepTime)
    }, [totalTime])

    useEffect(() => () => {
            clearTimeout(nextTickId.current);
    }, [])

    return <div className="CircularTimer" style={ styles }>
        {/* <svg className="circular-indicator">
            <circle className="circle" cx="50%" cy="50%" r="45%" strokeWidth="10%" style={{ animationDuration: `${totalTime / 1000}s`}}/>
        </svg> */}
        <svg className="circular-indicator" width="200" height="200" viewBox="-25 -25 250 250">
            <circle className="circle" cx="100" cy="100" r="90" strokeWidth="10%" fill="transparent">
            <animate
                attributeName="strokeDashoffset"
                values="565;0"
                dur={totalTime / 1000}
            />
            </circle>
        </svg>
        { showRemainingTime && <span className="remaining-time"> { remainingTime } </span> }
    </div>
}

export default CircularTimer;