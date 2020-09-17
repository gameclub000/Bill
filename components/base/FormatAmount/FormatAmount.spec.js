import { mount } from 'enzyme';

import FormatAmount from '@/components/base/FormatAmount/FormatAmount';

/** @test {FormatAmount Component} */
describe('FormatAmount Component', () => {
    it('should render without crashing', () => {
        const amount = 100;
        const wrapper = mount(<FormatAmount amount={amount} />);
        expect(wrapper.text()).toBe('¥ 100');
    });
});
