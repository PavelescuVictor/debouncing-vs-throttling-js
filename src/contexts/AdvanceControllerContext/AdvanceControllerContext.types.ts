import {
    AdvanceSections,
    DebounceSettings,
    ThrottleSettings,
} from '../../components/DebounceThrottle/components/AdvanceController/AdvanceController.types'

export interface SelectedSetting {
    sectionType: AdvanceSections
    settingType: DebounceSettings | ThrottleSettings
}

export interface IInitialContextState {
    visible: boolean
    selectedSetting: SelectedSetting | null
}
