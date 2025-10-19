# Kanban board
## Stakeholder
Creato da degli studenti dell'[itis Castelli](https://www.iiscastelli.edu.it/Pager.aspx?Page=mainpage) per un'ipotetica impresa

## Fasi del processo:
### Analisi dei requisiti
- Funzionali: Questo sistema deve offrire la categorizzazione per priorità dei processi elaborati dall'impresa, deve permettere di creare delle issue specificando titolo, nome, priorità (bassa, media, alta e critica) e descrizione, con la possibilità spostarle tra le colonne (backlog, in progress, review e done) o eliminarle e di vedere tutte le issue create organizzate per stato. Il sistema deve tenere traccia del numero di issue in ciascuna colonna, all'utente deve essere permesso di poter cercare tra le issue in base al titolo o al nome e in un modulo dedicato devono apparire le issue ricercate. Il sistema deve salvare automaticamente le issue create e i loro stati nella memoria locale e all'avvio della pagina il sistema deve caricare le issue salvate.
- Non funzionali: L'interfaccia deve essere intuitiva e facile da usare: con bottoni ben visibili per spostare o eliminare le issue, con una navbar. Il sistema deve essere responsive consentendo così l'utilizzo da telefono. Il caricamento iniziale deve avvenire in tempi accettabili e lo spostamento tra colonne deve essere immediato.
- Di dominio: Il sistema deve aderire al principio visivo di un flusso di lavoro pull (Kanban) con stati definiti (le quattro colonne). Segue il modello: [Kanban board](https://en.wikipedia.org/wiki/Kanban_board)
- Di vincolo: L'applicazione deve essere sviluppata utilizzando HTML, JavaScript e utilizzando una libreria grafica, il sistema deve essere completo entro il 20 Ottobre 2025 con un tempo di sviluppo di 3 settimane e non devono essere usati librerie o servizi a pagamento per lo sviluppo.
- Analisi della concorrenza: esistono altri sistemi online che seguono sempre il modello di una Kanban board, con funzioni basilari gratuite ma con la necessità di fare un abbonamento dopo un periodo di tempo o per sbloccare opzioni aggiuntive.
- Analisi di fattibilità: Il progetto è altamente fattibile tecnicamente ed economicamente, poiché utilizza tecnologie open-source ed evita la complessità di server e database. 

### Progettazione
Il sistema fa riferimento a:
![alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Abstract_Kanban_Board.svg/330px-Abstract_Kanban_Board.svg.png)

Architettura:
1. Interfaccia utente UI: Responsabile dell'interazione con l'utente e della visualizzazione dei dati. Tecnologia: HTML, Tailwind CSS, Flowbite.
2. Logica: Gestisce il flusso del sistema, l'interazione tra i dati e l'interfaccia. Tecnologia: Javascript.
3. Persistenza dati: Gestisce la memorizzazione e il recupero dei dati. tecnologia: Javascript (local Storage).

Comportamento issue:

Creazione: Ogni nuova issue creata viene posizionata nella colonna Backlog (position = 1).
Avanzamento/Ritorno: L'utente usa i bottoni sulla card per aumentare (moveIssue) o diminuire (moveIssueBack) il valore di position, spostando la issue tra le colonne.
Salvataggio: Ogni volta che si crea, si sposta o si elimina una issue, l'intera lista viene salvata immediatamente nel localStorage per mantenere la persistenza.
Eliminazione: L'issue viene rimossa dall'array dei dati e dalla visualizzazione.

Comportamento ricerca:
Inizio: L'utente apre il modulo di ricerca.
Esecuzione: Dopo l'invio del form, la funzione find() filtra l'array issues in memoria in base a titolo o nome.
Visualizzazione: Se vengono trovati risultati, questi sono formattati come card e visualizzati in un modulo dedicato.


Il sistema gestisce le issue, per ogni issue si conosce:
| Proprietà | Tipo di dato | Scopo |
| --- | --- | --- |
|id| Intager | Identificatore unico per tracciare la singola issue |
|title|String| Breve titolo della issue |
|name| String | Nome della issue|
|priority | String |Priorità della issue|
|description| String |descrizione della issue|
|position| Intager [1-4] | Indica la colonna sulla quale si trova la issue |


### Implementazione

1. HTML: Struttura e Contenitori 

L'HTML definisce lo scheletro dell'applicazione, stabilendo i punti di iniezione del codice JavaScript e rispettando il requisito di visualizzazione in colonne:

Colonne Kanban: Sono stati definiti i div contenitori per ogni stato:
" <div id="card1"></div> <div id="card4"></div> "

Bottoni invia:
" <button id="send" ...>Invia</button> "


2. Grafica: Tailwind CSS e FlowBite
   
L'uso della libreria Tailwind CSS ha permesso di implementare il design responsive e l'usabilità.
Layout Responsivo:

" <div class="w-full sm:w-1/6 ...">...</div> "

Colori: utilizzo di colori con sfumature per visualizzare meglio la priorità.
" <span class="bg-red-400 ... text-red-900">Critica</span> "


3. JavaScript: Logica e Persistenza Dati 

Persistenza Dati:
" function saveInLocalStorage() {
   localStorage.setItem('issues', JSON.stringify(issues));
   } "

Flusso Kanban (Spostamento):
" issues[index].position = issue.position + 1; // Avanza di uno stato "

Ricerca: La funzione find() è case-insensitive
" issue.name.toLowerCase() === name.toLowerCase() // Confronto dei nomi "

### Verifica e validazione
Sono stati eseguiti test su ogni funzione JavaScript per la correttezza, verificando sia la logica Kanban (ad esempio, il movimento position + 1 e i limiti) sia i requisiti di ricerca (funzionamento case-insensitive). La Validazione ha confermato il Responsive Design e la corretta persistenza dei dati da localStorage al riavvio, garantendo che il sistema sia robusto e usabile

### Distribuzione
Pubblicazione repository su [Git Hub](https://en.wikipedia.org/wiki/GitHub)

### Manutenzione ed evoluzione
Futuri aggiornamenti:
Modifica Issue: Implementare la possibilità di modificare il titolo, la descrizione o la priorità di una issue già creata (non solo spostarla o eliminarla).
Filtri Avanzati: Aggiungere la possibilità di filtrare le issue per priorità o per data di creazione.
Creazione database: implementare un database, per abilitare la persistenza multi-utente e la collaborazione in tempo reale.
Autenticazione: Implementare un sistema di login/logout per distinguere i creatori delle issue e permettere la collaborazione tra team.
