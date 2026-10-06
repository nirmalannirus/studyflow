import ClaySelect from "./ClaySelect";

function SearchFilter({
    search,
    setSearch,
    filter,
    setFilter
}) {
    return (
        <div>

            <input
                type="search"
                id="search"
                placeholder="Search tasks..."
                value={search}
                onChange={(event) =>
                    setSearch(event.target.value)
                }
            />

            <ClaySelect
                value={filter}
                onChange={setFilter}
                options={[
                    {
                        value: "all",
                        label: "All Tasks"
                    },
                    {
                        value: "pending",
                        label: "Pending"
                    },
                    {
                        value: "completed",
                        label: "Completed"
                    }
                ]}
            />

        </div>
    );
}

export default SearchFilter;