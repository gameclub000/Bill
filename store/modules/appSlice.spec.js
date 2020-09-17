import appSlice, { setLanguage } from './appSlice';

describe('appSlice', () => {
    it('should pass this canary test', () => expect(true).toBe(true));

    it('should hande setLanguage action', () => {
        expect(
            appSlice(
                {
                    language: 'en'
                },
                setLanguage('zh_CN')
            )
        ).toEqual({ language: 'zh_CN' });
    });
});
