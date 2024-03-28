import { IAdvanceDescriptionProps } from './AdvanceDescriptionTooltip.types';
import {
    DebounceSettings,
    ThrottleSettings,
    AdvanceSections,
} from '@/components/DebounceThrottle/components/AdvanceController/AdvanceController.types';
import './AdvanceDescriptionTooltip.css';

type IDescriptions<T extends string> = {
    [key in T]: string;
};

const DEBOUNCE_DESCRIPTIONS: IDescriptions<DebounceSettings> = {
    [DebounceSettings.DEBOUNCE_TIME]: "Debounce - Debounce Time Description",
    [DebounceSettings.MAX_WAIT_TIME]: "Debounce - Max Wait Time Description",
    [DebounceSettings.MAX_WAIT_CALLS]: "Debounce - Max Wait Calls Description",
    [DebounceSettings.LEADING]: "Debounce - Leading Description",
    [DebounceSettings.TRAILING]: "Debounce - Trailing Description",
}

const THROTTLE_DESCRIPTIONS: IDescriptions<ThrottleSettings> = {
    [ThrottleSettings.THROTTLE_TIME]: "Thrtottle - Thrtottle Time Description",
    [ThrottleSettings.MAX_WAIT_TIME]: "Thrtottle - Max Wait Time Description",
    [ThrottleSettings.MAX_WAIT_CALLS]: "Thrtottle - Max Wait Calls Description",
    [ThrottleSettings.LEADING]: "Thrtottle - Leading Description",
    [ThrottleSettings.TRAILING]: "Thrtottle - Trailing Description",
}

const DESCRIPTION_NOT_FOUND = "Description not found!";

const AdvanceDescriptionTooltip = (props: IAdvanceDescriptionProps) => {
    const {
        sectionType,
        settingType,
        showTooltip = false,
    } = props;

    const computeDescription = () => {
        let description;
        if (!Object.keys(DEBOUNCE_DESCRIPTIONS).includes(settingType) && !Object.keys(THROTTLE_DESCRIPTIONS).includes(settingType)) {
            description = DESCRIPTION_NOT_FOUND;
        }
        if (sectionType === AdvanceSections.DEBOUNCE) {
            description = DEBOUNCE_DESCRIPTIONS[settingType as DebounceSettings];
        }
        if (sectionType === AdvanceSections.THROTTLE) {
            description = THROTTLE_DESCRIPTIONS[settingType as ThrottleSettings];
        }
        return <>
            <div className="setting">{ sectionType }</div>
            <div className="setting">{ settingType }</div>
            <div className="divider"/>
            <div className="description">{ description }</div>
        </>
    }

    return  <div className="AdvanceDescriptionTooltip">
        <div className="advance-panel">
            { showTooltip && <div className="tooltip">Choose a setting to show description</div> }
            { (!showTooltip && settingType) && computeDescription() }
        </div>
    </div> 
}

export default AdvanceDescriptionTooltip;