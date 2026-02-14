import { Input, type InputRef } from 'antd';
import IMask from 'imask';
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { IMaskOptions, MaskedInputProps, OnChangeEvent } from './types';

/**
 * AntdInputMask - A masked input component for Ant Design
 * 
 * @example
 * ```tsx
 * <AntdInputMask
 *   mask="(000) 000-0000"
 *   placeholder="Phone number"
 *   onChange={(e) => console.log(e.maskedValue, e.unmaskedValue)}
 * />
 * ```
 */
const AntdInputMask = forwardRef<InputRef, MaskedInputProps>(function MaskedInput(props, forwardedRef) {
  const {
    mask,
    maskOptions: _maskOptions,
    value: controlledValue,
    defaultValue,
    definitions,
    onChange,
    ...defaultInputProps
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const maskRef = useRef<ReturnType<typeof IMask> | null>(null);

  const initialValue = (typeof controlledValue === 'string' ? controlledValue : defaultValue) || '';
  const [value, setValue] = useState(initialValue);

  const maskOptions = useMemo(() => {
    return {
      mask,
      lazy: true,
      definitions: {
        0: /[0-9]/,
        ..._maskOptions?.definitions,
        ...definitions,
      },
      ..._maskOptions,
    } as IMaskOptions;
  }, [mask, _maskOptions, definitions]);

  const initMask = useCallback(() => {
    const el = inputRef.current;
    if (!el) return;

    if (maskRef.current) {
      maskRef.current.updateOptions(maskOptions as any);
      return;
    }

    const maskInstance = IMask(el, maskOptions as any);
    maskRef.current = maskInstance;

    maskInstance.on('accept', () => {
      const masked = maskInstance.value;
      const unmasked = maskInstance.unmaskedValue;
      setValue(masked);

      const syntheticEvent = {
        target: el,
        maskedValue: masked,
        unmaskedValue: unmasked,
      } as OnChangeEvent;
      onChange?.(syntheticEvent);
    });

    if (initialValue) {
      maskInstance.value = initialValue;
      el.value = maskInstance.value;
      setValue(maskInstance.value);
    }
  }, [maskOptions, onChange, initialValue]);

  useEffect(() => {
    initMask();
    return () => {
      maskRef.current?.destroy();
      maskRef.current = null;
    };
  }, [initMask]);

  useEffect(() => {
    if (maskRef.current && controlledValue !== undefined) {
      if (maskRef.current.value !== controlledValue) {
        maskRef.current.value = controlledValue;
        setValue(maskRef.current.value);
      }
    }
  }, [controlledValue]);

  const handleRef = (ref: InputRef) => {
    if (forwardedRef) {
      if (typeof forwardedRef === 'function') forwardedRef(ref);
      else forwardedRef.current = ref;
    }
    if (ref?.input) {
      inputRef.current = ref.input;
    }
  };

  return <Input {...defaultInputProps} ref={handleRef} value={value} onChange={onChange} />;
});

export default AntdInputMask;
