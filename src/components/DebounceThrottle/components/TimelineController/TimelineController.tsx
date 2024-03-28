// import {
//     useEffect,
// } from 'react';
import { TransitionItem } from '@/utils/transition';
// import { 
//     useContextValues,
// } from '@/utils/store/helpers/useContext';
// import { 
//     TimelineItem, 
//     RegularTimelinePointType,
//     DebounceTimelinePointType,
//     ThrottleTimelinePointType,
// } from '@/storeSlices/TimelineControllerSlice/TimelineControllerSlice.types';
import { ITimelineControllerProps } from './TimelineController.types'
import {
    useContextValues,
    useContextSetValues,
} from '@/utils/store/helpers/useContext';
import { TimelineControllerContext } from '@/storeSlices/TimelineControllerSlice/TimelineControllerSlice';
import { Timeline } from './components';
import { Panel } from '@/components/DebounceThrottle/components';
import {
    INITIAL_STYLES,
    MOUNT_TRANSITION,
    UNMOUNT_TRANSITION,
} from './constants';
import './TimelineController.css';

const TimelineController = (_props: ITimelineControllerProps) => {
    // const {
    //     state: {
    //         points: timelinePoints,
    //     },
    // } = useContext(TimelineControllerContext);

    // const [debounceItems, { addPoint: addDebouncePoint }] = useTimeline<TimelineItem<DebounceTimelinePointType | RegularTimelinePointType>>();
    // const [throttleItems, { addPoint: addThrottlePoint }] = useTimeline<TimelineItem<ThrottleTimelinePointType | RegularTimelinePointType>>();

    // const setIntervalFunc = () => {
    //     setInterval(() => {
    //         const valuesDebounce = [
    //             {
    //                 type: RegularTimelinePointType.REGULAR 
    //             },
    //             {
    //                 type: DebounceTimelinePointType.DEBOUNCE 
    //             },
    //             {
    //                 type: DebounceTimelinePointType.LEADING 
    //             },
    //             {
    //                 type: DebounceTimelinePointType.TRAILING 
    //             },
    //         ]

    //         const valuesThrottle = [
    //             {
    //                 type: RegularTimelinePointType.REGULAR 
    //             },
    //             {
    //                 type: ThrottleTimelinePointType.THROTTLE 
    //             },
    //             {
    //                 type: ThrottleTimelinePointType.LEADING 
    //             },
    //             {
    //                 type: ThrottleTimelinePointType.TRAILING 
    //             },
    //         ]
    //         if (debounceItems.length > 10 || throttleItems.length > 10) {
    //             return;
    //         } 
    //         addDebouncePoint(valuesDebounce[Math.floor(Math.random() * 10 / 3)]);
    //         addThrottlePoint(valuesThrottle[Math.floor(Math.random() * 10 / 3)]);
    //     }, 5000)
    // }

    // useEffect(() => {
    //     if (!active) {
    //         return;
    //     }
    //     console.log(timelinePoints);
    //     // setIntervalFunc();
    // }, [active, timelinePoints.length])

    const { active: useTimeline} = useContextValues(TimelineControllerContext);
    const setUseTimeline = useContextSetValues(TimelineControllerContext);

    const handleCloseTimeline = () => {
        setUseTimeline({
            key: 'active',
            value: !useTimeline,
        })
    }

    return <div className="TimelineController">
        <TransitionItem
            mounted={ useTimeline }
            shouldTransitionOnMount
            shouldTransitionOnUnmount
            mountTransition={ MOUNT_TRANSITION }
            unmountTransition={ UNMOUNT_TRANSITION }
            initialStyles={ INITIAL_STYLES }
        >
            <Panel withCloseButton closeButtonAction={ handleCloseTimeline }>
                <Timeline className="debounce"/>
                {/* <div className="divider horizontal"/> */}
                {/* <Timeline className="throttle" items={throttleItems}/> */}
            </Panel>
        </TransitionItem>
    </div>
}

export default TimelineController;