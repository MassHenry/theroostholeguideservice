// =====================================================================
// BOOKINGS CALENDAR RENDERER — The Roost Hole Guide Service
// =====================================================================
// Reads bookingsData from bookings-data.js and builds the calendar UI.
// You never need to edit this file — only edit bookings-data.js.
// =====================================================================

(function () {
    'use strict';

    // Day-of-week helper
    const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    function getDayOfWeek(dateString) {
        // dateString e.g. "November 15" — append year based on month key later
        return null; // resolved in render with full date
    }

    // Month → year mapping (derive from the month key)
    const MONTH_YEARS = {
        'February 2026': 2026, 'March 2026': 2026, 'April 2026': 2026,
        'November 2026': 2026, 'December 2026': 2026, 'January 2027': 2027
    };

    const MONTH_NUMS = {
        January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
        July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
    };

    // Season groupings
    const SEASON_GROUPS = [
        {
            id: 'snow-goose',
            title: 'Snow Goose Conservation Hunt',
            badge: 'Spring 2026',
            badgeClass: 'season-group__badge--snow',
            months: ['February 2026', 'March 2026', 'April 2026']
        },
        {
            id: 'duck-season',
            title: 'Regular Duck & Goose Season',
            badge: 'Fall/Winter 2026–2027',
            badgeClass: 'season-group__badge--duck',
            months: ['November 2026', 'December 2026', 'January 2027']
        }
    ];

    function buildHeaderStats(totalDates, bookedDates) {
        const availDates = totalDates - bookedDates;
        const container = document.getElementById('headerStats');
        if (!container) return;

        container.innerHTML = `
            <div class="stat-pill avail">
                <span class="stat-pill__num" id="stat-avail">${availDates}</span>
                <span class="stat-pill__label">Dates Open</span>
            </div>
            <div class="stat-pill booked">
                <span class="stat-pill__num" id="stat-booked">${bookedDates}</span>
                <span class="stat-pill__label">Dates Booked</span>
            </div>
        `;
    }

    function buildMonthCard(monthKey, dates) {
        const year = MONTH_YEARS[monthKey];
        const monthName = monthKey.split(' ')[0];
        const monthNum  = MONTH_NUMS[monthName];

        const available = dates.filter(d => d.status === 'available').length;
        const booked    = dates.filter(d => d.status === 'booked').length;
        const countLabel = available === dates.length
            ? 'All dates open'
            : booked === dates.length
                ? 'Fully booked'
                : `${available} open · ${booked} booked`;

        const card = document.createElement('div');
        card.className = 'month-card reveal';

        // Header
        const header = document.createElement('div');
        header.className = 'month-card__header';
        header.innerHTML = `
            <span class="month-card__name">${monthKey}</span>
            <span class="month-card__count">${countLabel}</span>
        `;
        card.appendChild(header);

        // Body
        const body = document.createElement('div');
        body.className = 'month-card__body';

        dates.forEach(dateInfo => {
            // Parse day number
            const dayNum = parseInt(dateInfo.date.split(' ')[1], 10);
            const jsDate = new Date(year, monthNum, dayNum);
            const dow = DOW[jsDate.getDay()];
            const isWeekend = jsDate.getDay() === 0 || jsDate.getDay() === 6;

            const row = document.createElement('div');
            row.className = `date-row${isWeekend ? ' date-row--weekend' : ''}`;

            const statusClass = dateInfo.status === 'available'
                ? 'date-row__status--available'
                : 'date-row__status--booked';

            const statusLabel = dateInfo.status === 'available' ? 'Open' : 'Booked';

            row.innerHTML = `
                <div>
                    <span class="date-row__day">${dateInfo.date}</span>
                    <span class="date-row__dow">${dow}</span>
                </div>
                <span class="date-row__status ${statusClass}">${statusLabel}</span>
            `;
            body.appendChild(row);
        });

        card.appendChild(body);
        return card;
    }

    function render() {
        const container = document.getElementById('calendar-container');
        if (!container) return;
        if (typeof bookingsData === 'undefined') {
            container.innerHTML = '<p style="padding:2rem;color:#888;">Bookings data not loaded.</p>';
            return;
        }

        // Count totals
        let totalDates = 0, bookedDates = 0;
        for (const dates of Object.values(bookingsData)) {
            totalDates  += dates.length;
            bookedDates += dates.filter(d => d.status === 'booked').length;
        }

        buildHeaderStats(totalDates, bookedDates);

        // Build season groups
        SEASON_GROUPS.forEach((group, gi) => {
            // Check if any months in this group exist in data
            const hasData = group.months.some(m => bookingsData[m]);
            if (!hasData) return;

            const groupEl = document.createElement('div');
            groupEl.className = 'season-group';

            // Group header
            const groupHeader = document.createElement('div');
            groupHeader.className = 'season-group__header reveal';
            groupHeader.style.transitionDelay = `${gi * 0.08}s`;
            groupHeader.innerHTML = `
                <h2 class="season-group__title">${group.title}</h2>
                <span class="season-group__badge ${group.badgeClass}">${group.badge}</span>
            `;
            groupEl.appendChild(groupHeader);

            // Months grid
            const grid = document.createElement('div');
            grid.className = 'months-grid';

            group.months.forEach((monthKey, mi) => {
                const dates = bookingsData[monthKey];
                if (!dates) return;
                const card = buildMonthCard(monthKey, dates);
                card.style.transitionDelay = `${(gi * 0.1) + (mi * 0.08)}s`;
                grid.appendChild(card);
            });

            groupEl.appendChild(grid);
            container.appendChild(groupEl);
        });

        // Kick off scroll reveal for dynamically added elements
        const allReveals = container.querySelectorAll('.reveal');
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
        allReveals.forEach(el => obs.observe(el));

        // Console stats
        const avail = totalDates - bookedDates;
        console.log(`%c📊 Roost Hole Booking Stats`, 'color:#C8B87A;font-weight:bold;font-size:14px');
        console.log(`Total: ${totalDates} | Open: ${avail} | Booked: ${bookedDates} | Fill rate: ${((bookedDates/totalDates)*100).toFixed(1)}%`);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }

})();
