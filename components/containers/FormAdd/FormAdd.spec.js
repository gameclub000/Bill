import { shallow } from 'enzyme';
import { DatePicker, Select, Button } from 'antd';
import FormAdd from './FormAdd';

const setup = (props) => {
    const actions = {
        onAdd: jest.fn()
    };
    const component = shallow(<FormAdd {...props} {...actions} />);

    return {
        actions,
        component
    };
};

/** @test {FormAdd Component} */
describe('FormAdd Component', () => {
    it('should pass this canary test', () => expect(true).toBe(true));
});
