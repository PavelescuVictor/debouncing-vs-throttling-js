import {
    useRef,
    ChangeEvent,
    MouseEvent,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGear,
    faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { AdvanceControllerContext } from '@/storeSlices/AdvanceControllerSlice/AdvanceControllerSlice';
import { DebounceControllerContext } from '@/storeSlices/DebounceControllerSlice/DebounceControllerSlice';
import { ThrottleControllerContext } from '@/storeSlices/ThrottleControllerSlice/ThrottleControllerSlice';
import { ResultsControllerContext } from '@/storeSlices/ResultsControllerSlice/ResultsControllerSlice';
import { TimelineControllerContext } from '@/storeSlices/TimelineControllerSlice/TimelineControllerSlice'
import {
    DebounceTimelinePointType,
    ThrottleTimelinePointType,
    RegularTimelinePointType,
} from '@/storeSlices/TimelineControllerSlice/TimelineControllerSlice.types';
import {
    useContextValues,
    useContextSetValues,
} from '@/utils/store/helpers/useContext';
import { 
    debounceService, 
    throttleService,
} from '@/utils';
import './InputController.css';

const useDebounceCallback = debounceService.useDebounceCallback;
const useThrottleCallback = throttleService.useThrottleCallback;

const DEBOUNCE_TIME = 5000;
const THROTTLE_TIME = 2000;

interface IInputControllerProps {
    startTimer: () => void;
    resetTimer: () => void;
}

const InputController = (props: IInputControllerProps) => {
    const {
        startTimer,
        resetTimer,
    } = props;

    const { visible: useAdvance } = useContextValues(AdvanceControllerContext);
    const setAdvanceState = useContextSetValues(AdvanceControllerContext);
    const { active: useDebounce } = useContextValues(DebounceControllerContext);
    const { active: useThrottle } = useContextValues(ThrottleControllerContext);
    const { 
        regularCallsAmount,
        debounceCallsAmount,
        throttleCallsAmount,
    } = useContextValues(ResultsControllerContext);
    const setResultsState = useContextSetValues(ResultsControllerContext);
    const { points: timelinePoints } = useContextValues(TimelineControllerContext);
    const setTimelineState = useContextSetValues(TimelineControllerContext);

    const inputRef = useRef<HTMLInputElement>();
    const setInputRef = (instance: HTMLInputElement ) => {
        if (!instance) {
            return;
        }
        inputRef.current = instance;
    }

    const handleOnDebounceChange = (debounceCallsAmount: number) => {
        setResultsState({ 
            key: 'debounceCallsAmount', 
            value: debounceCallsAmount + 1 
        });
        setTimelineState({
            key: 'points',
            value: [
                ...timelinePoints,
                {
                    id: Math.random().toString(16).slice(2),
                    type: DebounceTimelinePointType.DEBOUNCE,
                }
            ]
        })
    };
    const [debounceHandleOnChange] = useDebounceCallback(handleOnDebounceChange, { debounceTime: DEBOUNCE_TIME });

    const handleOnThrottleChange = (throttleCallsAmount: number) => {
        setResultsState({ 
            key: 'throttleCallsAmount', 
            value: throttleCallsAmount + 1 
        });
        setTimelineState({
            key: 'points',
            value: [
                ...timelinePoints,
                {
                    id: Math.random().toString(16).slice(2),
                    type: ThrottleTimelinePointType.THROTTLE,
                }
            ]
        })
    };
    const [throttleHandleOnChange] = useThrottleCallback(handleOnThrottleChange, { throttleTime: THROTTLE_TIME });

    const onChangeCallback = (_event: ChangeEvent<HTMLInputElement>) => {
        setResultsState({ 
            key: 'regularCallsAmount', 
            value: regularCallsAmount + 1 
        });
        setTimelineState({
            key: 'points',
            value: [
                ...timelinePoints,
                {
                    id: Math.random().toString(16).slice(2),
                    type: RegularTimelinePointType.REGULAR,
                }
            ]
        })

        if (useDebounce) {
            debounceHandleOnChange(debounceCallsAmount, "Debounce Call");
            startTimer();
        } 
        
        if (useThrottle) {
            throttleHandleOnChange(throttleCallsAmount, "Throttle Call");
        }
    };

    const advanceToggle = (_event: MouseEvent<HTMLButtonElement>) => {
        setAdvanceState({
            key: 'visible',
            value: !useAdvance
        });
    }

    const clearHandler = (_event: MouseEvent<HTMLButtonElement>) => {
        if (inputRef.current) {
            inputRef.current.value = "";
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
            setTimelineState({
                key: 'points',
                value: []
            })
            resetTimer();
        }
    }

    return <div className="InputController">
        <button className="advance-toggle" onClick={ advanceToggle }>
            <FontAwesomeIcon className="icon" icon={faGear} />
            <p className="name">Settings</p>
        </button>
        <input className="input" name="input" id="input" type='search' placeholder='Write something here' onChange={onChangeCallback} ref={setInputRef}/>
        <button className="input-clear" onClick={ clearHandler }>
            <FontAwesomeIcon className="icon" icon={faTrash} />
            <p className="name">Clear</p>
        </button>
    </div>
}

export default InputController;