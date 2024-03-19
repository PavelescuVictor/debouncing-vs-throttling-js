import { 
    TimelineProps,
    TimelineItem,
    DebounceTimelinePointType, 
    ThrottletimelinePointType
} from './Timeline.types';
import './Timeline.css';

const Timeline = (props: TimelineProps<DebounceTimelinePointType | ThrottletimelinePointType>) => {
    const { 
        className = '',
        items,
     } = props;
     
    const computeCells = () => {
        let timelineItems: Array<JSX.Element> = [];
        if (!items || !items.length) {
            return;
        }
        items.forEach((item: TimelineItem<DebounceTimelinePointType | ThrottletimelinePointType>, index: number) => {
            const type = item.type;
            timelineItems.push(<span key={ index }className={`cell ${ type.toLowerCase() }`}>
                <div className="type">{ type.toLowerCase() }</div>
                <div className="body"/>
            </span>);
        })
        return timelineItems;
    }

    return <div className={`Timeline ${className}`}>
        { computeCells() }
    </div>
}

export default Timeline;