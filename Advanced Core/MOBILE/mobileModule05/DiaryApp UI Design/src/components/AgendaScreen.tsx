import { useState } from 'react';
import { DiaryEntry } from '../App';
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
        <h2 className="text-white" style={{ fontSize: '28px', fontWeight: '600' }}>Agenda</h2>
        <p className="text-white/80 text-sm mt-1">View your diary entries by date</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
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
          <h3 className="text-[#1C1C1E] mb-3" style={{ fontSize: '18px', fontWeight: '600' }}>
            {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </h3>
          
          {entriesForSelectedDate.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>
              <p className="text-gray-500">No entries for this date</p>
              <p className="text-gray-400 text-sm mt-1">Select another date to view entries</p>
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
