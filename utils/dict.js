export default function dict({
    key = '',
    dictionary = [],
    id = 'id',
    name = 'name',
    defaultValue = '--'
} = {}) {
    if (key === '' || dictionary.length === 0) {
        return defaultValue;
    }
    const target = dictionary.find((item) => item[id] === key);
    if (target) {
        return target[name];
    } else {
        return defaultValue;
    }
}
