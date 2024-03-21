import {
    Provider
} from 'react';
import "./App.css";
import { DebounceThrottle } from './components';
import {
    advanceControllerSlice,
    AdvanceControllerProvider
} from '@/storeSlices/AdvanceControllerSlice/AdvanceControllerSlice';
import {
    ISliceType as IAdvanceSliceType,
    IInitialState as IAdvanceInitialState,
} from '@/storeSlices/AdvanceControllerSlice/AdvanceControllerSlice.types';
import {
    debounceControllerSlice,
    DebounceControllerProvider
} from '@/storeSlices/DebounceControllerSlice/DebounceControllerSlice';
import {
    ISliceType as IDebounceSliceType,
    IInitialState as IDebounceInitialState,
} from '@/storeSlices/DebounceControllerSlice/DebounceControllerSlice.types';
import {
    throttleControllerSlice,
    ThrottleControllerProvider
} from '@/storeSlices/ThrottleControllerSlice/ThrottleControllerSlice';
import {
    ISliceType as IThrottleSliceType,
    IInitialState as IThrottleInitialState,
} from '@/storeSlices/ThrottleControllerSlice/ThrottleControllerSlice.types';
import {
    resultsControllerSlice,
    ResultsControllerProvider
} from '@/storeSlices/ResultsControllerSlice/ResultsControllerSlice';
import {
    ISliceType as IResultsSliceType,
    IInitialState as IResultsInitialState,
} from '@/storeSlices/ResultsControllerSlice/ResultsControllerSlice.types';
import providerCreator from '@/storeSlices/providerCreator';
import ProviderCumulator from '@/utils/store/components/ProviderCumulator';

const AdvanceProvider = providerCreator<IAdvanceSliceType, Provider<IAdvanceInitialState>>(advanceControllerSlice, AdvanceControllerProvider);
const DebounceProvider = providerCreator<IDebounceSliceType, Provider<IDebounceInitialState>>(debounceControllerSlice, DebounceControllerProvider);
const ThrottleProvider = providerCreator<IThrottleSliceType, Provider<IThrottleInitialState>>(throttleControllerSlice, ThrottleControllerProvider);
const ResultsProvider = providerCreator<IResultsSliceType, Provider<IResultsInitialState>>(resultsControllerSlice, ResultsControllerProvider);
const providers: any = [
    AdvanceProvider,
    DebounceProvider,
    ThrottleProvider,
    ResultsProvider
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
