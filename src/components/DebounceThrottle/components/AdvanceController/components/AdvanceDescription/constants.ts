import {
    DebounceSettings,
    ThrottleSettings,
} from '../../AdvanceController.types';
import {
    IDescriptions,
    IHeaders,
} from './AdvanceDescription.types'

export const DEBOUNCE_HEADERS: IHeaders<DebounceSettings> = {
    [DebounceSettings.DEBOUNCE_TIME]: "Debounce Time",
    [DebounceSettings.MAX_WAIT_TIME]: "Max Wait Time",
    [DebounceSettings.MAX_WAIT_CALLS]: "Max Wait Calls",
    [DebounceSettings.LEADING]: "Leading",
    [DebounceSettings.TRAILING]: "Trailing",
}

export const THROTTLE_HEADERS: IHeaders<ThrottleSettings> = {
    [ThrottleSettings.THROTTLE_TIME]: "Thrtottle Time",
    [ThrottleSettings.MAX_WAIT_TIME]: "Max Wait Time",
    [ThrottleSettings.MAX_WAIT_CALLS]: "Max Wait Calls",
    [ThrottleSettings.LEADING]: "Leading",
    [ThrottleSettings.TRAILING]: "Trailing",
}

export const DEBOUNCE_DESCRIPTIONS: IDescriptions<DebounceSettings> = {
    [DebounceSettings.DEBOUNCE_TIME]: "Debounce Time Description",
    [DebounceSettings.MAX_WAIT_TIME]: "Max Wait Time Description",
    [DebounceSettings.MAX_WAIT_CALLS]: "Max Wait Calls Description",
    [DebounceSettings.LEADING]: "Leading Description",
    [DebounceSettings.TRAILING]: "Trailing Description",
}

export const THROTTLE_DESCRIPTIONS: IDescriptions<ThrottleSettings> = {
    [ThrottleSettings.THROTTLE_TIME]: "Thrtottle Time Description",
    [ThrottleSettings.MAX_WAIT_TIME]: "Max Wait Time Description",
    [ThrottleSettings.MAX_WAIT_CALLS]: "Max Wait Calls Description",
    [ThrottleSettings.LEADING]: "Leading Description",
    [ThrottleSettings.TRAILING]: "Trailing Description",
}

export const TOOLTIP_INITIAL_STYLES = {
    overflow: 'hidden',
    width: '100%',
    maxHeight: '0px',
}

export const TOOLTIP_MOUNT_TRANSITION = {
    duration: 400,
    transitionStyles: {
        maxHeight: '1000px',
        transition: 'max-height 0.5s ease-in 0.1s',
    }
}

export const TOOLTIP_UNMOUNT_TRANSITION = {
    duration: 400,
    transitionStyles: {
        maxHeight: '0px',
        transition: 'max-height 0.5s ease-out 0s',
    }
}

export const DESCRIPTION_INITIAL_STYLES = {
    overflow: 'hidden',
    width: '100%',
    maxHeight: '0px',
}

export const DESCRIPTION_MOUNT_TRANSITION = {
    duration: 400,
    transitionStyles: {
        maxHeight: '1000px',
        transition: 'max-height 0.5s ease-in 0.1s',
    }
}

export const DESCRIPTION_UNMOUNT_TRANSITION = {
    duration: 400,
    transitionStyles: {
        maxHeight: '0px',
        marginTop: '0px',
        transition: 'max-height 0.5s ease-out 0s',
    }
}