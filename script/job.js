const jobs = [
    { id: 1, company: "Google", position: "Frontend Dev", location: "Remote", type: "Full Time", salary: "$5000", description: "Build UI", status: "all" },
    { id: 2, company: "Amazon", position: "Backend Dev", location: "USA", type: "Full Time", salary: "$6000", description: "Work on APIs", status: "all" },
    { id: 3, company: "Netflix", position: "UI Designer", location: "Remote", type: "Contract", salary: "$4000", description: "Design screens", status: "all" },
    { id: 4, company: "Meta", position: "React Dev", location: "Canada", type: "Full Time", salary: "$5500", description: "Develop apps", status: "all" },
    { id: 5, company: "Microsoft", position: "QA Engineer", location: "UK", type: "Full Time", salary: "$4500", description: "Test software", status: "all" },
    { id: 6, company: "Adobe", position: "UX Designer", location: "Remote", type: "Contract", salary: "$4200", description: "Improve UX", status: "all" },
    { id: 7, company: "Tesla", position: "Fullstack Dev", location: "USA", type: "Full Time", salary: "$6500", description: "Build systems", status: "all" },
    { id: 8, company: "Spotify", position: "Mobile Dev", location: "Remote", type: "Part Time", salary: "$3500", description: "Develop apps", status: "all" }
]

let currentTab = 'all'

const container = document.getElementById('all-jobs-container')
const emptyState = document.getElementById('empty-state')

function render() {
    container.innerHTML = "";
    const filterd = jobs.filter(job => currentTab === "all" ? true : job.status === currentTab)

    if (filterd.length === 0) {
        emptyState.classList.remove('hidden')
    } else {
        emptyState.classList.add('hidden')
    }
    filterd.forEach(job => {
        const div = document.createElement('div')
        div.className = 'bg-white p-4 mb-3 rounded shadow';

        div.innerHTML = `
        <h3 class="font-bold text-lg">${job.company}</h3>
        <p>${job.position}</p>
        <p>${job.location}</p>
        <p>${job.type}</p>
        <p class="font-semibold">${job.salary}</p>
        <p class="text-sm text-gray-500">${job.description}</p>

        <div class="mt-3 space-x-2">
        <button class="bg-green-500 text-white px-2 py-1 rounded" onclick="setStatus(${job.id}, 'interview')">Interview</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="setStatus(${job.id}, 'rejected')">Reject</button>
        <button class="bg-gray-700 text-white px-2 py-1 rounded" onclick="deleteJob(${job.id})">Delete</button>
        </div>
        `;
        container.appendChild(div)
    })

}

function setStatus(id, status) {
    const job = jobs.find(j => j.id === id);
    job.status = status;
    render();
}

function deleteJob(id) {
    const index = jobs.findIndex(j => j.id === id);
    jobs.splice(index, 1);
    render();
}

function updateCounts() {
    allCount.innerText = jobs.length;
    interviewCount.innerText = jobs.filter(j => j.status === "interview").length
    rejectCount.innerText = jobs.filter(j => j.status === "rejected").length

    const tabJobs = currentTab === "all" ? jobs.length : jobs.filter(j => j.status === currentTab).length
    jobCount.innerText = tabJobs + 'of';
}

document.querySelectorAll(".tab").forEach(btn => {
    btn.onclick = () => {
        currentTab = btn.innerText.toLowerCase();

        document.querySelectorAll(".tab").forEach(t => {
            t.classList.remove('btn-primary')
            t.classList.add('btn-outline')
        });

        btn.classList.add("btn-primary")
        btn.classList.remove("btn-outline")
        render()
        updateCounts()
    }
})

render()