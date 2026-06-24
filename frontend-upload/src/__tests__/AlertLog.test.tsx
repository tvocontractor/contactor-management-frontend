// src/__tests__/AlertLog.test.tsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import axios from 'axios';
import AlertLog from '../components/AlertLog';
import '@testing-library/jest-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockAlerts = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  message: `Alert ${i + 1}`,
  timestamp: new Date().toISOString(),
}));

test('renders alerts after fetch and supports search & pagination', async () => {
  mockedAxios.get.mockResolvedValueOnce({ data: mockAlerts });

  render(<AlertLog />);

  // initially loading
  expect(screen.getByText(/Loading alerts.../i)).toBeInTheDocument();

  // wait for alerts to load
  await waitFor(() => expect(screen.queryByText(/Loading alerts.../i)).not.toBeInTheDocument());

  // first page should show 10 items
  expect(screen.getAllByRole('listitem')).toHaveLength(10);

  // search for a specific alert
  const searchInput = screen.getByPlaceholderText('Search alerts...');
  fireEvent.change(searchInput, { target: { value: 'Alert 2' } });
  await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(1));
  expect(screen.getByText('Alert 2')).toBeInTheDocument();

  // clear search
  fireEvent.change(searchInput, { target: { value: '' } });
  await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(10));

  // go to next page
  const nextBtn = screen.getByText('Next');
  fireEvent.click(nextBtn);
  await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(10));
});
