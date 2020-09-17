import { mount } from 'enzyme';
import { Table } from 'antd';
import BillList from './BillList';
import BillType from '@/components/common/BillType/BillType';
import BillCategory from '@/components/common/BillCategory/BillCategory';
import FormatTime from '@/components/base/FormatTime/FormatTime';
import FormatAmount from '@/components/base/FormatAmount/FormatAmount';

const setup = (props) => {
    const component = mount(
        <BillList dataSource={props.dataSource} categoryDict={props.categoryDict} />
    );

    return {
        component: component,
        table: component.find(Table),
        time: component.find(FormatTime),
        type: component.find(BillType),
        category: component.find(BillCategory),
        amount: component.find(FormatAmount)
    };
};

const data = [
    {
        key: '1',
        time: new Date().getTime(),
        type: 1,
        category: '1bcddudhmh',
        amount: 300
    },
    {
        key: '2',
        time: new Date().getTime(),
        type: 0,
        category: '1bcddudhmh',
        amount: 300
    },
    {
        key: '3',
        time: new Date().getTime(),
        type: 1,
        category: '1bcddudhmh',
        amount: 300
    }
];

/** @test {BillList Component} */
describe('BillList Component', () => {
    beforeEach(() => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // deprecated
                removeListener: jest.fn(), // deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn()
            }))
        });
    });

    it('should pass this canary test', () => expect(true).toBe(true));

    it('should render Table', () => {
        const { table } = setup({
            dataSource: data,
            categoryDict: []
        });
        expect(table.prop('dataSource')).toEqual(data);
    });

    it('shoud render column', () => {
        const categoryDict = [{ id: '1', name: '1' }];
        const { time, type, category, amount } = setup({
            dataSource: data,
            categoryDict
        });
        expect(time.at(0).prop('time')).toBe(data[0].time);
        expect(category.at(0).prop('category')).toBe(data[0].category);
        expect(category.at(0).prop('categoryDict')).toBe(categoryDict);
        expect(type.at(0).prop('type')).toBe(data[0].type);
        expect(amount.at(0).prop('amount')).toBe(data[0].amount);
    });
});
