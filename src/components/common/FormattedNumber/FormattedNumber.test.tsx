import React from 'react';
import { shallow } from 'enzyme';
import FormattedNumber, { FormattedNumberProps } from './FormattedNumber';
import styles from './FormattedNumber.module.less';

const className = 'some_class_name';

describe('FormattedNumber component', () => {
  it('renders without crashing and assigns className prop', () => {
    const happyPathProps: FormattedNumberProps = {
      type: 'currency',
      value: 123.99,
      currency: 'USD',
      precision: 2,
      className,
    };

    const wrapper = shallow(<FormattedNumber {...happyPathProps} />);
    expect(wrapper.find(`.${styles.container}`).hasClass(className)).toBe(true);
  });

  describe('handles precision correctly', () => {
    const props: FormattedNumberProps = {
      type: 'currency',
      value: 123456789.991,
      currency: 'USD',
      className,
    };

    it('applies default precision === 2 if not specified', () => {
      expect(
        shallow(<FormattedNumber {...props} />)
          .find(`.${className}`)
          .text()
      ).toBe('$123,456,789.99');
    });

    it('applies precision if precision >= 0', () => {
      expect(
        shallow(<FormattedNumber {...props} precision={0} />)
          .find(`.${className}`)
          .text()
      ).toBe('$123,456,790');
      expect(
        shallow(<FormattedNumber {...props} precision={1} />)
          .find(`.${className}`)
          .text()
      ).toBe('$123,456,790.0');
    });

    it('applies default precision if precision < 0', () => {
      expect(
        shallow(<FormattedNumber {...props} precision={-1} />)
          .find(`.${className}`)
          .text()
      ).toBe('$123,456,789.99');
    });
  });

  it('applies $###,###.## formatting (where $ is a sign for USD currency) to the value prop if type==currency', () => {
    const currencyProps: FormattedNumberProps = {
      type: 'currency',
      value: 123456789.991,
      currency: 'USD',
      className,
      precision: 2,
    };

    // value is a number
    expect(
      shallow(<FormattedNumber {...currencyProps} />)
        .find(`.${className}`)
        .text()
    ).toBe('$123,456,789.99');

    // value is a string parsable to number
    expect(
      shallow(<FormattedNumber {...currencyProps} value="123456789.991" />)
        .find(`.${className}`)
        .text()
    ).toBe('$123,456,789.99');
  });

  it('applies ###,###.## formatting to the value prop if type==number', () => {
    const numberProps: FormattedNumberProps = {
      type: 'number',
      value: 123456789.991,
      className,
    };

    expect(
      shallow(<FormattedNumber {...numberProps} />)
        .find(`.${className}`)
        .text()
    ).toBe('123,456,789.99');
    // precision
    expect(
      shallow(<FormattedNumber {...numberProps} value="123456789.991" precision={3} />)
        .find(`.${className}`)
        .text()
    ).toBe('123,456,789.991');
  });

  it('displays unparsable value string as it is', () => {
    const numberProps: FormattedNumberProps = {
      type: 'number',
      value: '123456789 991',
      className,
    };

    expect(
      shallow(<FormattedNumber {...numberProps} />)
        .find(`.${className}`)
        .text()
    ).toBe('123456789 991');

    const currencyProps: FormattedNumberProps = {
      type: 'currency',
      value: '123456789 991',
      currency: 'USD',
      className,
    };

    expect(
      shallow(<FormattedNumber {...currencyProps} />)
        .find(`.${className}`)
        .text()
    ).toBe('$123456789 991');
  });
});
