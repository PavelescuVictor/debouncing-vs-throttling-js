export const INITIAL_STYLES = {
    opacity: '0',
}

export const MOUNT_TRANSITION = {
    duration: 500,
    transitionStyles: {
        opacity: 1,
        transitionProperty: 'opacity',
        transitionDuration: '0.2s',
        transitionTimingFunction: 'ease-in-out',
        transitionDelay: '0.2s',
    }
}

export const UNMOUNT_TRANSITION = {
    duration: 500,
    transitionStyles: {
        opacity: 0,
        transitionProperty: 'opacity',
        transitionDuration: '0.2s',
        transitionTimingFunction: 'ease-in-out',
    }
}