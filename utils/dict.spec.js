import dict from './dict';

describe('Util dict', () => {
    it('should pass this canary test', () => expect(true).toBe(true));

    it('should return default value as -- when no parameter', () => {
        const result = dict();
        expect(result).toBe('--');
    });

    it('should return default when key is empty string', () => {
        const parameter = { key: '', defaultValue: 'defaultValue' };
        const result = dict(parameter);
        expect(result).toBe(parameter.defaultValue);
    });

    it('should return value as -- when dict is empty array', () => {
        const parameter = { key: 'key', dictionary: [] };
        const result = dict(parameter);
        expect(result).toBe('--');
    });

    it('should return value from dict', () => {
        const parameter = {
            key: 'label1',
            dictionary: [{ id: 'label1', name: 'label1' }]
        };
        const result = dict(parameter);
        expect(result).toBe('label1');
    });
});
