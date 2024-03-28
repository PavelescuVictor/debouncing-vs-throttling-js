import { IDebounceSettingsProps } from './DebounceSettings.types';
import {
    DebounceSettings as Settings,
    AdvanceSections,
} from '../../AdvanceController.types';
import { TransitionItem } from '@/utils/transition';
import { DisabledSettings } from '..';
import './DebounceSettings.css';
import { Checkbox } from '../../..';
import { LabelPositon } from '../../../Checkbox/Checkbox.types';

const DISABLED_SETTINGS_INITIAL_STYLES = {
    opacity: 0,
}

const DISABLED_SETTINGS_MOUNT_TRANSITION = {
    duration: 500,
    transitionStyles: {
        opacity: 1,
        transitionProperty: 'opacity',
        transitionDuration: '0.2s',
        transitionTimingFunction: 'ease-in-out',
    }
}

const DISABLED_SETTINGS_UNMOUNT_TRANSITION = {
    duration: 500,
    transitionStyles: {
        opacity: 0,
        transitionProperty: 'opacity',
        transitionDuration: '0.2s',
        transitionTimingFunction: 'ease-in-out',
    }
}

const DebounceSettings = (props: IDebounceSettingsProps) => {
    const {
        isActive = false,
        settings,
        selectedSetting,
        onMouseOver = () => {},
        onMouseOut = () => {},
        onChoose = () => undefined,
        onChange = () => undefined,
    } = props;

    const isSelected = (sectionType: AdvanceSections, settingType: Settings ) => sectionType === selectedSetting?.sectionType && settingType === selectedSetting?.settingType;

    return <div className="DebounceSettings">
        <TransitionItem
            className="transition-disabled-message"
            mounted={!isActive}
            shouldTransitionOnMount
            shouldTransitionOnUnmount
            mountTransition={DISABLED_SETTINGS_MOUNT_TRANSITION}
            unmountTransition={DISABLED_SETTINGS_UNMOUNT_TRANSITION}
            initialStyles={DISABLED_SETTINGS_INITIAL_STYLES}
        >
            <DisabledSettings sectionType={AdvanceSections.DEBOUNCE}/>
        </TransitionItem>
        <TransitionItem
            className="transition-settings"
            mounted={isActive}
            shouldTransitionOnMount
            shouldTransitionOnUnmount
            mountTransition={DISABLED_SETTINGS_MOUNT_TRANSITION}
            unmountTransition={DISABLED_SETTINGS_UNMOUNT_TRANSITION}
            initialStyles={DISABLED_SETTINGS_INITIAL_STYLES}
        >
            <div className="settings">
                <div className="header"> Debounce </div>
                <div className="content">
                    <div className="names">
                        <div 
                            className={ ["name", isSelected(AdvanceSections.DEBOUNCE, Settings.DEBOUNCE_TIME) ? "selected" : undefined].filter(className => className).join(" ") }
                            onMouseOver={ onMouseOver } 
                            onMouseOut={ onMouseOut } 
                            onClick={ onChoose(AdvanceSections.DEBOUNCE, Settings.DEBOUNCE_TIME) }
                        > Debounce Time </div>
                        <div 
                            className={ ["name", isSelected(AdvanceSections.DEBOUNCE, Settings.MAX_WAIT_TIME) ? "selected" : undefined].filter(className => className).join(" ") }
                            onMouseOver={ onMouseOver } 
                            onMouseOut={ onMouseOut } 
                            onClick={ onChoose(AdvanceSections.DEBOUNCE, Settings.MAX_WAIT_TIME) }
                        > Max Wait Time </div>
                        <div 
                            className={ ["name", isSelected(AdvanceSections.DEBOUNCE, Settings.MAX_WAIT_CALLS) ? "selected" : undefined].filter(className => className).join(" ") }
                            onMouseOver={ onMouseOver } 
                            onMouseOut={ onMouseOut } 
                            onClick={ onChoose(AdvanceSections.DEBOUNCE, Settings.MAX_WAIT_CALLS) }
                        > Max Wait Calls </div>
                        <div 
                            className={ ["name", isSelected(AdvanceSections.DEBOUNCE, Settings.LEADING) ? "selected" : undefined].filter(className => className).join(" ") }
                            onMouseOver={ onMouseOver } 
                            onMouseOut={ onMouseOut } 
                            onClick={ onChoose(AdvanceSections.DEBOUNCE, Settings.LEADING) }
                        > Leading </div>
                        <div 
                            className={ ["name", isSelected(AdvanceSections.DEBOUNCE, Settings.TRAILING) ? "selected" : undefined].filter(className => className).join(" ") }
                            onMouseOver={ onMouseOver } 
                            onMouseOut={ onMouseOut } 
                            onClick={ onChoose(AdvanceSections.DEBOUNCE, Settings.TRAILING) }
                        > Trailing </div>
                    </div>
                    <div className="settings">
                        <input 
                            type="number" 
                            name="debounce-time" 
                            className="setting debounce-time" 
                            placeholder="Time in miliseconds (ms)" 
                            defaultValue={ settings[Settings.DEBOUNCE_TIME] } 
                            onChange={ onChange(AdvanceSections.DEBOUNCE, Settings.DEBOUNCE_TIME) }
                        />
                        <input 
                            type="number" 
                            name="max-wait-time" 
                            className="setting max-wait-time" 
                            placeholder="Maximum waiting time (ms)" 
                            defaultValue={ settings[Settings.MAX_WAIT_TIME] } 
                            onChange={ onChange(AdvanceSections.DEBOUNCE, Settings.MAX_WAIT_TIME) }
                        />
                        <input 
                            type="number" 
                            name="max-wait-calls" 
                            className="setting max-wait-calls" 
                            placeholder="Maximum number of calls skipped" 
                            defaultValue={ settings[Settings.MAX_WAIT_CALLS] } 
                            onChange={ onChange(AdvanceSections.DEBOUNCE, Settings.MAX_WAIT_CALLS) }
                        />
                        <Checkbox 
                            className="setting leading" 
                            name="leading" 
                            onClickCallback={ onChange(AdvanceSections.DEBOUNCE, Settings.LEADING) } 
                            labelPosition={ LabelPositon.NONE }
                        />
                        <Checkbox 
                            className="setting trailing" 
                            name="trailing" 
                            onClickCallback={ onChange(AdvanceSections.DEBOUNCE, Settings.TRAILING) } 
                            labelPosition={ LabelPositon.NONE }
                        />
                    </div>
                </div>
            </div>
        </TransitionItem>
    </div>
}

export default DebounceSettings;