import { Table } from 'antd';
import PropTypes from 'prop-types';
import BillType from '@/components/common/BillType/BillType';
import BillCategory from '@/components/common/BillCategory/BillCategory';
import FormatTime from '@/components/base/FormatTime/FormatTime';
import FormatAmount from '@/components/base/FormatAmount/FormatAmount';

// TODO: render table with store data.
function BillList({ dataSource, categoryDict }) {
    const columns = [
        {
            title: '时间',
            dataIndex: 'time',
            key: 'time',
            render: (text) => <FormatTime time={text} />
        },
        {
            title: '分类',
            dataIndex: 'category',
            key: 'category',
            render: (text) => <BillCategory category={text} categoryDict={categoryDict} />
        },
        {
            title: '金额',
            dataIndex: 'amount',
            key: 'amount',
            render: (text) => <FormatAmount amount={text} />
        },
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: (text) => <BillType type={text} />
        }
    ];

    return <Table bordered columns={columns} dataSource={dataSource} />;
}

BillList.propTypes = {
    dataSource: PropTypes.array,
    categoryDict: PropTypes.array
};

export default BillList;
