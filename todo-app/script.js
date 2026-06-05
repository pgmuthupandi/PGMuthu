// Todo App Class
class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.currentPriorityFilter = 'all';
        this.currentCategory = 'all';
        this.currentSort = 'date-newest';
        this.editingId = null;

        this.initializeElements();
        this.loadTodos();
        this.attachEventListeners();
        this.render();
    }

    initializeElements() {
        this.todoInput = document.getElementById('todoInput');
        this.todoForm = document.getElementById('todoForm');
        this.prioritySelect = document.getElementById('prioritySelect');
        this.categorySelect = document.getElementById('categorySelect');
        this.todosList = document.getElementById('todosList');
        this.emptyState = document.getElementById('emptyState');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.priorityFilters = document.querySelectorAll('.priority-filter');
        this.categoryTabs = document.querySelectorAll('.tab-btn');
        this.sortSelect = document.getElementById('sortSelect');
        this.totalTasksEl = document.getElementById('totalTasks');
        this.completedTasksEl = document.getElementById('completedTasks');
        this.remainingTasksEl = document.getElementById('remainingTasks');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.deleteAllBtn = document.getElementById('deleteAllBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.confirmModal = document.getElementById('confirmModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalMessage = document.getElementById('modalMessage');
        this.confirmBtn = document.getElementById('confirmBtn');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.toast = document.getElementById('toast');
    }

    attachEventListeners() {
        // Form submission
        this.todoForm.addEventListener('submit', (e) => this.addTodo(e));

        // Filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });

        // Priority filters
        this.priorityFilters.forEach(btn => {
            btn.addEventListener('click', (e) => this.setPriorityFilter(e.target.dataset.priority));
        });

        // Category tabs
        this.categoryTabs.forEach(btn => {
            btn.addEventListener('click', (e) => this.setCategory(e.target.dataset.category));
        });

        // Sort select
        this.sortSelect.addEventListener('change', (e) => this.setSort(e.target.value));

        // Action buttons
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        this.deleteAllBtn.addEventListener('click', () => this.deleteAll());
        this.exportBtn.addEventListener('click', () => this.exportTasks());

        // Modal buttons
        this.confirmBtn.addEventListener('click', () => this.executeConfirmed());
        this.cancelBtn.addEventListener('click', () => this.hideModal());
    }

    addTodo(e) {
        e.preventDefault();

        const text = this.todoInput.value.trim();
        if (!text) {
            this.showToast('Please enter a task', 'error');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            priority: this.prioritySelect.value,
            category: this.categorySelect.value,
            date: new Date().toISOString(),
        };

        this.todos.unshift(todo);
        this.todoInput.value = '';
        this.saveTodos();
        this.render();
        this.showToast('Task added successfully!', 'success');
    }

    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        this.todoInput.value = todo.text;
        this.prioritySelect.value = todo.priority;
        this.categorySelect.value = todo.category;
        this.editingId = id;
        this.todoInput.focus();

        // Change form submit to update mode
        const originalSubmit = this.todoForm.onsubmit;
        this.todoForm.onsubmit = (e) => {
            e.preventDefault();
            const newText = this.todoInput.value.trim();
            if (!newText) {
                this.showToast('Task cannot be empty', 'error');
                return;
            }

            todo.text = newText;
            todo.priority = this.prioritySelect.value;
            todo.category = this.categorySelect.value;
            this.todoInput.value = '';
            this.editingId = null;
            this.todoForm.onsubmit = originalSubmit;
            this.saveTodos();
            this.render();
            this.showToast('Task updated successfully!', 'success');
        };
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.render();
        this.showToast('Task deleted!', 'success');
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
        }
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    }

    setPriorityFilter(priority) {
        this.currentPriorityFilter = priority;
        this.priorityFilters.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.priority === priority);
        });
        this.render();
    }

    setCategory(category) {
        this.currentCategory = category;
        this.categoryTabs.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        this.render();
    }

    setSort(sort) {
        this.currentSort = sort;
        this.render();
    }

    getFilteredAndSortedTodos() {
        let filtered = this.todos.filter(todo => {
            // Filter by status
            if (this.currentFilter === 'completed' && !todo.completed) return false;
            if (this.currentFilter === 'active' && todo.completed) return false;

            // Filter by priority
            if (this.currentPriorityFilter !== 'all' && todo.priority !== this.currentPriorityFilter) {
                return false;
            }

            // Filter by category
            if (this.currentCategory !== 'all' && todo.category !== this.currentCategory) {
                return false;
            }

            return true;
        });

        // Sort
        filtered.sort((a, b) => {
            switch (this.currentSort) {
                case 'date-oldest':
                    return new Date(a.date) - new Date(b.date);
                case 'priority':
                    const priorityOrder = { high: 0, medium: 1, low: 2 };
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                case 'alphabetical':
                    return a.text.localeCompare(b.text);
                case 'date-newest':
                default:
                    return new Date(b.date) - new Date(a.date);
            }
        });

        return filtered;
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const remaining = total - completed;

        this.totalTasksEl.textContent = total;
        this.completedTasksEl.textContent = completed;
        this.remainingTasksEl.textContent = remaining;
    }

    render() {
        const filtered = this.getFilteredAndSortedTodos();

        this.todosList.innerHTML = '';

        if (filtered.length === 0) {
            this.emptyState.classList.remove('hidden');
        } else {
            this.emptyState.classList.add('hidden');
            filtered.forEach(todo => {
                this.todosList.appendChild(this.createTodoElement(todo));
            });
        }

        this.updateStats();
    }

    createTodoElement(todo) {
        const li = document.createElement('div');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => this.toggleTodo(todo.id));

        const content = document.createElement('div');
        content.className = 'todo-content';

        const text = document.createElement('div');
        text.className = 'todo-text';
        text.textContent = todo.text;

        const meta = document.createElement('div');
        meta.className = 'todo-meta';

        // Priority badge
        const priorityBadge = document.createElement('span');
        priorityBadge.className = `todo-badge priority-${todo.priority}`;
        priorityBadge.textContent = `Priority: ${todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}`;

        // Category badge
        const categoryBadge = document.createElement('span');
        categoryBadge.className = 'todo-badge category-badge';
        categoryBadge.textContent = `${todo.category.charAt(0).toUpperCase() + todo.category.slice(1)}`;

        // Date
        const dateSpan = document.createElement('span');
        dateSpan.className = 'todo-date';
        dateSpan.textContent = this.formatDate(new Date(todo.date));

        meta.appendChild(priorityBadge);
        meta.appendChild(categoryBadge);
        meta.appendChild(dateSpan);

        content.appendChild(text);
        content.appendChild(meta);

        // Action buttons
        const actions = document.createElement('div');
        actions.className = 'todo-actions';

        const editBtn = document.createElement('button');
        editBtn.className = 'todo-btn edit-btn';
        editBtn.innerHTML = '✏️';
        editBtn.addEventListener('click', () => this.editTodo(todo.id));

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'todo-btn delete-btn';
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.addEventListener('click', () => this.deleteTodo(todo.id));

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(checkbox);
        li.appendChild(content);
        li.appendChild(actions);

        return li;
    }

    formatDate(date) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
            });
        }
    }

    clearCompleted() {
        const completed = this.todos.filter(t => t.completed);
        if (completed.length === 0) {
            this.showToast('No completed tasks to clear', 'info');
            return;
        }

        this.showConfirmModal(
            'Clear Completed Tasks',
            `Are you sure you want to delete ${completed.length} completed task(s)?`,
            () => {
                this.todos = this.todos.filter(t => !t.completed);
                this.saveTodos();
                this.render();
                this.showToast('Completed tasks cleared!', 'success');
            }
        );
    }

    deleteAll() {
        if (this.todos.length === 0) {
            this.showToast('No tasks to delete', 'info');
            return;
        }

        this.showConfirmModal(
            'Delete All Tasks',
            `Are you sure you want to delete all ${this.todos.length} task(s)? This action cannot be undone.`,
            () => {
                this.todos = [];
                this.saveTodos();
                this.render();
                this.showToast('All tasks deleted!', 'success');
            }
        );
    }

    exportTasks() {
        if (this.todos.length === 0) {
            this.showToast('No tasks to export', 'info');
            return;
        }

        const data = {
            exportDate: new Date().toISOString(),
            totalTasks: this.todos.length,
            tasks: this.todos
        };

        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `todos-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);

        this.showToast('Tasks exported successfully!', 'success');
    }

    showConfirmModal(title, message, onConfirm) {
        this.modalTitle.textContent = title;
        this.modalMessage.textContent = message;
        this.confirmModal.classList.remove('hidden');

        this.confirmBtn.onclick = () => {
            onConfirm();
            this.hideModal();
        };
    }

    hideModal() {
        this.confirmModal.classList.add('hidden');
    }

    showToast(message, type = 'info') {
        this.toast.textContent = message;
        this.toast.className = `toast ${type}`;
        this.toast.classList.remove('hidden');

        setTimeout(() => {
            this.toast.classList.add('hidden');
        }, 3000);
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadTodos() {
        const stored = localStorage.getItem('todos');
        this.todos = stored ? JSON.parse(stored) : [];
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});