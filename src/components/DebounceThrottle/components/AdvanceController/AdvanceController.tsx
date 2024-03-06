import {
    useState,
    MouseEvent,
    ChangeEvent,
} from 'react';
import {
    SettingsTypes,
    DebounceSettings,
    ThrottleSettings,
    IAdavanceState,
    AdvanceSections,
} from './AdvanceController.types';
import {
    AdvanceDescription
} from '@/components/DebounceThrottle/components';
import './AdvanceController.css';

const AdvanceController = () => {
    const [useAdvance, setUseAdvance] = useState(false);

    const [advanceState, setAdvanceState] = useState<IAdavanceState>({
        [AdvanceSections.DEBOUNCE]: {
            'debounce-time': 5000,
            'max-wait-time': null,
            'max-wait-calls': null,
            'leading': false,
            'trailing': false,
        },
        [AdvanceSections.THROTTLE]: {
            'throttle-time': 2000,
            'max-wait-time': null,
            'max-wait-calls': null,
            'leading': false,
            'trailing': false,
        }
    }) 

    const onAdvanceSettingChange = (sectionType: AdvanceSections, settingType: SettingsTypes) => {
        return (event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLInputElement>) => {
            setAdvanceState((prevState) => {
                const newState = {
                    ...prevState,
                }
                if ([
                    DebounceSettings.LEADING, 
                    DebounceSettings.TRAILING, 
                    ThrottleSettings.LEADING, 
                    ThrottleSettings.TRAILING].includes(settingType)
                ) {
                    newState[sectionType][settingType] = parseInt((event.target as HTMLInputElement).value, 10);
                }
                newState[sectionType][settingType] = (event.target as HTMLInputElement).checked;

                return newState;
            })
        }
    }

    const [selectedAdvancedSetting, setSelectedAdvancedSetting] = useState<{
        sectionType: AdvanceSections | null,
        settingType: SettingsTypes | null,
    }>({
        sectionType: null,
        settingType: null,
    });

    const onAdvanceSettingChoose = (sectionType: AdvanceSections, settingType: SettingsTypes) => {
        return (_event: MouseEvent<HTMLDivElement>) => {
            setSelectedAdvancedSetting({
                sectionType,
                settingType,
            })
        }
    }

    return <div className={ `AdvanceController ${ useAdvance ? 'opened' : 'closed' }` }>
        <div className="advance-panel">
            <div className="section debounce">
                <div className="header"> Debounce </div>
                <div className="content">
                    <div className="names">
                        <div className="name" onClick={ onAdvanceSettingChoose(AdvanceSections.DEBOUNCE, DebounceSettings.DEBOUNCE_TIME) }> Debounce Time </div>
                        <div className="name" onClick={ onAdvanceSettingChoose(AdvanceSections.DEBOUNCE, DebounceSettings.MAX_WAIT_TIME) }> Max Wait Time </div>
                        <div className="name" onClick={ onAdvanceSettingChoose(AdvanceSections.DEBOUNCE, DebounceSettings.MAX_WAIT_CALLS) }> Max Wait Calls </div>
                        <div className="name" onClick={ onAdvanceSettingChoose(AdvanceSections.DEBOUNCE, DebounceSettings.LEADING) }> Leading </div>
                        <div className="name" onClick={ onAdvanceSettingChoose(AdvanceSections.DEBOUNCE, DebounceSettings.TRAILING) }> Trailing </div>
                    </div>
                    <div className="settings">
                        <input type="number" name="debounce-time" className="setting debounce-time" placeholder="Time in miliseconds (ms)" defaultValue={3000} onChange={onAdvanceSettingChange(AdvanceSections.DEBOUNCE, DebounceSettings.DEBOUNCE_TIME)}/>
                        <input type="number" name="max-wait-time" className="setting max-wait-time" placeholder="Maximum waiting time (ms)" defaultValue={1000} onChange={onAdvanceSettingChange(AdvanceSections.DEBOUNCE, DebounceSettings.MAX_WAIT_TIME)}/>
                        <input type="number" name="max-wait-calls" className="setting max-wait-calls" placeholder="Maximum number of calls skipped" defaultValue={5} onChange={onAdvanceSettingChange(AdvanceSections.DEBOUNCE, DebounceSettings.MAX_WAIT_CALLS)}/>
                        <input type="checkbox" name="leading" className="setting leading" defaultValue={0} onClick={onAdvanceSettingChange(AdvanceSections.DEBOUNCE, DebounceSettings.LEADING)}/>
                        <input type="checkbox" name="trailing" className="setting trailing" defaultValue={0} onClick={onAdvanceSettingChange(AdvanceSections.DEBOUNCE, DebounceSettings.TRAILING)}/>
                    </div>
                </div>
            </div>
            <div className="divider vertical"/>
            <div className="section throttle">
                <div className="header"> Throttle </div>
                <div className="content">
                    <div className="settings">
                        <input type="number" className="setting throttle-time" placeholder="Time in miliseconds (ms)" defaultValue={3000} onChange={onAdvanceSettingChange(AdvanceSections.DEBOUNCE, DebounceSettings.DEBOUNCE_TIME)}/>
                        <input type="number" className="setting max-wait-time" placeholder="Maximum waiting time (ms)" defaultValue={1000} onChange={onAdvanceSettingChange(AdvanceSections.DEBOUNCE, DebounceSettings.MAX_WAIT_TIME)}/>
                        <input type="number" className="setting max-wait-calls" placeholder="Maximum number of calls skipped" defaultValue={5} onChange={onAdvanceSettingChange(AdvanceSections.DEBOUNCE, DebounceSettings.MAX_WAIT_CALLS)}/>
                        <input type="checkbox" className="setting leading" defaultValue={0} onClick={onAdvanceSettingChange(AdvanceSections.DEBOUNCE, DebounceSettings.LEADING)}/>
                        <input type="checkbox" className="setting trailing" defaultValue={0} onClick={onAdvanceSettingChange(AdvanceSections.DEBOUNCE, DebounceSettings.TRAILING)}/>
                    </div>
                    <div className="names">
                        <div className="name" onClick={ onAdvanceSettingChoose(AdvanceSections.THROTTLE, ThrottleSettings.THROTTLE_TIME) }> Throtling Time </div>
                        <div className="name" onClick={ onAdvanceSettingChoose(AdvanceSections.THROTTLE, ThrottleSettings.MAX_WAIT_TIME) }> Max Wait Time </div>
                        <div className="name" onClick={ onAdvanceSettingChoose(AdvanceSections.THROTTLE, ThrottleSettings.MAX_WAIT_TIME) }> Max Wait Calls </div>
                        <div className="name" onClick={ onAdvanceSettingChoose(AdvanceSections.THROTTLE, ThrottleSettings.LEADING) }> Leading </div>
                        <div className="name" onClick={ onAdvanceSettingChoose(AdvanceSections.THROTTLE, ThrottleSettings.TRAILING) }> Trailing </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="advance-panel">
            {/* <AdvanceDescription settingType={} sectionType={} description={}/> */}
        </div>
    </div>
}

export default AdvanceController;