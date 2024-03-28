import { IDisabledSettingsProps } from './DisabledSettings.types';
import './DisabledSettings.css';

const DisabledSettings = (props: IDisabledSettingsProps) => {
    const {
        sectionType
    } = props;

    return <div className="DisabledSettings">
        Enable <b>{ sectionType }</b> to access settings
    </div>
}

export default DisabledSettings;