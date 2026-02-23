const jobs = [
    { id: 1, company: "Google", position: "Frontend Dev", location: "Remote", type: "Full Time", salary: "$5000", description: "Build UI", status: "all" },
    { id: 2, company: "Amazon", position: "Backend Dev", location: "USA", type: "Full Time", salary: "$6000", description: "Work on APIs", status: "all" },
    { id: 3, company: "Netflix", position: "UI Designer", location: "Remote", type: "Contract", salary: "$4000", description: "Design screens", status: "all" },
    { id: 4, company: "Meta", position: "React Dev", location: "Canada", type: "Full Time", salary: "$5500", description: "Develop apps", status: "all" },
    { id: 5, company: "Microsoft", position: "QA Engineer", location: "UK", type: "Full Time", salary: "$4500", description: "Test software", status: "all" },
    { id: 6, company: "Adobe", position: "UX Designer", location: "Remote", type: "Contract", salary: "$4200", description: "Improve UX", status: "all" },
    { id: 7, company: "Tesla", position: "Fullstack Dev", location: "USA", type: "Full Time", salary: "$6500", description: "Build systems", status: "all" },
    { id: 8, company: "Spotify", position: "Mobile Dev", location: "Remote", type: "Part Time", salary: "$3500", description: "Develop apps", status: "all" }
];

let currentTab = "all";

const container = document.getElementById("all-jobs-container");
const emptyState = document.getElementById("empty-state");

const allCount = document.getElementById("allCount");
const interviewCount = document.getElementById("interviewCount");
const rejectCount = document.getElementById("rejectCount");
const jobCount = document.getElementById("jobCount");

function render() {
    container.innerHTML = "";

    const filtered = currentTab === "all" ? jobs : jobs.filter(job => job.status === currentTab);

    emptyState.classList.toggle("hidden", filtered.length !== 0);

    filtered.forEach(job => {
        const div = document.createElement("div");
        div.className = "bg-white p-4 mb-3 rounded-lg border shadow";

        div.innerHTML = `
        <div class="flex justify-between items-center">
            <div>
                <h3 class="font-bold text-lg">${job.company}</h3>
                <p class="text-sm text-gray-700">${job.position}</p>
                <p class="text-sm text-gray-500">${job.location} · ${job.type} · ${job.salary}</p>
            </div>
            <button class="delete-btn p-3 bg-slate-100 rounded-full" data-id="${job.id}">
                <i class="fa-regular fa-trash-can"></i>
            </button>
        </div>

        <div class="my-3">
            <span class="px-3 py-1 text-xs rounded bg-gray-200 text-gray-600">
                ${job.status === "all" ? "NOT APPLIED" : job.status.toUpperCase()}
            </span>
        </div>

        <p class="text-sm text-gray-500">${job.description}</p>

        <div class="mt-3 flex gap-2">
            <button class="interview-btn btn btn-sm btn-outline btn-success" data-id="${job.id}">
                INTERVIEW
            </button>
            <button class="reject-btn btn btn-sm btn-outline btn-error" data-id="${job.id}">
                REJECTED
            </button>
        </div>
        `;

        container.appendChild(div);
    });

    updateCounts();
}

function setStatus(id, status) {
    const job = jobs.find(j => j.id === id);
    if (job) job.status = status;
    render();
}

function deleteJob(id) {
    const index = jobs.findIndex(j => j.id === id);
    if (index !== -1) jobs.splice(index, 1);
    render();
}

function updateCounts() {
    allCount.innerText = jobs.length;
    interviewCount.innerText = jobs.filter(j => j.status === "interview").length;
    rejectCount.innerText = jobs.filter(j => j.status === "rejected").length;

    const visibleJobs =
        currentTab === "all" ? jobs.length : jobs.filter(j => j.status === currentTab).length;
    jobCount.innerText = `${visibleJobs} of `;
}

container.addEventListener("click", e => {
    const interviewBtn = e.target.closest(".interview-btn");
    const rejectBtn = e.target.closest(".reject-btn");
    const deleteBtn = e.target.closest(".delete-btn");

    if (interviewBtn) setStatus(+interviewBtn.dataset.id, "interview");
    if (rejectBtn) setStatus(+rejectBtn.dataset.id, "rejected");
    if (deleteBtn) deleteJob(+deleteBtn.dataset.id);
});

document.querySelectorAll(".tab").forEach(btn => {
    
    btn.addEventListener("click", () => {
        currentTab = btn.dataset.tab;
        
        document.querySelectorAll(".tab").forEach(t => {
            t.classList.remove("bg-blue-600", "text-white");
            t.classList.add("bg-gray-200", "text-gray-600");
        });

        btn.classList.add("bg-blue-600", "text-white");
        btn.classList.remove("bg-gray-200", "text-gray-600");

        render();
    });
});

render();