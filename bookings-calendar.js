// =====================================================================
// BOOKINGS CALENDAR RENDERER
// =====================================================================
// This file reads the bookings-data.js and displays it on the page
// You don't need to edit this file - just edit bookings-data.js
// =====================================================================

document.addEventListener('DOMContentLoaded', function() {
    const calendarContainer = document.getElementById('calendar-container');
    
    // Loop through each month in the bookings data
    for (const [monthName, dates] of Object.entries(bookingsData)) {
        // Create month card
        const monthCard = document.createElement('div');
        monthCard.className = 'month-card';
        
        // Create month title
        const monthTitle = document.createElement('h3');
        monthTitle.className = 'month-title';
        monthTitle.textContent = monthName;
        monthCard.appendChild(monthTitle);
        
        // Create dates list
        const datesList = document.createElement('ul');
        datesList.className = 'dates-list';
        
        // Add each date
        dates.forEach(dateInfo => {
            const dateItem = document.createElement('li');
            dateItem.className = 'date-item';
            
            // Date text
            const dateText = document.createElement('span');
            dateText.className = 'date-text';
            dateText.textContent = dateInfo.date;
            
            // Status badge
            const statusBadge = document.createElement('span');
            statusBadge.className = `status-badge ${dateInfo.status}`;
            statusBadge.textContent = dateInfo.status === 'available' ? 'Available' : 'Booked';
            
            dateItem.appendChild(dateText);
            dateItem.appendChild(statusBadge);
            datesList.appendChild(dateItem);
        });
        
        monthCard.appendChild(datesList);
        calendarContainer.appendChild(monthCard);
    }
    
    // Count statistics
    let totalDates = 0;
    let bookedDates = 0;
    
    for (const dates of Object.values(bookingsData)) {
        totalDates += dates.length;
        bookedDates += dates.filter(d => d.status === 'booked').length;
    }
    
    const availableDates = totalDates - bookedDates;
    
    console.log(`📊 Booking Statistics:`);
    console.log(`Total Dates: ${totalDates}`);
    console.log(`Available: ${availableDates}`);
    console.log(`Booked: ${bookedDates}`);
    console.log(`Availability: ${((availableDates/totalDates)*100).toFixed(1)}%`);
});
