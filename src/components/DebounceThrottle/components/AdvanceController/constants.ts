import {
    AdvanceSections,
    DebounceSettings,
    ThrottleSetiings,
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
        [ThrottleSetiings.THROTTLE_TIME]:  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quam provident itaque odit veniam, placeat cum aut iusto natus labore?',
        [ThrottleSetiings.MAX_WAIT_TIME]:  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quam provident itaque odit veniam, placeat cum aut iusto natus labore?',
        [ThrottleSetiings.MAX_WAIT_CALLS]:  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quam provident itaque odit veniam, placeat cum aut iusto natus labore?',
        [ThrottleSetiings.LEADING]:  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quam provident itaque odit veniam, placeat cum aut iusto natus labore?',
        [ThrottleSetiings.TRAILING]:  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quam provident itaque odit veniam, placeat cum aut iusto natus labore?',
    },
}