import {
    MouseEvent,
    ChangeEvent,
} from 'react';
import {
    SettingsTypes,
    DebounceSettings,
    ThrottleSettings,
    AdvanceSections,
} from './AdvanceController.types';
import {
    AdvanceDescription
} from '@/components/DebounceThrottle/components';
import {
    useContext
} from '@/utils/store/helpers/useContext';
import { AdvanceControllerContext } from '@/storeSlices/AdvanceControllerSlice/AdvanceControllerSlice';
import './AdvanceController.css';

const AdvanceController = () => {
    const { 
        state: {
            visible: useAdvance,
            selectedSetting,
            debounceSettings,
            throttleSettings
        },
        setState: setAdvanceState
    } = useContext(AdvanceControllerContext);

    const onAdvanceSettingChange = (sectionType: AdvanceSections, settingType: SettingsTypes) => {
        return (event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLInputElement>) => {
            let newState = {
                ...(sectionType === AdvanceSections.DEBOUNCE && debounceSettings),
                ...(sectionType === AdvanceSections.THROTTLE && throttleSettings),
            }
            if ([
                DebounceSettings.LEADING, 
                DebounceSettings.TRAILING, 
                ThrottleSettings.LEADING, 
                ThrottleSettings.TRAILING
            ].includes(settingType)) {
                newState = {
                    ...newState,
                    [settingType]: parseInt((event.target as HTMLInputElement).value, 10)
                }
            }
            newState = {
                ...newState,
                [settingType]: (event.target as HTMLInputElement).checked
            }

            setAdvanceState({
                key: undefined,
                ...(sectionType === AdvanceSections.DEBOUNCE && { key: 'debounceSettings'}),
                ...(sectionType === AdvanceSections.THROTTLE && { key: 'throttleSettings'}),
                value: newState
            })
        }
    }

    const onAdvanceSettingChoose = (sectionType: AdvanceSections, settingType: SettingsTypes) => {
        return (_event: MouseEvent<HTMLDivElement>) => {
            setAdvanceState({
                key: 'selectedSetting',
                value: {
                    sectionType,
                    settingType
                }
            })
        }
    }

    const onMouseOver = (event: MouseEvent<HTMLDivElement>) => {
        // TODO
    }

    return <div className={ `AdvanceController ${ useAdvance ? 'opened' : 'closed' }` } onMouseOver={onMouseOver}>
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
        { selectedSetting?.sectionType && selectedSetting.settingType && <AdvanceDescription settingType={selectedSetting?.settingType} sectionType={selectedSetting?.sectionType} description={"TEST"}/> }
    </div>
}

export default AdvanceController;