import { useState } from "react";

function ClayDatePicker({ value, onChange }) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const initialDate = value
        ? new Date(`${value}T00:00:00`)
        : today;

    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState(initialDate);

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    function openCalendar() {
        if (!isOpen) {
            // If no date is selected, always open on the current month.
            if (!value) {
                setViewDate(new Date());
            }
        }

        setIsOpen(!isOpen);
    }

    function previousMonth() {
        const previousMonthDate = new Date(year, month - 1, 1);

        // Don't allow navigation to months before the current month.
        const currentMonthStart = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        if (previousMonthDate >= currentMonthStart) {
            setViewDate(previousMonthDate);
        }
    }

    function nextMonth() {
        setViewDate(new Date(year, month + 1, 1));
    }

    function selectDate(day) {
        const selectedDate = new Date(year, month, day);
        selectedDate.setHours(0, 0, 0, 0);

        // Prevent past dates from being selected.
        if (selectedDate < today) {
            return;
        }

        const formattedDate = [
            selectedDate.getFullYear(),
            String(selectedDate.getMonth() + 1).padStart(2, "0"),
            String(selectedDate.getDate()).padStart(2, "0")
        ].join("-");

        onChange(formattedDate);
        setIsOpen(false);
    }

    function clearDate() {
        onChange("");
        setIsOpen(false);
    }

    function formatDisplayDate() {
        if (!value) {
            return "Select due date";
        }

        const date = new Date(`${value}T00:00:00`);

        return date.toLocaleDateString(undefined, {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }

    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
        calendarDays.push(
            <div
                key={`empty-${i}`}
                className="clay-calendar-empty"
            />
        );
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month, day);
        currentDate.setHours(0, 0, 0, 0);

        const dateString = [
            year,
            String(month + 1).padStart(2, "0"),
            String(day).padStart(2, "0")
        ].join("-");

        const isSelected = dateString === value;

        const isToday =
            currentDate.getTime() === today.getTime();

        const isPast =
            currentDate < today;

        let className = "clay-calendar-day";

        if (isSelected) {
            className += " selected";
        }

        if (isToday) {
            className += " today";
        }

        if (isPast) {
            className += " disabled";
        }

        calendarDays.push(
            <div
                key={day}
                className={className}
                onClick={() => {
                    if (!isPast) {
                        selectDate(day);
                    }
                }}
            >
                {day}
            </div>
        );
    }

    const viewingCurrentMonth =
        year === today.getFullYear() &&
        month === today.getMonth();

    return (
        <div className="clay-date-picker">
            <div
                className="clay-date-trigger"
                onClick={openCalendar}
            >
                <span
                    className={
                        value
                            ? "clay-date-value"
                            : "clay-date-placeholder"
                    }
                >
                    {formatDisplayDate()}
                </span>

                <span className="clay-calendar-icon">
                    ▣
                </span>
            </div>

            {isOpen && (
                <div className="clay-calendar">
                    <div className="clay-calendar-header">
                        <div
                            className={
                                viewingCurrentMonth
                                    ? "clay-calendar-nav disabled"
                                    : "clay-calendar-nav"
                            }
                            onClick={previousMonth}
                        >
                            ‹
                        </div>

                        <strong>
                            {monthNames[month]} {year}
                        </strong>

                        <div
                            className="clay-calendar-nav"
                            onClick={nextMonth}
                        >
                            ›
                        </div>
                    </div>

                    <div className="clay-calendar-weekdays">
                        {weekDays.map((day) => (
                            <span key={day}>{day}</span>
                        ))}
                    </div>

                    <div className="clay-calendar-grid">
                        {calendarDays}
                    </div>

                    <div className="clay-calendar-footer">
                        <span
                            onClick={clearDate}
                            className="clay-calendar-clear"
                        >
                            Clear date
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ClayDatePicker;