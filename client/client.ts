//Funktionen die beim Laden der Seite ausgeführt werden
console.log("sdghgfddxtresfd")

let inputAddTitle: HTMLInputElement = document.querySelector('#inputAddTitel')!;
let inputAddForm: HTMLFormElement = document.querySelector('#inputAddForm')!;
let inputAddBeschreibung: HTMLInputElement = document.querySelector('#inputAddBeschreibung')!;
let inputAddPrio: HTMLInputElement = document.querySelector('#inputAddPrio')!;
readTodo();

let taskTable = document.getElementById('taskTable');

inputAddForm.addEventListener('submit', postTask);


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


async function postTask(e: Event): Promise<void> {
    e.preventDefault();

    let title: string = inputAddTitle.value.trim();
    let desc: string = inputAddBeschreibung.value.trim();
    let prio: string = inputAddPrio.value.trim();

    if (title.length === 0 || desc.length === 0 || prio.length === 0) {
        inputAddForm.reportValidity();
        inputAddForm.innerText = "Bitte trage alle Felder ein!";
        return;
    }

    try {
        const res: Response = await fetch("/todo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                description: desc,
                priority: prio,
            })
        });
        const json = await res.json();
        if (res.status === 201) {
            inputAddForm.reset();
            console.log("läuft");
        } else if (res.status === 400) {
            inputAddForm.innerText = json.message;
        }
    } catch (err) {
        console.log("Fehler", err);
    }
}