import PropTypes from 'prop-types';

const FormatAmount = ({ amount }) => <span>¥ {amount}</span>;

FormatAmount.propTypes = {
    amount: PropTypes.number
};

export default FormatAmount;
