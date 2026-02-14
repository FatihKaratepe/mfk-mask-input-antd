import type { InputProps } from 'antd';

export type UnionToIntersection<T> = (T extends unknown ? (x: T) => unknown : never) extends (x: infer R) => unknown
    ? {
        [K in keyof R]: R[K];
    }
    : never;

type AntdOnChangeParam = Parameters<Exclude<InputProps['onChange'], undefined>>[0];
type InputOnChangeParam = Parameters<Exclude<React.InputHTMLAttributes<HTMLInputElement>['onChange'], undefined>>[0];

type OnChangeParam = AntdOnChangeParam | InputOnChangeParam;

/**
 * Extended onChange event with masked and unmasked values
 */
export interface OnChangeEvent extends OnChangeParam {
    /** The formatted value with mask applied */
    maskedValue: string;
    /** The raw value without mask */
    unmaskedValue: string;
}

type IMaskOptionsBase = any;

/**
 * IMask options configuration
 */
export type InputMaskOptions = {
    [K in keyof IMaskOptionsBase]?: IMaskOptionsBase[K];
};

type MaskFieldType = string | RegExp | ((...args: never) => unknown) | Date | InputMaskOptions;

/**
 * IMask options with mask field
 */
export interface IMaskOptions extends Omit<InputMaskOptions, 'mask'> {
    mask: MaskFieldType;
}

type MaskOptionsList = Array<IMaskOptions>;

/**
 * Supported mask types
 */
export type MaskType = MaskFieldType | MaskOptionsList;

type GeneralInputProps = React.InputHTMLAttributes<HTMLInputElement> & InputProps;

/**
 * Props for the AntdInputMask component
 */
export interface MaskedInputProps extends Omit<GeneralInputProps, 'onChange' | 'value' | 'defaultValue'> {
    /** Mask pattern or configuration */
    mask: MaskType;
    /** Custom character definitions for the mask */
    definitions?: InputMaskOptions['definitions'];
    /** Controlled value */
    value?: string;
    /** Default value for uncontrolled usage */
    defaultValue?: string;
    /** Additional IMask options */
    maskOptions?: InputMaskOptions;
    /** Change handler with masked and unmasked values */
    onChange?: (event: OnChangeEvent) => void;
}
