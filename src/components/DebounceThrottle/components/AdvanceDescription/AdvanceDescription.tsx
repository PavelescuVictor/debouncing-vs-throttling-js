import { IAdvanceDescriptionProps } from './AdvanceDescription.types';
import './AdvanceDescription.css';

const AdvanceDescription = (props: IAdvanceDescriptionProps) => {
    const {
        sectionType,
        settingType,
        description,
    } = props;

    return  <div className="advance-description-wrapper">
        <div className="advance-panel">
            <div className="setting">{ sectionType }</div>
            <div className="setting">{ settingType }</div>
            <div className="divider"/>
            { description && <div className="description">{ description }</div> }
        </div>
    </div> 
}

export default AdvanceDescription;