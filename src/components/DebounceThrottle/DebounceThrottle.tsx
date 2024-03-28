//@ts-nocheck
import { 
    useState,
} from 'react';
import { useCircularTimer } from '@/hooks';
import {
    AdvanceController,
    InputController,
    ResultsController,
    TimelineController,
    Checkbox,
} from './components';
import { DebounceControllerContext } from '@/storeSlices/DebounceControllerSlice/DebounceControllerSlice';
import { ThrottleControllerContext } from '@/storeSlices/ThrottleControllerSlice/ThrottleControllerSlice';
import { TimelineControllerContext } from '@/storeSlices/TimelineControllerSlice/TimelineControllerSlice';
import {
    useContextValues,
    useContextSetValues,
} from '@/utils/store/helpers/useContext';
import './DebounceThrottle.css';
import { LabelPositon } from './components/Checkbox/Checkbox.types';

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
    // Debounce toggle
    const { active: useDebounce } = useContextValues(DebounceControllerContext);
    const setUseDebounce = useContextSetValues(DebounceControllerContext);
    const onDebounceCheckboxChange = (_event: React.MouseEvent<HTMLInputElement>) => {
        setUseDebounce({
            key: 'active',
            value: !useDebounce,
        });
    }

    // Throttle toggle
    const { active: useThrottle } = useContextValues(ThrottleControllerContext);
    const setUseThrottle = useContextSetValues(ThrottleControllerContext);
    const onThrottleCheckboxChange = (_event: React.MouseEvent<HTMLInputElement>) => {
        setUseThrottle({
            key: 'active',
            value: !useThrottle,
        })
    }

    const [_, remainingTime, { startTimer, resetTimer }] = useCircularTimer({ totalTime: 5000 });

    return <div className="DebounceThrottle">
        <div className="title">
            <span> Debounce </span>
            <span> - VS - </span>
            <span> Throttle </span>
        </div>
        <div className="checkboxes-wrapper">
            <Checkbox 
                className="debounce" 
                name="debounce" 
                onClickCallback={ onDebounceCheckboxChange } 
                label="Debounce"
            />
            <Checkbox
                className="throttle" 
                name="throttle" 
                onClickCallback={ onThrottleCheckboxChange } 
                label="Throttle"
                labelPosition={ LabelPositon.RIGHT }
            />
        </div>
        <AdvanceController />
        <InputController startTimer={startTimer} resetTimer={resetTimer}/>
        <ResultsController useDebounce={useDebounce} useThrottle={useThrottle} remainingTime={remainingTime} resetTimer={resetTimer}/>
        <TimelineController />
    </div>
}

export default DebounceThrottle;