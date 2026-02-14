# Mask Input Antd

A powerful and flexible masked input component for Ant Design built with IMask.

## 📦 Package

The npm package is located in the `lib/` directory. See [lib/README.md](lib/README.md) for full documentation.

### Quick Install

```bash
npm install mfk-mask-input-antd
```

### Quick Example

```tsx
import { AntdInputMask } from "mfk-mask-input-antd";

<AntdInputMask
  mask="(000) 000-0000"
  placeholder="Phone number"
  onChange={(e) => console.log(e.maskedValue, e.unmaskedValue)}
/>;
```

## 🚀 Demo

A live demo application is available in the `demo/` directory. To run it:

```bash
cd demo
npm install
npm run dev
```

## 📁 Project Structure

```
mask-input-antd/
├── lib/          # NPM package source
├── demo/         # Demo application
├── LICENSE
├── CHANGELOG.md
└── README.md
```

## 🔧 Development

### Building the Library

```bash
cd lib
npm install
npm run build
```

### Running the Demo

```bash
cd demo
npm install
npm run dev
```

## 📖 Documentation

For complete API documentation, usage examples, and TypeScript support, see:

- [Library README](lib/README.md)
- [Demo Application](demo/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT - See [LICENSE](LICENSE) for details.

## 🔗 Links

- **IMask**: https://imask.js.org/
- **Ant Design**: https://ant.design/
