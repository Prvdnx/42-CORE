import { DiaryEntry } from '../App';
import { useTheme } from '../App';

interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  entries: DiaryEntry[];
}

export function Calendar({ selectedDate, onSelectDate, entries }: CalendarProps) {
  const { isDark } = useTheme();
  const today = new Date();
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Check if a date has entries
  const hasEntriesOnDate = (day: number, currentMonth: number) => {
    return entries.some(entry => {
      const entryDate = new Date(entry.date);
      return (
        entryDate.getFullYear() === year &&
        entryDate.getMonth() === currentMonth &&
        entryDate.getDate() === day
      );
    });
  };

  // Navigate months
  const goToPreviousMonth = () => {
    onSelectDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    onSelectDate(new Date(year, month + 1, 1));
  };

  // Generate calendar days
  const calendarDays = [];

  // Previous month days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    calendarDays.push({
      day,
      month: month - 1,
      isCurrentMonth: false,
      hasEntries: hasEntriesOnDate(day, month - 1)
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      month,
      isCurrentMonth: true,
      hasEntries: hasEntriesOnDate(day, month)
    });
  }

  // Next month days to fill the grid
  const remainingDays = 42 - calendarDays.length; // 6 rows * 7 days
  for (let day = 1; day <= remainingDays; day++) {
    calendarDays.push({
      day,
      month: month + 1,
      isCurrentMonth: false,
      hasEntries: hasEntriesOnDate(day, month + 1)
    });
  }

  const isToday = (day: number, calMonth: number) => {
    return (
      today.getFullYear() === year &&
      today.getMonth() === calMonth &&
      today.getDate() === day
    );
  };

  const isSelected = (day: number, calMonth: number) => {
    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === calMonth &&
      selectedDate.getDate() === day
    );
  };

  return (
    <div className="bg-white dark:bg-[#1A1A2E] rounded-3xl shadow-md p-6 transition-colors duration-300">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-700 dark:text-gray-300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        
        <h3 className="text-[#1C1C1E] dark:text-white transition-colors duration-300" style={{ fontSize: '18px', fontWeight: '600' }}>
          {monthNames[month]} {year}
        </h3>
        
        <button
          onClick={goToNextMonth}
          className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-700 dark:text-gray-300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-center text-gray-500 dark:text-gray-400 text-xs py-2 transition-colors duration-300">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((dayInfo, index) => {
          const date = new Date(year, dayInfo.month, dayInfo.day);
          const isTodayDate = isToday(dayInfo.day, dayInfo.month);
          const isSelectedDate = isSelected(dayInfo.day, dayInfo.month);

          return (
            <button
              key={index}
              onClick={() => onSelectDate(date)}
              className={`
                relative aspect-square rounded-xl flex items-center justify-center transition-all
                ${!dayInfo.isCurrentMonth ? 'text-gray-300 dark:text-gray-700' : 'text-[#1C1C1E] dark:text-white'}
                ${isSelectedDate ? 'bg-[#5B8CFF] text-white scale-105 shadow-lg' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
                ${isTodayDate && !isSelectedDate ? 'ring-2 ring-[#5B8CFF] ring-opacity-50' : ''}
              `}
            >
              <span className="text-sm">{dayInfo.day}</span>
              {dayInfo.hasEntries && !isSelectedDate && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-[#5B8CFF]"></div>
              )}
              {dayInfo.hasEntries && isSelectedDate && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-white"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
