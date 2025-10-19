const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const modal = document.getElementById('modal');
const btnSend = document.getElementById('send');
const openSearch = document.getElementById('tooltipSearch');
const btnSearch = document.getElementById('btnSearch');
const closeSearch = document.getElementById('closeSearch');
const search = document.getElementById('search');
const form = document.getElementById('form');
const formSearch = document.getElementById('formSearch');
const btnHome = document.getElementById('home');
let i = 0;
let id = 0;
let position = 1;
let issues = JSON.parse(localStorage.getItem('issues')) || [];
let backlog = 0;
let inProgress = 0;
let review = 0;
let done = 0;

function initializeCounters() {
  backlog = 0;
  inProgress = 0;
  review = 0;
  done = 0;
  
  issues.forEach(issue => {
    switch(issue.position) {
      case 1: backlog++; break;
      case 2: inProgress++; break;
      case 3: review++; break;
      case 4: done++; break;
    }
  });
}

openModalBtn.addEventListener('click', () => {
  modal.classList.remove('hidden');
});

closeModalBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  form.reset();
  document.getElementById('desc').value = '';
});

// Chiudi modale cliccando fuori
window.addEventListener('click', (e) => {
  if(e.target === modal) {
    modal.classList.add('hidden');
  }
});

openSearch.addEventListener('click', () => {
  search.classList.remove('hidden');
});

closeSearch.addEventListener('click', () => {
  search.classList.add('hidden');
  formSearch.reset();
});

// Chiudi ricerca cliccando fuori
window.addEventListener('click', (e) => {
  if(e.target === search) {
    search.classList.add('hidden');
  }
});

btnHome.addEventListener('click', () => {
  modal.classList.add('hidden');
  form.reset();
  document.getElementById('desc').value = '';
  search.classList.add('hidden');
  formSearch.reset();
  const searchModal = document.getElementById('searchModal');
  if(searchModal) searchModal.classList.add('hidden');
});

function resetCards(){
  document.getElementById("card1").innerHTML = '';
  document.getElementById("card2").innerHTML = '';
  document.getElementById("card3").innerHTML = '';
  document.getElementById("card4").innerHTML = '';
}

btnSend.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const title = document.getElementById('title').value;
  const priority = document.getElementById('priority').value;
  const description = document.getElementById('desc').value;
  if(!name || !title || !priority || !description){
     alert("Per favore, compila tutti i campi.");
     return;
  }
  issues.push({ name, title, priority, description, position, id });
  backlog++;
  id++;
  saveInLocalStorage();
  insertCard();
  form.reset();
  modal.classList.add('hidden');
});

function updateKey(issue){
  switch (issue.position){
    case 2:
      backlog--;
      inProgress++;
      break;
    case 3:
      inProgress--;
      review++;
      break;
    case 4:
      review--;
      done++;
      break;      
  }
}

function updateKeyBack(issue){
  switch (issue.position){
    case 2:
      inProgress--;
      backlog++;
      break;
    case 3:
      review--;
      inProgress++;
      break;
    case 4:
      done--;
      review++;
      break;      
  }
}

function updateKeyAfterRemove(issue){
  switch (issue.position){
    case 1:
      backlog--;
      break;
    case 2:
      inProgress--;
      break;
    case 3:
      review--;
      break;
    case 4:
      done--;
      break;      
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initializeCounters();
  insertCard();
  
  const closeSearchModal = document.getElementById('closeSearchModal');
  
  formSearch.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('nameSearch').value.trim();
    const title = document.getElementById('titleSearch').value.trim();

    if(!name && !title){
      alert("Per favore, compila almeno un campo.");
      return;
    }

    search.classList.add('hidden');
    find(name, title);
    formSearch.reset();
  });

  closeSearchModal.addEventListener('click', () => {
    document.getElementById('searchModal').classList.add('hidden');
  });
  
  window.addEventListener('click', (e) => { 
    const searchModal = document.getElementById('searchModal');
    if(e.target === searchModal) {
      searchModal.classList.add('hidden');
    }
  });

  function find(name, title){
    const resultsContainer = document.getElementById('searchResultsContent');
    resultsContainer.innerHTML = '';
    let containerHTML = '';

    let found = false;

    issues.forEach(issue => {
      if( (name && issue.name.toLowerCase() === name.toLowerCase()) || 
          (title && issue.title.toLowerCase() === title.toLowerCase()) ) {
        containerHTML += generateCard(issue);
        found = true;
      }
    });

    resultsContainer.innerHTML = containerHTML;

    if(found) {
      document.getElementById('searchModal').classList.remove('hidden');
    } else {
      alert("Nessuna issue trovata con i criteri inseriti.");
    }
  }
});

function saveInLocalStorage() {
  localStorage.setItem('issues', JSON.stringify(issues));
}

function insertCard(){ 
  document.getElementById("backlogCounter").innerHTML = backlog;
  document.getElementById("inProgressCounter").innerHTML = inProgress;
  document.getElementById("reviewCounter").innerHTML = review;
  document.getElementById("doneCounter").innerHTML = done;
  resetCards();
  issues.forEach((issue, index) => {
    let location = "card";
    let container = document.getElementById(location.concat(issue.position));
    container.innerHTML += generateCard(issue);
  }); 
}

function moveIssue(issueID){
  console.log("spostamento avanti");
  issues.forEach((issue, index) => {
    if(issueID == issue.id && issue.position < 4){
      
      issues[index].position = issue.position + 1;
      updateKey(issue);
    }
  });
  saveInLocalStorage();    
  insertCard();  
}

function moveIssueBack(issueID){
  console.log("spostamento indietro");
  issues.forEach((issue, index) => {
    if(issueID == issue.id && issue.position > 1){
      updateKeyBack(issue);
      issues[index].position = issue.position - 1;
    }
  });
  saveInLocalStorage();    
  insertCard();  
}

function removeIssue(issueID){
  console.log("Removing");
  issues.forEach((issue, index) => {
    if (issueID == issue.id){
      updateKeyAfterRemove(issue);
      issues.splice(index, 1);
    }
  });

  saveInLocalStorage(); 
  insertCard();
}  

function generateCard(Issue) {
  let tag = '';
  
    switch (Issue.priority) {
      case "low":
        tag = `<span id="prioritylow" class="justify-end bg-[#D9F0E1] text-[#14532D] hover:bg-[#A7E5B8] focus:ring-4 focus:outline-none focus:ring-[#22C55E] shadow-lg shadow-[#A7E5B8]/50 dark:bg-teal-400 dark:text-teal-900 dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Bassa</span>`;
        break;
      case "medium":
        tag = `<span id="prioritymedium" class="justify-end bg-[#FEF3C7] text-[#78350F] hover:bg-[#FCD34D] focus:ring-4 focus:outline-none focus:ring-[#FBBF24] shadow-lg shadow-[#FCD34D]/50 dark:bg-yellow-400 dark:text-yellow-900 dark:shadow-yellow-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Media</span>`;
        break;
      case "high":
        tag = `<span id="priorityhigh" class="justify-end bg-[#FFEDD5] text-[#7C2D12] hover:bg-[#FDBA74] focus:ring-4 focus:outline-none focus:ring-[#FB923C] shadow-lg shadow-[#FDBA74]/50 dark:bg-orange-600 dark:text-orange-900 dark:shadow-orange-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Alta</span>`;
        break;
      case "critical":
        tag = `<span id="prioritycritical" class="justify-end bg-[#FFE5E5] text-[#991B1B] hover:bg-[#FF7F7F] focus:ring-4 focus:outline-none focus:ring-[#EF4444] shadow-lg shadow-[#FF7F7F]/50 dark:bg-red-400 dark:text-red-900 dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Critica</span>`;
        break;
    }

  return `
    <div class="flex justify-center">
      <div class="flex flex-col justify-between border border-[#FCD5A1] rounded-lg shadow-sm bg-[#FFF8F0] overflow-hidden p-2 m-1 w-full sm:w-80 md:w-85 lg:w-88 hover:shadow-md transition-all duration-150 ease-in-out dark:bg-gray-700 dark:border-gray-600">
        
        <div class="flex justify-between items-start mb-2">
          <h5 class="text-md font-semibold text-[#D97706] dark:text-white leading-tight truncate max-w-[95%]">${Issue.title}</h5>
          ${tag}
        </div>

        <p class="text-sm text-[#3D2C28] dark:text-gray-400 mb-2 line-clamp-2 overflow-hidden text-ellipsis">
          ${Issue.description}
        </p>

        <div class="flex items-center justify-between mt-auto">
          <span class="px-2 py-0.5 bg-[#FFF5E6] dark:bg-gray-700 rounded-full text-[10px] font-medium text-[#3D2C28] dark:text-gray-300 truncate max-w-[45%]">
            ${Issue.name}
          </span>

          <div class="flex gap-1">
            ${Issue.position > 1 ? `
            <button onclick="moveIssueBack(${Issue.id})" class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-[10px] font-medium rounded-md group
                           bg-[#FCD5A1] hover:bg-[#D97706] text-[#3D2C28] dark:bg-purple-600 dark:text-white
                           focus:outline-none focus:ring-1 focus:ring-[#D97706]">
              <span class="relative px-2 py-0.5 transition-all ease-in duration-75 bg-white dark:bg-purple-900 rounded flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </span>
            </button>` : ''}

            ${Issue.position < 4 ? `
            <button onclick="moveIssue(${Issue.id})" class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-[10px] font-medium rounded-md group
                           bg-[#FCD5A1] hover:bg-[#D97706] text-[#3D2C28] dark:bg-blue-600 dark:text-white
                           focus:outline-none focus:ring-1 focus:ring-[#D97706]">
              <span class="relative px-2 py-0.5 transition-all ease-in duration-75 bg-white dark:bg-blue-900 rounded flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>` : ''}

            <button onclick="removeIssue(${Issue.id})" class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-[10px] font-medium rounded-md group
                           bg-[#FCD5A1] hover:bg-[#D97706] text-[#3D2C28] dark:bg-red-600 dark:text-white
                           focus:outline-none focus:ring-1 focus:ring-[#D97706]">
              <span class="relative px-2 py-0.5 transition-all ease-in duration-75 bg-white dark:bg-red-900 rounded flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}


