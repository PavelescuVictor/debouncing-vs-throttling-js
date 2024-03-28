//@ts-nocheck
import {
    useEffect,
    useRef,
} from 'react';
import { 
    TimelineProps,
} from './Timeline.types';
import { useContext } from '@/utils/store/helpers/useContext';
import { TimelineControllerContext } from '@/storeSlices/TimelineControllerSlice/TimelineControllerSlice'
import {
    ITimelineItem,
    DebounceTimelinePointType, 
    ThrottleTimelinePointType
} from '@/storeSlices/TimelineControllerSlice/TimelineControllerSlice.types';
import TransitionItem from '@/utils/transition/TransitionItem';
import './Timeline.css';
import { useForceUpdate } from '@/hooks/useForceUpdate';

interface TimelineItemType {
    index: number;
    type: DebounceTimelinePointType | ThrottleTimelinePointType
    message: string;
}

const MAX_VERTICAL_ITEMS = 5;
const MIN_SIZE = 50 // percentage
const INITIAL_STYLES = {
    opacity: '0',
}
const MOUNT_TRANSITION = {
    duration: 500,
    transitionStyles: {
        opacity: '1',
        transitionProperty: 'opacity',
        transitionDuration: '0.5s',
        transitionTimingFunction: 'ease-in-out',
    }
}
const UNMOUNT_TRANSITION = {
    duration: 500,
    transitionStyles: {
        opacity: '0',
        transitionProperty: 'opacity',
        transitionDuration: '0.5s',
        transitionTimingFunction: 'ease-in-out',
    }
}

const TimelineItem = (props: TimelineItemType) => {
    const {
        index,
        type,
        message,
    } = props;

    return  <span key={ index }className={`cell ${ type.toLowerCase() }`}>
        <div className="type">{ type.toLowerCase() }</div>
        <div className="body">{ message }</div>
    </span>
}

const Timeline = (props: TimelineProps) => {
    const { 
        className = '',
     } = props;

     const timelineItems = useRef<Array<any>>([]);
     const forceUpdate = useForceUpdate();

     const {
        state: {
            points: timelinePoints,
        },
        setState: setTimelinePoints,
    } = useContext(TimelineControllerContext);

     useEffect(() => {
        if (!timelinePoints.length || timelinePoints.length === timelineItems.current.length) {
            return;
        }
        updateCells();
     }, [timelinePoints])

    const cleanCells = () => {
        timelineItems.current = timelineItems.current.filter(item => item.isMounted);
    }

    const updateCells = () => {
        timelineItems.current = timelinePoints.map((item, index) => {
            const leftOffsetPosition = timelinePoints.length - index;
            const isMounted = leftOffsetPosition <= MAX_VERTICAL_ITEMS;
            const withinBounds =  timelinePoints.length <= MAX_VERTICAL_ITEMS;
            const numberOfSteps = withinBounds ? timelinePoints.length : MAX_VERTICAL_ITEMS;
            const sizeStepAmount = (100 - MIN_SIZE) / numberOfSteps;
            const size = isMounted ? 100 - leftOffsetPosition * sizeStepAmount : MIN_SIZE
            return {
                isMounted,
                ...item,
                size,
            }
        })
        forceUpdate();
    }

    const viewingAreaRef = useRef<HTMLDivElement | null | number>(-1);
    
    const computeCells = () => {
        let computedItems: Array<JSX.Element> = [];
        if (!timelineItems || !timelineItems.current.length || !viewingAreaRef.current || viewingAreaRef.current === -1) {
            return;
        }
        timelineItems.current.forEach((item: ITimelineItem<DebounceTimelinePointType | ThrottleTimelinePointType>, index: number) => {
            computedItems.push(
                <TransitionItem
                    className="transition-item"
                    key={item.id}
                    mounted={item.isMounted}
                    shouldTransitionOnMount
                    shouldTransitionOnUnmount
                    onEndUnmountTransitionCallback={() => {
                        // setTimelinePoints({
                        //     key: 'points',
                        //     value: [
                        //         ...timelinePoints.slice(1),
                        //     ]
                        // })
                        // cleanCells();
                    }}
                    initialStyles={{
                        ...INITIAL_STYLES,
                        height: (viewingAreaRef.current as HTMLDivElement).offsetWidth / 2 / MAX_VERTICAL_ITEMS,
                        width: (viewingAreaRef.current as HTMLDivElement).offsetWidth / 2 / MAX_VERTICAL_ITEMS,
                        // padding: (viewingAreaRef.current as HTMLDivElement).offsetHeight - (item.size / 100 * (viewingAreaRef.current as HTMLDivElement).offsetHeight)
                    }}
                    mountTransition={MOUNT_TRANSITION}
                    unmountTransition={UNMOUNT_TRANSITION}
                >
                    <TimelineItem index={index} type={item.type} message={item.id}/>
                </TransitionItem>);
        })
        return computedItems;
    }

    const isViewingAreaMounted = viewingAreaRef.current && viewingAreaRef.current !== -1;
    const itemWidth = isViewingAreaMounted ? (viewingAreaRef.current as HTMLDivElement).offsetWidth / 2 / MAX_VERTICAL_ITEMS : 0;
    const itemHeight = itemWidth;
    const renderAreaStyles = {
        ...isViewingAreaMounted && {
            width: itemWidth,
            height: itemHeight
        }
    };

    const itemListStyles = {
        ...(isViewingAreaMounted && timelineItems.current.length) && {
            height: itemHeight,
            left:  - Math.floor((timelineItems.current.length - 1) * itemWidth),
            transition: 'left 0.5s ease-in-out'
        }
    };

    const viewingAreaStyles = {
        height: itemHeight
    }

    if (!timelineItems.current.length) {
        return <div className={`Timeline ${className} no-items`}>
            <span className="call-pulse"/>
            <div className='message'>Waiting for calls</div>
            <span className="call-pulse"/>
        </div>
    }

    return <div className={`Timeline ${className}`}>
        <div 
            className="viewing-area" 
            ref={(instance) => {
                if (instance)
                viewingAreaRef.current = instance}
            }
            style={viewingAreaStyles}
        >
            <div className="render-area" style={renderAreaStyles}>
                <div className="items-list" style={itemListStyles}>
                    { computeCells() }
                </div>
            </div>
        </div>
    </div>
}

export default Timeline;