import { 
    useState,
    ChangeEvent,
    MouseEvent,
} from 'react';
import { useCircularTimer } from '@/hooks';
import {
    AdvanceController,
    InputController,
    ResultsController,
    TimelineController,
} from './components';
import {
    AdvanceControllerContext,
    DebounceControllerContext,
    ThrottleControllerContext,
} from '@/contexts';
import {
    useContext
} from '@/providers/ContextProvider/ContextProvider';
import './DebounceThrottle.css';

/**
 * TODO: 
 * BUG: Clear throttle and debounce timout ids after results clear
 * FEAT: Create connect function for components by wrapping components and passing props from state
 * FEAT: Create slices based on key
 * FEAT: Create useContextValue to get only a state/states value based on key
 * FEAT: Create useContextAction to get only an action/actions based on key
 * FEAT: Create actions for each slice
 * FEAT: Create Cumulator of states and actions
 */

const DebounceThrottle = () => {
    // Advance Panel Toggle;
    const {
        state: {
            visible: useAdvance,
        },
    } = useContext(AdvanceControllerContext);

    // Debounce toggle
    const {
        state: {
            active: useDebounce,
        },
        setState: setUseDebounce,
    } = useContext(DebounceControllerContext);
    const onDebounceCheckboxChange = (_event: ChangeEvent<HTMLInputElement>) => {
        setUseDebounce({
            key: 'active',
            value: !useDebounce,
        });
    }

    // Throttle toggle
    const {
        state: {
            active: useThrottle,
        },
        setState: setUseThrottle
    } = useContext(ThrottleControllerContext);
    const onThrottleCheckboxChange = (_event: ChangeEvent<HTMLInputElement>) => {
        setUseThrottle({
            key: 'active',
            value: !useThrottle,
        })
    }

    const [useTimeline, setUseTimeline] = useState(false);
    const toggleTimeline = (_event: MouseEvent<HTMLButtonElement>) => {
        setUseTimeline(!useTimeline);   
    }

    const [_, remainingTime, { startTimer, resetTimer }] = useCircularTimer({ totalTime: 5000 });

    return <div className="DebounceThrottle">
        <div className="title">
            <span> Debounce </span>
            <span> - VS - </span>
            <span> Throttle </span>
        </div>
        <div className={ `checkboxes-wrapper ${ useAdvance ? 'advance-panel-open' : '' }` }>
            <div className="checkbox-wrapper debounce">
                <label className="checkbox-label" htmlFor="debounce"> Debounce </label>
                <input className="checkbox-input debounce" id="debounce" type="checkbox" onChange={ onDebounceCheckboxChange }/>
            </div>
            <div className="checkbox-wrapper throttle">
                <input className="checkbox-input throttle" id="throttle" type="checkbox" onChange={ onThrottleCheckboxChange }/>
                <label className="checkbox-label" htmlFor="throttle"> Throttle </label>
            </div>
        </div>
        <AdvanceController />
        <InputController startTimer={startTimer} resetTimer={resetTimer}/>
        <ResultsController useDebounce={useDebounce} useThrottle={useThrottle} remainingTime={remainingTime} resetTimer={resetTimer}  toggleTimeline={toggleTimeline}/>
        <TimelineController active={useTimeline}/>
    </div>
}

export default DebounceThrottle;