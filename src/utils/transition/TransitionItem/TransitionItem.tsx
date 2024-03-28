import { 
    useLayoutEffect,
    useRef,
    useTransition,
    useEffect,
} from 'react';
import { useForceUpdate } from '@/hooks/useForceUpdate';
import './TransitionItem.css';

const TRANSITION_SAFE_DELAY = 50;

const DEFAULT_TRANSITION = {}

const TransitionItem = (props) => {
    const {
        className = '',
        mounted = false,
        state,
        mountTransition,
        unmountTransition,
        stateUpdateTransition,
        onStateUpdateCallback,
        onStartStateUpdateTransitionCallback,
        onEndStateUpdateTransitionCallback,
        onMountCallback,
        onStartMountTransitionCallback,
        onEndMountTransitionCallback,
        onUnmountCallback,
        onStartUnmountTransitionCallback,
        onEndUnmountTransitionCallback,
        shouldTransitionOnMount,
        shouldTransitionOnUnmount,
        shouldTransitionOnStateUpdate,
        initialStyles = {},
        styles = {},
        children,
    } = props;

    const transitionStylesRef = useRef({});
    const prevState = useRef(state);
    const transitionItemRef = useRef<HTMLDivElement | number>(-1);
    const transitionCallbackId = useRef<ReturnType<typeof setTimeout> | number>(-1);
    const isIdle = useRef(true);
    const forceUpdate = useForceUpdate();

    useEffect(() => {
        if (!transitionItemRef || !transitionItemRef.current || transitionItemRef.current === -1 || typeof transitionItemRef.current === 'number' || !isIdle.current) {
            return;
        }
        clearTimeout(transitionCallbackId.current);
        if (mounted) {
            if (!shouldTransitionOnMount) {
                onMountCallback();
                return;
            }
            if (onStartMountTransitionCallback) {
                onStartMountTransitionCallback();
            }
            transitionStylesRef.current = mountTransition.transitionStyles;
            isIdle.current = false;
            forceUpdate();
            transitionCallbackId.current = setTimeout(() => {
                if (onEndMountTransitionCallback) {
                    onEndMountTransitionCallback();
                }
                isIdle.current = true;
            } , mountTransition.duration);
        } else {
            if (!shouldTransitionOnUnmount) {
                if (onUnmountCallback) {
                    onUnmountCallback();
                }
                return;
            }
            if (onStartUnmountTransitionCallback) {
                onStartUnmountTransitionCallback();
            }
            transitionStylesRef.current = unmountTransition.transitionStyles;
            isIdle.current = false;
            forceUpdate();
            transitionCallbackId.current = setTimeout(() => {
                if (onEndUnmountTransitionCallback) {
                    onEndUnmountTransitionCallback();
                }
                isIdle.current = true;
            }, unmountTransition.duration)
        }
    }, [mounted, transitionItemRef.current])

    useEffect(() => {
        if (!transitionItemRef || !transitionItemRef.current || transitionItemRef.current === -1 || typeof transitionItemRef.current === 'number' || !isIdle.current) {
            return;
        }
        if (state === prevState.current) {
            return;
        }
        if (!shouldTransitionOnStateUpdate) {
            onStateUpdateCallback();
            return;
        }
        onStartStateUpdateTransitionCallback();
        transitionStylesRef.current = stateUpdateTransition.transitionStyles;
        isIdle.current = false;
        forceUpdate();
        transitionCallbackId.current = setTimeout(() => {
            onEndStateUpdateTransitionCallback();
            isIdle.current = true;
        } , stateUpdateTransition.duration);

        prevState.current = state;
    }, [state, transitionItemRef.current])

    const transitionItemStyles = {
        ...styles,
        ...DEFAULT_TRANSITION,
        ...initialStyles,
        ...transitionStylesRef.current,
    }

    return <div 
        className={`TransitionItem ${className}`}
        ref={(instance) => {
            if (!instance || transitionItemRef.current !== -1) {
                return;
            }
            transitionItemRef.current = instance
        }} 
        style={transitionItemStyles}
    >
        { children }
    </div>
}

export default TransitionItem;