import {
    useState,
    MouseEvent,
} from 'react';
import { IResultsControllerProps } from './ResultsController.types';
import {
    useContext
} from '@/providers/ContextProvider/ContextProvider';
import {
    ResultsControllerContext,
} from '@/contexts';
import CircularTimer from '../CircularTimer';
import './ResultsController.css';

const ResultsController = (props: IResultsControllerProps) => {
    const {
        useDebounce = false,
        useThrottle = false,
        remainingTime,
        resetTimer,
        toggleTimeline,
    } = props;

    const {
        state: {
            regularCallsAmount,
            debounceCallsAmount,
            throttleCallsAmount,
        },
        setState: setResultsState
    } = useContext(ResultsControllerContext);
    const [showTimer, setShowTimer] = useState(false);

    const resetHandler = (_event: MouseEvent<HTMLButtonElement>) => {
        setResultsState({ 
            key: 'regularCallsAmount', 
            value: 0,
        });
        setResultsState({ 
            key: 'debounceCallsAmount', 
            value: 0,
        });
        setResultsState({ 
            key: 'throttleCallsAmount', 
            value: 0,
        });
        resetTimer();
        setShowTimer(false);
    }

    return <div className="ResultsController">
        <p className="header"> Calls amount </p>
        <div className="row">
            <p> Regular: { regularCallsAmount }</p>
            <div className="debounce">
                <p> Debounce: { useDebounce ? debounceCallsAmount : 'Inactive' } </p>
                { showTimer && <CircularTimer totalTime={ 5000 } stepTime={1000} remainingTime={ remainingTime } showRemainingTime/> }
            </div>
            <p> Throttle: { useThrottle ? throttleCallsAmount : 'Inactive' }</p>
        </div>
        <div className="buttons-wrapper">
            <button className="reset-button" onClick={ resetHandler }> Reset Results </button>
            <button className="toggle-timeline-button" onClick={ toggleTimeline }> Toggle Timeline </button>
        </div>
    </div>
}

export default ResultsController;