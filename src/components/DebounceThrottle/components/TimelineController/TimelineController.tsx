import {
    useEffect,
} from 'react';
import { useTimeline } from '../../../../hooks';
import { 
    TimelineItem, 
    DebounceTimelinePointType,
    ThrottletimelinePointType,
} from '../Timeline/Timeline.types';
import Timeline from '../Timeline';
import {
    ITimelineControllerProps
} from './TimelineController.types'
import './TimelineController.css';

const TimelineController = (props: ITimelineControllerProps) => {
    const {
        active
    } = props;

    const [debounceItems, { addPoint: addDebouncePoint }] = useTimeline<TimelineItem<DebounceTimelinePointType>>();
    const [throttleItems, { addPoint: addThrottlePoint }] = useTimeline<TimelineItem<ThrottletimelinePointType>>();
    //@ts-ignore
    const setIntervalFunc = () => {
        setInterval(() => {
            const valuesDebounce = [
                {
                    type: DebounceTimelinePointType.REGULAR 
                },
                {
                    type: DebounceTimelinePointType.DEBOUNCE 
                },
                {
                    type: DebounceTimelinePointType.LEADING 
                },
                {
                    type: DebounceTimelinePointType.TRAILING 
                },
            ]

            const valuesThrottle = [
                {
                    type: ThrottletimelinePointType.REGULAR 
                },
                {
                    type: ThrottletimelinePointType.THROTTLE 
                },
                {
                    type: ThrottletimelinePointType.LEADING 
                },
                {
                    type: ThrottletimelinePointType.TRAILING 
                },
            ]
            if (debounceItems.length > 10 || throttleItems.length > 10) {
                return;
            } 
            addDebouncePoint(valuesDebounce[Math.floor(Math.random() * 10 / 3)]);
            addThrottlePoint(valuesThrottle[Math.floor(Math.random() * 10 / 3)]);
        }, 5000)
    }

    useEffect(() => {
        // setIntervalFunc();
    }, [])
    return <div className={ `TimelineController ${ active ? 'opened' : 'closed' }` }>
        <div className="timeline-panel">
            <Timeline className="debounce "items={debounceItems}/>
            <div className="divider horizontal"/>
            <Timeline className="throttle" items={throttleItems}/>
        </div>
    </div>
}

export default TimelineController;