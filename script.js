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
      const desc = document.getElementById('desc');

      if(!name || !title || priority=="Scegli una priorità" || !description) {
        alert('Per favore, compila tutti i campi.');
        return;
      }

      issues.push({ name, title, priority, description });

      saveInLocalStorage();
      updateCard(name, title, priority, description);

      desc.value = '';
      form.reset();
      modal.classList.add('hidden');
    });

    function saveInLocalStorage() {
      localStorage.setItem('issues', JSON.stringify(issues));
    }

    function uploadCard() {
      for (i = 0; i < issues.length; i++)
        document.getElementById("card1").innerHTML += issues[i].title + "<br>" + issues[i].priority + "<br>" + issues[i].description + "<br>" + issues[i].name;
      console.log(card1);
    }

    function updateCard(name, title, priority, description) {
      document.getElementById("card1").innerHTML += title + "<br>" + priority + "<br>" + description + "<br>" + name;
      console.log(card1);
    }