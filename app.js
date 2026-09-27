/* =========================================================
   WorkBridge - app.js
   Business & Job Marketplace
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    initializeWorkBridge();
});


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initializeWorkBridge() {
    setupNavigation();
    setupButtons();
    setupJobSearch();
    setupJobApplications();
    loadSavedJobs();
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function setupNavigation() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
}


/* =========================================================
   BUTTON SETUP
   ========================================================= */

function setupButtons() {
    const buttons = document.querySelectorAll("button");

    buttons.forEach(function (button) {
        const text = button.textContent.trim().toLowerCase();

        if (
            text.includes("sign in") ||
            text.includes("login") ||
            text.includes("log in")
        ) {
            button.addEventListener("click", showLogin);
        }

        if (
            text.includes("sign up") ||
            text.includes("create account") ||
            text.includes("get started")
        ) {
            button.addEventListener("click", showSignup);
        }

        if (text.includes("find a job")) {
            button.addEventListener("click", findJobs);
        }

        if (
            text.includes("post a job") ||
            text.includes("post job") ||
            text.includes("hire")
        ) {
            button.addEventListener("click", postJob);
        }
    });
}


/* =========================================================
   LOGIN
   ========================================================= */

function showLogin() {
    const existing = document.getElementById("workbridge-modal");

    if (existing) {
        existing.remove();
    }

    createModal(
        "Sign in to WorkBridge",
        `
        <form id="loginForm" class="wb-form">
            <label>Email</label>
            <input
                type="email"
                id="loginEmail"
                placeholder="you@example.com"
                required
            >

            <label>Password</label>
            <input
                type="password"
                id="loginPassword"
                placeholder="Password"
                required
            >

            <button type="submit" class="btn btn-primary">
                Sign In
            </button>
        </form>
        `
    );

    const form = document.getElementById("loginForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();

            if (!email) {
                return;
            }

            localStorage.setItem("workbridgeUser", email);

            closeModal();

            alert("Welcome back to WorkBridge!");
        });
    }
}


/* =========================================================
   SIGN UP
   ========================================================= */

function showSignup() {
    const existing = document.getElementById("workbridge-modal");

    if (existing) {
        existing.remove();
    }

    createModal(
        "Create your WorkBridge account",
        `
        <form id="signupForm" class="wb-form">
            <label>Full Name</label>
            <input
                type="text"
                id="signupName"
                placeholder="Your name"
                required
            >

            <label>Email</label>
            <input
                type="email"
                id="signupEmail"
                placeholder="you@example.com"
                required
            >

            <label>Password</label>
            <input
                type="password"
                id="signupPassword"
                placeholder="Create a password"
                required
            >

            <label>I am a...</label>
            <select id="signupType">
                <option value="job-seeker">Job Seeker</option>
                <option value="business">Business</option>
            </select>

            <button type="submit" class="btn btn-primary">
                Create Account
            </button>
        </form>
        `
    );

    const form = document.getElementById("signupForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document
                .getElementById("signupName")
                .value
                .trim();

            const email = document
                .getElementById("signupEmail")
                .value
                .trim();

            const type = document.getElementById("signupType").value;

            const user = {
                name: name,
                email: email,
                type: type
            };

            localStorage.setItem(
                "workbridgeUser",
                JSON.stringify(user)
            );

            closeModal();

            alert(
                "Account created successfully! Welcome to WorkBridge, " +
                name +
                "."
            );
        });
    }
}


/* =========================================================
   FIND JOBS
   ========================================================= */

function findJobs() {
    const searchSection =
        document.querySelector(".search-section") ||
        document.getElementById("jobs");

    if (searchSection) {
        searchSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        const searchInput =
            document.getElementById("jobSearch") ||
            document.querySelector(".search-box input");

        if (searchInput) {
            setTimeout(function () {
                searchInput.focus();
            }, 600);
        }
    }
}


/* =========================================================
   POST A JOB
   ========================================================= */

function postJob() {
    createModal(
        "Post a Job",
        `
        <form id="postJobForm" class="wb-form">

            <label>Job Title</label>
            <input
                type="text"
                id="jobTitle"
                placeholder="e.g. Web Developer"
                required
            >

            <label>Company</label>
            <input
                type="text"
                id="jobCompany"
                placeholder="Company name"
                required
            >

            <label>Job Type</label>
            <select id="jobType">
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Freelance</option>
                <option>Internship</option>
            </select>

            <label>Work Location</label>
            <select id="jobLocation">
                <option>Remote</option>
                <option>Hybrid</option>
                <option>On-site</option>
            </select>

            <label>Pay / Salary</label>
            <input
                type="text"
                id="jobPay"
                placeholder="e.g. $40 - $65/hr"
                required
            >

            <label>Description</label>
            <textarea
                id="jobDescription"
                placeholder="Describe the position..."
                rows="5"
                required
            ></textarea>

            <button type="submit" class="btn btn-primary">
                Publish Job
            </button>

        </form>
        `
    );

    const form = document.getElementById("postJobForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const job = {
                id: Date.now(),

                title: document
                    .getElementById("jobTitle")
                    .value
                    .trim(),

                company: document
                    .getElementById("jobCompany")
                    .value
                    .trim(),

                type: document
                    .getElementById("jobType")
                    .value,

                location: document
                    .getElementById("jobLocation")
                    .value,

                pay: document
                    .getElementById("jobPay")
                    .value
                    .trim(),

                description: document
                    .getElementById("jobDescription")
                    .value
                    .trim()
            };

            const jobs = getJobs();

            jobs.push(job);

            localStorage.setItem(
                "workbridgeJobs",
                JSON.stringify(jobs)
            );

            closeModal();

            displayJobs();

            alert("Your job has been published!");
        });
    }
}


/* =========================================================
   JOB SEARCH
   ========================================================= */

function setupJobSearch() {
    const searchInput =
        document.getElementById("jobSearch") ||
        document.querySelector(".search-box input");

    if (!searchInput) {
        return;
    }

    searchInput.addEventListener("input", function () {
        searchJobs(searchInput.value);
    });
}


function searchJobs(searchTerm) {
    const term = String(searchTerm || "")
        .trim()
        .toLowerCase();

    const cards = document.querySelectorAll(
        ".job-card, .job-preview"
    );

    cards.forEach(function (card) {
        const text = card.textContent.toLowerCase();

        if (!term || text.includes(term)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });

    displayUserJobs(term);
}


/* =========================================================
   JOB APPLICATIONS
   ========================================================= */

function setupJobApplications() {
    document.addEventListener("click", function (event) {
        const button = event.target.closest("button");

        if (!button) {
            return;
        }

        const text = button.textContent.trim().toLowerCase();

        if (
            text === "apply" ||
            text.includes("apply now")
        ) {
            applyJob(button);
        }
    });
}


function applyJob(button) {
    const card =
        button.closest(".job-card") ||
        button.closest(".job-preview") ||
        button.closest(".job-item");

    let jobTitle = "this position";

    if (card) {
        const title =
            card.querySelector("h3") ||
            card.querySelector("h2") ||
            card.querySelector(".job-title");

        if (title) {
            jobTitle = title.textContent.trim();
        }
    }

    createModal(
        "Apply for " + jobTitle,
        `
        <form id="applicationForm" class="wb-form">

            <label>Your Name</label>
            <input
                type="text"
                id="applicantName"
                placeholder="Your name"
                required
            >

            <label>Email</label>
            <input
                type="email"
                id="applicantEmail"
                placeholder="you@example.com"
                required
            >

            <label>Resume / Experience</label>
            <textarea
                id="applicantResume"
                rows="6"
                placeholder="Tell the employer about your experience..."
                required
            ></textarea>

            <button type="submit" class="btn btn-primary">
                Submit Application
            </button>

        </form>
        `
    );

    const form = document.getElementById("applicationForm");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const application = {
                job: jobTitle,

                name: document
                    .getElementById("applicantName")
                    .value
                    .trim(),

                email: document
                    .getElementById("applicantEmail")
                    .value
                    .trim(),

                experience: document
                    .getElementById("applicantResume")
                    .value
                    .trim(),

                date: new Date().toISOString()
            };

            const applications =
                JSON.parse(
                    localStorage.getItem(
                        "workbridgeApplications"
                    )
                ) || [];

            applications.push(application);

            localStorage.setItem(
                "workbridgeApplications",
                JSON.stringify(applications)
            );

            closeModal();

            alert(
                "Application submitted successfully!"
            );
        });
    }
}


/* =========================================================
   LOCAL JOB STORAGE
   ========================================================= */

function getJobs() {
    try {
        return JSON.parse(
            localStorage.getItem("workbridgeJobs")
        ) || [];
    } catch (error) {
        return [];
    }
}


function loadSavedJobs() {
    displayJobs();
}


function displayJobs() {
    displayUserJobs("");
}


function displayUserJobs(searchTerm) {
    const jobs = getJobs();

    if (jobs.length === 0) {
        return;
    }

    const term = String(searchTerm || "")
        .trim()
        .toLowerCase();

    let container =
        document.getElementById("userJobs");

    if (!container) {
        container = document.createElement("div");
        container.id = "userJobs";
        container.className = "user-jobs";

        const jobsSection =
            document.querySelector(".search-section") ||
            document.querySelector("main");

        if (jobsSection) {
            jobsSection.appendChild(container);
        } else {
            document.body.appendChild(container);
        }
    }

    const filteredJobs = jobs.filter(function (job) {
        if (!term) {
            return true;
        }

        const searchable =
            (
                job.title +
                " " +
                job.company +
                " " +
                job.type +
                " " +
                job.location +
                " " +
                job.description
            ).toLowerCase();

        return searchable.includes(term);
    });

    if (filteredJobs.length === 0) {
        container.innerHTML = `
            <div class="job-empty">
                <p>No matching jobs found.</p>
            </div>
        `;

        return;
    }

    container.innerHTML = `
        <div class="user-job-list">
            ${filteredJobs.map(function (job) {
                return `
                    <article class="job-card user-job-card">

                        <div class="job-icon">
                            💼
                        </div>

                        <div class="job-content">

                            <h3>${escapeHTML(job.title)}</h3>

                            <p>
                                ${escapeHTML(job.company)}
                                ·
                                ${escapeHTML(job.type)}
                                ·
                                ${escapeHTML(job.location)}
                            </p>

                            <strong>
                                ${escapeHTML(job.pay)}
                            </strong>

                            <p class="job-description">
                                ${escapeHTML(job.description)}
                            </p>

                            <button
                                class="btn btn-primary apply-job-button"
                                data-job-id="${job.id}"
                            >
                                Apply
                            </button>

                        </div>

                    </article>
                `;
            }).join("")}
        </div>
    `;

    const applyButtons = container.querySelectorAll(
        ".apply-job-button"
    );

    applyButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            applyJob(button);
        });
    });
}


/* =========================================================
   MODAL
   ========================================================= */

function createModal(title, content) {
    closeModal();

    const modal = document.createElement("div");

    modal.id = "workbridge-modal";

    modal.innerHTML = `
        <div class="wb-modal-overlay">

            <div class="wb-modal">

                <button
                    type="button"
                    class="wb-modal-close"
                    aria-label="Close"
                >
                    ×
                </button>

                <h2>${escapeHTML(title)}</h2>

                <div class="wb-modal-content">
                    ${content}
                </div>

            </div>

        </div>
    `;

    document.body.appendChild(modal);

    const closeButton =
        modal.querySelector(".wb-modal-close");

    if (closeButton) {
        closeButton.addEventListener(
            "click",
            closeModal
        );
    }

    const overlay =
        modal.querySelector(".wb-modal-overlay");

    if (overlay) {
        overlay.addEventListener("click", function (event) {
            if (event.target === overlay) {
                closeModal();
            }
        });
    }

    addModalStyles();
}


function closeModal() {
    const modal =
        document.getElementById("workbridge-modal");

    if (modal) {
        modal.remove();
    }
}


/* =========================================================
   MODAL STYLING
   ========================================================= */

function addModalStyles() {
    if (document.getElementById("workbridge-js-styles")) {
        return;
    }

    const style = document.createElement("style");

    style.id = "workbridge-js-styles";

    style.textContent = `
        .wb-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.55);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            z-index: 99999;
            overflow-y: auto;
        }

        .wb-modal {
            position: relative;
            width: 100%;
            max-width: 520px;
            max-height: 90vh;
            overflow-y: auto;
            background: #ffffff;
            border-radius: 16px;
            padding: 28px;
            box-sizing: border-box;
            box-shadow: 0 20px 60px rgba(0,0,0,0.25);
        }

        .wb-modal h2 {
            margin-top: 0;
            margin-bottom: 22px;
        }

        .wb-modal-close {
            position: absolute;
            top: 10px;
            right: 14px;
            border: 0;
            background: transparent;
            font-size: 30px;
            line-height: 1;
            cursor: pointer;
        }

        .wb-form {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .wb-form label {
            font-weight: 600;
            margin-top: 8px;
        }

        .wb-form input,
        .wb-form select,
        .wb-form textarea {
            width: 100%;
            box-sizing: border-box;
            padding: 12px;
            border: 1px solid #ccd2d8;
            border-radius: 8px;
            font-size: 16px;
            font-family: inherit;
        }

        .wb-form textarea {
            resize: vertical;
        }

        .wb-form button {
            margin-top: 12px;
        }

        .user-jobs {
            margin-top: 30px;
        }

        .user-job-list {
            display: grid;
            gap: 18px;
        }

        .user-job-card {
            display: flex;
            gap: 16px;
            padding: 20px;
            border-radius: 12px;
        }

        .user-job-card .job-icon {
            font-size: 28px;
            flex-shrink: 0;
        }

        .user-job-card h3 {
            margin-top: 0;
        }

        .job-description {
            margin-top: 10px;
        }

        .job-empty {
            padding: 20px;
            text-align: center;
        }

        body.wb-modal-open {
            overflow: hidden;
        }
    `;

    document.head.appendChild(style);

    document.body.classList.add("wb-modal-open");
}


/* =========================================================
   SECURITY / HTML ESCAPING
   ========================================================= */

function escapeHTML(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   GLOBAL FUNCTIONS
   These make the functions available to onclick=""
   attributes already present in index.html.
   ========================================================= */

window.showLogin = showLogin;
window.showSignup = showSignup;
window.findJobs = findJobs;
window.postJob = postJob;
window.searchJobs = searchJobs;
window.applyJob = applyJob;
window.closeModal = closeModal;
