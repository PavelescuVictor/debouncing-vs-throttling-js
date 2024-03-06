export enum AdvanceSections {
    DEBOUNCE = 'debounce',
    THROTTLE = 'throttle',
}

export enum DebounceSettings {
    DEBOUNCE_TIME = 'debounce-time',
    MAX_WAIT_TIME = 'max-wait-time',
    MAX_WAIT_CALLS = 'max-wait-calls',
    LEADING = 'leading',
    TRAILING = 'trailing',
}

export enum ThrottleSettings {
    THROTTLE_TIME = 'throttle-time',
    MAX_WAIT_TIME = 'max-wait-time',
    MAX_WAIT_CALLS = 'max-wait-calls',
    LEADING = 'leading',
    TRAILING = 'trailing',
}

export type SettingsTypes = DebounceSettings | ThrottleSettings;

export interface IAdavanceState {
    [AdvanceSections.DEBOUNCE]: {
        [DebounceSettings.DEBOUNCE_TIME]: number | null,
        [DebounceSettings.MAX_WAIT_TIME]: number | null;
        [DebounceSettings.MAX_WAIT_CALLS]: number | null;
        [DebounceSettings.LEADING]: boolean;
        [DebounceSettings.TRAILING]: boolean;
    };
    [AdvanceSections.THROTTLE]: {
        [ThrottleSettings.THROTTLE_TIME]: number | null;
        [ThrottleSettings.MAX_WAIT_TIME]: number | null;
        [ThrottleSettings.MAX_WAIT_CALLS]: number | null;
        [ThrottleSettings.LEADING]: boolean;
        [ThrottleSettings.TRAILING]: boolean;
    };
}