import {
    Provider,
} from 'react';
import {
    createContextProvider,
} from '@/providers/ContextProvider/ContextProvider';

export type ActionReturnType = void;
export type ContextAction<T> = (currentState: any, actions: ContextActions<T>) => ActionReturnType;
export interface ContextActions<T> {
    [key: string]: ContextAction<T>
}

interface ProviderItem<T> {
    key?: string
    initialState: T
    actions: ContextActions<T>
}

type CustomProvider<T> = T extends any ? ProviderItem<T> : never;

export type ProviderItems<T> = CustomProvider<T>[];

type ChildrenType = string | JSX.Element | JSX.Element[] | (() => JSX.Element)

interface MergerProps {
    children: ChildrenType
}

const ProviderMerger = <T extends {}>(providers: ProviderItems<T>) => providers.forEach((providerItem) => {
    const {
        initialState,
        actions
    } = providerItem;
    const [value] = createContextProvider({initialState, actions});
    const MergedProvider = ({ children }: MergerProps) => (
        <Provider {...props}>
            { children }
        </Provider>
    )
    return <MergedProvider>
        { children }
    </MergedProvider>
});

export default ProviderMerger;