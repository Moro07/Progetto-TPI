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
  let id = 1;
  let issues = JSON.parse(localStorage.getItem('issues')) || [];
  let id = 1;

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
    });

    uploadCard();
    insertcard(issues);
    

    //issues = [];
    //localStorage.setItem('issues', null);
    //document.getElementById("card-1").innerHTML = issues[0];

    btnSend.addEventListener('click', () => {
      const name = document.getElementById('name').value;
      const title = document.getElementById('title').value;
      const priority = document.getElementById('priority').value;
      const description = document.getElementById('desc').value;

      issues.push({ name, title, priority, description, id });

      insertcard(issues);
      issues.push({ name, title, priority, description,id });

      saveInLocalStorage();
      insertCard(issues);
      form.reset();
      modal.classList.add('hidden');
      
    });

    btnSearch.addEventListener('click', () => {
      const name = document.getElementById('nameSearch').value;
      const title = document.getElementById('titleSearch').value;

      if(!name && !title) {
        alert('Per favore, compila tutti i campi.');
        return;
      }

      find();

      formSearch.reset();
      search.classList.add('hidden');
    });

    function saveInLocalStorage() {
      localStorage.setItem('issues', JSON.stringify(issues));
    }
    function insertCard(people){ 
      people.forEach((issue, index) => {
        let location="card"
       let container = document.getElementById(location.concat(issue.id));
       
       container.innerHTML+=generateCard(issue);
      }); 
      }

document.addEventListener('DOMContentLoaded', function() {
  insertCard(issues)
});


   /* function generateCard(Issue){
      let tag
      
      switch (Issue.priority){
        case "low":
           tag = '<span id="prioritylow" class="justify-end bg-teal-400 from-teal-500 via-teal-600 to-teal-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-teal-900">Bassa</span>'
        case "medium":
           tag = '  <span id="prioritymedium" class="justify-end bg-blue-400 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-blue-900">Media</span>'
        case "high":
           tag='<span id="priorityhigh" class="justify-end bg-yellow-600 from-yellow-600 via-yellow-700 to-yellow-750 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-yellow-900">Alta</span>'
        case "critical":
           tag ='<span id="prioritycritical" class="justify-end bg-red-400 from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-red-900">Critica</span>'      
      }
      
      

      return cardHtml = `
      <div class="flex justify-center">
      <div id="issue-${Issue.id}" 
           class="flex flex-col justify-between border border-blue-300 rounded-xl shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 
                  overflow-hidden p-4 m-2 w-full sm:w-64 md:w-72 lg:w-80 hover:shadow-lg transition-all duration-200 ease-in-out">
        
        <div class="flex justify-between items-start mb-2">
          <h5 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-white leading-tight truncate max-w-[70%]">${Issue.title}</h5>
          ${tag}
        </div>

        <p class="text-sm text-gray-700 dark:text-gray-400 mb-3 line-clamp-3 overflow-hidden text-ellipsis">
          ${Issue.description}
        </p>

        <div class="flex items-center justify-between mt-auto">
          <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 truncate max-w-[45%]">
            ${Issue.name}
          </span>

          <div class="flex gap-2">
            <!-- Bottone Sposta -->
            <button class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs sm:text-sm font-medium rounded-lg group
                           bg-gradient-to-br from-blue-600 via-blue-500 to-blue-900
                           group-hover:from-blue-700 group-hover:via-blue-300 group-hover:to-blue-900
                           text-blue-900 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-400">
              <span class="relative px-3 py-1 sm:px-4 sm:py-1.5 transition-all ease-in duration-75 bg-white dark:bg-blue-900 rounded-md
                           group-hover:bg-transparent group-hover:dark:bg-transparent">
                Sposta
              </span>
            </button>

            <!-- Bottone Elimina -->
            <button class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs sm:text-sm font-medium rounded-lg group
                           bg-gradient-to-br from-red-600 via-red-500 to-red-900
                           group-hover:from-red-700 group-hover:via-red-300 group-hover:to-red-900
                           text-red-900 dark:text-white
                           focus:outline-none focus:ring-2 focus:ring-red-200 dark:focus:ring-red-400">
              <span class="relative px-3 py-1 sm:px-4 sm:py-1.5 transition-all ease-in duration-75 bg-white dark:bg-red-900 rounded-md
                           group-hover:bg-transparent group-hover:dark:bg-transparent">
                Elimina
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
`;



    }  */


    function generateCard(Issue) {
      let tag = ''

      switch (Issue.priority){
        case "low":
           tag = '<span id="prioritylow" class="justify-end bg-teal-400 from-teal-500 via-teal-600 to-teal-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-teal-900">Bassa</span>'
        case "medium":
           tag = '  <span id="prioritymedium" class="justify-end bg-blue-400 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-blue-900">Media</span>'
        case "high":
           tag='<span id="priorityhigh" class="justify-end bg-yellow-600 from-yellow-600 via-yellow-700 to-yellow-750 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-yellow-900">Alta</span>'
        case "critical":
           tag ='<span id="prioritycritical" class="justify-end bg-red-400 from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-red-900">Critica</span>'      
      }

  return `
    <div class="flex justify-center">
  <div id="issue-${Issue.id}" 
       class="flex flex-col justify-between border border-blue-300 rounded-lg shadow-sm bg-white dark:bg-gray-700 dark:border-gray-600 
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
        <!-- Bottone Sposta -->
        <button class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-[10px] font-medium rounded-md group
                       bg-gradient-to-br from-blue-600 via-blue-500 to-blue-900
                       group-hover:from-blue-700 group-hover:via-blue-300 group-hover:to-blue-900
                       text-blue-900 dark:text-white
                       focus:outline-none focus:ring-1 focus:ring-blue-200 dark:focus:ring-blue-400">
          <span class="relative px-2 py-0.5 transition-all ease-in duration-75 bg-white dark:bg-blue-900 rounded
                       group-hover:bg-transparent group-hover:dark:bg-transparent">
            Sposta
          </span>
        </button>

        <!-- Bottone Elimina -->
        <button class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-[10px] font-medium rounded-md group
                       bg-gradient-to-br from-red-600 via-red-500 to-red-900
                       group-hover:from-red-700 group-hover:via-red-300 group-hover:to-red-900
                       text-red-900 dark:text-white
                       focus:outline-none focus:ring-1 focus:ring-red-200 dark:focus:ring-red-400">
          <span class="relative px-2 py-0.5 transition-all ease-in duration-75 bg-white dark:bg-red-900 rounded
                       group-hover:bg-transparent group-hover:dark:bg-transparent">
            Elimina
          </span>
        </button>
      </div>
    </div>
  </div>
</div>

  `;
}
