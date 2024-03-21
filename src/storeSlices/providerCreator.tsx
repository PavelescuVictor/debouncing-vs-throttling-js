import SliceProvider from '@/utils/store/components/SliceProvider';

const providerCreator = <T extends unknown, K extends unknown>(slice: T, specificProvider: K) => {
    return ({ children }: { children: any }) => <SliceProvider slice={slice} specificProvider={specificProvider}>
        { children }
    </SliceProvider>
}

export default providerCreator;