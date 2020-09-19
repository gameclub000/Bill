import PropTypes from 'prop-types';
import React from 'react';
import { Donut } from '@ant-design/charts';

function BillDonut({ dataSource, description, totalExpenditure, totalIncome }) {
    const config = {
        forceFit: true,
        title: {
            visible: true,
            text: '账单统计'
        },
        description: {
            visible: true,
            text: `总收入：¥ ${totalIncome} | 总支出：¥ ${totalExpenditure}`
        },
        radius: 0.8,
        padding: 'auto',
        data: dataSource,
        angleField: 'value',
        colorField: 'type'
    };
    return <Donut {...config} />;
}

BillDonut.propTypes = {
    dataSource: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string,
            value: PropTypes.number
        })
    ),
    totalExpenditure: PropTypes.number,
    totalIncome: PropTypes.number
};

BillDonut.defaultProps = {
    dataSource: [],
    totalExpenditure: 0,
    totalIncome: 0
};

export default BillDonut;
