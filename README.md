# Kanban board
## Stakeholder
Creato da degli studenti dell'[itis Castelli](https://www.iiscastelli.edu.it/Pager.aspx?Page=mainpage) per un'ipotetica impresa

## Fasi del processo:
### Analisi dei requisiti
- Funzionali: Questo sistema deve offrire la categorizzazione per priorità dei processi elaborati dall'impresa, deve permettere di creare delle issue specificando titolo, nome, priorità (bassa, media, alta e critica) e descrizione, con la possibilità spostarle tra le colonne (backlog, in progress, review e done) o eliminarle, e di vedere tutte le issue create organizzate per stato. Il sistema deve tenere traccia del numero di issue in ciascuna colonna, all'utente deve essere permesso di poter cercare tra le issue in base al titolo o al nome e in un modulo dedicato devono apparire le issue ricercate. Il sistema deve salvare automaticamente le issue create e i loro stati nella memoria locale, al riavvio della pagina il sistema deve ricaricare le issue salvate.
- Non funzionali: L'interfaccia deve essere intuitiva e facile da usare: con bottoni ben visibili per spostare o eliminare delle issue, con una navbar sottostante. Il sistema deve essere responsive consentendo così l'utilizzo da telefono. Il caricamento iniziale deve avvenire in tempi accettabili e lo spostamento tra colonne deve essere immediato.
- Di dominio: Il sistema deve aderire al principio visivo di un flusso di lavoro pull (Kanban) con stati definiti (le quattro colonne). segue il modello: [Kanban board](https://en.wikipedia.org/wiki/Kanban_board)
- Di vincolo: L'applicazione deve essere sviluppata utilizzando HTML, JavaScript e utilizzando una libreria grafica, il sistema deve essere completo entro il 20 Ottobre 2025 con un tempo di sviluppo di 3 settimane, non devono essere usati librerie o servizi a pagamento per lo sviluppo.
- Analisi della concorrenza: esistono altri sistemi online che seguono sempre il modello di una Kanban board, con funzioni basilari gratuite ma con la necessità di fare un abbonamento dopo un periodo di tempo o per sbloccare opzioni aggiuntive.
- Analisi di fattibilità: Il progetto è altamente fattibile tecnicamente ed economicamente, poiché utilizza tecnologie open-source ed evita la complessità di server e database. 

### Progettazione
![alt text](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Abstract_Kanban_Board.svg/330px-Abstract_Kanban_Board.svg.png)

### Implementazione
Utilizzo di linguaggio html, javascript e css con l'ambiente di sviluppo [Visual Studio Code](https://en.wikipedia.org/wiki/Visual_Studio_Code)

### Verifica e validazione
Test eseguiti su macchine locali

### Distribuzione
Pubblicazione repository su [Git Hub](https://en.wikipedia.org/wiki/GitHub)

### Manutenzione ed evoluzione
Utilizzo di un database in futuro
