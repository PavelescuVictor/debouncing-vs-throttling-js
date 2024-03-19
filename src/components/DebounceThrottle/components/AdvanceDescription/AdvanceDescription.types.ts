import {
    AdvanceSections,
    DebounceSettings,
    ThrottleSettings,
} from '../AdvanceController/AdvanceController.types';

export interface IAdvanceDescriptionProps {
    sectionType: AdvanceSections,
    settingType: DebounceSettings | ThrottleSettings,
    description?: string,
}