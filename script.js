// ======================================
// CollabHub V2
// Main Frontend Controller
// ======================================

// ------------------------------
// DOM ELEMENTS
// ------------------------------

const loginBtn = document.getElementById("btn-show-login");
const registerBtn = document.getElementById("btn-show-register");
const logoutBtn = document.getElementById("btn-logout");

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

const themeToggle = document.getElementById("themeToggle");

const detailModal = document.getElementById("detail-modal");
const detailClose = document.getElementById("detail-close");

const togglePass = document.getElementById("toggle-pass");
const regPass = document.getElementById("reg-pass");

// ------------------------------
// THEME
// ------------------------------

function initializeTheme() {

    const savedTheme =
        localStorage.getItem("collabhub-theme");

    if(savedTheme === "dark"){

        document.documentElement
            .setAttribute("data-theme","dark");

        if(themeToggle){
            themeToggle.textContent = "☀️";
        }
    }
}

if(themeToggle){

    themeToggle.addEventListener("click",()=>{

        const currentTheme =
            document.documentElement.getAttribute("data-theme");

        if(currentTheme === "dark"){

            document.documentElement
                .removeAttribute("data-theme");

            localStorage.setItem(
                "collabhub-theme",
                "light"
            );

            themeToggle.textContent = "🌙";

        }else{

            document.documentElement
                .setAttribute("data-theme","dark");

            localStorage.setItem(
                "collabhub-theme",
                "dark"
            );

            themeToggle.textContent = "☀️";
        }
    });
}

// ------------------------------
// AUTH FORM TOGGLE
// ------------------------------

if(loginBtn){

    loginBtn.addEventListener("click",()=>{

        loginForm.classList.toggle("hidden");

        registerForm.classList.add("hidden");
    });
}

if(registerBtn){

    registerBtn.addEventListener("click",()=>{

        registerForm.classList.toggle("hidden");

        loginForm.classList.add("hidden");
    });
}

// ------------------------------
// PASSWORD VISIBILITY
// ------------------------------

if(togglePass){

    togglePass.addEventListener("click",()=>{

        if(regPass.type === "password"){

            regPass.type = "text";
            togglePass.textContent = "🙈";

        }else{

            regPass.type = "password";
            togglePass.textContent = "👁️";
        }
    });
}

// ------------------------------
// MODAL
// ------------------------------

function openModal(content){

    const body =
        document.getElementById("detail-body");

    body.innerHTML = content;

    detailModal.classList.remove("hidden");
}

function closeModal(){

    detailModal.classList.add("hidden");
}

if(detailClose){

    detailClose.addEventListener(
        "click",
        closeModal
    );
}

if(detailModal){

    detailModal.addEventListener(
        "click",
        (e)=>{

            if(e.target === detailModal){

                closeModal();
            }
        }
    );
}

// ------------------------------
// TOAST NOTIFICATIONS
// ------------------------------

function showToast(message,type="success"){

    const toast =
        document.createElement("div");

    toast.className = "toast";

    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.bottom = "30px";
    toast.style.right = "30px";
    toast.style.padding = "14px 20px";
    toast.style.borderRadius = "12px";
    toast.style.color = "#fff";
    toast.style.fontWeight = "600";
    toast.style.zIndex = "99999";

    if(type === "error"){

        toast.style.background =
            "#ef4444";

    }else{

        toast.style.background =
            "#10b981";
    }

    document.body.appendChild(toast);

    setTimeout(()=>{

        toast.remove();

    },3000);
}

// ------------------------------
// PROJECT SEARCH
// ------------------------------

function createSearchBar(){

    const projectSection =
        document.querySelector(".projects-section");

    if(!projectSection) return;

    const search =
        document.createElement("input");

    search.id = "project-search";

    search.placeholder =
        "Search projects...";

    search.style.marginBottom = "20px";

    projectSection.insertBefore(
        search,
        projectSection.children[1]
    );

    search.addEventListener(
        "input",
        ()=>{

            const query =
                search.value.toLowerCase();

            document
                .querySelectorAll(".post")
                .forEach(card=>{

                    const text =
                        card.innerText.toLowerCase();

                    card.style.display =
                        text.includes(query)
                        ? "block"
                        : "none";
                });
        }
    );
}

// ------------------------------
// COUNTER ANIMATION
// ------------------------------

function animateCounter(el,target){

    let current = 0;

    const step =
        Math.ceil(target / 80);

    const timer =
        setInterval(()=>{

            current += step;

            if(current >= target){

                current = target;

                clearInterval(timer);
            }

            el.innerText = current + "+";

        },20);
}

function initializeCounters(){

    const counters =
        document.querySelectorAll(
            ".hero-stats h3"
        );

    counters.forEach(counter=>{

        const target =
            parseInt(
                counter.innerText
                .replace("+","")
            );

        animateCounter(
            counter,
            target
        );
    });
}

// ------------------------------
// DEPARTMENT FILTERS
// ------------------------------

const departments = [
    "All",
    "CSE",
    "ECE",
    "EEE",
    "IT",
    "AI&DS",
    "MECH",
    "Civil"
];

function buildDepartmentFilters(){

    const container =
        document.getElementById(
            "dept-filter"
        );

    if(!container) return;

    container.innerHTML = "";

    departments.forEach(dept=>{

        const btn =
            document.createElement("button");

        btn.className =
            "filter-btn";

        btn.textContent =
            dept;

        btn.onclick = ()=>{

            document
                .querySelectorAll(
                    ".filter-btn"
                )
                .forEach(b=>{

                    b.classList.remove(
                        "active-filter"
                    );
                });

            btn.classList.add(
                "active-filter"
            );

            filterProjects(dept);
        };

        container.appendChild(btn);
    });
}

function filterProjects(dept){

    document
        .querySelectorAll(".post")
        .forEach(card=>{

            const cardDept =
                card.dataset.department;

            if(
                dept === "All" ||
                dept === cardDept
            ){

                card.style.display =
                    "block";

            }else{

                card.style.display =
                    "none";
            }
        });
}

// ------------------------------
// LOADING
// ------------------------------

function showLoading(id){

    const el =
        document.getElementById(id);

    if(!el) return;

    el.innerHTML =
        "<p>Loading...</p>";
}

// ------------------------------
// AUTH STATE UI
// ------------------------------

function updateAuthUI(loggedIn){

    if(loggedIn){

        loginBtn?.classList.add(
            "hidden"
        );

        registerBtn?.classList.add(
            "hidden"
        );

        logoutBtn?.classList.remove(
            "hidden"
        );

    }else{

        loginBtn?.classList.remove(
            "hidden"
        );

        registerBtn?.classList.remove(
            "hidden"
        );

        logoutBtn?.classList.add(
            "hidden"
        );
    }
}

// ------------------------------
// FIREBASE PLACEHOLDERS
// ------------------------------

// Replace with Firebase logic

async function login(email,password){

    console.log(
        "LOGIN",
        email
    );

    showToast(
        "Login function connected"
    );
}

async function register(user){

    console.log(
        "REGISTER",
        user
    );

    showToast(
        "Registration function connected"
    );
}

async function logout(){

    console.log("LOGOUT");

    showToast(
        "Logged out"
    );
}

// ------------------------------
// BUTTON EVENTS
// ------------------------------

document
.getElementById("btn-login")
?.addEventListener(
"click",
()=>{

    login(

        document
        .getElementById(
            "login-email"
        ).value,

        document
        .getElementById(
            "login-pass"
        ).value
    );
});

document
.getElementById("btn-register")
?.addEventListener(
"click",
()=>{

    register({

        name:
        document
        .getElementById(
            "reg-name"
        ).value,

        email:
        document
        .getElementById(
            "reg-email"
        ).value,

        department:
        document
        .getElementById(
            "reg-dept"
        ).value,

        skills:
        document
        .getElementById(
            "reg-skills"
        ).value
    });
});

logoutBtn
?.addEventListener(
"click",
logout
);

// ------------------------------
// INIT
// ------------------------------

document.addEventListener(
"DOMContentLoaded",
()=>{

    initializeTheme();

    buildDepartmentFilters();

    createSearchBar();

    setTimeout(
        initializeCounters,
        500
    );

    updateAuthUI(false);

    console.log(
        "CollabHub V2 Loaded"
    );
});
