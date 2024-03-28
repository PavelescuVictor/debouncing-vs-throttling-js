import {
    useState,
    MouseEvent,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { IResultsControllerProps } from './ResultsController.types';
import {
    useContextValues,
    useContextSetValues,
} from '@/utils/store/helpers/useContext';
import { ResultsControllerContext } from '@/storeSlices/ResultsControllerSlice/ResultsControllerSlice';
import { TimelineControllerContext } from '@/storeSlices/TimelineControllerSlice/TimelineControllerSlice';
import TransitionItem from '@/utils/transition/TransitionItem';
import CircularTimer from '../CircularTimer';
import {
    INITIAL_STYLES,
    MOUNT_TRANSITION,
    UNMOUNT_TRANSITION,
} from './constants'
import './ResultsController.css';

const ResultsController = (props: IResultsControllerProps) => {
    const {
        useDebounce = false,
        useThrottle = false,
        remainingTime,
        resetTimer,
    } = props;

    const {
        regularCallsAmount,
        debounceCallsAmount,
        throttleCallsAmount,
    } = useContextValues(ResultsControllerContext);
    const setUseResults = useContextSetValues(ResultsControllerContext);

    const { active: useTimeline} = useContextValues(TimelineControllerContext);
    const setUseTimeline = useContextSetValues(TimelineControllerContext);

    const [showTimer, setShowTimer] = useState(true);

    const resetHandler = (_event: MouseEvent<HTMLButtonElement>) => {
        setUseResults({ 
            key: 'regularCallsAmount', 
            value: 0,
        });
        setUseResults({ 
            key: 'debounceCallsAmount', 
            value: 0,
        });
        setUseResults({ 
            key: 'throttleCallsAmount', 
            value: 0,
        });
        setUseTimeline({
            key: 'points',
            value: []
        })
        resetTimer();
        setShowTimer(false);
    }

    const toggleTimeline = (_event: React.MouseEvent<HTMLButtonElement>) => {
        setUseTimeline({
            key: 'active',
            value: !useTimeline,
        });   
    }

    return <div className="ResultsController">
        <p className="header"> Calls amount </p>
        <div className="row">
            <div className="section debounce">
                <TransitionItem
                    className='transition-item'
                    mounted={ useDebounce }
                    shouldTransitionOnMount
                    shouldTransitionOnUnmount
                    initialStyles={ INITIAL_STYLES }
                    mountTransition={ MOUNT_TRANSITION }
                    unmountTransition={ UNMOUNT_TRANSITION }
                >
                        <p className="name">Debounce</p>
                        <p className="value">{ debounceCallsAmount }</p>
                        {/* { showTimer &&<CircularTimer totalTime={ 5000 } stepTime={ 1000 } remainingTime={ remainingTime } showRemainingTime/> } */}
                </TransitionItem>
                <TransitionItem
                    className='transition-item'
                    mounted={ !useDebounce }
                    shouldTransitionOnMount
                    shouldTransitionOnUnmount
                    initialStyles={ INITIAL_STYLES }
                    mountTransition={ MOUNT_TRANSITION }
                    unmountTransition={ UNMOUNT_TRANSITION }
                >
                        <p className="name disabled">Debounce</p>
                        <FontAwesomeIcon className="icon disabled" icon={faXmarkCircle} />
                </TransitionItem>
            </div>
            <div className="section regular">
                <p className="name">Regular</p>
                <p className="value">{ regularCallsAmount }</p>
            </div>
            <div className="section throttle">
                <TransitionItem
                    className='transition-item'
                    mounted={ useThrottle }
                    shouldTransitionOnMount
                    shouldTransitionOnUnmount
                    initialStyles={ INITIAL_STYLES }
                    mountTransition={ MOUNT_TRANSITION }
                    unmountTransition={ UNMOUNT_TRANSITION }
                >
                        <p className="name">Throttle</p>
                        <p className="value">{ throttleCallsAmount }</p>
                </TransitionItem>
                <TransitionItem
                    className='transition-item'
                    mounted={ !useThrottle }
                    shouldTransitionOnMount
                    shouldTransitionOnUnmount
                    initialStyles={ INITIAL_STYLES }
                    mountTransition={ MOUNT_TRANSITION }
                    unmountTransition={ UNMOUNT_TRANSITION }
                >
                        <p className="name disabled">Throttle</p>
                        <FontAwesomeIcon className="icon disabled" icon={faXmarkCircle} />
                </TransitionItem>
            </div>
        </div>
        <div className="buttons-wrapper">
            <button className="reset-button" onClick={ resetHandler }> Reset Results </button>
            <button className="toggle-timeline-button" onClick={ toggleTimeline }> Toggle Timeline </button>
        </div>
    </div>
}

export default ResultsController;