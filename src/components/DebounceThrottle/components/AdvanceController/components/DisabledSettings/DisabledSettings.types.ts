import {
    AdvanceSections,
} from '@/components/DebounceThrottle/components/AdvanceController/AdvanceController.types';

export interface IDisabledSettingsProps {
    sectionType: AdvanceSections.DEBOUNCE | AdvanceSections.THROTTLE;
}