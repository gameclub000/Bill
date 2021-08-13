import PropTypes from 'prop-types';
import { Tag } from 'antd';

function BillType({ type }) {
    const color = type === 0 ? 'red' : 'green';
    const text = type === 0 ? '支出' : '收入';

    if ([0, 1].every((item) => item !== type)) {
        return <span>Invalid type</span>;
    } else {
        return <Tag color={color}>{text}</Tag>;
    }
}

BillType.propTypes = {
    type: PropTypes.number
};

export default BillType;
