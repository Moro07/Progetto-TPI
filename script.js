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

    //issues = [];
    //localStorage.setItem('issues', null);
    //document.getElementById("card-1").innerHTML = issues[0];

    btnSend.addEventListener('click', () => {
      const name = document.getElementById('name').value;
      const title = document.getElementById('title').value;
      const priority = document.getElementById('priority').value;
      const description = document.getElementById('desc').value;
      const desc = document.getElementById('desc');

      issues.push({ name, title, priority, description });

      saveInLocalStorage();
      updateCard();
      desc.value = '';
      form.reset();
      modal.classList.add('hidden');
    });

    function saveInLocalStorage() {
      localStorage.setItem('issues', JSON.stringify(issues));
    }
    
    function updateCard() {
      for (let i = 0; i < issues; i++)
        document.getElementById("card-1").innerHTML = issues[i].title + "<br>" + issues[i].priority + "<br>" + issues[i].description + "<br>" + issues[i].name;
      console.log(issues);  
    }