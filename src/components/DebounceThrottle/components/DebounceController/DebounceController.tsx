import { 
    debounceService, 
} from '../../../../utils';

const useDebounceCallback = debounceService.useDebounceCallback;

const DebounceController = () => {

    const handleOnDebounceChange = (debounceCallsAmount: number) => {
        setDebounceCallsAmount(debounceCallsAmount + 1);
    };
    const [debounceHandleOnChange] = useDebounceCallback(handleOnDebounceChange, { debounceTime: 5000 });
    
    return <div className="DebounceController"></div>
}

export default DebounceController;