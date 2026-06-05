# 🕐 Digital Clock - Multiple Time Zones

A modern, responsive digital clock application that displays the current time across different time zones worldwide.

## Features

✨ **Core Features:**
- Real-time clock updates (refreshes every second)
- Support for 20+ time zones
- 12/24 hour format toggle
- Add/Remove time zones dynamically
- Search functionality to find time zones
- Reset to default time zones
- Responsive design (works on mobile, tablet, desktop)
- Beautiful gradient UI with smooth animations

🎨 **User Interface:**
- Modern card-based layout
- Color-coded time displays
- UTC offset information
- Date display for each timezone
- Toast notifications for user actions
- Modal dialog for adding time zones
- Search and filter functionality

⏰ **Supported Time Zones:**

**Americas:**
- EST - Eastern Standard Time (UTC-5)
- CST - Central Standard Time (UTC-6)
- MST - Mountain Standard Time (UTC-7)
- PST - Pacific Standard Time (UTC-8)
- AKST - Alaska Standard Time (UTC-9)
- HST - Hawaii Standard Time (UTC-10)
- AST - Atlantic Standard Time (UTC-4)

**Europe:**
- GMT - Greenwich Mean Time (UTC+0)
- CET - Central European Time (UTC+1)
- EET - Eastern European Time (UTC+2)
- WET - Western European Time (UTC+0)
- WEST - Western European Summer Time (UTC+1)

**Asia:**
- IST - Indian Standard Time (UTC+5:30)
- JST - Japan Standard Time (UTC+9)
- SGT - Singapore Time (UTC+8)
- HKT - Hong Kong Time (UTC+8)
- GST - Gulf Standard Time (UTC+4)

**Pacific:**
- AEST - Australian Eastern Standard Time (UTC+10)
- NZST - New Zealand Standard Time (UTC+12)

**Universal:**
- UTC - Coordinated Universal Time (UTC+0)

## How to Use

1. **Open the Application**
   - Open `index.html` in your web browser

2. **Add Time Zones**
   - Click the "+ Add Time Zone" button
   - Select from the list of available time zones
   - Click on a time zone to add it

3. **Search Time Zones**
   - Use the search box to find specific time zones
   - Search by timezone name or region

4. **Change Time Format**
   - Click "12 Hour" or "24 Hour" button to toggle format

5. **Remove Time Zones**
   - Click the "Remove" button on any clock card

6. **Reset**
   - Click "Reset" to restore default time zones (UTC, EST, IST, JST)

## File Structure

```
digital-clock/
├── index.html       # HTML structure
├── styles.css       # Styling and animations
├── script.js        # JavaScript logic
└── README.md        # Documentation
```

## Technical Details

**JavaScript Features:**
- ES6 Class-based architecture
- Intl API for timezone conversion
- Real-time updates with setInterval
- Event listeners for user interactions
- Dynamic DOM manipulation

**CSS Features:**
- CSS Grid for responsive layout
- CSS Flexbox for alignment
- Gradient backgrounds
- Smooth animations and transitions
- Mobile-first responsive design
- CSS custom properties for theming

## Browser Compatibility

- Chrome 24+
- Firefox 29+
- Safari 10+
- Edge 15+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features Explained

### Real-Time Updates
The clock updates every second to show the current time in all selected time zones.

### UTC Offset Display
Each clock card displays the UTC offset, making it easy to understand the time difference.

### Search Functionality
Quickly find time zones by typing in the search box. Supports searching by:
- Timezone abbreviation (e.g., "EST")
- Region name (e.g., "Eastern")
- Country names

### 12/24 Hour Toggle
Switch between 12-hour and 24-hour time formats with a single click.

### Toast Notifications
Get instant feedback when adding, removing, or resetting time zones.

## Customization

### Adding More Time Zones
Edit the `timezones` array in `script.js` to add more time zones:

```javascript
{ name: 'TIMEZONE_CODE', offset: UTC_OFFSET, region: 'Full Region Name' }
```

### Changing Colors
Modify the gradient colors in `styles.css`:

```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Adjusting Update Frequency
Change the interval in `startClockUpdates()` method (currently 1000ms).

## Tips & Tricks

1. **Multiple Clocks**: Add multiple clocks for the same timezone at different times
2. **Compare Times**: Quickly see time differences between regions
3. **Business Hours**: Check business hours across different time zones
4. **Travel Planning**: Plan calls and meetings across time zones
5. **World Time**: Keep track of global team working hours

## Performance

- Lightweight and fast
- Minimal DOM manipulation
- Efficient event handling
- Smooth 60fps animations
- Optimized for mobile devices

## Accessibility

- Semantic HTML structure
- Clear button labels
- High contrast colors
- Keyboard navigation support
- Screen reader friendly

## Future Enhancements

- [ ] Save favorite time zones to localStorage
- [ ] Set alarms for specific times
- [ ] 12-hour countdown timer
- [ ] World map with timezone markers
- [ ] Time zone converter
- [ ] Export/import settings
- [ ] Dark mode theme
- [ ] Voice announcement of time

## License

Free to use and modify for personal or commercial projects.

## Author

Created by **Muthupandi G**
Email: pg.muthupandi@gmail.com

---

**Happy Time Zone Tracking! ⏰**
