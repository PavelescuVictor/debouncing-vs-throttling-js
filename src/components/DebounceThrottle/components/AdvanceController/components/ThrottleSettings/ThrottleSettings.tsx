import { IThrottleSettingsProps } from './ThrottleSettings.types';
import {
    ThrottleSettings as Settings,
    AdvanceSections,
} from '../../AdvanceController.types';
import { TransitionItem } from '@/utils/transition';
import { DisabledSettings } from '..';
import './ThrottleSettings.css';
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

const ThrottleSettings = (props: IThrottleSettingsProps) => {
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

    return <div className="ThrottleSettings">
        <TransitionItem
            className="transition-disabled-message"
            mounted={!isActive}
            shouldTransitionOnMount
            shouldTransitionOnUnmount
            mountTransition={DISABLED_SETTINGS_MOUNT_TRANSITION}
            unmountTransition={DISABLED_SETTINGS_UNMOUNT_TRANSITION}
            initialStyles={DISABLED_SETTINGS_INITIAL_STYLES}
        >
            <DisabledSettings sectionType={AdvanceSections.THROTTLE}/>
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
            <div className='settings'>
                <div className="header"> Throttle </div>
                <div className="content">
                    <div className="settings">
                        <input 
                            type="number" 
                            className="setting throttle-time" 
                            placeholder="Time in miliseconds (ms)" 
                            defaultValue={ settings[Settings.THROTTLE_TIME] } 
                            onChange={ onChange(AdvanceSections.THROTTLE, Settings.THROTTLE_TIME) }
                        />
                        <input 
                            type="number" 
                            className="setting max-wait-time" 
                            placeholder="Maximum waiting time (ms)" 
                            defaultValue={ settings[Settings.MAX_WAIT_TIME] } 
                            onChange={ onChange(AdvanceSections.THROTTLE, Settings.MAX_WAIT_TIME) }
                        />
                        <input 
                            type="number" 
                            className="setting max-wait-calls" 
                            placeholder="Maximum number of calls skipped" 
                            defaultValue={ settings[Settings.MAX_WAIT_CALLS] } 
                            onChange={ onChange(AdvanceSections.THROTTLE, Settings.MAX_WAIT_CALLS) }
                        />
                        <Checkbox 
                            className="setting leading" 
                            name="leading" 
                            onClickCallback={ onChange(AdvanceSections.THROTTLE, Settings.LEADING) } 
                            labelPosition={ LabelPositon.NONE }
                        />
                        <Checkbox 
                            className="setting trailing" 
                            name="trailing" 
                            onClickCallback={ onChange(AdvanceSections.THROTTLE, Settings.TRAILING) } 
                            labelPosition={ LabelPositon.NONE }
                        />
                    </div>
                    <div className="names">
                        <div 
                            className={ ["name", isSelected(AdvanceSections.THROTTLE, Settings.THROTTLE_TIME) ? "selected" : undefined].filter(className => className).join(" ") }
                            onMouseOver={onMouseOver} 
                            onMouseOut={onMouseOut} 
                            onClick={ onChoose(AdvanceSections.THROTTLE, Settings.THROTTLE_TIME) }
                        > Throtling Time </div>
                        <div 
                            className={ ["name", isSelected(AdvanceSections.THROTTLE, Settings.MAX_WAIT_TIME) ? "selected" : undefined].filter(className => className).join(" ") }
                            onMouseOver={onMouseOver} 
                            onMouseOut={onMouseOut} 
                            onClick={ onChoose(AdvanceSections.THROTTLE, Settings.MAX_WAIT_TIME) }
                        > Max Wait Time </div>
                        <div 
                            className={ ["name", isSelected(AdvanceSections.THROTTLE, Settings.MAX_WAIT_CALLS) ? "selected" : undefined].filter(className => className).join(" ") }
                            onMouseOver={onMouseOver} 
                            onMouseOut={onMouseOut} 
                            onClick={ onChoose(AdvanceSections.THROTTLE, Settings.MAX_WAIT_CALLS) }
                        > Max Wait Calls </div>
                        <div 
                            className={ ["name", isSelected(AdvanceSections.THROTTLE, Settings.LEADING) ? "selected" : undefined].filter(className => className).join(" ") }
                            onMouseOver={onMouseOver} 
                            onMouseOut={onMouseOut} 
                            onClick={ onChoose(AdvanceSections.THROTTLE, Settings.LEADING) }
                        > Leading </div>
                        <div 
                            className={ ["name", isSelected(AdvanceSections.THROTTLE, Settings.TRAILING) ? "selected" : undefined].filter(className => className).join(" ") }
                            onMouseOver={onMouseOver} 
                            onMouseOut={onMouseOut} 
                            onClick={ onChoose(AdvanceSections.THROTTLE, Settings.TRAILING) }
                        > Trailing </div>
                    </div>
                </div>
            </div>
        </TransitionItem>
    </div>
}

export default ThrottleSettings;