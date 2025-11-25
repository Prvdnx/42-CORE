import { DiaryEntry, Feeling } from '../App';

interface EntryCardProps {
  entry: DiaryEntry;
  onClick: () => void;
}

const FEELING_EMOJIS: Record<Feeling, string> = {
  happy: '😊',
  sad: '😢',
  excited: '🤩',
  calm: '😌',
  anxious: '😰'
};

const FEELING_COLORS: Record<Feeling, string> = {
  happy: '#FFD93D',
  sad: '#6C9BCF',
  excited: '#FF6B9D',
  calm: '#95E1D3',
  anxious: '#C5A3FF'
};

const FEELING_BG_COLORS: Record<Feeling, string> = {
  happy: '#FFF9E6',
  sad: '#E8F2FA',
  excited: '#FFE8F0',
  calm: '#E8FAF5',
  anxious: '#F3EBFF'
};

const FEELING_BG_COLORS_DARK: Record<Feeling, string> = {
  happy: '#3D3420',
  sad: '#1E2830',
  excited: '#3D1F2E',
  calm: '#1F3D35',
  anxious: '#2E2440'
};

export function EntryCard({ entry, onClick }: EntryCardProps) {
  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <button
      onClick={onClick}
      className="w-full bg-white dark:bg-[#1A1A2E] rounded-2xl shadow-md p-4 hover:shadow-lg transition-all text-left"
    >
      <div className="flex items-start gap-3">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 dark:opacity-90"
          style={{ backgroundColor: FEELING_BG_COLORS[entry.feeling] }}
        >
          <span className="text-2xl">{FEELING_EMOJIS[entry.feeling]}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-[#1C1C1E] dark:text-white truncate transition-colors duration-300" style={{ fontSize: '16px', fontWeight: '600' }}>
              {entry.title}
            </h4>
            <span 
              className="px-2 py-1 rounded-lg text-xs flex-shrink-0"
              style={{ 
                backgroundColor: FEELING_BG_COLORS[entry.feeling],
                color: FEELING_COLORS[entry.feeling]
              }}
            >
              {entry.feeling}
            </span>
          </div>
          
          <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-2 transition-colors duration-300">
            {entry.content}
          </p>
          
          <p className="text-gray-400 dark:text-gray-500 text-xs transition-colors duration-300">
            {formatDate(entry.date)}
          </p>
        </div>
      </div>
    </button>
  );
}
