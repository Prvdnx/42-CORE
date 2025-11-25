import { DiaryEntry, Feeling } from '../App';

interface EntryDetailModalProps {
  entry: DiaryEntry;
  onClose: () => void;
  onDelete: () => void;
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

export function EntryDetailModal({ entry, onClose, onDelete }: EntryDetailModalProps) {
  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 animate-fadeIn">
      <div className="bg-white w-full max-w-[390px] rounded-t-3xl shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <h3 className="text-[#1C1C1E]" style={{ fontSize: '18px', fontWeight: '600' }}>Entry Details</h3>
          <button
            onClick={onDelete}
            className="w-8 h-8 rounded-full hover:bg-red-50 transition-colors flex items-center justify-center text-red-500"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[600px] overflow-y-auto">
          {/* Feeling Badge */}
          <div className="flex items-center gap-3 mb-4">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: FEELING_COLORS[entry.feeling] + '30' }}
            >
              <span className="text-4xl">{FEELING_EMOJIS[entry.feeling]}</span>
            </div>
            <div>
              <span 
                className="inline-block px-3 py-1 rounded-lg text-sm capitalize"
                style={{ 
                  backgroundColor: FEELING_COLORS[entry.feeling] + '30',
                  color: FEELING_COLORS[entry.feeling]
                }}
              >
                {entry.feeling}
              </span>
            </div>
          </div>

          {/* Date */}
          <p className="text-gray-500 text-sm mb-4">
            {formatDate(entry.date)}
          </p>

          {/* Title */}
          <h2 className="text-[#1C1C1E] mb-4" style={{ fontSize: '24px', fontWeight: '600' }}>
            {entry.title}
          </h2>

          {/* Content */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {entry.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
