const addBtn = document.getElementById('addBtn')
const inputBar = document.getElementById('inputBar')
const container = document.getElementById('taskContainer')

// Helper Function to get Tasks.
function getTaskFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : []
}

// Helper Function to save Tasks.
function saveTasksInLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Add Task Function
function addTask(e) {
    if (e) e.preventDefault(); // Prevent form submission or button default
    if (!inputBar) return;
    if (inputBar.value.trim() !== '') {
        const tasks = getTaskFromLocalStorage();
        tasks.push({
            text: inputBar.value,
            completed: false
        });
        saveTasksInLocalStorage(tasks);
        renderTasks();
        inputBar.value = '';
    }
}

// Render Task List
function renderTasks() {
    container.innerHTML = ''
    const tasks = getTaskFromLocalStorage();
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div')
        taskDiv.innerHTML = `
        <div class="taskMerger border border-slate-800 mx-auto w-full mt-2 rounded-2xl p-4 bg-slate-900 shadow-md hover:shadow-emerald-500/20 transition group">
            <div class="mergeTask flex items-center justify-between">
                <input type="checkbox" name="checkTask"
                    class="scale-150 accent-emerald-500 transition-all duration-200 mr-4" ${task.completed ? 'checked' : ''} data-index="${index}" />
                <div class="inputValue grow ml-2 text-lg sm:text-2xl transition-all duration-200 ${task.completed ? 'text-gray-500 line-through' : ''}">
                    ${task.text}
                </div>
                <button class="deleteBtn ml-4 rounded-full p-2 hover:bg-red-500/20 transition" data-index="${index}">
                    <span class="material-symbols-outlined text-red-500 text-3xl cursor-pointer transition hover:text-red-400 active:scale-90 select-none">
                        delete
                    </span>
                </button>
            </div>
        </div>
        `;
        container.appendChild(taskDiv)
    })
}

// Add task on button click
if (addBtn) {
    addBtn.addEventListener('click', addTask);
}

// Add task on pressing Enter key
inputBar.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        addTask()
    }
})

// Handle checkbox (task complete)
container.addEventListener('change', (e) => {
    if (e.target.type === "checkbox") {
        const index = e.target.getAttribute('data-index')
        const tasks = getTaskFromLocalStorage()
        tasks[index].completed = e.target.checked;
        saveTasksInLocalStorage(tasks)
        renderTasks()
    }
});

// Handle delete button
container.addEventListener('click', (e) => {
    if (e.target.closest('.deleteBtn')) {
        const index = e.target.closest('.deleteBtn').getAttribute('data-index')
        const tasks = getTaskFromLocalStorage();
        tasks.splice(index, 1)
        saveTasksInLocalStorage(tasks)
        renderTasks() // Re-render after deletion
    }
})

// Initial render on page load
renderTasks()
