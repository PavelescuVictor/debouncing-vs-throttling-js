import { memo, useEffect, useRef } from 'react';
import "./CircularTimer.css";

interface CircularTimerProps {
    size?: number,
    totalTime: number,
    stepTime?: number,
    remainingTime?: number,
    showRemainingTime?: boolean,
}

const CircularTimer = memo((props: CircularTimerProps) => {
    const {
        totalTime,
        stepTime = 1000,
        remainingTime,
        showRemainingTime = false,
        size = 200,
    } = props;

    if (typeof remainingTime !== "number" && typeof remainingTime !== "string") {
        return null;
    }

    const strokeDashArrayInitial = size * 0.45 * Math.PI;
    const strokeDashArrayStep = strokeDashArrayInitial * (stepTime / totalTime);
    const totalStepsCount = totalTime / stepTime;
    const currentStep = (totalTime - remainingTime * 1000) / stepTime;
    const remainingSteps = totalStepsCount - currentStep;
    let currentStrokeDashArray = remainingSteps * strokeDashArrayStep;
    let nextStrokeDashArray = (remainingSteps - 1) * strokeDashArrayStep;
    
    if (!remainingSteps) {
        currentStrokeDashArray = 0;
        nextStrokeDashArray = 0;
    }

    const animationRef = useRef<any>();
    const setAnimationRef = (instance: any) => {
        if (!instance) {
            return;
        }
        animationRef.current = instance
    }

    useEffect(() => {
        if (animationRef.current) {
            animationRef.current.beginElement();
        }
    }, [remainingTime])

    return <div className="CircularTimer">
        <svg className="circular-indicator" width={size} height={size}>
            <circle className="circle" cx="50%" cy="50%" r="45%" strokeWidth="10%" fill="transparent" strokeDasharray={strokeDashArrayInitial} strokeDashoffset={currentStrokeDashArray}>
            <animate
                attributeName="stroke-dashoffset"
                ref={setAnimationRef} 
                from={currentStrokeDashArray}
                to={nextStrokeDashArray}
                dur={stepTime / 1000}
                fill='freeze'
                begin="indefinite"
            />
            </circle>
        </svg>
        { showRemainingTime && <span className="remaining-time"> { remainingTime } </span> }
    </div>
})

export default CircularTimer;