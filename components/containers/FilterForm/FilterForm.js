import PropTypes from 'prop-types';
import { DatePicker, Select, Space, Button } from 'antd';
import FormAdd from '@/components/containers/FormAdd/FormAdd';

const { Option } = Select;

function FilterForm({
    defaultMonth,
    defaultCategory,
    categoryDict,
    onChangeMonth,
    onChangeCategory,
    onReset,
    onAdd
}) {
    return (
        <Space>
            <DatePicker
                value={defaultMonth}
                onChange={onChangeMonth}
                picker="month"
            />
            <Select
                style={{ width: 200 }}
                value={defaultCategory}
                onChange={onChangeCategory}
            >
                {categoryDict.map((item) => (
                    <Option value={item.id} key={item.id}>
                        {item.name}
                    </Option>
                ))}
            </Select>
            <Button type="plain" onClick={onReset}>
                重置
            </Button>
            <FormAdd onAdd={onAdd} categoryDict={categoryDict} />
        </Space>
    );
}

FilterForm.propTypes = {
    defaultMonth: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    defaultCategory: PropTypes.string,
    categoryDict: PropTypes.array,
    onChangeMonth: PropTypes.func,
    onChangeCategory: PropTypes.func,
    onReset: PropTypes.func,
    onAdd: PropTypes.func
};

FilterForm.defaultProps = {
    defaultMonth: null,
    defaultCategory: '',
    categoryDict: [],
    onChangeMonth: (e) => {},
    onChangeCategory: (e) => {},
    onReset: (e) => {},
    onAdd: (e) => {}
};

export default FilterForm;
