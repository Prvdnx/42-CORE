import { useState } from 'react';
import { DiaryEntry, Feeling, useTheme } from '../App';
import { EntryCard } from './EntryCard';
import { NewEntryModal } from './NewEntryModal';
import { EntryDetailModal } from './EntryDetailModal';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface ProfileScreenProps {
  entries: DiaryEntry[];
  onLogout: () => void;
  onAddEntry: (entry: Omit<DiaryEntry, 'id'>) => void;
  onDeleteEntry: (id: string) => void;
  onNavigateToAgenda: () => void;
}

const FEELING_COLORS: Record<Feeling, string> = {
  happy: '#FFD93D',
  sad: '#6C9BCF',
  excited: '#FF6B9D',
  calm: '#95E1D3',
  anxious: '#C5A3FF'
};

const FEELING_LABELS: Record<Feeling, string> = {
  happy: 'Happy',
  sad: 'Sad',
  excited: 'Excited',
  calm: 'Calm',
  anxious: 'Anxious'
};

export function ProfileScreen({ entries, onLogout, onAddEntry, onDeleteEntry, onNavigateToAgenda }: ProfileScreenProps) {
  const [showNewEntryModal, setShowNewEntryModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const { isDark, toggleTheme } = useTheme();

  // Calculate feelings distribution
  const feelingsCount: Record<Feeling, number> = {
    happy: 0,
    sad: 0,
    excited: 0,
    calm: 0,
    anxious: 0
  };

  entries.forEach(entry => {
    feelingsCount[entry.feeling]++;
  });

  const chartData = Object.entries(feelingsCount)
    .filter(([_, count]) => count > 0)
    .map(([feeling, count]) => ({
      name: FEELING_LABELS[feeling as Feeling],
      value: count,
      color: FEELING_COLORS[feeling as Feeling]
    }));

  const recentEntries = [...entries].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 2);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#5B8CFF] to-[#7FA8FF] px-6 pt-12 pb-8 rounded-b-[32px] shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <h2 className="text-white" style={{ fontSize: '24px', fontWeight: '600' }}>Sarah Johnson</h2>
              <p className="text-white/80 text-sm">sarah.j@email.com</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleTheme}
              className="text-white/80 hover:text-white transition-colors w-8 h-8 flex items-center justify-center"
            >
              {isDark ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <button
              onClick={onLogout}
              className="text-white/80 hover:text-white transition-colors w-8 h-8 flex items-center justify-center"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 bg-[#F5F7FA] dark:bg-[#0F0F1E] transition-colors duration-300">
        {/* Stats Section */}
        <div className="mt-6 mb-6">
          <div className="bg-white dark:bg-[#1A1A2E] rounded-3xl shadow-md p-6 transition-colors duration-300">
            <h3 className="text-[#1C1C1E] dark:text-white mb-4 transition-colors duration-300" style={{ fontSize: '18px', fontWeight: '600' }}>Your Stats</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1 transition-colors duration-300">Total Entries</p>
                <p className="text-[#5B8CFF]" style={{ fontSize: '32px', fontWeight: '600' }}>{entries.length}</p>
              </div>
              
              {chartData.length > 0 && (
                <div className="w-32 h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={60}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Feelings Legend */}
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-2 transition-colors duration-300">
              {chartData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{item.name}</span>
                  <span className="text-sm text-gray-400 dark:text-gray-500 ml-auto transition-colors duration-300">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Entries */}
        {recentEntries.length > 0 && (
          <div className="mb-6">
            <h3 className="text-[#1C1C1E] dark:text-white mb-3 transition-colors duration-300" style={{ fontSize: '18px', fontWeight: '600' }}>Recent Entries</h3>
            <div className="space-y-3">
              {recentEntries.map(entry => (
                <EntryCard 
                  key={entry.id} 
                  entry={entry}
                  onClick={() => setSelectedEntry(entry)}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Entries */}
        <div className="mb-6">
          <h3 className="text-[#1C1C1E] dark:text-white mb-3 transition-colors duration-300" style={{ fontSize: '18px', fontWeight: '600' }}>All Entries</h3>
          <div className="space-y-3">
            {entries.length === 0 ? (
              <div className="bg-white dark:bg-[#1A1A2E] rounded-2xl shadow-md p-8 text-center transition-colors duration-300">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <p className="text-gray-500 dark:text-gray-400 transition-colors duration-300">No entries yet</p>
                <p className="text-gray-400 dark:text-gray-500 text-sm mt-1 transition-colors duration-300">Start writing your first diary entry!</p>
              </div>
            ) : (
              entries
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .map(entry => (
                  <EntryCard 
                    key={entry.id} 
                    entry={entry}
                    onClick={() => setSelectedEntry(entry)}
                  />
                ))
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowNewEntryModal(true)}
        className="absolute bottom-28 right-8 w-14 h-14 bg-[#5B8CFF] text-white rounded-full shadow-xl hover:bg-[#4A7BEF] transition-all flex items-center justify-center hover:scale-110"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* Modals */}
      {showNewEntryModal && (
        <NewEntryModal
          onClose={() => setShowNewEntryModal(false)}
          onSave={(entry) => {
            onAddEntry(entry);
            setShowNewEntryModal(false);
          }}
        />
      )}

      {selectedEntry && (
        <EntryDetailModal
          entry={selectedEntry}
          onClose={() => setSelectedEntry(null)}
          onDelete={() => {
            onDeleteEntry(selectedEntry.id);
            setSelectedEntry(null);
          }}
        />
      )}
    </div>
  );
}
