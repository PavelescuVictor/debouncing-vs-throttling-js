import {
    MouseEvent,
    ChangeEvent,
    useState,
    useRef,
    useEffect,
} from 'react';
import { TransitionItem } from '@/utils/transition';
import {
    useContextValues,
    useContextSetValues,
} from '@/utils/store/helpers/useContext';
import { AdvanceControllerContext } from '@/storeSlices/AdvanceControllerSlice/AdvanceControllerSlice';
import { DebounceControllerContext } from '@/storeSlices/DebounceControllerSlice/DebounceControllerSlice';
import { ThrottleControllerContext } from '@/storeSlices/ThrottleControllerSlice/ThrottleControllerSlice';
import {
    AdvanceDescription,
    DebounceSettings as DebounceSection,
    ThrottleSettings as ThrottleSection,
} from './components';
import { Panel } from '@/components/DebounceThrottle/components';
import {
    SettingsTypes,
    DebounceSettings,
    ThrottleSettings,
    AdvanceSections,
} from './AdvanceController.types';
import {
    INITIAL_STYLES,
    MOUNT_TRANSITION,
    UNMOUNT_TRANSITION,
    TOOLTIP_UPDATE_DELAY,
} from './constants';
import './AdvanceController.css';

const AdvanceController = () => {
    const { 
        visible: useAdvance,
        selectedSetting,
        debounceSettings,
        throttleSettings,
    } = useContextValues(AdvanceControllerContext);
    
    const setAdvanceState = useContextSetValues(AdvanceControllerContext);
    const { active: useDebounce } = useContextValues(DebounceControllerContext);
    const { active: useThrottle} = useContextValues(ThrottleControllerContext);

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
            const isSelected = selectedSetting && selectedSetting.sectionType === sectionType && selectedSetting.settingType === settingType;
            setAdvanceState({
                key: 'selectedSetting',
                value: isSelected ? null : {
                    sectionType,
                    settingType,
                }
            })
        }
    }

    const [showTooltip, setShowTooltip] = useState(false);
    const updateTooltipId = useRef<ReturnType<typeof setTimeout> | number>(-1);
    const isHovering = useRef(false);
    const onMouseOver = (_event: MouseEvent<HTMLDivElement>) => {
        isHovering.current = true;
        setShowTooltip(true);
        clearTimeout(updateTooltipId.current);
        updateTooltipId.current = setTimeout(() => {
            updateTooltipId.current = -1;
            if (isHovering.current === true) {
                return;
            }
            setShowTooltip(false);
        }, TOOLTIP_UPDATE_DELAY)
    }

    const onMouseOut = (_event: MouseEvent<HTMLDivElement>) => {
        isHovering.current = false;
        if (updateTooltipId.current === -1) {
            updateTooltipId.current = setTimeout(() => {
                updateTooltipId.current = -1;
                setShowTooltip(false);
            }, TOOLTIP_UPDATE_DELAY)
        }
    }

    const handleCloseAdvanceController = () => {
        setAdvanceState({
            key: 'visible',
            value: false,
        })
    }

    const handleCloseDescription = () => {
        setAdvanceState({
            key: 'selectedSetting',
            value: null,
        });
        setShowTooltip(false);
    }

    const handleCloseTooltip = () => {
        clearTimeout(updateTooltipId.current);
        setShowTooltip(false);
    }

    useEffect(() => {
        setShowTooltip(false);
    }, [selectedSetting])

    return <div className="AdvanceController">
        <TransitionItem
            mounted={useAdvance}
            shouldTransitionOnMount
            shouldTransitionOnUnmount
            mountTransition={MOUNT_TRANSITION}
            unmountTransition={UNMOUNT_TRANSITION}
            initialStyles={INITIAL_STYLES}
        >
            <Panel withCloseButton closeButtonAction={handleCloseAdvanceController}>
                <DebounceSection 
                    isActive={useDebounce}
                    settings={debounceSettings}
                    selectedSetting={selectedSetting}
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                    onChoose={onAdvanceSettingChoose}
                    onChange={onAdvanceSettingChange}
                />
                <div className="divider vertical"/>
                <ThrottleSection
                    isActive={useThrottle}
                    settings={throttleSettings}
                    selectedSetting={selectedSetting}
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                    onChoose={onAdvanceSettingChoose}
                    onChange={onAdvanceSettingChange}
                />
            </Panel>
            <AdvanceDescription 
                showTooltip={ showTooltip && !selectedSetting && (useDebounce || useThrottle) } 
                settingType={ selectedSetting?.settingType } 
                sectionType={ selectedSetting?.sectionType }
                handleCloseDescription={ handleCloseDescription }
                handleCloseTooltip={ handleCloseTooltip }
            />
        </TransitionItem>
    </div>
}

export default AdvanceController;