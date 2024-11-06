import { render } from '@testing-library/react-native';

import AboutUsScreen from '@/app/aboutUs';

describe('<HomeScreen />', () => {
  test('Text renders correctly on HomeScreen', () => {
    const { getByText } = render(<AboutUsScreen />);

    getByText('Welcome!');
  });
});
