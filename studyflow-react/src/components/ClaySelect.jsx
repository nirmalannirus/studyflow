import { useState } from "react";

function ClaySelect({ value, onChange, options }) {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = options.find(
        (option) => option.value === value
    );

    function handleSelect(option) {
        onChange(option.value);
        setIsOpen(false);
    }

    return (
        <div className="clay-dropdown">
            <div
                className="clay-dropdown-trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>
                    {selectedOption?.label || "Select"}
                </span>

                <span
                    className={
                        isOpen
                            ? "clay-dropdown-arrow open"
                            : "clay-dropdown-arrow"
                    }
                >
                    ▼
                </span>
            </div>

            {isOpen && (
                <div className="clay-dropdown-menu">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={
                                value === option.value
                                    ? "clay-dropdown-item active"
                                    : "clay-dropdown-item"
                            }
                            onClick={() =>
                                handleSelect(option)
                            }
                        >
                            <span>{option.label}</span>

                            {value === option.value && (
                                <span className="clay-check">
                                    ✓
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ClaySelect;