import { createContext } from 'react';
import { 
    IInitialContextState 
} from './ResultsControllerContext.types';

export const initialContextState: IInitialContextState = {
    regularCallsAmount: 0,
    debounceCallsAmount: 0,
    throttleCallsAmount: 0,
}

const ResultsControllerContext = createContext(initialContextState)

export default ResultsControllerContext;