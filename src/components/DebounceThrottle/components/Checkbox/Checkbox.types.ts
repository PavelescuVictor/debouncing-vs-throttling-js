export enum LabelPositon {
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
    NONE = 'NONE',
}

export interface ICheckboxProps {
    className?: string,
    name: string,
    label: string,
    onClickCallback: (event: React.MouseEvent<HTMLInputElement>) => void,
    labelPosition?: LabelPositon
}