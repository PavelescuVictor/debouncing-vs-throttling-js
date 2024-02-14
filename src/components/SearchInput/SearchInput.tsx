import { ChangeEvent, useRef } from 'react';
import './SearchInput.css';
import { useDebounceFunc } from '../../utils/debounce/debounceService';

const SearchInput = () => {
    const useDebounce = useRef(false);
    const handleOnChange = (message: string) => {
        console.log(message);
    };
    const [debounceHandleOnChange] = useDebounceFunc(handleOnChange, { debounceTime: 5000 });

    const onChangeCallback = (_event: ChangeEvent<HTMLInputElement>) => {
        if (useDebounce.current) {
            debounceHandleOnChange("API Call");
        } else {
            handleOnChange("API Call");
        }
    };

    const onCheckboxChange = (_event: ChangeEvent<HTMLInputElement>) => {
        useDebounce.current = !useDebounce.current;
    }

    return <div className="SearchInput">
        <div className="debounce-checkbox-wrapper">
            <input className="debounce-checkbox-input" type="checkbox" onChange={onCheckboxChange}/>
            <label className="debounce-checkbox-label" htmlFor="debounce-checkbox-label">Debounce?</label>
        </div>
        <input className="input" type='search' placeholder='Write something here' onChange={onChangeCallback}/>
    </div>
}

export default SearchInput;