import "./App.css";
import { 
    DebounceThrottle,
} from './components';
import {
    ContextProvider,
} from './providers'
import {
    key as AdvanceControllerKey,
    initialContextState as advanceInitialContextState,
    actions as advanceActions,
} from './contexts/AdvanceControllerContext/AdvanceControllerContext';
import {
    IInitialContextState as IInitialAdvanceContextState
} from './contexts/AdvanceControllerContext/AdvanceControllerContext.types';
import {
    key as DebounceControllerKey,
    initialContextState as debounceInitialContextState,
    actions as debounceActions,
} from './contexts/DebounceControllerContext/DebounceControllerContext';
import {
    IInitialContextState as IInitialDebounceContextState
} from './contexts/DebounceControllerContext/DebounceControllerContext.types';
import {
    key as ThrottleControllerKey,
    initialContextState as throttleInitialContextState,
    actions as throttleActions,
} from './contexts/ThrottleControllerContext/ThrottleControllerContext';
import {
    IInitialContextState as IInitialThrottleContextState
} from './contexts/ThrottleControllerContext/ThrottleControllerContext.types';
import {
    key as ResultsControllerKey,
    initialContextState as resultsInitialContextState,
    actions as resultsActions,
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
        key: AdvanceControllerKey,
        provider: AdvanceProvider,
        initialState: advanceInitialContextState,
        actions: advanceActions,
        specificProvider: AdvanceControllerContext.Provider,
    },
    { 
        key: DebounceControllerKey,
        provider: DebounceProvider,
        initialState: debounceInitialContextState,
        actions: debounceActions,
        specificProvider: DebounceControllerContext.Provider,
    },
    {
        key: ThrottleControllerKey,
        provider: ThrottleProvider,
        initialState: throttleInitialContextState,
        actions: throttleActions,
        specificProvider: ThrottleControllerContext.Provider,
    },
    {
        key: ResultsControllerKey,
        provider: ResultsProvider,
        initialState: resultsInitialContextState,
        actions: resultsActions,
        specificProvider: ResultsControllerContext.Provider,
    }
]

const MainProvider = ProviderCumulator(providers);

// const providers = [];
// const MainProvider = ProviderMerger(providers);

const App = () => {
    return <div className="App">
        <MainProvider>
            <DebounceThrottle />
        </MainProvider> 
    </div>;
};

export default App;
