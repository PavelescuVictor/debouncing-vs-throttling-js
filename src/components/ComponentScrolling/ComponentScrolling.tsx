import { ChangeEvent, useEffect, useRef, useCallback } from 'react';
import './ComponentScrolling.css';
import { useDebounceFunc } from '../../utils/debounce/debounceService';

const ComponentScrolling = () => {
    const useDebounce = useRef(false);
    const hasEventListener = useRef(false);
    const scrollHandler = (message: string) => {
        console.log(message);
    };
    const [debouncedScrollHandler] = useDebounceFunc(scrollHandler, 5000);

    const listenerAction = useCallback(() => {
        if (useDebounce.current) { 
            return debouncedScrollHandler;
        }
        return scrollHandler;
    }, [useDebounce.current]);

    useEffect(() => {
        console.log("here");
        if (hasEventListener.current) {
            window.removeEventListener('scroll', () => { listenerAction()("Scrolling") });
        }
        window.addEventListener('scroll',  () => { listenerAction()("Scrolling") });
        hasEventListener.current = true;

        return () => {
            window.removeEventListener('scroll', () => { listenerAction()("Scrolling") });
        }
    }, [])

    const onCheckboxChange = (_event: ChangeEvent<HTMLInputElement>) => {
        useDebounce.current = !useDebounce.current;
    }

    return <div className="ComponentScrolling" >
        <div className="debounce-checkbox-wrapper">
            <input className="debounce-checkbox-input" type="checkbox" onChange={onCheckboxChange}/>
            <label className="debounce-checkbox-label" htmlFor="debounce-checkbox-label">Debounce?</label>
        </div>
        <div className="scroll-component">
            Scroll
        </div>
    </div>
}

export default ComponentScrolling;