// Digital Clock - Multiple Time Zones

class DigitalClock {
    constructor() {
        this.timezones = [
            { name: 'UTC', offset: 0, region: 'Coordinated Universal Time' },
            { name: 'EST', offset: -5, region: 'Eastern Standard Time' },
            { name: 'CST', offset: -6, region: 'Central Standard Time' },
            { name: 'MST', offset: -7, region: 'Mountain Standard Time' },
            { name: 'PST', offset: -8, region: 'Pacific Standard Time' },
            { name: 'GMT', offset: 0, region: 'Greenwich Mean Time' },
            { name: 'CET', offset: 1, region: 'Central European Time' },
            { name: 'EET', offset: 2, region: 'Eastern European Time' },
            { name: 'IST', offset: 5.5, region: 'Indian Standard Time' },
            { name: 'JST', offset: 9, region: 'Japan Standard Time' },
            { name: 'SGT', offset: 8, region: 'Singapore Time' },
            { name: 'HKT', offset: 8, region: 'Hong Kong Time' },
            { name: 'AEST', offset: 10, region: 'Australian Eastern Standard Time' },
            { name: 'NZST', offset: 12, region: 'New Zealand Standard Time' },
            { name: 'AKST', offset: -9, region: 'Alaska Standard Time' },
            { name: 'HST', offset: -10, region: 'Hawaii Standard Time' },
            { name: 'WET', offset: 0, region: 'Western European Time' },
            { name: 'WEST', offset: 1, region: 'Western European Summer Time' },
            { name: 'AST', offset: -4, region: 'Atlantic Standard Time' },
            { name: 'GST', offset: 4, region: 'Gulf Standard Time' }
        ];

        this.activeTimezones = ['UTC', 'EST', 'IST', 'JST'];
        this.format24Hour = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderClocks();
        this.startClockUpdates();
    }

    setupEventListeners() {
        // Add timezone button
        document.getElementById('addTimezoneBtn').addEventListener('click', () => {
            this.openModal();
        });

        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.reset();
        });

        // Format toggle buttons
        document.querySelectorAll('.format-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.format-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.format24Hour = e.target.dataset.format === '24';
                this.renderClocks();
            });
        });

        // Search input
        document.getElementById('timezoneSearch').addEventListener('input', (e) => {
            this.filterTimezones(e.target.value);
        });
    }

    openModal() {
        const modal = document.getElementById('addTimezoneModal');
        modal.classList.remove('hidden');
        this.renderTimezoneOptions();

        // Close modal on close button
        document.querySelector('.close-btn').addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        // Close modal on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }

    renderTimezoneOptions() {
        const container = document.getElementById('timezoneOptions');
        container.innerHTML = '';

        this.timezones.forEach(tz => {
            const isAdded = this.activeTimezones.includes(tz.name);
            const option = document.createElement('div');
            option.className = `timezone-option ${isAdded ? 'added' : ''}`;
            option.innerHTML = `
                <strong>${tz.name}</strong> - ${tz.region}
                <div style="font-size: 0.85rem; color: #999; margin-top: 4px;">UTC${tz.offset > 0 ? '+' : ''}${tz.offset}</div>
            `;

            if (!isAdded) {
                option.addEventListener('click', () => {
                    this.addTimezone(tz.name);
                });
            }

            container.appendChild(option);
        });
    }

    filterTimezones(searchTerm) {
        const container = document.getElementById('timezoneOptions');
        const options = container.querySelectorAll('.timezone-option');

        options.forEach(option => {
            const text = option.textContent.toLowerCase();
            if (text.includes(searchTerm.toLowerCase())) {
                option.style.display = '';
            } else {
                option.style.display = 'none';
            }
        });
    }

    addTimezone(timezoneName) {
        if (!this.activeTimezones.includes(timezoneName)) {
            this.activeTimezones.push(timezoneName);
            this.renderClocks();
            this.renderTimezoneOptions();
            this.showToast(`${timezoneName} added!`, 'success');
        }
    }

    removeTimezone(timezoneName) {
        this.activeTimezones = this.activeTimezones.filter(tz => tz !== timezoneName);
        this.renderClocks();
        this.showToast(`${timezoneName} removed!`, 'success');
    }

    reset() {
        this.activeTimezones = ['UTC', 'EST', 'IST', 'JST'];
        this.renderClocks();
        this.showToast('Reset to default time zones!', 'success');
    }

    getTimezoneData(timezoneName) {
        return this.timezones.find(tz => tz.name === timezoneName);
    }

    getCurrentTime(timezoneName) {
        const tzData = this.getTimezoneData(timezoneName);
        const now = new Date();
        
        // Convert to UTC
        const utcTime = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
        
        // Create date object for the specific timezone
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: this.getIntlTimeZone(timezoneName),
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: !this.format24Hour
        });

        return formatter.format(now);
    }

    getIntlTimeZone(timezoneName) {
        const timezoneMap = {
            'UTC': 'UTC',
            'EST': 'America/New_York',
            'CST': 'America/Chicago',
            'MST': 'America/Denver',
            'PST': 'America/Los_Angeles',
            'GMT': 'Europe/London',
            'CET': 'Europe/Paris',
            'EET': 'Europe/Athens',
            'IST': 'Asia/Kolkata',
            'JST': 'Asia/Tokyo',
            'SGT': 'Asia/Singapore',
            'HKT': 'Asia/Hong_Kong',
            'AEST': 'Australia/Sydney',
            'NZST': 'Pacific/Auckland',
            'AKST': 'America/Anchorage',
            'HST': 'Pacific/Honolulu',
            'WET': 'Europe/Lisbon',
            'WEST': 'Europe/Lisbon',
            'AST': 'America/Halifax',
            'GST': 'Asia/Dubai'
        };
        return timezoneMap[timezoneName] || 'UTC';
    }

    getDateDisplay(timezoneName) {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: this.getIntlTimeZone(timezoneName),
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return formatter.format(new Date());
    }

    renderClocks() {
        const container = document.getElementById('clocksContainer');
        
        if (this.activeTimezones.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <div class="empty-state" style="background: none;">
                        <h2>No Time Zones Selected</h2>
                        <p>Add a time zone to see the current time</p>
                        <button class="btn btn-primary" onclick="clock.openModal()">+ Add Time Zone</button>
                    </div>
                </div>
            `;
            return;
        }

        container.innerHTML = this.activeTimezones.map(timezoneName => {
            const tzData = this.getTimezoneData(timezoneName);
            const timeString = this.getCurrentTime(timezoneName);
            const dateString = this.getDateDisplay(timezoneName);
            
            const timeParts = timeString.split(' ');
            const time = timeParts[0];
            const period = timeParts[1] || '';
            
            const offsetDisplay = tzData.offset >= 0 ? `UTC+${tzData.offset}` : `UTC${tzData.offset}`;

            return `
                <div class="clock-card">
                    <div class="timezone-name">${timezoneName}</div>
                    <div class="timezone-region">${tzData.region}</div>
                    <div class="digital-time">${time}</div>
                    ${period ? `<div class="time-period">${period}</div>` : '<div class="time-period"></div>'}
                    <div class="date-display">${dateString}</div>
                    <div class="offset-display">${offsetDisplay}</div>
                    <button class="remove-btn" onclick="clock.removeTimezone('${timezoneName}')">Remove</button>
                </div>
            `;
        }).join('');
    }

    startClockUpdates() {
        // Update every 1 second
        setInterval(() => {
            this.renderClocks();
        }, 1000);
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Initialize clock when DOM is ready
let clock;
document.addEventListener('DOMContentLoaded', () => {
    clock = new DigitalClock();
});