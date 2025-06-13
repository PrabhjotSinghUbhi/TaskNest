// grab all the buttons and divs.
const addBtn = document.getElementById('addBtn')
const inputValue = document.getElementById('inputBar')
const container = document.getElementById('taskContainer')

let tasks = []

// Helper Function to get Tasks.
function getTasksFromLocalStorage() {
    let stored = localStorage.getItem('tasks');
    try {
        tasks = stored ? JSON.parse(stored) : [];
        if (!Array.isArray(tasks)) tasks = [];
    } catch {
        tasks = [];
        localStorage.removeItem('tasks');
    }
}

// Helper Function to save Tasks.
function saveTasksToLocalStorage() {
    // make the tasks array into a string because a localStorage key and value only stores string values.
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Add Task Function
function addTasks() {
    let taskText = inputValue.value.trim()
    if (!taskText) return
    tasks.push(
        {
            text: taskText,
            completed: false
        }
    )
    inputValue.value = ''
    saveTasksToLocalStorage()
    renderTask()

}

// Render Task List
function renderTask() {
    container.innerHTML = ''
    if (tasks.length === 0) {
        container.innerHTML = `<div class="text-center text-cyan-400 opacity-60 py-8 font-mono">No tasks yet!</div>`;
        return;
    }

    tasks.forEach((task, index) => {
        let taskDiv = document.createElement('div')
        taskDiv.innerHTML = `
            <div data-index = ${index} class="taskMerger border border-slate-800 mx-auto w-full mt-2 rounded-2xl p-4 bg-slate-900 shadow-md hover:shadow-emerald-500/20 transition group">

                <div class="mergeTask flex items-center justify-between">

                        <input type="checkbox" name="checkTask" ${task.completed ? "checked" : ''}
                        class="scale-150 accent-emerald-500 transition-all duration-200 mr-4" />

                    <div class="inputValue grow ml-2 text-lg sm:text-2xl transition-all duration-200 text-gray-500 ${task.completed ? "line-through opacity-15" : ''}" >
                   ${task.text}
                    </div>

                    <button type = "button" class="deleteBtn ml-4 rounded-full p-2 hover:bg-red-500/20 transition">
                        <span class="material-symbols-outlined text-red-500 text-3xl cursor-pointer transition hover:text-red-400 active:scale-90 select-none">
                        delete
                        </span>
                    </button>
                </div>
            </div>
            `
        container.appendChild(taskDiv)
    })
}

// Add task on button click
addBtn.addEventListener('click', addTasks)

// Add task on pressing Enter key
inputValue.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        addTasks()
    }
})

// Handle checkbox (task complete)
container.addEventListener('change', (e) => {
    let taskDiv = e.target.closest('.taskMerger');
    if (!taskDiv) return;
    let index = Number(taskDiv.getAttribute('data-index'));
    if (typeof tasks[index] !== "undefined") {
        tasks[index].completed = !tasks[index].completed;
        saveTasksToLocalStorage();
        renderTask();
    }
});


// Handle delete button
container.addEventListener('click', (e) => {
    if (e.target.closest('.deleteBtn')) {
        let taskDiv = e.target.closest('.taskMerger');
        let index = Number(taskDiv.getAttribute('data-index'));
        if (typeof tasks[index] !== "undefined") {
            tasks.splice(index, 1);
            saveTasksToLocalStorage();
            renderTask();
        }
    }
})

// Initial render on page load.
getTasksFromLocalStorage()
renderTask()

//When all code was written by me things were not working
/**
 * THE REPORT
 * -> THE EVENT LISTENERS ARE WORKING FINE BOTH ADD TASK AND LOCAL STORAGE FUNCTION ARE CALLED SUCCESSFULLY.
 * -> THROUGH THE DEV TOOLS WE CAN SEE THAT THE TASKS ARE NOT ADDED TO LOCAL STORAGE.
 * -> THAT'S THE START.
 */