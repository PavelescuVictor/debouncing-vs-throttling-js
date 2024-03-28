import { ReactNode } from 'react';

export interface IPanelProps {
    className?: string,
    children: ReactNode
    withCloseButton?: boolean,
    closeButtonAction: () => void,
}