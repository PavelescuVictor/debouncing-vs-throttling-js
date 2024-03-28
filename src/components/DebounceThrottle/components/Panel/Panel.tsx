import { IPanelProps } from './Panel.types';
import {
    CloseButton,
} from '@/components/DebounceThrottle/components';
import './Panel.css';

const Panel = (props: IPanelProps) => {
    const {
        className,
        children,
        withCloseButton = false,
        closeButtonAction,
    } = props
    return <div className={ ["Panel", className || undefined].filter(className => className).join(" ") }>
        { withCloseButton && <CloseButton onClick={closeButtonAction}/> }
        { children }
    </div>
}

export default Panel;