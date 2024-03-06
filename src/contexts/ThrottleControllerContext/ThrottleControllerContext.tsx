import { createContext } from 'react';
import { IInitialContextState } from './ThrottleControllerContext.types';

export const initialContextState: IInitialContextState = {
    active: false,
}

const ThrottleControllerContext = createContext(initialContextState);

export default ThrottleControllerContext;