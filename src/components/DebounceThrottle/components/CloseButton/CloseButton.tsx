import { ICloseButtonProps } from './CloseButton.types';
import './CloseButton.css';

const CloseButton = (props: ICloseButtonProps) => {
    const {
        className,
        onClick
    } = props;
    return <div className={["CloseButton", className || undefined].filter(item => item).join(" ")} onClick={onClick}>
        <span className="line"/>
        <span className="line"/>
    </div>
}

export default CloseButton;