// =====================================================================
// BOOKINGS CALENDAR RENDERER
// Reads bookings-data.js and builds the calendar UI
// You don't need to edit this file — just edit bookings-data.js
// =====================================================================

document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('calendar-container');
    if (!container || typeof bookingsData === 'undefined') return;

    for (const [monthName, dates] of Object.entries(bookingsData)) {

        const card = document.createElement('div');
        card.className = 'month-card fade';

        // Ghost month name (decorative background text)
        const ghost = document.createElement('div');
        ghost.className = 'month-card__ghost';
        ghost.setAttribute('aria-hidden', 'true');
        // Use just the month word (e.g. "November" from "November 2026")
        ghost.textContent = monthName.split(' ')[0];
        card.appendChild(ghost);

        // Month title
        const title = document.createElement('h3');
        title.className = 'month-title';
        title.textContent = monthName;
        card.appendChild(title);

        // Subtitle / season label
        const subtitle = document.createElement('p');
        subtitle.className = 'month-subtitle';
        subtitle.textContent = 'Duck Season';
        card.appendChild(subtitle);

        // Dates list
        const list = document.createElement('ul');
        list.className = 'dates-list';

        dates.forEach(function (dateInfo) {
            const item = document.createElement('li');
            item.className = 'date-item';

            const dateText = document.createElement('span');
            dateText.className = 'date-text';
            dateText.textContent = dateInfo.date;

            const badge = document.createElement('span');
            badge.className = 'status-badge ' + dateInfo.status;
            badge.textContent = dateInfo.status === 'available' ? 'Available' : 'Booked';

            item.appendChild(dateText);
            item.appendChild(badge);
            list.appendChild(item);
        });

        card.appendChild(list);
        container.appendChild(card);
    }

    // Re-run scroll observer on the newly created cards
    if (window._roostObserver) {
        document.querySelectorAll('.month-card.fade').forEach(function (el) {
            window._roostObserver.observe(el);
        });
    }

    // Stats (console only)
    let total = 0, booked = 0;
    for (const dates of Object.values(bookingsData)) {
        total += dates.length;
        booked += dates.filter(function (d) { return d.status === 'booked'; }).length;
    }
    const available = total - booked;
    console.log('📊 Roost Hole Booking Stats');
    console.log('Total dates: ' + total);
    console.log('Available:   ' + available);
    console.log('Booked:      ' + booked);
    console.log('Fill rate:   ' + ((booked / total) * 100).toFixed(1) + '%');
});