import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function utcToLocal(value, format) {
    const timeStr = String(value);
    if (/^\d{10}$/.test(timeStr)) {
        return dayjs.unix(Number(value)).format(format);
    } else if (/^\d{13}$/.test(timeStr)) {
        return dayjs(Number(value)).format(format);
    } else {
        try {
            const time = dayjs.utc(timeStr);
            return time.isValid() ? time.local().format(format) : '';
        } catch (e) {
            return '';
        }
    }
}

export function toTime(value, format = 'HH:mm:ss') {
    return utcToLocal(value, format);
}

export function toDate(value, format = 'YYYY-MM-DD') {
    return utcToLocal(value, format);
}

export function toDatetime(value, format = 'YYYY-MM-DD HH:mm:ss') {
    return utcToLocal(value, format);
}
