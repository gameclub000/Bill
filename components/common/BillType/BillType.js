import PropTypes from 'prop-types';
import { Tag } from 'antd';

function BillType({ type }) {
    const color = type === 0 ? 'red' : 'green';
    const text = type === 0 ? '支出' : '收入';

    return [0, 1].every((item) => item !== type) ? <span>Invalid type</span>:<Tag color={color}>{text}</Tag>
}

BillType.propTypes = {
    type: PropTypes.number
};

export default BillType;
