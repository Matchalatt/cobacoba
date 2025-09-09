
import React, { useContext, useState } from 'react';
import { AuthContext } from '../App';

const LoginPage: React.FC = () => {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState('demo@example.com');
  const [password, setPassword] = useState('password');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (auth) {
      auth.login();
    }
  };

  const Icon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary-500">
        <path d="M12.54 2.13a1 1 0 0 0-1.08 0l-7.5 5.25a1 1 0 0 0 .54 1.87l1.4 1.25a1 1 0 0 0 1.12 0l4-2.5a1 1 0 0 1 1.08 0l4 2.5a1 1 0 0 0 1.12 0l1.4-1.25a1 1 0 0 0 .54-1.87l-7.5-5.25Z" />
        <path d="m5 12 7 4.5 7-4.5" />
        <path d="M12 22V16.5" />
    </svg>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md space-y-8 p-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transform transition-all hover:scale-105 duration-500">
        <div className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
              <Icon />
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Gemini Dashboard</h1>
            </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to access your e-commerce panel.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm transition duration-300"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm transition duration-300"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 transition">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-offset-gray-800 transition-transform transform hover:scale-105 duration-300"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            Using demo credentials. Click "Sign in" to continue.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
