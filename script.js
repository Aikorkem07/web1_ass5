
const userProfile = {
    name: "Student",
    birthYear: 2007,
    isDeveloper: true,
    hobbies: ["Programming", "Reading", "Music"]
};

const tasks = [
    {
        title: "JavaScript Basics",
        deadline: "2026-10-25",
        completed: false
    },
    {
        title: "Exception Handling in FP",
        deadline: "2026-10-25",
        completed: false
    },
    {
        title: "Extension Methods and LINQ",
        deadline: "2026-11-01",
        completed: false
    },
    {
        title: "Prepare for Kazakh Language",
        deadline: "",
        completed: false
    }
];

const profileForm = document.getElementById("profileForm");
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");
const removeButton = document.getElementById("removeButton");

function calculateAge(birthYear) {
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
}

function updateProfile() {
    document.getElementById("profileName").textContent = userProfile.name;
    document.getElementById("profileAge").textContent = calculateAge(userProfile.birthYear);
    document.getElementById("profileTaskCount").textContent = tasks.length;
}

profileForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("username").value.trim();
    const birthYear = Number(document.getElementById("birthYear").value);
    const currentYear = new Date().getFullYear();

    if (name === "" || birthYear < 1900 || birthYear > currentYear) {
        alert("Please enter a valid name and birth year.");
        return;
    }

    userProfile.name = name;
    userProfile.birthYear = birthYear;

    updateProfile();
});

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(task) {
        const li = document.createElement("li");
        li.className = "task-item";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute("aria-label", "Complete " + task.title);

        const details = document.createElement("div");
        details.className = "task-details";

        const title = document.createElement("p");
        title.textContent = task.title;

        if (task.completed) {
            title.classList.add("completed");
        }

        const deadline = document.createElement("small");
        deadline.textContent = task.deadline
            ? "Deadline: " + task.deadline
            : "No deadline";

        checkbox.addEventListener("change", function() {
            task.completed = checkbox.checked;
            renderTasks();
        });

        details.appendChild(title);
        details.appendChild(deadline);
        li.appendChild(checkbox);
        li.appendChild(details);
        taskList.appendChild(li);
    });

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(function(task) {
        return task.completed;
    }).length;

    document.getElementById("totalTasks").textContent = totalTasks;
    document.getElementById("completedTasks").textContent = completedTasks;

    updateProfile();
}

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = taskInput.value.trim();

    if (title === "") {
        return;
    }

    tasks.push({
        title: title,
        deadline: taskDate.value,
        completed: false
    });

    taskInput.value = "";
    taskDate.value = "";

    renderTasks();
});

removeButton.addEventListener("click", function() {
    if (tasks.length > 0) {
        tasks.pop();
        renderTasks();
    } else {
        alert("There are no tasks to remove.");
    }
});

updateProfile();
renderTasks();

console.log("User profile:", userProfile);
console.log("Total hobbies:", userProfile.hobbies.length);
console.log("Age:", calculateAge(userProfile.birthYear));
