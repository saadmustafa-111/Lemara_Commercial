import * as React from "react";

interface CalendarProps {
  mode?: "single" | "multiple" | "range";
  selectedDate?: Date | Date[] | { from: Date; to: Date };
  onSelect?: (date: Date | Date[] | { from: Date; to: Date } | undefined) => void;
  className?: string;
  disabled?: boolean | ((date: Date) => boolean);
}

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ mode = "single", selectedDate, onSelect, className = "", disabled }, ref) => {
    const [month, setMonth] = React.useState(new Date());
    const [selected, setSelected] = React.useState<Date | Date[] | { from: Date; to: Date } | undefined>(selectedDate);

    React.useEffect(() => {
      if (selectedDate !== undefined) {
        setSelected(selectedDate);
      }
    }, [selectedDate]);

    const handleDayClick = (day: Date) => {
      if (isDisabled(day)) return;
      
      let newSelectedDate;
      
      switch (mode) {
        case "single":
          newSelectedDate = day;
          break;
        case "multiple":
          newSelectedDate = Array.isArray(selected) 
            ? selected.some(d => isSameDay(d, day))
              ? selected.filter(d => !isSameDay(d, day))
              : [...selected, day]
            : [day];
          break;
        case "range":
          if (!selected || !isDateRange(selected)) {
            newSelectedDate = { from: day, to: day };
          } else if (isSameDay(selected.from, day) && isSameDay(selected.to, day)) {
            newSelectedDate = undefined;
          } else {
            newSelectedDate = { from: day, to: day };
          }
          break;
      }
      
      setSelected(newSelectedDate);
      onSelect?.(newSelectedDate);
    };

    const isDisabled = (date: Date): boolean => {
      if (typeof disabled === "boolean") return disabled;
      if (typeof disabled === "function") return disabled(date);
      return false;
    };

    const isSameDay = (d1: Date, d2: Date): boolean => {
      return d1.getDate() === d2.getDate() && 
             d1.getMonth() === d2.getMonth() && 
             d1.getFullYear() === d2.getFullYear();
    };

    const isDateRange = (value: any): value is { from: Date; to: Date } => {
      return typeof value === 'object' && value !== null && 'from' in value && 'to' in value;
    };

    const isSelected = (day: Date): boolean => {
      if (!selected) return false;
      
      if (Array.isArray(selected)) {
        return selected.some(d => isSameDay(d, day));
      }
      
      if (isDateRange(selected)) {
        const date = day.getTime();
        return date >= selected.from.getTime() && date <= selected.to.getTime();
      }
      
      return isSameDay(selected, day);
    };

    const getDaysInMonth = (year: number, month: number): Date[] => {
      const days: Date[] = [];
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      
      // Get days from previous month to fill the first week
      const dayOfWeek = firstDay.getDay();
      for (let i = dayOfWeek; i > 0; i--) {
        days.push(new Date(year, month, 1 - i));
      }
      
      // Get all days in the current month
      for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push(new Date(year, month, i));
      }
      
      // Get days from next month to fill the last week
      const remainingDays = 42 - days.length; // 6 rows of 7 days
      for (let i = 1; i <= remainingDays; i++) {
        days.push(new Date(year, month + 1, i));
      }
      
      return days;
    };

    const previousMonth = () => {
      setMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const nextMonth = () => {
      setMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const monthName = month.toLocaleString('default', { month: 'long' });
    const year = month.getFullYear();
    const days = getDaysInMonth(year, month.getMonth());
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <div ref={ref} className={`p-4 bg-white border rounded-md shadow ${className}`}>
        <div className="flex justify-between items-center mb-4">
          <button type="button" onClick={previousMonth} className="p-2">
            <ChevronLeftIcon />
          </button>
          <div>
            <span className="font-semibold">{monthName} {year}</span>
          </div>
          <button type="button" onClick={nextMonth} className="p-2">
            <ChevronRightIcon />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map(day => (
            <div key={day} className="text-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, i) => {
            const isCurrentMonth = day.getMonth() === month.getMonth();
            const isToday = isSameDay(day, new Date());
            
            return (
              <button
                key={i}
                type="button"
                disabled={isDisabled(day)}
                onClick={() => handleDayClick(day)}
                className={`
                  flex items-center justify-center h-9 w-9 rounded-md text-sm
                  ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                  ${isToday ? 'font-bold' : ''}
                  ${isSelected(day) ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
                  ${isDisabled(day) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                `}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

Calendar.displayName = "Calendar";

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);
