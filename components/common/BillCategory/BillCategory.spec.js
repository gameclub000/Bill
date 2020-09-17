import { mount } from 'enzyme';
import BillCategory from '@/components/common/BillCategory/BillCategory';
import dict from '@/utils/dict';

/** @test {BillCategory Component} */
describe('BillCategory Component', () => {
    it('should pass this canary test', () => expect(true).toBe(true));

    it('shoud render category', () => {
        const category = 'buy';
        const categoryDict = [
            {
                id: 'buy',
                name: '购买'
            },
            {
                id: 'sell',
                name: '出售'
            }
        ];
        const wrapper = mount(<BillCategory category={category} categoryDict={categoryDict} />);
        expect(wrapper.text()).toBe(dict({ key: category, dictionary: categoryDict }));
    });
});
