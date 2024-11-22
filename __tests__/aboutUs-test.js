import { render } from '@testing-library/react-native';

import AboutUsScreen from '../app/aboutUs';

describe('<AboutUsScreen />', () => {
  test('renders correctly and matches snapshot', () => {
    const { toJSON } = render(<AboutUsScreen />);

    expect(toJSON()).toMatchSnapshot();
  });
});
