import { 
    throttleService 
} from '../../../../utils';

const useThrottleCallback = throttleService.useThrottleCallback;

const ThrottleController = () => {
    const handleOnThrottleChange = (_throttleCallsAmount: number) => {
    };
    const [_throttleHandleOnChange] = useThrottleCallback(handleOnThrottleChange, { throttleTime: 2000 });

    return <div className="ThrottleController"></div>
}

export default ThrottleController;