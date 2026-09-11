const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const tip = document.querySelector('#tip');
const list = document.querySelector('#task-list');
const filters = document.querySelector('.filters'); // 补充获取 filters
let currentFilter = 'all'; // all / active / done
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
const save = () => localStorage.setItem('tasks', JSON.stringify(tasks));
const render = () => {
    list.innerHTML = '';
    const shown = tasks.filter(t =>
        currentFilter === 'all' ? true :
        currentFilter === 'active' ? !t.done : t.done
    );
    if (shown.length === 0) {
        const li = document.createElement('li');
        li.textContent = tasks.length === 0 ? '暂无任务' : '没有符合条件的任务';
        list.appendChild(li);
        return;
    }
    shown.forEach((task, index) => {
        const li = document.createElement('li');
        const textSpan = document.createElement('span');
        textSpan.textContent = task.text;
        if (task.done) textSpan.classList.add('done');
        textSpan.addEventListener('click', () => {
            task.done = !task.done; 
            save(); 
            render(); 
        });
        const delBtn = document.createElement('span');
        delBtn.textContent = '×';
        delBtn.className = 'del';
        delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            tasks.splice(tasks.indexOf(task), 1); 
            save(); 
            render();
        });

        li.appendChild(textSpan);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
};
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (text === '') {
        tip.textContent = '任务名不能为空';
        return;
    }
    tasks.push({ text: text, done: false });
    tip.textContent = '';
    input.value = '';
    save(); 
    render(); 
});
filters.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    currentFilter = e.target.dataset.filter; 
    render(); 
});
render();