export enum AdvanceSections {
    DEBOUNCE = 'debounce',
    THROTTLE = 'throttle',
}

export enum DebounceSettings {
    DEBOUNCE_TIME = 'debounceTime',
    MAX_WAIT_TIME = 'maxWaitTime',
    MAX_WAIT_CALLS = 'maxWaitCalls',
    LEADING = 'leading',
    TRAILING = 'trailing',
}

export enum ThrottleSettings {
    THROTTLE_TIME = 'throttleTime',
    MAX_WAIT_TIME = 'maxWaitTime',
    MAX_WAIT_CALLS = 'maxWaitCalls',
    LEADING = 'leading',
    TRAILING = 'trailing',
}

export type SettingsTypes = DebounceSettings | ThrottleSettings;