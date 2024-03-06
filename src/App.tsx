import "./App.css";
import { 
    DebounceThrottle,
} from './components';
import {
    ContextProvider,
} from './providers'
import {
    initialContextState as advanceInitialContextState
} from './contexts/AdvanceControllerContext/AdvanceControllerContext';
import {
    IInitialContextState as IInitialAdvanceContextState
} from './contexts/AdvanceControllerContext/AdvanceControllerContext.types';
import {
    initialContextState as debounceInitialContextState
} from './contexts/DebounceControllerContext/DebounceControllerContext';
import {
    IInitialContextState as IInitialDebounceContextState
} from './contexts/DebounceControllerContext/DebounceControllerContext.types';
import {
    initialContextState as throttleInitialContextState
} from './contexts/ThrottleControllerContext/ThrottleControllerContext';
import {
    IInitialContextState as IInitialThrottleContextState
} from './contexts/ThrottleControllerContext/ThrottleControllerContext.types';
import {
    initialContextState as resultsInitialContextState
} from './contexts/ResultsControllerContext/ResultsControllerContext';
import {
    IInitialContextState as IInitialResultsContextState
} from './contexts/ResultsControllerContext/ResultsControllerContext.types';
import {
    AdvanceControllerContext,
    DebounceControllerContext,
    ThrottleControllerContext,
    ResultsControllerContext,
} from '@/contexts';
import ProviderCumulator from './providers/ProviderCumulator';
import { ProviderItems } from './providers/ProviderCumulator/ProviderCumulator';

const AdvanceProvider = ContextProvider<IInitialAdvanceContextState>;
const DebounceProvider = ContextProvider<IInitialDebounceContextState>;
const ThrottleProvider = ContextProvider<IInitialThrottleContextState>;
const ResultsProvider = ContextProvider<IInitialResultsContextState>;

const providers: ProviderItems<IInitialAdvanceContextState | IInitialDebounceContextState | IInitialThrottleContextState | IInitialResultsContextState> = [
    {
        provider: AdvanceProvider,
        initialState: advanceInitialContextState,
        specificProvider: AdvanceControllerContext.Provider,
    },
    { 
        provider: DebounceProvider,
        initialState: debounceInitialContextState,
        specificProvider: DebounceControllerContext.Provider,
    },
    {
        provider: ThrottleProvider,
        initialState: throttleInitialContextState,
        specificProvider: ThrottleControllerContext.Provider,
    },
    {
        provider: ResultsProvider,
        initialState: resultsInitialContextState,
        specificProvider: ResultsControllerContext.Provider,
    }
]

const MainProvider = ProviderCumulator(providers);

const App = () => {
    return <div className="App">
        <MainProvider>
            <DebounceThrottle />
        </MainProvider> 
    </div>;
};

export default App;
