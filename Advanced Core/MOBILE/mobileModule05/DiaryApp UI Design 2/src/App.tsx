import { useState, createContext, useContext } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AgendaScreen } from './components/AgendaScreen';

export type Feeling = 'happy' | 'sad' | 'excited' | 'calm' | 'anxious';

export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  date: Date;
  feeling: Feeling;
}

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ isDark: false, toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<'login' | 'profile' | 'agenda'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [entries, setEntries] = useState<DiaryEntry[]>([
    {
      id: '1',
      title: 'Beautiful Morning Walk',
      content: 'Started my day with a wonderful walk in the park. The weather was perfect and I felt so refreshed.',
      date: new Date(2025, 10, 24),
      feeling: 'happy'
    },
    {
      id: '2',
      title: 'Work Presentation',
      content: 'Had a big presentation at work today. I was nervous but it went really well!',
      date: new Date(2025, 10, 23),
      feeling: 'excited'
    },
    {
      id: '3',
      title: 'Meditation Session',
      content: 'Spent 30 minutes meditating this evening. Feeling peaceful and centered.',
      date: new Date(2025, 10, 22),
      feeling: 'calm'
    },
    {
      id: '4',
      title: 'Family Dinner',
      content: 'Had a lovely dinner with the family. We laughed and shared stories from our week.',
      date: new Date(2025, 10, 21),
      feeling: 'happy'
    },
    {
      id: '5',
      title: 'Rainy Day Blues',
      content: 'Feeling a bit down today. The rainy weather is affecting my mood.',
      date: new Date(2025, 10, 20),
      feeling: 'sad'
    },
    {
      id: '6',
      title: 'Weekend Plans',
      content: 'So excited about the upcoming weekend trip! Can\'t wait to explore new places.',
      date: new Date(2025, 10, 19),
      feeling: 'excited'
    },
    {
      id: '7',
      title: 'Yoga Practice',
      content: 'Morning yoga session was exactly what I needed. Feeling stretched and relaxed.',
      date: new Date(2025, 10, 25),
      feeling: 'calm'
    },
    {
      id: '8',
      title: 'Deadline Stress',
      content: 'Multiple deadlines approaching. Feeling overwhelmed but trying to stay organized.',
      date: new Date(2025, 10, 18),
      feeling: 'anxious'
    }
  ]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('profile');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  const addEntry = (entry: Omit<DiaryEntry, 'id'>) => {
    const newEntry: DiaryEntry = {
      ...entry,
      id: Date.now().toString()
    };
    setEntries([newEntry, ...entries]);
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <div className={isDark ? 'dark' : ''}>
        <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#0F0F1E] flex items-center justify-center p-4 transition-colors duration-300">
          <div className="w-full max-w-[390px] h-[844px] bg-white dark:bg-[#1A1A2E] rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-colors duration-300">
            {!isLoggedIn ? (
              <LoginScreen onLogin={handleLogin} />
            ) : (
              <>
                {currentScreen === 'profile' && (
                  <ProfileScreen 
                    entries={entries}
                    onLogout={handleLogout}
                    onAddEntry={addEntry}
                    onDeleteEntry={deleteEntry}
                    onNavigateToAgenda={() => setCurrentScreen('agenda')}
                  />
                )}
                {currentScreen === 'agenda' && (
                  <AgendaScreen 
                    entries={entries}
                    onDeleteEntry={deleteEntry}
                    onNavigateToProfile={() => setCurrentScreen('profile')}
                  />
                )}
                
                {/* Bottom Navigation */}
                <div className="mt-auto border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1A1A2E] transition-colors duration-300">
                  <div className="flex justify-around items-center h-20 px-6">
                    <button
                      onClick={() => setCurrentScreen('profile')}
                      className={`flex flex-col items-center gap-1 transition-colors ${
                        currentScreen === 'profile' ? 'text-[#5B8CFF]' : 'text-gray-400 dark:text-gray-500'
                      }`}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span className="text-xs">Profile</span>
                    </button>
                    <button
                      onClick={() => setCurrentScreen('agenda')}
                      className={`flex flex-col items-center gap-1 transition-colors ${
                        currentScreen === 'agenda' ? 'text-[#5B8CFF]' : 'text-gray-400 dark:text-gray-500'
                      }`}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span className="text-xs">Agenda</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
