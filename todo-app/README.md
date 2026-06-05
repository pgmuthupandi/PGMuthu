# To-Do List Application

A feature-rich to-do list application with local storage functionality, built with vanilla JavaScript, HTML, and CSS.

## 🎯 Features

### Core Functionality
- ✅ **Add Tasks** - Create new tasks with ease
- ✏️ **Edit Tasks** - Modify existing tasks
- 🗑️ **Delete Tasks** - Remove individual tasks
- ✔️ **Mark Complete** - Check off finished tasks
- 💾 **Local Storage** - All tasks saved locally in browser

### Organization
- 🎯 **Priority Levels** - High, Medium, Low
- 📂 **Categories** - Work, Personal, Shopping, Health, Other
- 🏷️ **Badges** - Visual indicators for priority and category

### Filtering & Sorting
- 🔍 **Status Filters** - All, Active, Completed
- 📊 **Priority Filters** - Filter by high, medium, or low priority
- 📁 **Category Tabs** - View tasks by category
- 🔀 **Sorting Options**:
  - Newest First
  - Oldest First
  - By Priority
  - Alphabetical (A-Z)

### Statistics
- 📈 **Task Statistics** - Total, Completed, and Remaining tasks
- 📊 **Real-time Updates** - Stats update as you manage tasks

### Actions
- 🧹 **Clear Completed** - Remove all completed tasks at once
- 🗑️ **Delete All** - Remove all tasks (with confirmation)
- 📥 **Export Tasks** - Download tasks as JSON file
- 🔔 **Toast Notifications** - Feedback for all actions
- 🔐 **Confirmation Dialogs** - Prevent accidental deletions

### User Experience
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Smooth Animations** - Fade in/out effects for tasks
- 🎨 **Modern UI** - Gradient backgrounds and hover effects
- 🌈 **Color Coded** - Visual distinction by priority
- 📅 **Smart Dates** - Shows "Today", "Yesterday", or specific dates

## 🚀 Quick Start

1. Open `index.html` in your web browser
2. Start adding tasks!
3. All data is saved automatically to your browser

## 📁 File Structure

```
todo-app/
├── index.html      # Main HTML file
├── styles.css      # Styling
├── script.js       # JavaScript functionality
└── README.md       # Documentation
```

## 💻 Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations and gradients
- **JavaScript (ES6+)** - Class-based application structure
- **Local Storage API** - Browser-based data persistence

## 🎨 Features Breakdown

### Add Task Form
- Input field for task text
- Priority selector (Low, Medium, High)
- Category selector (Work, Personal, Shopping, Health, Other)
- Submit button with validation

### Task Item Display
- Checkbox for completion status
- Task text with strikethrough when completed
- Priority badge (color-coded)
- Category badge
- Date created (smart formatting)
- Edit and Delete buttons

### Filter & Sort Controls
- Status filters (All, Active, Completed)
- Priority filters (All, High, Medium, Low)
- Category tabs for quick access
- Sort dropdown (Date, Priority, Alphabetical)

### Statistics Dashboard
- Total tasks count
- Completed tasks count
- Remaining tasks count
- Real-time updates

### Action Buttons
- **Clear Completed** - Remove all finished tasks
- **Delete All** - Clear everything (with confirmation)
- **Export Tasks** - Download as JSON

## 📊 Data Structure

Each task is stored with:
```javascript
{
  id: 1234567890,
  text: "Task description",
  completed: false,
  priority: "high", // "high", "medium", "low"
  category: "work", // "work", "personal", "shopping", "health", "other"
  date: "2026-06-05T10:30:00.000Z"
}
```

## 🎯 How to Use

### Adding a Task
1. Type task text in the input field
2. Select priority level (optional, defaults to Medium)
3. Select category (optional, defaults to Personal)
4. Click "Add Task" or press Enter

### Managing Tasks
- **Mark Complete** - Click the checkbox next to a task
- **Edit** - Click the pencil icon to modify a task
- **Delete** - Click the trash icon to remove a task

### Filtering
- Click status filters to show All, Active, or Completed tasks
- Click priority filters to show specific priority levels
- Click category tabs to view tasks by category

### Sorting
- Select from dropdown: Newest, Oldest, Priority, or A-Z

### Exporting
- Click "Export Tasks" to download all tasks as a JSON file
- File saved as `todos-[timestamp].json`

## 💾 Data Persistence

- All tasks are automatically saved to browser's Local Storage
- Data persists even after closing the browser
- No server or internet connection required
- Maximum storage: ~5-10MB (browser dependent)

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --success-color: #48bb78;
    --danger-color: #f56565;
    /* ... more colors ... */
}
```

### Add New Categories
1. Add option in HTML select
2. Add CSS styling for badge
3. Update JavaScript category array

## 📱 Responsive Breakpoints

- **Desktop** - 1200px and above
- **Tablet** - 768px to 1199px
- **Mobile** - 480px to 767px
- **Small Mobile** - Below 480px

## 🔒 Local Storage

Your tasks are stored in your browser's Local Storage under the key `todos`. To clear all data:
1. Open Developer Tools (F12)
2. Go to Application > Local Storage
3. Delete the `todos` key

## ⚠️ Important Notes

- Data is stored locally - clearing browser data will delete tasks
- Different browsers maintain separate local storage
- No backup is automatically created (use Export feature)
- Maximum storage limits vary by browser

## 🚀 Future Enhancements

Potential features to add:
- Due dates and reminders
- Recurring tasks
- Task descriptions/notes
- Drag and drop to reorder
- Dark mode
- Cloud sync
- Collaboration features
- Mobile app version

## 📝 License

Free to use and modify for personal projects.

---

**Created:** June 2026
**Last Updated:** June 2026

Enjoy organizing your tasks! 📋✨