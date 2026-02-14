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
    <>
    <a
        href="https://github.com/FatihKaratepe/mfk-mask-input-antd"
        className="github-corner"
        aria-label="View source on GitHub"
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 250 250"
          style={{ fill: '#151513', color: '#fff', position: 'absolute', top: '0', right: '0', border: '0' }}
          aria-hidden="true"
        >
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            style={{ transformOrigin: '130px 106px' }}
            className="octo-arm"
          />
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            className="octo-body"
          />
        </svg>
      </a>

    
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
    </>
  );
}

export default App;
