import { Card, Col, Row, Select } from 'antd';
import { useMemo, useState } from 'react';
import { AntdInputMask, IMask } from 'mfk-mask-input-antd';
import { phoneCodes } from './constants/phone-codes';

function App() {
  const [selectedCountry, setSelectedCountry] = useState<string>('US');
  const [value, setValue] = useState<string>('');
  const countries = Object.keys(phoneCodes).map((code) => ({ label: code, value: code }));

  const masks = useMemo(() => {
    if (!selectedCountry) return 'US';
    const code = phoneCodes[selectedCountry];
    return Array.isArray(code) ? code.map((m) => ({ mask: m })) : code;
  }, [selectedCountry]);

  return (
    <div className="container">
      <h1>Mask Input for RC Input and Ant Design</h1>

      <Row gutter={[20, 20]}>
        <Col span={24}>
          <p style={{ display: 'flex', gap: '10px' }}>
            <a href="https://github.com/react-component/input" target="_blank" rel="noopener noreferrer">
              RC Input
            </a>
            --
            <a href="https://ant.design/components/input" target="_blank" rel="noopener noreferrer">
              Ant Design Input
            </a>
          </p>
          <p>
            The <code>&lt;MaskInput /&gt;</code> component is built for both{' '}
            <a href="https://imask.js.org/guide.html" target="_blank" rel="noopener noreferrer">
              IMask
            </a>{' '}
            and{' '}
            <a href="https://ant.design/components/input" target="_blank" rel="noopener noreferrer">
              Ant Design Input
            </a>
          </p>
          <p>
            The <code>&lt;MaskInput /&gt;</code> component supports all props available in the Ant Design Input
            component.
          </p>
        </Col>
        <Col span={24}>
          <h2>Examples</h2>
        </Col>
        <Col span={24}>
          <Card title="Phone Number">
            <Row gutter={[12, 12]}>
              <Col span={6}>
                <Select
                  style={{ width: '100%' }}
                  showSearch
                  options={countries}
                  onChange={(val) => {
                    setSelectedCountry(val);
                    setValue('');
                  }}
                  value={selectedCountry}
                />
              </Col>
              <Col span={18}>
                <AntdInputMask
                  value={value}
                  onChange={(e: any) => setValue(e.maskedValue)}
                  mask={masks}
                  placeholder="Enter phone number"
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Only Number">
            <Row gutter={[15, 15]}>
              <Col span={24}>
                <h3>Only Number</h3>
                <AntdInputMask mask={Number} placeholder="You can enter only numbers" />
              </Col>
              <Col span={24}>
                <h3>Only Number (max: 35)</h3>
                <AntdInputMask mask={Number} maskOptions={{ max: 35 } as never} placeholder="You can enter only numbers (max: 35)" />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Date">
            <AntdInputMask
              mask={Date}
              maskOptions={{
                pattern: 'Y-`m-`d',
                blocks: {
                  d: {
                    mask: IMask.MaskedRange,
                    from: 1,
                    to: 31,
                    maxLength: 2,
                  },
                  m: {
                    mask: IMask.MaskedRange,
                    from: 1,
                    to: 12,
                    maxLength: 2,
                  },
                  Y: {
                    mask: IMask.MaskedRange,
                    from: 1900,
                    to: 9999,
                  },
                },
                format: (date:Date) => {
                  const day = String(date.getDate()).padStart(2, '0');
                  const month = String(date.getMonth() + 1).padStart(2, '0');
                  const year = date.getFullYear();

                  return [year, month, day].join('-');
                },

                parse: (str:string) => {
                  const [year, month, day] = str.split('-').map((a) => Number(a));
                  return new Date(year, month - 1, day);
                },

                autofix: 'pad',
                lazy: true,
                overwrite: true,
              }}
              placeholder="YYYY-MM-DD"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;
