import { useState } from "react";

function ClayDatePicker({ value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);

    const initialDate = value
        ? new Date(`${value}T00:00:00`)
        : new Date();

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

    const weekDays = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];

    const firstDay = new Date(
        year,
        month,
        1
    ).getDay();

    const daysInMonth = new Date(
        year,
        month + 1,
        0
    ).getDate();

    function previousMonth() {
        setViewDate(
            new Date(year, month - 1, 1)
        );
    }

    function nextMonth() {
        setViewDate(
            new Date(year, month + 1, 1)
        );
    }

    function selectDate(day) {
        const selectedDate = new Date(
            year,
            month,
            day
        );

        const formattedDate = [
            selectedDate.getFullYear(),
            String(
                selectedDate.getMonth() + 1
            ).padStart(2, "0"),
            String(
                selectedDate.getDate()
            ).padStart(2, "0")
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

        const date = new Date(
            `${value}T00:00:00`
        );

        return date.toLocaleDateString(
            undefined,
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );
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

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {
        const dateString = [
            year,
            String(month + 1).padStart(2, "0"),
            String(day).padStart(2, "0")
        ].join("-");

        const isSelected =
            dateString === value;

        calendarDays.push(
            <div
                key={day}
                className={
                    isSelected
                        ? "clay-calendar-day selected"
                        : "clay-calendar-day"
                }
                onClick={() => selectDate(day)}
            >
                {day}
            </div>
        );
    }

    return (
        <div className="clay-date-picker">

            <div
                className="clay-date-trigger"
                onClick={() =>
                    setIsOpen(!isOpen)
                }
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
                            className="clay-calendar-nav"
                            onClick={previousMonth}
                        >
                            ‹
                        </div>

                        <strong>
                            {monthNames[month]}{" "}
                            {year}
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
                            <span key={day}>
                                {day}
                            </span>
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