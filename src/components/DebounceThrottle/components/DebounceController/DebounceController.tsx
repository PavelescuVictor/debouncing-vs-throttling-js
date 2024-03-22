import { 
    debounceService, 
} from '../../../../utils';

const useDebounceCallback = debounceService.useDebounceCallback;

const DebounceController = () => {

    const handleOnDebounceChange = (_debounceCallsAmount: number) => {
    };
    const [_debounceHandleOnChange] = useDebounceCallback(handleOnDebounceChange, { debounceTime: 5000 });
    
    return <div className="DebounceController"></div>
}

export default DebounceController;