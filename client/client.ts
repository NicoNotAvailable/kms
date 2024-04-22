let inputAddTitle: HTMLInputElement = document.querySelector('#inputAddTitel')!;
let inputAddForm: HTMLFormElement = document.querySelector('#inputAddForm')!;
let inputAddBeschreibung: HTMLInputElement = document.querySelector('#inputAddBeschreibung')!;
let inputAddPrio: HTMLInputElement = document.querySelector('#inputAddPrio')!;

inputAddForm.addEventListener('submit', postTask);

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


/*
Tabelle.addEventListener("click", async (event:Event) => {
    const target: HTMLElement = (event.target as HTMLElement).closest(".delete");
    if (target !== null) {

        // data-userindex muss noch angepasst werden
        let index = target.parentElement.parentElement.getAttribute('data-userindex');

        try {
            const res: Response = await fetch('/todo/' + index, {
                method: 'DELETE'
            });
        }  catch (err) {
            console.log("Error bei DELETE");
        }
        // todo, hier die Render todo List Funktion einfügen
    }
});
 */
