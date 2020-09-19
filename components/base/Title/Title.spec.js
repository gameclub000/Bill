import { mount } from 'enzyme';

import Title from '@/components/base/Title/Title';

/** @test {Title Component} */
describe('Title Component', () => {
    it('should render without crashing', () => {
        const label = 'test';
        const wrapper = mount(<Title label={label} />);
        expect(wrapper.find('h1').text()).toBe(label);
    });
});
