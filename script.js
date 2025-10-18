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

  issues.push({ name, title, priority, description, position, id });
  if(backlog === 0) {
    backlog=1;
  } else {
    backlog++;
  }
  id++;

  saveInLocalStorage();
  insertCard();
  form.reset();
  modal.classList.add('hidden');
});

function updateKey(issue){
  switch (issue.position){
    case 1:
      backlog--;
      inProgress++;
      break;
    case 2:
      inProgress--;
      review++;
      break;
    case 3:
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
      updateKey(issue);
      issues[index].position = issue.position + 1;
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
  console.log(Issue.priority);
  switch (Issue.priority){
    case "low":
      tag = '<span id="prioritylow" class="justify-end bg-teal-400 from-teal-500 via-teal-600 to-teal-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-teal-900">Bassa</span>';
      break;
    case "medium":
      tag = '<span id="prioritymedium" class="justify-end bg-blue-400 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-blue-900">Media</span>';
      break;
    case "high":
      tag = '<span id="priorityhigh" class="justify-end bg-yellow-600 from-yellow-600 via-yellow-700 to-yellow-750 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-yellow-900">Alta</span>';
      break;
    case "critical":
      tag = '<span id="prioritycritical" class="justify-end bg-red-400 from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-red-900">Critica</span>';
      break;
  }

  return `
    <div class="flex justify-center">
      <div class="flex flex-col justify-between border border-blue-300 rounded-lg shadow-sm bg-white dark:bg-gray-700 dark:border-gray-600 
                  overflow-hidden p-2 m-1 w-full sm:w-80 md:w-85 lg:w-88 hover:shadow-md transition-all duration-150 ease-in-out">
        
        <div class="flex justify-between items-start mb-2">
          <h5 class="text-md font-semibold text-gray-900 dark:text-white leading-tight truncate max-w-[95%]">${Issue.title}</h5>
          ${tag}
        </div>

        <p class="text-sm text-gray-700 dark:text-gray-400 mb-2 line-clamp-2 overflow-hidden text-ellipsis">
          ${Issue.description}
        </p>

        <div class="flex items-center justify-between mt-auto">
          <span class="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-[10px] font-medium text-gray-700 dark:text-gray-300 truncate max-w-[45%]">
            ${Issue.name}
          </span>

          <div class="flex gap-1">
            ${Issue.position > 1 ? `
            <button onclick="moveIssueBack(${Issue.id})" class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-[10px] font-medium rounded-md group
                           bg-gradient-to-br from-purple-600 via-purple-500 to-purple-900
                           group-hover:from-purple-700 group-hover:via-purple-300 group-hover:to-purple-900
                           text-purple-900 dark:text-white
                           focus:outline-none focus:ring-1 focus:ring-purple-200 dark:focus:ring-purple-400">
              <span class="relative px-2 py-0.5 transition-all ease-in duration-75 bg-white dark:bg-purple-900 rounded
                           group-hover:bg-transparent group-hover:dark:bg-transparent flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </span>
            </button>
            ` : ''}
            
            ${Issue.position < 4 ? `
            <button onclick="moveIssue(${Issue.id})" class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-[10px] font-medium rounded-md group
                           bg-gradient-to-br from-blue-600 via-blue-500 to-blue-900
                           group-hover:from-blue-700 group-hover:via-blue-300 group-hover:to-blue-900
                           text-blue-900 dark:text-white
                           focus:outline-none focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-400">
              <span class="relative px-2 py-0.5 transition-all ease-in duration-75 bg-white dark:bg-blue-900 rounded
                           group-hover:bg-transparent group-hover:dark:bg-transparent flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
            ` : ''}

            <button onclick="removeIssue(${Issue.id})" class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-[10px] font-medium rounded-md group
                           bg-gradient-to-br from-red-600 via-red-500 to-red-900
                           group-hover:from-red-700 group-hover:via-red-300 group-hover:to-red-900
                           text-red-900 dark:text-white
                           focus:outline-none focus:ring-1 focus:ring-red-200 dark:focus:ring-red-400">
              <span class="relative px-2 py-0.5 transition-all ease-in duration-75 bg-white dark:bg-red-900 rounded
                           group-hover:bg-transparent group-hover:dark:bg-transparent flex items-center gap-1">
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