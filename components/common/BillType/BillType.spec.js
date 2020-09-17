import { shallow } from 'enzyme';
import { Tag } from 'antd';
import BillType from './BillType';

const setup = (props) => {
    const component = shallow(<BillType type={props.type} />);

    return {
        component: component,
        tag: component.find(Tag)
    };
};

/** @test {BillType Component} */
describe('BillType Component', () => {
    it('should pass this canary test', () => expect(true).toBe(true));

    it('should render Tag with color and text', () => {
        const type = 0;
        const { tag } = setup({ type });
        expect(tag.prop('color')).toBe('red');
        expect(tag.prop('children')).toBe('支出');
    });

    describe('when type is 1', () => {
        it('should render Tag with color and text when type is 1', () => {
            const type = 1;
            const { tag } = setup({ type });
            expect(tag.prop('color')).toBe('green');
            expect(tag.prop('children')).toBe('收入');
        });
    });

    describe('when type invalid', () => {
        it('should render error tip when type invalid', () => {
            const type = -1;
            const { component } = setup({ type });
            expect(component.text()).toBe('Invalid type');
        });
    });
});
