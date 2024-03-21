import {
    ReactNode
} from 'react';
import {
    CustomProviders,
    AccumulatorProps,
} from  './ProviderCumulator.types';

type AcumulatedProvidersType = ({ children }: { children: ReactNode }) => JSX.Element;
const AcumulatedProvidersInitialValue: AcumulatedProvidersType =  ({ children }: AccumulatorProps) => <>{ children }</>
const ProviderCumulator = <T extends unknown>(providers: CustomProviders<T>) => providers.reduce(
    (AcumulatedProviders: AcumulatedProvidersType, SliceProvider: any) => 
        ({ children }: AccumulatorProps) => (
            <AcumulatedProviders>
                <SliceProvider>
                    <>{ children }</>
                </SliceProvider>
            </AcumulatedProviders>
        ),
    AcumulatedProvidersInitialValue
)

export default ProviderCumulator;