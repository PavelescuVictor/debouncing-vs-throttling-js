import {
    ThrottleSettings as Settings,
    AdvanceSections,
} from '../../AdvanceController.types';
import {
    ThrottleStateSettings,
    SelectedSetting
} from '@/storeSlices/AdvanceControllerSlice/AdvanceControllerSlice.types';

export interface IThrottleSettingsProps {
    isActive: boolean,
    settings: ThrottleStateSettings,
    selectedSetting: SelectedSetting,
    onMouseOver: (_event: React.MouseEvent<HTMLDivElement>) => void;
    onMouseOut: (_event: React.MouseEvent<HTMLDivElement>) => void;
    onChoose: (section: AdvanceSections.THROTTLE, setting: Settings) => React.MouseEventHandler<HTMLDivElement> | undefined;
    onChange: (section: AdvanceSections.THROTTLE, setting: Settings) => React.ChangeEventHandler<HTMLInputElement> | undefined;
}