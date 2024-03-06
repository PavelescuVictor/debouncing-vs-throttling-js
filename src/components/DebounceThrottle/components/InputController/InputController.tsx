import {
    useRef,
    ChangeEvent,
    MouseEvent,
} from 'react';
import {
    AdvanceControllerContext,
    DebounceControllerContext,
    ThrottleControllerContext,
    ResultsControllerContext,
} from '@/contexts';
import {
    useContext
} from '@/providers/ContextProvider/ContextProvider';
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
    const {
        state: {
            visible: useAdvance
        },
        setState: setAdvanceState
    } = useContext(AdvanceControllerContext);
    const {
        state: {
            active: useDebounce
        },
    } = useContext(DebounceControllerContext);
    const {
        state: {
            active: useThrottle
        },
    } = useContext(ThrottleControllerContext);
    const {
        state: {
            regularCallsAmount,
            debounceCallsAmount,
            throttleCallsAmount,
        },
        setState: setResultsState
    } = useContext(ResultsControllerContext);
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
    };
    const [debounceHandleOnChange] = useDebounceCallback(handleOnDebounceChange, { debounceTime: DEBOUNCE_TIME });

    const handleOnThrottleChange = (throttleCallsAmount: number) => {
        setResultsState({ 
            key: 'throttleCallsAmount', 
            value: throttleCallsAmount + 1 
        });
    };
    const [throttleHandleOnChange] = useThrottleCallback(handleOnThrottleChange, { throttleTime: THROTTLE_TIME });

    const onChangeCallback = (_event: ChangeEvent<HTMLInputElement>) => {
        setResultsState({ 
            key: 'regularCallsAmount', 
            value: regularCallsAmount + 1 
        });

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
            resetTimer();
        }
    }

    return <div className="InputController">
        <button className="advance-toggle" onClick={ advanceToggle }> Settings </button>
        <input className="input" name="input" id="input" type='search' placeholder='Write something here' onChange={onChangeCallback} ref={setInputRef}/>
        <button className="input-clear" onClick={ clearHandler }> Clear </button>
    </div>
}

export default InputController;