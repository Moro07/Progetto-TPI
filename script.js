  const openModalBtn = document.getElementById('openModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modal = document.getElementById('modal');
  const btnSend = document.getElementById('send');
  const btnSearch = document.getElementById('tooltipSearch');
  const search = document.getElementById('search');
  const form = document.getElementById('form');
  let i = 0;
  let issues = JSON.parse(localStorage.getItem('issues')) || [];

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

    btnSearch.addEventListener('click', () => {
      search.classList.remove('hidden');
    });

    uploadCard();

    //issues = [];
    //localStorage.setItem('issues', null);
    //document.getElementById("card-1").innerHTML = issues[0];

    btnSend.addEventListener('click', () => {
      const name = document.getElementById('name').value;
      const title = document.getElementById('title').value;
      const priority = document.getElementById('priority').value;
      const description = document.getElementById('desc').value;

      issues.push({ name, title, priority, description });

      saveInLocalStorage();
      document.getElementById("card-1").innerHTML += name + " - " + title + " - " + priority + " - " + description + "<br>";
      form.reset();
      modal.classList.add('hidden');
      
    });

    function saveInLocalStorage() {
      localStorage.setItem('issues', JSON.stringify(issues));
    }
