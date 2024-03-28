import {
    DebounceSettings as Settings,
    AdvanceSections,
} from '../../AdvanceController.types';
import {
    SelectedSetting,
    DebounceStateSettings
} from '@/storeSlices/AdvanceControllerSlice/AdvanceControllerSlice.types';

export interface IDebounceSettingsProps {
    isActive: boolean,
    settings: DebounceStateSettings,
    selectedSetting: SelectedSetting,
    onMouseOver: (_event: React.MouseEvent<HTMLDivElement>) => void;
    onMouseOut: (_event: React.MouseEvent<HTMLDivElement>) => void;
    onChoose: (section: AdvanceSections.DEBOUNCE, setting: Settings) => React.MouseEventHandler<HTMLDivElement> | undefined;
    onChange: (section: AdvanceSections.DEBOUNCE, setting: Settings) => React.ChangeEventHandler<HTMLInputElement> | undefined;
}