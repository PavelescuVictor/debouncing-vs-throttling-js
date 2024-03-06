import { createContext } from 'react';
import { IInitialContextState } from './DebounceControllerContext.types';

export const initialContextState: IInitialContextState = {
    active: false,
}

const DebounceControllerContext = createContext(initialContextState);

export default DebounceControllerContext;