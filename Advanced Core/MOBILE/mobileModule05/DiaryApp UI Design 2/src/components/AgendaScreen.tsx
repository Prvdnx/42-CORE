import { useState } from 'react';
import { DiaryEntry, useTheme } from '../App';
import { Calendar } from './Calendar';
import { EntryCard } from './EntryCard';
import { EntryDetailModal } from './EntryDetailModal';

interface AgendaScreenProps {
  entries: DiaryEntry[];
  onDeleteEntry: (id: string) => void;
  onNavigateToProfile: () => void;
}

export function AgendaScreen({ entries, onDeleteEntry, onNavigateToProfile }: AgendaScreenProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const { isDark, toggleTheme } = useTheme();

  // Filter entries for selected date
  const entriesForSelectedDate = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return (
      entryDate.getFullYear() === selectedDate.getFullYear() &&
      entryDate.getMonth() === selectedDate.getMonth() &&
      entryDate.getDate() === selectedDate.getDate()
    );
  });

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#5B8CFF] to-[#7FA8FF] px-6 pt-12 pb-6 rounded-b-[32px] shadow-lg">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-white" style={{ fontSize: '28px', fontWeight: '600' }}>Agenda</h2>
            <p className="text-white/80 text-sm mt-1">View your diary entries by date</p>
          </div>
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
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto bg-[#F5F7FA] dark:bg-[#0F0F1E] transition-colors duration-300">
        {/* Calendar */}
        <div className="px-6 pt-6">
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            entries={entries}
          />
        </div>

        {/* Entries for Selected Date */}
        <div className="px-6 py-6">
          <h3 className="text-[#1C1C1E] dark:text-white mb-3 transition-colors duration-300" style={{ fontSize: '18px', fontWeight: '600' }}>
            {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </h3>
          
          {entriesForSelectedDate.length === 0 ? (
            <div className="bg-white dark:bg-[#1A1A2E] rounded-2xl shadow-md p-8 text-center transition-colors duration-300">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <p className="text-gray-500 dark:text-gray-400 transition-colors duration-300">No entries for this date</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1 transition-colors duration-300">Select another date to view entries</p>
            </div>
          ) : (
            <div className="space-y-3">
              {entriesForSelectedDate
                .sort((a, b) => b.date.getTime() - a.date.getTime())
                .map(entry => (
                  <EntryCard 
                    key={entry.id} 
                    entry={entry}
                    onClick={() => setSelectedEntry(entry)}
                  />
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Entry Detail Modal */}
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
