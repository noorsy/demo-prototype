import React, { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const Login = () => {
  const [currentStep, setCurrentStep] = useState('login'); // 'login' or '2fa'
  const [selectedRegion, setSelectedRegion] = useState('india');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [twoFACode, setTwoFACode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState(''); // 'email' or 'google'

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginMethod('email');
    
    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('2fa');
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setLoginMethod('google');
    // Simulate Google OAuth
    setTimeout(() => {
      setIsLoading(false);
      setCurrentStep('2fa');
    }, 1500);
  };

  const handleTwoFAInput = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...twoFACode];
      newCode[index] = value;
      setTwoFACode(newCode);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`twofa-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleTwoFAKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !twoFACode[index] && index > 0) {
      const prevInput = document.getElementById(`twofa-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleAuthenticate = () => {
    setIsLoading(true);
    // Simulate 2FA verification
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to dashboard
      window.location.href = '/dashboard';
    }, 1500);
  };

  const goBack = () => {
    setCurrentStep('login');
    setTwoFACode(['', '', '', '', '', '']);
    setLoginMethod('');
  };

  if (currentStep === '2fa') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">skit.ai</span>
            </div>
          </div>

          <div className="bg-white py-12 px-8 shadow-lg rounded-xl border border-gray-200">
            {/* Main Heading with Icon */}
            <div className="text-center mb-12">
              {/* Small Method Icon */}
              <div className="flex justify-center mb-4">
                {loginMethod === 'email' ? (
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                )}
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Enter verification code
              </h1>
              {loginMethod === 'email' ? (
                <div className="flex items-center justify-center space-x-2 text-gray-600 text-base">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Sent to <span className="font-medium text-gray-900">{email || 'your email'}</span></span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2 text-gray-600 text-base">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Check your authenticator app</span>
                </div>
              )}
            </div>

            {/* 2FA Code Input */}
            <div className="mb-10">
              <div className="flex justify-center space-x-3 mb-3">
                {twoFACode.map((digit, index) => (
                  <input
                    key={index}
                    id={`twofa-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleTwoFAInput(index, e.target.value)}
                    onKeyDown={(e) => handleTwoFAKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none transition-colors"
                    placeholder="0"
                  />
                ))}
              </div>
              
              {/* Subtle status indicator */}
              <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{loginMethod === 'email' ? 'Code expires in 10 minutes' : 'Code refreshes every 30 seconds'}</span>
              </div>
            </div>

            {/* Authenticate Button */}
            <button
              onClick={handleAuthenticate}
              disabled={twoFACode.some(digit => !digit) || isLoading}
              className="w-full py-3 px-4 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-lg mb-8"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </div>
              ) : (
                'Verify and continue'
              )}
            </button>

            {/* Icon-Enhanced Footer */}
            <div className="text-center space-y-4">
              {loginMethod === 'email' ? (
                <button className="flex items-center justify-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mx-auto">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Resend code</span>
                </button>
              ) : (
                <button className="flex items-center justify-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors mx-auto">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  <span>Use backup code</span>
                </button>
              )}
              
              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={goBack}
                  className="flex items-center justify-center space-x-2 text-sm text-gray-500 hover:text-gray-700 transition-colors mx-auto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  <span>Back to login</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">skit.ai</span>
          </div>
        </div>

        <div className="bg-white py-8 px-6 shadow-lg rounded-xl border border-gray-200">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Log in to Workspace
            </h2>
            <p className="text-sm text-gray-600">We'll authenticate you in the next step</p>
          </div>

          {/* Region Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select your region
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="region"
                  value="india"
                  checked={selectedRegion === 'india'}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300"
                />
                <span className="ml-3 text-sm font-medium text-gray-900">India</span>
                <span className="ml-2 text-xs text-gray-500">Not logged in</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="region"
                  value="us"
                  checked={selectedRegion === 'us'}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300"
                />
                <span className="ml-3 text-sm font-medium text-gray-900">US</span>
                <span className="ml-2 text-xs text-gray-500">Not logged in</span>
              </label>
            </div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex justify-center items-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-6"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="nooruzz@mailinator.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none relative block w-full px-3 py-3 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </div>
              ) : (
                'Log in'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By logging in, you agree to Privacy Policy of Skit.ai
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 