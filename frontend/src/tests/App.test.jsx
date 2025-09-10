// src/tests/App.test.jsx

import { render, screen } from '@testing-library/react';
import App from '../App';
import { AuthProvider } from '../auth/AuthContext';
import { BrowserRouter } from 'react-router-dom';

test('renders SafeShipping title', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );

  // ✅ Option 1: Specific heading level
  expect(
    screen.getByRole('heading', { name: /SafeShipping Login/i, level: 4 })
  ).toBeInTheDocument();

  // ✅ Option 2: With test ID (requires JSX update)
  // expect(screen.getByTestId('login-heading')).toHaveTextContent(/SafeShipping Login/i);
});
