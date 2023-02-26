import { act, render } from '@testing-library/react';
import { App } from './App';

test('renders without crashing', () => {
  let baseElement;
  act(() => {
    baseElement = render(<App />);
  })
  expect(baseElement).toBeDefined();
});
