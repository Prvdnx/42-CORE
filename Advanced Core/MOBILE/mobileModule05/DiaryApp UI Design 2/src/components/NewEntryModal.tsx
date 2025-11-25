import { useState } from 'react';
import { DiaryEntry, Feeling, useTheme } from '../App';

interface NewEntryModalProps {
  onClose: () => void;
  onSave: (entry: Omit<DiaryEntry, 'id'>) => void;
}

const FEELING_OPTIONS: { value: Feeling; label: string; emoji: string; color: string }[] = [
  { value: 'happy', label: 'Happy', emoji: '😊', color: '#FFD93D' },
  { value: 'sad', label: 'Sad', emoji: '😢', color: '#6C9BCF' },
  { value: 'excited', label: 'Excited', emoji: '🤩', color: '#FF6B9D' },
  { value: 'calm', label: 'Calm', emoji: '😌', color: '#95E1D3' },
  { value: 'anxious', label: 'Anxious', emoji: '😰', color: '#C5A3FF' }
];

export function NewEntryModal({ onClose, onSave }: NewEntryModalProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [feeling, setFeeling] = useState<Feeling>('happy');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { isDark } = useTheme();

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      return;
    }

    onSave({
      title: title.trim(),
      content: content.trim(),
      feeling,
      date: new Date(date)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-fadeIn">
      <div className="bg-white dark:bg-[#1A1A2E] w-full max-w-[390px] rounded-t-3xl shadow-2xl animate-slideUp transition-colors duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <h3 className="text-[#1C1C1E] dark:text-white transition-colors duration-300" style={{ fontSize: '20px', fontWeight: '600' }}>New Entry</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-700 dark:text-gray-300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div className="p-6 max-h-[600px] overflow-y-auto">
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm mb-2 transition-colors duration-300">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your entry a title..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0F0F1E] text-[#1C1C1E] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5B8CFF] transition-all"
            />
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm mb-2 transition-colors duration-300">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0F0F1E] text-[#1C1C1E] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#5B8CFF] transition-all"
            />
          </div>

          {/* Feeling */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 text-sm mb-2 transition-colors duration-300">How are you feeling?</label>
            <div className="grid grid-cols-5 gap-2">
              {FEELING_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFeeling(option.value)}
                  className={`
                    aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all
                    ${feeling === option.value 
                      ? 'ring-2 scale-105 shadow-md' 
                      : 'hover:scale-105 bg-gray-50 dark:bg-gray-800'
                    }
                  `}
                  style={{
                    ringColor: feeling === option.value ? option.color : undefined,
                    backgroundColor: feeling === option.value ? option.color + '20' : undefined
                  }}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-300">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 text-sm mb-2 transition-colors duration-300">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your thoughts here..."
              rows={6}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0F0F1E] text-[#1C1C1E] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5B8CFF] transition-all resize-none"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim()}
            className="w-full bg-[#5B8CFF] text-white py-4 rounded-2xl shadow-lg hover:bg-[#4A7BEF] transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed"
          >
            Save Entry
          </button>
        </div>
      </div>
    </div>
  );
}
