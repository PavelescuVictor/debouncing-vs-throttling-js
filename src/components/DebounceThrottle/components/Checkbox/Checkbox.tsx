import {
    useState
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { 
    ICheckboxProps,
    LabelPositon
} from './Checkbox.types';
import './Checkbox.css';

const Checkbox = (props: ICheckboxProps) => {
    const {
        className,
        name,
        label,
        onClickCallback,
        labelPosition = LabelPositon.LEFT,
    } = props;
    const [checked, setChecked] = useState(false);

    const onClick = (event: React.MouseEvent<HTMLInputElement>) => {
        setChecked(!checked);
        onClickCallback(event)
    }

    return <div className={ ["Checkbox", className].filter(className => className).join(" ") }>
        { labelPosition === LabelPositon.LEFT && <label className="checkbox-label" htmlFor={ name }>{ label }</label> }
        <div className={ ["checkbox-input", checked ? 'checked' : 'not-checked'].filter(className => className).join(" ") } id={ name } onClick={ onClick }>
            <FontAwesomeIcon className="checkmark" icon={faCheck}/>
        </div>
        { labelPosition === LabelPositon.RIGHT && <label className="checkbox-label" htmlFor={ name }>{ label }</label> }
    </div>
}

export default Checkbox;