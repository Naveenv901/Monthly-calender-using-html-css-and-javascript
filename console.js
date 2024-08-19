document.addEventListener('DOMContentLoaded', () => {
    const monthYearElem = document.getElementById('month-year');
    const calendarTableBody = document.querySelector('#calendar-table tbody');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    let currentDate = new Date();

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        // Set the month and year in the header
        monthYearElem.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

        // Get the first and last day of the month
        const firstDayOfMonth = new Date(year, month, 1);
        const lastDayOfMonth = new Date(year, month + 1, 0);
        
        // Get the day of the week of the first day of the month (0 = Sunday, 1 = Monday, etc.)
        const startDay = firstDayOfMonth.getDay();

        // Clear the previous calendar
        calendarTableBody.innerHTML = '';

        // Create the calendar rows
        let row = document.createElement('tr');
        
        // Fill the first week with empty cells if needed
        for (let i = 0; i < startDay; i++) {
            row.appendChild(document.createElement('td'));
        }

        // Fill the calendar with days
        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            if ((startDay + day - 1) % 7 === 0 && day !== 1) {
                calendarTableBody.appendChild(row);
                row = document.createElement('tr');
            }

            const cell = document.createElement('td');
            cell.textContent = day;
            row.appendChild(cell);
        }

        // Add the last row if needed
        if (row.children.length > 0) {
            calendarTableBody.appendChild(row);
        }
    }

    function changeMonth(offset) {
        currentDate.setMonth(currentDate.getMonth() + offset);
        renderCalendar(currentDate);
    }

    prevMonthButton.addEventListener('click', () => changeMonth(-1));
    nextMonthButton.addEventListener('click', () => changeMonth(1));

    // Render the initial calendar
    renderCalendar(currentDate);
});
