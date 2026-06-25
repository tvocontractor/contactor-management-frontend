import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DeviceProvider, useDeviceContext } from '../context/DeviceContext';
import '@testing-library/jest-dom';

test('DeviceContext can add a device', () => {
  const TestComponent = () => {
    const { devices, addDevice } = useDeviceContext();
    return (
      <div>
        <button onClick={() => addDevice({ id: '1', name: 'Test', status: 'active', type: 'sensor', location: 'Lab' })}>Add</button>
        <span data-testid="count">{devices.length}</span>
      </div>
    );
  };

  render(
    <DeviceProvider>
      <TestComponent />
    </DeviceProvider>
  );

  const count = screen.getByTestId('count');
  expect(count).toHaveTextContent('0');
  fireEvent.click(screen.getByText('Add'));
  expect(count).toHaveTextContent('1');
});
