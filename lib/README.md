# mfk-mask-input-antd

A powerful and flexible masked input component for Ant Design built with [IMask](https://imask.js.org/).

## Features

- 🎭 **Flexible Masking** - Supports various mask patterns (phone, credit card, date, custom)
- 🎨 **Ant Design Integration** - Seamlessly integrates with Ant Design components
- 📝 **TypeScript Support** - Full TypeScript support with type definitions
- ⚡ **Lightweight** - Minimal dependencies, uses peer dependencies for React and Ant Design
- 🔧 **Customizable** - Extensive IMask options support
- 🎯 **Developer Friendly** - Access both masked and unmasked values in onChange

## Installation

```bash
npm install mfk-mask-input-antd
# or
yarn add mfk-mask-input-antd
# or
pnpm add mfk-mask-input-antd
# or
bun add mfk-mask-input-antd
```

### Peer Dependencies

This package requires the following peer dependencies:

```json
{
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0",
  "antd": "^5.0.0",
  "imask": "^6.0.0 || ^7.0.0"
}
```

## Quick Start

```tsx
import { AntdInputMask } from "mfk-mask-input-antd";

function MyComponent() {
  return (
    <AntdInputMask
      mask="(000) 000-0000"
      placeholder="Enter phone number"
      onChange={(e) => {
        console.log("Masked:", e.maskedValue); // "(555) 123-4567"
        console.log("Unmasked:", e.unmaskedValue); // "5551234567"
      }}
    />
  );
}
```

## Usage Examples

### Phone Number

```tsx
<AntdInputMask mask="(000) 000-0000" placeholder="(555) 123-4567" />
```

### Credit Card

```tsx
<AntdInputMask mask="0000 0000 0000 0000" placeholder="1234 5678 9012 3456" />
```

### Date

```tsx
<AntdInputMask mask="00/00/0000" placeholder="DD/MM/YYYY" />
```

### Custom Patterns

```tsx
<AntdInputMask
  mask="AAA-000"
  definitions={{
    A: /[A-Z]/,
    "0": /[0-9]/,
  }}
  placeholder="ABC-123"
/>
```

### Multiple Masks (Dynamic)

```tsx
<AntdInputMask
  mask={[
    { mask: "(000) 000-0000" },
    { mask: "+0 (000) 000-0000" },
    { mask: "+00 (000) 000-0000" },
  ]}
  placeholder="Phone number"
/>
```

### Controlled Component

```tsx
import { useState } from "react";
import { AntdInputMask } from "mfk-mask-input-antd";

function ControlledExample() {
  const [value, setValue] = useState("");

  return (
    <AntdInputMask
      mask="0000-0000-0000-0000"
      value={value}
      onChange={(e) => setValue(e.maskedValue)}
    />
  );
}
```

### With Advanced IMask Options

```tsx
<AntdInputMask
  mask={Number}
  maskOptions={{
    scale: 2,
    thousandsSeparator: ",",
    radix: ".",
    mapToRadix: ["."],
    min: 0,
    max: 999999,
  }}
  placeholder="0.00"
/>
```

## API

### Props

All Ant Design Input props are supported, plus the following:

| Prop           | Type                             | Required | Description                                                                                              |
| -------------- | -------------------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `mask`         | `MaskType`                       | Yes      | Mask pattern or configuration. Can be a string, RegExp, Date, Number, function, or array of mask objects |
| `maskOptions`  | `InputMaskOptions`               | No       | Additional IMask configuration options                                                                   |
| `definitions`  | `object`                         | No       | Custom character definitions (e.g., `{ 'A': /[A-Z]/ }`)                                                  |
| `onChange`     | `(event: OnChangeEvent) => void` | No       | Change handler with extended event object                                                                |
| `value`        | `string`                         | No       | Controlled component value                                                                               |
| `defaultValue` | `string`                         | No       | Default value for uncontrolled usage                                                                     |

### Types

#### OnChangeEvent

The extended onChange event includes:

```tsx
interface OnChangeEvent {
  target: HTMLInputElement;
  maskedValue: string; // Formatted value with mask
  unmaskedValue: string; // Raw value without mask
  // ... standard event properties
}
```

#### MaskType

```tsx
type MaskType =
  | string
  | RegExp
  | typeof Number
  | typeof Date
  | ((value: string) => string)
  | Array<{ mask: string | RegExp /* other options */ }>;
```

## Advanced Usage

### Custom Definitions

Define custom placeholder characters:

```tsx
<AntdInputMask
  mask="00/00/0000"
  definitions={{
    "0": /[0-9]/, // Digit
    A: /[A-Z]/, // Uppercase letter
    a: /[a-z]/, // Lowercase letter
    "*": /[A-Za-z0-9]/, // Alphanumeric
  }}
/>
```

### With Form Integration

```tsx
import { Form } from "antd";
import { AntdInputMask } from "mfk-mask-input-antd";

function FormExample() {
  const [form] = Form.useForm();

  return (
    <Form form={form}>
      <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]}>
        <AntdInputMask
          mask="(000) 000-0000"
          onChange={(e) => {
            // Update form field with masked value
            form.setFieldValue("phone", e.maskedValue);
            // Or use unmasked value for API submission
            form.setFieldValue("phoneRaw", e.unmaskedValue);
          }}
        />
      </Form.Item>
    </Form>
  );
}
```

## IMask Documentation

For complete IMask options and patterns, see the [official IMask documentation](https://imask.js.org/guide.html).

## TypeScript

This package includes TypeScript definitions. Import types as needed:

```tsx
import type {
  MaskedInputProps,
  OnChangeEvent,
  InputMaskOptions,
} from "mfk-mask-input-antd";
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
