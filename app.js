const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('task-list');
const count = document.getElementById('task-count');
const clearBtn = document.getElementById('clear-completed');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function render() {
  list.innerHTML = '';
  tasks.forEach((t, i) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (t.done ? ' completed' : '');
    li.innerHTML = `
      <span onclick="toggle(${i})">${t.text}</span>
      <button class="delete-btn" onclick="del(${i})">×</button>`;
    list.appendChild(li);
  });
  count.textContent = tasks.filter(t => !t.done).length;
  save();
}

function add() {
  const text = input.value.trim();
  if (!text) return;
  tasks.unshift({ text, done: false });
  input.value = '';
  render();
}

function toggle(i) {
  tasks[i].done = !tasks[i].done;
  render();
}

function del(i) {
  tasks.splice(i, 1);
  render();
}

function clearCompleted() {
  tasks = tasks.filter(t => !t.done);
  render();
}

addBtn.onclick = add;
clearBtn.onclick = clearCompleted;
input.addEventListener('keypress', e => e.key === 'Enter' && add());

render();
