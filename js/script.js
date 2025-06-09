const emptyTask = `
<div id="Empty" class="border border-white w-[90%] mx-auto rounded-2xl text-center py-10 text-2xl font-mono text-slate-500">
                   😔 No tasks yet!
</div>
`

const addBtn = document.getElementById('addBtn')
const inputBar = document.getElementById('inputBar')
const container = document.getElementById('taskContainer')
const deletebtn = document.getElementById('deleteBtn')
const checkboxes = document.querySelectorAll('input[type="checkbox]"')

function addTask() {

    if (inputBar.value !== '') {
        let task = document.createElement('div')
        task.innerHTML = `
<div class="border mx-auto w-[90%] mt-3 rounded-2xl p-3 bg-slate-800">
                    <div class="flex justify-end  align-middle">
                        <div>
                            <input type="checkbox" name="checkTask" id="checkTask"
                                class=" scale-150 ml-2.5 sm:scale-200 accent-emerald-500 mt-1.5 ">
                        </div>
                        <div class=" grow ml-5">
                            ${inputBar.value}
                        </div>
                        <div>
                            <span id = "deleteBtn" class="material-symbols-outlined sm:scale-130 cursor-pointer text-green-500 sm:p-2">
                                delete
                            </span>
                        </div>
                    </div>
                </div>

            </div>

`

        container.appendChild(task)
        inputBar.value = ''
    }
}

container.addEventListener('change', (e) => {
    if (e.target && e.target.type === "checkbox") {
        const taskTextDiv = e.target.closest('.flex').querySelector('.grow');
        taskTextDiv.classList.toggle('line-through', e.target.checked);
    }
});

addBtn.addEventListener('click', addTask)