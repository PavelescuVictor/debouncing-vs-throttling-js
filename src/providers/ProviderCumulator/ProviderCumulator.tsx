import {
    Provider,
} from 'react';

export type ActionReturnType = void;
export type Action = (currentState: any, actions: IContextActions) => ActionReturnType;
export interface IContextActions {
    [key: string]: Action
}

interface ProviderItem<T> {
    key?: string
    provider: any
    initialState: any
    actions: IContextActions
    specificProvider: Provider<T>
}

type CustomProvider<T> = T extends any ? ProviderItem<T> : never;

export type ProviderItems<T> = CustomProvider<T>[];

type ChildrenType = string | JSX.Element | JSX.Element[] | (() => JSX.Element)

interface AccupumatorProps {
    children: ChildrenType
}

const ProviderCumulator = <T extends unknown>(providers: ProviderItems<T>) => providers.reduce(
    (AcumulatedProviders: any, { provider: Provider, ...props }: ProviderItem<T>) => 
        ({ children }: AccupumatorProps) => (
            <AcumulatedProviders>
                <Provider {...props}>
                    <>{ children }</>
                </Provider>
            </AcumulatedProviders>
        ),
    ({ children }: AccupumatorProps) => <>{ children }</>
)

export default ProviderCumulator;