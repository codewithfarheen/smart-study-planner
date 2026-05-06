let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let currentLang = "en";

/* ---------------- UI TRANSLATIONS ---------------- */
const translations = {
    en: {
        title: "📚 Smart Study Planner",
        placeholder: "Enter task",
        add: "Add",
        all: "All",
        completed: "Completed",
        pending: "Pending",
        progress: "Progress"
    },
    hi: {
        title: "📚 स्मार्ट स्टडी प्लानर",
        placeholder: "कार्य लिखें",
        add: "जोड़ें",
        all: "सभी",
        completed: "पूर्ण",
        pending: "बाकी",
        progress: "प्रगति"
    },
    fr: {
        title: "📚 Planificateur intelligent",
        placeholder: "Entrer tâche",
        add: "Ajouter",
        all: "Tous",
        completed: "Terminé",
        pending: "En attente",
        progress: "Progrès"
    },
    es: {
        title: "📚 Planificador inteligente",
        placeholder: "Ingrese tarea",
        add: "Agregar",
        all: "Todos",
        completed: "Completado",
        pending: "Pendiente",
        progress: "Progreso"
    }
};

/* ---------------- RENDER TASKS ---------------- */
function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let filtered = tasks.filter(t => {
        if (currentFilter === "completed") return t.completed;
        if (currentFilter === "pending") return !t.completed;
        return true;
    });

    filtered.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <div class="${task.completed ? "completed" : ""}">
                ${task.text}<br>
                ${task.date || ""} ${task.time || ""}
            </div>
            <div>
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;

        list.appendChild(li);
    });

    updateProgress();
}

/* ---------------- ADD TASK ---------------- */
async function addTask() {
    let text = document.getElementById("taskInput").value.trim();

    if (!text) return alert("Enter task");

    if (currentLang !== "en") {
        text = await translateText(text, currentLang);
    }

    tasks.push({
        text,
        date: taskDate.value,
        time: taskTime.value,
        completed: false
    });

    saveTasks();
    renderTasks();

    taskInput.value = "";
}

/* ---------------- TOGGLE ---------------- */
function toggleTask(i) {
    tasks[i].completed = !tasks[i].completed;
    saveTasks();
    renderTasks();
}

/* ---------------- DELETE ---------------- */
function deleteTask(i) {
    tasks.splice(i, 1);
    saveTasks();
    renderTasks();
}

/* ---------------- FILTER ---------------- */
function filterTasks(type) {
    currentFilter = type;
    renderTasks();
}

/* ---------------- PROGRESS ---------------- */
function updateProgress() {
    let total = tasks.length;
    let done = tasks.filter(t => t.completed).length;
    let percent = total ? Math.round((done / total) * 100) : 0;

    document.getElementById("progressText").innerText =
        translations[currentLang].progress + ": " + percent + "%";

    document.getElementById("progressFill").style.width = percent + "%";
}

/* ---------------- SAVE ---------------- */
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* ---------------- TRANSLATE (API) ---------------- */
async function translateText(text, lang) {
    try {
        let res = await fetch("https://smart-study-planner-clx1.onrender.com", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ text, lang })
        });

        let data = await res.json();
        return data.translated;
    } catch {
        return text;
    }
}

/* ---------------- CHANGE LANGUAGE ---------------- */
function changeLanguage() {
    currentLang = language.value;
    let t = translations[currentLang];

    title.innerText = t.title;
    taskInput.placeholder = t.placeholder;

    addBtn.innerText = t.add;
    allBtn.innerText = t.all;
    completedBtn.innerText = t.completed;
    pendingBtn.innerText = t.pending;

    updateProgress();
}

/* ---------------- PARTICLES ---------------- */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 70; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: Math.random() * 0.5 + 0.2
    });
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        ctx.fillStyle = "rgba(0,198,255,0.7)";
        ctx.fillRect(p.x, p.y, 2, 2);

        p.y += p.speed;

        if (p.y > canvas.height) {
            p.y = 0;
            p.x = Math.random() * canvas.width;
        }
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

/* ---------------- INIT ---------------- */
renderTasks();