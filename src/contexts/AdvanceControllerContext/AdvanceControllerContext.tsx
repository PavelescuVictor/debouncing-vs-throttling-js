import { createContext } from 'react';
import { 
    IInitialContextState 
} from './AdvanceControllerContext.types';

export const initialContextState: IInitialContextState = {
    visible: false,
    selectedSetting: null,
}

const AdvanceControllerContext = createContext(initialContextState)

export default AdvanceControllerContext;