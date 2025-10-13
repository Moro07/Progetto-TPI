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
    //insertcard(issues);

    //issues = [];
    //localStorage.setItem('issues', null);
    //document.getElementById("card-1").innerHTML = issues[0];

    btnSend.addEventListener('click', () => {
      const name = document.getElementById('name').value;
      const title = document.getElementById('title').value;
      const priority = document.getElementById('priority').value;
      const description = document.getElementById('desc').value;
      const desc = document.getElementById('desc');

      if(!name || !title || priority=="Scegli una priorità" || !description) {
        alert('Per favore, compila tutti i campi.');
        return;
      }

      issues.push({ name, title, priority, description, id });

      //insertCard(issues);

      saveInLocalStorage();
      updateCard(name, title, priority, description);

      desc.value = '';
      form.reset();
      modal.classList.add('hidden');
    });

    btnSearch.addEventListener('click', () => {
      const name = document.getElementById('nameSearch').value;
      const title = document.getElementById('titleSearch').value;
      const priority = document.getElementById('prioritySearch').value;

      if(!name && !title && !priority) {
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

    function uploadCard() {
      for (i = 0; i < issues.length; i++)
        document.getElementById("card1").innerHTML += issues[i].title + "<br>" + issues[i].priority + "<br>" + issues[i].description + "<br>" + issues[i].name + "<br>";
    }

    function updateCard(name, title, priority, description) {
      document.getElementById("card1").innerHTML += title + "<br>" + priority + "<br>" + description + "<br>" + name + "<br>";
    }

    function find() {
      let found = false;
      for (i = 0; i < issues.length; i++) {
        if (issues[i].name == document.getElementById('nameSearch').value || issues[i].title == document.getElementById('titleSearch').value || issues[i].priority == document.getElementById('prioritySearch').value) {
          document.getElementById("card2").innerHTML += issues[i].title + "<br>" + issues[i].priority + "<br>" + issues[i].description + "<br>" + issues[i].name + "<br>";
          found = true;
        }
      }
      if (!found) {
        alert('Nessuna issue trovata con questo nome e titolo.');
      }
    }