import { 
    ChangeEvent, 
    MouseEvent,
    useState,
    useRef,
} from 'react';
import './SearchInput.css';
import { 
    debounceService, 
    throttleService 
} from '../../utils';
import { CircularTimer } from '..';

const useDebounceCallback = debounceService.useDebounceCallback;
const useThrottleCallback = throttleService.useThrottleCallback;

const SearchInput = () => {
    const inputRef = useRef<HTMLInputElement>();
    const setInputRef = (instance: HTMLInputElement ) => {
        if (!instance) {
            return;
        }
        inputRef.current = instance;
    }

    const [useDebounce, setUseDebounce] = useState(false);
    const [useThrottle, setUseThrottle] = useState(false);

    const [regularCallsAmount, setRegularCallsAmount] = useState(0);
    const [debounceCallsAmount, setDebounceCallsAmount] = useState(0);
    const [throttleCallsAmount, setThrottleCallsAmount] = useState(0);

    const [showTimer, setShowTimer] = useState(false);

    const handleOnDebounceChange = (debounceCallsAmount: number, message: string) => {
        console.log(message);
        setDebounceCallsAmount(debounceCallsAmount + 1);
    };
    const [debounceHandleOnChange] = useDebounceCallback(handleOnDebounceChange, { debounceTime: 5000 });

    const handleOnThrottleChange = (throttleCallsAmount: number, message: string) => {
        console.log(message);
        setThrottleCallsAmount(throttleCallsAmount + 1);
    };
    const [throttleHandleOnChange] = useThrottleCallback(handleOnThrottleChange, { throttleTime: 2000 });

    const onChangeCallback = (_event: ChangeEvent<HTMLInputElement>) => {
        setRegularCallsAmount(regularCallsAmount + 1);

        if (useDebounce) {
            debounceHandleOnChange(debounceCallsAmount, "Debounce Call");
            setShowTimer(true);
        } 
        if (useThrottle) {
            throttleHandleOnChange(throttleCallsAmount, "Throttle Call");
        }
    };

    const onDebounceCheckboxChange = (_event: ChangeEvent<HTMLInputElement>) => {
        setUseDebounce(!useDebounce);
    }

    const onThrottleCheckboxChange = (_event: ChangeEvent<HTMLInputElement>) => {
        setUseThrottle(!useThrottle)
    }

    const clearHandler = (_event: MouseEvent<HTMLButtonElement>) => {
        if (inputRef.current) {
            inputRef.current.value = "";
            setRegularCallsAmount(0);
            setDebounceCallsAmount(0);
            setThrottleCallsAmount(0);
        }
    }

    const resetHandler = (_event: MouseEvent<HTMLButtonElement>) => {
        setRegularCallsAmount(0);
        setDebounceCallsAmount(0);
        setThrottleCallsAmount(0);
    }

    return <div className="SearchInput">
        <div className="title">
            <span> Debounce </span>
            <span> - VS - </span>
            <span> Throttle </span>
        </div>
        <div className="checkboxes-wrapper">
            <div className="checkbox-wrapper">
                <label className="checkbox-label" htmlFor="debounce"> Debounce </label>
                <input className="checkbox-input debounce" type="checkbox" onChange={ onDebounceCheckboxChange }/>
            </div>
            <div className="checkbox-wrapper">
                <label className="checkbox-label" htmlFor="throttle"> Throttle </label>
                <input className="checkbox-input throttle" type="checkbox" onChange={ onThrottleCheckboxChange }/>
            </div>
        </div>
        <div className="input-wrapper">
            <input className="input" type='search' placeholder='Write something here' onChange={ onChangeCallback } ref={ setInputRef }/>
            <button className="input-clear" onClick={ clearHandler }> Clear </button>
        </div>
        <div className="results-wrapper">
            <p className="header"> Calls amount </p>
            <div className="row">
                <p> Regular: { regularCallsAmount }</p>
                <div className="debounce">
                    <p> Debounce: { useDebounce ? debounceCallsAmount : 'Inactive' } </p>
                    <CircularTimer totalTime={ 5000 } showRemainingTime/>
                </div>
                <p> Throttle: { useThrottle ? throttleCallsAmount : 'Inactive' }</p>
            </div>
            <button className="reset-button" onClick={ resetHandler }> Reset Results </button>
        </div>
    </div>
}

export default SearchInput;