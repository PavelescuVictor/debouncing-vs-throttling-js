import {
    AdvanceSections,
    DebounceSettings,
    ThrottleSettings,
} from '../../AdvanceController.types';

export interface IAdvanceDescriptionProps {
    sectionType: AdvanceSections,
    settingType: DebounceSettings | ThrottleSettings,
    showTooltip: boolean,
    handleCloseDescription: () => void,
    handleCloseTooltip: () => void,
}

export type IDescriptions<T extends string> = {
    [key in T]: string;
};

export type IHeaders<T extends string> = {
    [key in T]: string;
};