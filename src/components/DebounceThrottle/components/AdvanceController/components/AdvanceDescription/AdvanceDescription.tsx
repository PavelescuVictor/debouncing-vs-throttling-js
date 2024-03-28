import { useEffect, useState } from 'react';
import { Panel } from '@/components/DebounceThrottle/components';
import TransitionItem from '@/utils/transition/TransitionItem';
import {
    DebounceSettings,
    ThrottleSettings,
    AdvanceSections,
} from '@/components/DebounceThrottle/components/AdvanceController/AdvanceController.types';
import { IAdvanceDescriptionProps } from './AdvanceDescription.types';
import {
    DEBOUNCE_DESCRIPTIONS,
    THROTTLE_DESCRIPTIONS,
    DEBOUNCE_HEADERS,
    THROTTLE_HEADERS,
    TOOLTIP_INITIAL_STYLES,
    TOOLTIP_MOUNT_TRANSITION,
    TOOLTIP_UNMOUNT_TRANSITION,
    DESCRIPTION_INITIAL_STYLES,
    DESCRIPTION_MOUNT_TRANSITION,
    DESCRIPTION_UNMOUNT_TRANSITION
} from './constants'
import './AdvanceDescription.css';

const AdvanceDescription = (props: IAdvanceDescriptionProps) => {
    const {
        sectionType,
        settingType,
        handleCloseDescription,
        handleCloseTooltip,
        showTooltip = false,
    } = props;

    const [descriptionData, setDescriptionData] = useState({
        sectionType,
        settingType,
    });

    useEffect(() => {
        if (!sectionType || !settingType) {
            return;
        }
        setDescriptionData({
            sectionType,
            settingType,
        })
    }, [sectionType, settingType])

    const computeSetting = () => {
        let setting;

        if (!Object.keys({
            ...DEBOUNCE_DESCRIPTIONS, 
            ...THROTTLE_DESCRIPTIONS
        }).includes(descriptionData.settingType)) {
            return null;
        }

        if (descriptionData.sectionType === AdvanceSections.DEBOUNCE) {
            return DEBOUNCE_HEADERS[settingType as DebounceSettings];
        }
        if (descriptionData.sectionType === AdvanceSections.THROTTLE) {
            return THROTTLE_HEADERS[settingType as ThrottleSettings];
        }

        return setting;
    }

    const computeDescription = () => {
        let description;

        if (!Object.keys({
            ...DEBOUNCE_DESCRIPTIONS, 
            ...THROTTLE_DESCRIPTIONS
        }).includes(descriptionData.settingType)) {
            return null;
        }

        if (descriptionData.sectionType === AdvanceSections.DEBOUNCE) {
            return DEBOUNCE_DESCRIPTIONS[settingType as DebounceSettings];
        }
        if (descriptionData.sectionType === AdvanceSections.THROTTLE) {
            return THROTTLE_DESCRIPTIONS[settingType as ThrottleSettings];
        }

        return description;
    }

    return <div className="AdvanceDescription">
        <TransitionItem
            className='transition-item'
            mounted={ showTooltip }
            shouldTransitionOnMount
            shouldTransitionOnUnmount
            initialStyles={ TOOLTIP_INITIAL_STYLES }
            mountTransition={ TOOLTIP_MOUNT_TRANSITION }
            unmountTransition={ TOOLTIP_UNMOUNT_TRANSITION }
        >
            <Panel withCloseButton closeButtonAction={ handleCloseTooltip }>
                <div className="tooltip">Choose a setting to show description</div>
            </Panel>
        </TransitionItem>
        <TransitionItem
            className='transition-item'
            mounted={ !showTooltip && sectionType }
            shouldTransitionOnMount
            shouldTransitionOnUnmount
            initialStyles={ DESCRIPTION_INITIAL_STYLES }
            mountTransition={ DESCRIPTION_MOUNT_TRANSITION }
            unmountTransition={ DESCRIPTION_UNMOUNT_TRANSITION }
        >
            <Panel className='description-wrapper' withCloseButton closeButtonAction={ handleCloseDescription }>
                <div className="header">{ descriptionData.sectionType }</div>
                <div className="content">
                    <div className="setting">{ computeSetting() }</div>
                    <div className="divider"/>
                    <div className="description">{ computeDescription() }</div>
                </div>
            </Panel>
        </TransitionItem>
    </div> 
}

export default AdvanceDescription;