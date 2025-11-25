import { useTheme } from '../App';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#F5F7FA] to-white dark:from-[#0F0F1E] dark:to-[#1A1A2E] transition-colors duration-300">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:scale-110 transition-all"
      >
        {isDark ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFD93D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5B8CFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>

      {/* App Icon */}
      <div className="mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-[#5B8CFF] to-[#7FA8FF] rounded-3xl flex items-center justify-center shadow-lg">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          </svg>
        </div>
      </div>

      {/* App Title */}
      <h1 className="text-[#1C1C1E] dark:text-white mb-2 transition-colors duration-300" style={{ fontSize: '32px', fontWeight: '600', letterSpacing: '-0.5px' }}>Diary App</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-12 transition-colors duration-300">Your personal space for thoughts</p>

      {/* Primary Login Button */}
      <button
        onClick={onLogin}
        className="w-full bg-[#5B8CFF] text-white py-4 rounded-2xl shadow-lg hover:bg-[#4A7BEF] transition-all hover:scale-[1.02] mb-6"
      >
        Login
      </button>

      {/* Divider */}
      <div className="flex items-center w-full mb-6">
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700 transition-colors duration-300"></div>
        <span className="px-4 text-gray-500 dark:text-gray-400 text-sm transition-colors duration-300">Or continue with</span>
        <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700 transition-colors duration-300"></div>
      </div>

      {/* Social Login Buttons */}
      <div className="w-full space-y-3">
        <button
          onClick={onLogin}
          className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 py-4 rounded-2xl flex items-center justify-center gap-3 hover:border-gray-300 dark:hover:border-gray-600 transition-all shadow-sm hover:scale-[1.02]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <span className="text-[#1C1C1E] dark:text-white transition-colors duration-300">Continue with Google</span>
        </button>

        <button
          onClick={onLogin}
          className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 py-4 rounded-2xl flex items-center justify-center gap-3 hover:border-gray-300 dark:hover:border-gray-600 transition-all shadow-sm hover:scale-[1.02]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#1C1C1E] dark:text-white transition-colors duration-300">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span className="text-[#1C1C1E] dark:text-white transition-colors duration-300">Continue with GitHub</span>
        </button>
      </div>

      {/* Footer */}
      <p className="text-gray-400 dark:text-gray-500 text-xs mt-12 text-center transition-colors duration-300">
        By continuing, you agree to our Terms & Privacy Policy
      </p>
    </div>
  );
}
