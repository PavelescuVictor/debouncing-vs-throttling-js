import {
    AdvanceSections,
    DebounceSettings,
    ThrottleSettings,
} from './AdvanceController.types';

export const advanceSettingToDescription = {
    'NONE': 'NONE',
    [AdvanceSections.DEBOUNCE]: {
        [DebounceSettings.DEBOUNCE_TIME]: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quam provident itaque odit veniam, placeat cum aut iusto natus labore?',
        [DebounceSettings.MAX_WAIT_TIME]:  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quam provident itaque odit veniam, placeat cum aut iusto natus labore?',
        [DebounceSettings.MAX_WAIT_CALLS]:  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quam provident itaque odit veniam, placeat cum aut iusto natus labore?',
        [DebounceSettings.LEADING]:  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quam provident itaque odit veniam, placeat cum aut iusto natus labore?',
        [DebounceSettings.TRAILING]:  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quam provident itaque odit veniam, placeat cum aut iusto natus labore?',
    },
    [AdvanceSections.THROTTLE]: {
        [ThrottleSettings.THROTTLE_TIME]:  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quam provident itaque odit veniam, placeat cum aut iusto natus labore?',
        [ThrottleSettings.MAX_WAIT_TIME]:  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quam provident itaque odit veniam, placeat cum aut iusto natus labore?',
        [ThrottleSettings.MAX_WAIT_CALLS]:  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quam provident itaque odit veniam, placeat cum aut iusto natus labore?',
        [ThrottleSettings.LEADING]:  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quam provident itaque odit veniam, placeat cum aut iusto natus labore?',
        [ThrottleSettings.TRAILING]:  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quam provident itaque odit veniam, placeat cum aut iusto natus labore?',
    },
}

export const TOOLTIP_UPDATE_DELAY =  4000;

export const INITIAL_STYLES = {
    overflow: 'hidden',
    width: '100%',
    maxHeight: '0px',
}

export const MOUNT_TRANSITION = {
    duration: 500,
    transitionStyles: {
        maxHeight: '1012px',
        transition: 'max-height 0.5s ease-in 0.1s',
    }
}

export const UNMOUNT_TRANSITION = {
    duration: 500,
    transitionStyles: {
        maxHeight: '0px',
        transition: 'max-height 0.5s ease-out 0s',
    }
}