import React from 'react';

import { render, cleanup, waitForElement } from '@testing-library/react';

import Application from 'components/Application';
import { fireEvent } from '@testing-library/react/dist';
import { exportAllDeclaration } from '@babel/types';

afterEach(cleanup);

describe('Application', () => {
  // it('renders without crashing', () => {
  //   render(<Application />);
  it('changes the schedule when a new day is selected', async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText('Monday'));

    fireEvent.click(getByText('Tuesday'));

    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });
});
