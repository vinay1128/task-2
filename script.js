const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

// Enable/disable Add button depending on input content
taskInput.addEventListener('input', () => {
  addBtn.disabled = taskInput.value.trim() === '';
});

// Add task function
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  const li = document.createElement('li');
  li.className = 'todo-item';

  const span = document.createElement('span');
  span.className = 'task-text';
  span.textContent = text;
  span.tabIndex = 0;
  li.appendChild(span);

  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.setAttribute('aria-label', 'Remove task');
  removeBtn.textContent = '×';
  li.appendChild(removeBtn);

  todoList.appendChild(li);
  taskInput.value = '';
  addBtn.disabled = true;
  taskInput.focus();

  updateAriaCount();
}

// Keyboard enter to add task
taskInput.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === 'NumpadEnter') && taskInput.value.trim()) {
    addTask();
  }
});

addBtn.addEventListener('click', addTask);

// Event delegation for toggle and remove
todoList.addEventListener('click', e => {
  if (e.target.classList.contains('task-text')) {
    e.target.parentElement.classList.toggle('completed');
  }
  if (e.target.classList.contains('remove-btn')) {
    e.target.parentElement.remove();
    updateAriaCount();
  }
});

todoList.addEventListener('keydown', e => {
  if (e.target.classList.contains('task-text') && (e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('completed');
  }
});

function updateAriaCount() {
  const count = todoList.children.length;
  if (count === 0) {
    todoList.setAttribute('aria-label', 'No to-do tasks');
  } else {
    todoList.setAttribute('aria-label', `${count} to-do task${count > 1 ? 's' : ''}`);
  }
}

updateAriaCount();