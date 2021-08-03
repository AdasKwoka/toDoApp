const addBtn = document.querySelector("form button");
const ulActive = document.querySelector(".to-do-list");
const ulDone = document.querySelector(".done-list")
const removeBtns = document.getElementsByClassName("remove-task");
const doneBtns = document.getElementsByClassName("done-task");
const activeTasksList = [];
const doneTasksList = [];
const searchInput = document.getElementById("search");

const createItem = function(task) {
    const li = document.createElement("li");
    li.innerHTML = `${task.text}<button class="done-task">&#x2714</button></button><button class="remove-task">X</button>`;
    if(task.prio) li.style.color = "goldenrod";
    li.classList.add = "task";
    activeTasksList.push(li);
    return li
}

const showActiveTasks = function() {
  ulActive.textContent = "";
  activeTasksList.forEach((item, index) => {
    item.dataset.key = index;
    ulActive.appendChild(item);
  })
  document.querySelector("#add").value = "";
  document.querySelector("#prio").checked = false;
  searchInput.value = "";
}

const showDoneTasks = function() {
  ulDone.textContent = "";
  doneTasksList.forEach(item => {
    ulDone.appendChild(item);
  })
  searchInput.value = "";
}

const removeTask = function(e) {
  const index = e.target.parentNode.dataset.key;
  activeTasksList.splice(index,1);
  showActiveTasks();
}

const doneTask = function(e) {
  const index = e.target.parentNode.dataset.key;
  const deletedTask = activeTasksList.splice(index,1)[0];
  const txt = deletedTask.textContent.slice(0, deletedTask.textContent.length-2);
  deletedTask.textContent = txt;
  deletedTask.style.color = "white";
  doneTasksList.push(deletedTask);
  showDoneTasks();
  showActiveTasks();
}

const searchTask = function(e) {
  const txt = e.target.value;
  const matchingTasks = activeTasksList.filter(task => task.textContent.includes(txt));
  ulActive.textContent = "";

  matchingTasks.forEach(task => ulActive.appendChild(task));
}

const addTask = function(e) {
  e.preventDefault();
  const inputValue = document.querySelector("#add").value;
  if(!inputValue) return
  const checkValue = document.querySelector("#prio").checked;
  const task = new Task(inputValue, checkValue);
  const newLi = createItem(task);
  showActiveTasks();
  [...removeBtns].forEach(btn => btn.addEventListener("click", removeTask));
  [...doneBtns].forEach(btn => btn.addEventListener("click", doneTask));
}

addBtn.addEventListener("click", addTask);
searchInput.addEventListener("input", searchTask);