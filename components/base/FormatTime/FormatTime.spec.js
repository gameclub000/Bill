import { mount } from 'enzyme';
import FormatTime from '@/components/base/FormatTime/FormatTime';
import { toDatetime } from '@/utils/utcToLocal';

/** @test {FormatTime Component} */
describe('FormatTime Component', () => {
    it('should pass this canary test', () => expect(true).toBe(true));

    it('should render without crashing', () => {
        const time = 1600332073914;
        const wrapper = mount(<FormatTime time={time} />);
        expect(wrapper.text()).toBe(toDatetime(time));
    });
});
