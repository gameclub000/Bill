import PropTypes from 'prop-types';
import { DatePicker, Select, Space, Button } from 'antd';

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
                defaultValue={defaultMonth}
                onChange={onChangeMonth}
                picker="month"
            />
            <Select defaultValue={defaultCategory} onChange={onChangeCategory}>
                {categoryDict.map((item) => (
                    <Option value={item.id}>{item.name}</Option>
                ))}
            </Select>
            <Button type="plain" onClick={onReset}>
                重置
            </Button>
            <Button type="primary" onClick={onAdd}>
                新增
            </Button>
        </Space>
    );
}

FilterForm.propTypes = {
    defaultMonth: PropTypes.object,
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
    onChangeMonth: (e) => {
        e.preventDefault();
    },
    onChangeCategory: (e) => {
        e.preventDefault();
    },
    onReset: (e) => {
        e.preventDefault();
    },
    onAdd: (e) => {
        e.preventDefault();
    }
};

export default FilterForm;
