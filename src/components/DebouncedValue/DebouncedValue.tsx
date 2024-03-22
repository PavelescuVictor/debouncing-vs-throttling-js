import { ChangeEvent, useState } from 'react';
import './DebouncedValue.css';
import { useDebounceValue } from '../../utils/debounce/debounceService';

const DEFAULT_DEBOUNCE_TIME = 5000;

const DebouncedValue = () => {
    const [value, setValue] = useState('');
    const [debouncedValue] = useDebounceValue(value, { debounceTime: DEFAULT_DEBOUNCE_TIME });
    
    const onChangeCallback = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("On Change Call");
        setValue(event.target.value);
    };

    return <div className="DebouncedValue">
        <input className="input" type='search' placeholder='Write something here' onChange={onChangeCallback}/>
        <div className="debounced-value">
            <span className="label">Value: </span>
            { debouncedValue }
        </div>
    </div>
}

export default DebouncedValue;