//Funktionen die beim Laden der Seite ausgeführt werden
console.log("sdghgfddxtresfd")
readTodo();


let addTaskForm = document.getElementById('inputAddForm');
let addTaskTitel = document.getElementById('inputAddTitel');
let addTaskPrio = document.getElementById('inputAddPrio');
let addTaskBeschreibung = document.getElementById('inputAddBeschreibung');

let taskTable = document.getElementById('taskTable');

function readTodo() {

    fetch("/todo", {
        // Der Credentials-Parameter ist nur bei Anfragen an einen fremden Server notwendig
        credentials: "include"
    }).then((response) => {
        // Wenn ein Response vom Server eintrifft
        if (response.ok) {
            // Wenn der Response ein 2xx Statuscode enthält
            response.json().then((tasks) => {
                // Konvertiere den JSON-String in ein JS-Objekt
                // Hier Rendering einfügen
                taskTable.replaceChildren();

                taskTable.innerHTML = `<tr>
                    <th class="col-2">Titel:</th>
                <th class="col-2">Status:</th>
                <th class="col-2">Priorität:</th>
                <th class="col-2">Beschreibung:</th>
                <th class="col-2">Aktionen:</th>
                </tr>`;

                for (const t of tasks) {
                    const tr: HTMLElement = document.createElement("tr");
                    tr.innerHTML = `
            <td>${t.title}</td>
            <td>${t.status}</td>
            <td>${t.priority}</td>
            <td>${t.description}</td>

            <td>
                 <button class="btn btn-primary delete" data-id="${t.id}">Delete</i></button>
                 <button class="btn btn-secondary edit" data-email="${t.id}">Edit</button>
            </td>
        `;
                    taskTable.append(tr);
                }
            }).catch((error) => {
                // Wenn der String kein Objekt enthielt
                console.log("Error: No Object in JSON", error)
            })
        } else {
            // Wenn ein 4xx / 5xx Statuscode zurückkommt
            console.log("Error: Response is not OK", response.statusText);
        }
    }).catch((error) => {
        // Wenn kein Response eintrifft
        console.log("Error: No Response received", error)
    })
}
