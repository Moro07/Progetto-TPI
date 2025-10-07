  const openModalBtn = document.getElementById('openModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modal = document.getElementById('modal');
  const btnSend = document.getElementById('send');
  const form = document.getElementById('form');
  let issues = JSON.parse(localStorage.getItem('issues')) || [];

    openModalBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    // Chiudi modale cliccando fuori
    window.addEventListener('click', (e) => {
      if(e.target === modal) {
        modal.classList.add('hidden');
      }
    });

    btnSend.addEventListener('click', () => {
      const name = document.getElementById('name').value;
      const title = document.getElementById('title').value;
      const priority = document.getElementById('priority').value;
      const description = document.getElementById('desc').value;
      

      issues.push({ name, title, priority, description });

      saveInLocalStorage();
      document.getElementById("card1").innerHTML += insertCard(name,title,priority,description,1) + "<br>";
      form.reset();
      description.value = '';
      modal.classList.add('hidden');
      
    });

    function saveInLocalStorage() {
      localStorage.setItem('issues', JSON.stringify(issues));
    }

function insertCard(name, title, priority, description, id) {
    let priorityCard = '';
    
    // Assicurati che i valori di 'priority' siano stringhe
    switch (priority) {
        case 'low':
            priorityCard = `<span id="priority-low" class="flex justify-end bg-teal-400 from-teal-500 via-teal-600 to-teal-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-teal-900">Bassa</span>`;
            break;
        case 'medium':
            priorityCard = `<span id="priority-medium" class="flex justify-end bg-blue-400 from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-blue-900">Media</span>`;
            break;
        case 'high':
            priorityCard = `<span id="priority-high" class="flex justify-end bg-yellow-600 from-yellow-600 via-yellow-700 to-yellow-750 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-yellow-900">Alta</span>`;
            break;
        case 'critical':
            priorityCard = `<span id="priority-critical" class="flex justify-end bg-red-400 from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 text-red-900">Critica</span>`;
            break;  
    }
      const cardHTML = `
      <div class = "flex border border-blue-400 ">
            <div id="issue${id} class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <a href="#" class="flex items-start p-4 space-x-4">
                    <h5 id="title-issue" class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white>${title} </h5>
                    <span id="issue-status">${priorityCard}</span>
                </a>

                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${description}</p>
                <div class="flex items-center space-x-4">
                    <a href="#" class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                        ${name}
                    </a>
                    <a>
                        <button class=" relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group
                                    bg-gradient-to-br from-blue-600 via-blue-500 to-blue-900
                                    group-hover:from-blue-700 group-hover:via-blue-300 group-hover:to-blue-900
                                    dark:text-white dark:hover:text-blue-100
                                    focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-400
                                    focus-visible:ring focus-visible:ring-blue-400">
                            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-blue-900 rounded-md
                                        group-hover:bg-transparent group-hover:dark:bg-transparent">
                                Sposta
                            </span>
                        </button>
                    </a>
                    <a>
                        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group
                                    bg-gradient-to-br from-red-600 via-red-500 to-red-900
                                    group-hover:from-red-700 group-hover:via-red-300 group-hover:to-red-900
                                    dark:text-white dark:hover:text-red-100
                                    focus:outline-none focus:ring-4 focus:ring-red-100 dark:focus:ring-red-400
                                    focus-visible:ring focus-visible:ring-red-400">
                            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-red-900 rounded-md
                                        group-hover:bg-transparent group-hover:dark:bg-transparent">
                                Elimina
                            </span>
                        </button>
                    </a>
                </div>
            </div>
          </div>
        `;

        return cardHTML;

    }