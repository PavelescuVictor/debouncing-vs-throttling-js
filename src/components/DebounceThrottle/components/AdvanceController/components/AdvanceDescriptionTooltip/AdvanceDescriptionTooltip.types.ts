import {
    AdvanceSections,
    DebounceSettings,
    ThrottleSettings,
} from '../../AdvanceController.types';

export interface IAdvanceDescriptionProps {
    sectionType: AdvanceSections,
    settingType: DebounceSettings | ThrottleSettings,
    showTooltip: boolean,
}