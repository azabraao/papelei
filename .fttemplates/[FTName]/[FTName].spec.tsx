import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import [FTName] from './index';

describe('[FTName]', () => {
  it('should render', () => {
    expect(render(<[FTName] />)).toBeTruthy();
  });
});