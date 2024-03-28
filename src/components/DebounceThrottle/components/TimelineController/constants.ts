export const INITIAL_STYLES = {
    overflow: 'hidden',
    width: '100%',
    maxHeight: '0px',
}

export const MOUNT_TRANSITION = {
    duration: 500,
    transitionStyles: {
        maxHeight: '1000px',
        transition: 'max-height 0.5s ease-in 0.1s',
    }
}

export const UNMOUNT_TRANSITION = {
    duration: 500,
    transitionStyles: {
        maxHeight: '0px',
        transition: 'max-height 0.5s ease-out 0s',
    }
}