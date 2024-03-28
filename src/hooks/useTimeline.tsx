import {
    useState
} from 'react';

const useTimeline = <T extends unknown>(props: any = {}) => {
    const {
        MAX_TIMELINE_POINTS = 10,
    } = props;
    const [timeline, setTimeline] = useState<Array<T>>([]);
    
    const addPoint = (point: T) => {
        if (timeline.length >= MAX_TIMELINE_POINTS) {
            const auxTimeline = [...timeline];
            auxTimeline.shift();
            auxTimeline.push(point);
            setTimeline(auxTimeline);
        } 
        setTimeline((prevState: T[]) => [...prevState, point]);
    }

    const removePoint = () => {
        if (timeline.length === 0) {
            return;
        } 
        const auxTimeline = [...timeline];
        auxTimeline.unshift();
        setTimeline(auxTimeline);
    }

    return [timeline, { addPoint, removePoint }] as [Array<T>, { addPoint: (point: T) => void, removePoint: () => void }];
}

export default useTimeline