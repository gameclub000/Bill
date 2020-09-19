import dict from '@/utils/dict';
import PropTypes from 'prop-types';

const BillCategory = ({ category, categoryDict }) => (
    <span>{dict({ key: category, dictionary: categoryDict })}</span>
);

BillCategory.propTypes = {
    category: PropTypes.string,
    categoryDict: PropTypes.array
};

export default BillCategory;
