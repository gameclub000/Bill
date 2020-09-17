import { toDatetime } from '@/utils/utcToLocal';
import PropTypes from 'prop-types';

const FormatTime = ({ time }) => <span>{toDatetime(time)}</span>;

FormatTime.propTypes = {
    time: PropTypes.number
};

export default FormatTime;
