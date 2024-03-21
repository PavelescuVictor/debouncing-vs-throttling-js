import {
    ReactNode,
    Provider as DefaultProvider
} from 'react';

export type Provider<T> = DefaultProvider<T>;
type CustomProvider<T> = T extends any ? Provider<T> : never;
export type CustomProviders<T> = CustomProvider<T>[];

type ChildrenType = ReactNode;
export interface AccumulatorProps {
    children: ChildrenType
}