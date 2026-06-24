// src/__tests__/MaintenanceLog.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MaintenanceLog from '../components/MaintenanceLog';
import '@testing-library/jest-dom';

test('renders maintenance items with search and pagination', async () => {
  render(<MaintenanceLog />);

  // initial render shows first page (10 items)
  await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(10));

  // search for a specific maintenance task
  const searchInput = screen.getByPlaceholderText('Search maintenance...');
  fireEvent.change(searchInput, { target: { value: 'task #2' } });
  await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(1));
  expect(screen.getByText(/Maintenance task #2/)).toBeInTheDocument();

  // clear search and go to next page
  fireEvent.change(searchInput, { target: { value: '' } });
  await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(10));
  const nextBtn = screen.getByText('Next');
  fireEvent.click(nextBtn);
  await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(10));
});
