const jobs = [
  { title: "Frontend Developer", company: "TechSoft", location: "Noida" },
  { title: "SEO Executive", company: "Seoczar", location: "Delhi" },
  { title: "Backend Developer", company: "CodeHub", location: "Bangalore" },
  { title: "UI/UX Designer", company: "DesignPro", location: "Remote" },
  { title: "WordPress Developer", company: "WP Solutions", location: "Noida" }
];

const jobList = document.getElementById("jobList");
const search = document.getElementById("search");
const locationFilter = document.getElementById("locationFilter");
const appliedJobsList = document.getElementById("appliedJobs");
const toggleThemeBtn = document.getElementById("toggleTheme");

function displayJobs(filterText = "", location = "") {
  jobList.innerHTML = "";
  jobs
    .filter(job =>
      (job.title.toLowerCase().includes(filterText.toLowerCase()) ||
      job.company.toLowerCase().includes(filterText.toLowerCase())) &&
      (location === "" || job.location === location)
    )
    .forEach(job => {
      const div = document.createElement("div");
      div.className = "job-card";
      div.innerHTML = `
        <h3>${job.title}</h3>
        <p>🏢 ${job.company}</p>
        <p>📍 ${job.location}</p>
        <button class="apply-btn" onclick="applyJob('${job.title}')">Apply</button>
      `;
      jobList.appendChild(div);
    });
}

function applyJob(title) {
  let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
  if (!appliedJobs.includes(title)) {
    appliedJobs.push(title);
    localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
    showAppliedJobs();
    alert("✅ You applied for " + title);
  } else {
    alert("⚠️ Already applied for " + title);
  }
}

function showAppliedJobs() {
  let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
  appliedJobsList.innerHTML = "";
  appliedJobs.forEach(job => {
    let li = document.createElement("li");
    li.textContent = job;
    appliedJobsList.appendChild(li);
  });
}

search.addEventListener("keyup", e => {
  displayJobs(e.target.value, locationFilter.value);
});

locationFilter.addEventListener("change", e => {
  displayJobs(search.value, e.target.value);
});

toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleThemeBtn.textContent = 
    document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Initial load
displayJobs();
showAppliedJobs();