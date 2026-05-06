// ---------------- GLOBAL ----------------
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let currentLang = "en";

const BACKEND_URL = "https://smart-study-planner-clx1.onrender.com";

// ---------------- WORD FIX ----------------
const wordFix = {
    hi: { math: "गणित", study: "अध्ययन", book: "किताब", homework: "गृहकार्य" },
    fr: { math: "mathématiques", study: "étudier", book: "livre", homework: "devoirs" },
    es: { math: "matemáticas", study: "estudiar", book: "libro", homework: "tarea" }
};

// ---------------- TRANSLATIONS UI ----------------
const translations = {
    en: { title:"📚 Smart Study Planner", add:"Add", all:"All", completed:"Completed", pending:"Pending", placeholder:"Enter task", progress:"Progress" },
    hi: { title:"📚 स्मार्ट स्टडी प्लानर", add:"जोड़ें", all:"सभी", completed:"पूर्ण", pending:"बाकी", placeholder:"कार्य लिखें", progress:"प्रगति" },
    fr: { title:"📚 Planificateur intelligent", add:"Ajouter", all:"Tous", completed:"Terminé", pending:"En attente", placeholder:"Entrer tâche", progress:"Progrès" },
    es: { title:"📚 Planificador inteligente", add:"Agregar", all:"Todos", completed:"Completado", pending:"Pendiente", placeholder:"Ingrese tarea", progress:"Progreso" }
};

// ---------------- LANGUAGE CHANGE ----------------
function changeLanguage() {
    currentLang = document.getElementById("language").value;

    let t = translations[currentLang];

    document.getElementById("title").innerText = t.title;
    document.getElementById("taskInput").placeholder = t.placeholder;
    document.getElementById("addBtn").innerText = t.add;
    document.getElementById("allBtn").innerText = t.all;
    document.getElementById("completedBtn").innerText = t.completed;
    document.getElementById("pendingBtn").innerText = t.pending;

    renderTasks();
}

// ---------------- ADD TASK (FINAL FIX) ----------------
async function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (!text) {
        alert("Enter task");
        return;
    }

    let original = text.toLowerCase();

    // 🔥 STEP 1: WORD FIX FIRST
    if (currentLang !== "en" && wordFix[currentLang] && wordFix[currentLang][original]) {
        text = wordFix[currentLang][original];
    }
    // 🔥 STEP 2: API TRANSLATION
    else if (currentLang !== "en") {
        try {
            let res = await fetch(BACKEND_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: text, lang: currentLang })
            });

            let data = await res.json();

            if (data.translated) {
                text = data.translated;
            }
        } catch (e) {
            console.log("Translation error:", e);
        }
    }

    // 🔥 STEP 3: SAVE TRANSLATED TEXT
    tasks.push({
        text: text,
        date: document.getElementById("taskDate").value,
        time: document.getElementById("taskTime").value,
        completed: false
    });

    saveTasks();
    renderTasks();

    input.value = "";
}

// ---------------- RENDER ----------------
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
            <span style="text-decoration:${task.completed ? "line-through" : "none"}">
                ${task.text}
            </span>
            <div>
                <button onclick="toggleTask(${index})">✔</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;

        list.appendChild(li);
    });

    updateProgress();
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

// ---------------- INIT ----------------
renderTasks();