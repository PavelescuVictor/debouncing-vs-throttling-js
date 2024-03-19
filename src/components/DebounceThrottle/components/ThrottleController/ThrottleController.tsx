import { 
    throttleService 
} from '../../../../utils';

const useThrottleCallback = throttleService.useThrottleCallback;

const ThrottleController = () => {
    const handleOnThrottleChange = (throttleCallsAmount: number) => {
        setThrottleCallsAmount(throttleCallsAmount + 1);
    };
    const [throttleHandleOnChange] = useThrottleCallback(handleOnThrottleChange, { throttleTime: 2000 });

    return <div className="ThrottleController"></div>
}

export default ThrottleController;