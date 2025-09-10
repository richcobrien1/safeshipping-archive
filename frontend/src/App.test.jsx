// src/App.test.jsx

import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './auth/AuthContext';
import { BrowserRouter } from 'react-router-dom';

test('renders app without crashing', () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );

  // ✅ Option 1: Role-based heading level (h4)
  expect(
    screen.getByRole('heading', { name: /SafeShipping Login/i, level: 4 })
  ).toBeInTheDocument();

  // ✅ Option 2: Test ID — requires heading in LoginPage.jsx to include data-testid="login-heading"
  // expect(screen.getByTestId('login-heading')).toHaveTextContent(/SafeShipping Login/i);
});
