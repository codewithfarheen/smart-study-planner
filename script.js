// ---------------- GLOBAL ----------------
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let currentLang = "en";

const BACKEND_URL = "https://smart-study-backend.onrender.com/translate";

// ---------------- WORD FIX (SMART DICTIONARY) ----------------
const wordFix = {
    en: {
        "math": "math",
        "study": "study",
        "book": "book",
        "homework": "homework",
        "science": "science",
        "english": "english",
        "computer": "computer",
        "project": "project"
    },

    hi: {
        "math": "गणित",
        "study": "अध्ययन",
        "book": "किताब",
        "homework": "गृहकार्य",
        "science": "विज्ञान",
        "english": "अंग्रेज़ी",
        "computer": "कंप्यूटर",
        "project": "परियोजना"
    },

    fr: {
        "math": "mathématiques",
        "study": "étudier",
        "book": "livre",
        "homework": "devoirs",
        "science": "science",
        "english": "anglais",
        "computer": "ordinateur",
        "project": "projet"
    },

    es: {
        "math": "matemáticas",
        "study": "estudiar",
        "book": "libro",
        "homework": "tarea",
        "science": "ciencia",
        "english": "inglés",
        "computer": "computadora",
        "project": "proyecto"
    }
};

// ---------------- UI TRANSLATIONS ----------------
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

// ---------------- RENDER TASKS ----------------
function renderTasks() {
    const list = document.getElementById("taskList");
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
                <small>${task.date || ""} ${task.time || ""}</small>
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

// ---------------- ADD TASK (SMART TRANSLATION) ----------------
async function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (!text) {
        alert("Enter task");
        return;
    }

    let original = text.toLowerCase();

    // 🔥 CHECK WORD FIX FIRST
    if (currentLang !== "en" && wordFix[currentLang][original]) {
        text = wordFix[currentLang][original];
    } else if (currentLang !== "en") {
        try {
            let res = await fetch(BACKEND_URL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    text: text,
                    lang: currentLang
                })
            });

            let data = await res.json();

            if (data.translated) {
                text = data.translated;
            }
        } catch (err) {
            console.log("Translation failed:", err);
        }
    }

    tasks.push({
        text: text,
        date: taskDate.value,
        time: taskTime.value,
        completed: false
    });

    saveTasks();
    renderTasks();

    input.value = "";
}

// ---------------- TOGGLE ----------------
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// ---------------- DELETE ----------------
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// ---------------- FILTER ----------------
function filterTasks(type) {
    currentFilter = type;
    renderTasks();
}

// ---------------- PROGRESS ----------------
function updateProgress() {
    let total = tasks.length;
    let done = tasks.filter(t => t.completed).length;
    let percent = total ? Math.round((done / total) * 100) : 0;

    document.getElementById("progressText").innerText =
        translations[currentLang].progress + ": " + percent + "%";

    document.getElementById("progressFill").style.width = percent + "%";
}

// ---------------- SAVE ----------------
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ---------------- LANGUAGE ----------------
function changeLanguage() {
    currentLang = document.getElementById("language").value;
    let t = translations[currentLang];

    document.getElementById("title").innerText = t.title;
    document.getElementById("taskInput").placeholder = t.placeholder;

    document.getElementById("addBtn").innerText = t.add;
    document.getElementById("allBtn").innerText = t.all;
    document.getElementById("completedBtn").innerText = t.completed;
    document.getElementById("pendingBtn").innerText = t.pending;

    updateProgress();
}

// ---------------- PARTICLES ----------------
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

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

// ---------------- INIT ----------------
renderTasks();