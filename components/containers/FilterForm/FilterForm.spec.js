import { shallow } from 'enzyme';
import { DatePicker, Select, Button } from 'antd';
import FilterForm from './FilterForm';
import FormAdd from '@/components/containers/FormAdd/FormAdd';
import moment from 'moment';

const setup = (props) => {
    const actions = {
        onChangeMonth: jest.fn(),
        onChangeCategory: jest.fn(),
        onReset: jest.fn(),
        onAdd: jest.fn()
    };
    const component = shallow(<FilterForm {...props} {...actions} />);

    return {
        actions,
        component,
        datePicker: component.find(DatePicker),
        categorySelector: component.find(Select),
        button: component.find(Button),
        FormAdd: component.find(FormAdd)
    };
};

/** @test {FilterForm Component} */
describe('FilterForm Component', () => {
    it('should pass this canary test', () => expect(true).toBe(true));

    it('should render DatePicker with defaultMonth', () => {
        const defaultMonth = moment();
        const { datePicker } = setup({ defaultMonth });
        expect(datePicker.prop('value')).toEqual(defaultMonth);
    });

    it('should render Select with defaultCategory', () => {
        const { categorySelector } = setup({ defaultCategory: 'option' });
        expect(categorySelector.prop('value')).toBe('option');
    });

    it('should call onChangeMonth', () => {
        const { actions, datePicker } = setup();
        datePicker.simulate('change');
        expect(actions.onChangeMonth).toBeCalled();
    });

    it('should call onChangeCategory', () => {
        const { actions, categorySelector } = setup();
        categorySelector.prop('onChange')(actions.onChangeCategory);
        expect(actions.onChangeCategory).toBeCalled();
    });

    it('should call onReset', () => {
        const { actions, button } = setup();
        button.at(0).simulate('click');
        expect(actions.onReset).toBeCalled();
    });

    it('should call onAdd', () => {
        const { actions, FormAdd } = setup();
        FormAdd.prop('onAdd')(actions.onAdd);
        expect(actions.onAdd).toBeCalled();
    });
});
