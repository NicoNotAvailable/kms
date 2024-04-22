let inputAddTitle: HTMLInputElement = document.querySelector('#inputAddTitel')!;
let inputAddForm: HTMLFormElement = document.querySelector('#inputAddForm')!;
let inputAddBeschreibung: HTMLInputElement = document.querySelector('#inputAddBeschreibung')!;
let inputAddPrio: HTMLInputElement = document.querySelector('#inputAddPrio')!;

inputAddForm.addEventListener('submit', postTask);

async function postTask(e: Event): Promise<void> {
    e.preventDefault();

    let title: string = inputAddTitle.value.trim();
    let desc: string = inputAddBeschreibung.value.trim();
    let prio: number = inputAddPrio.valueAsNumber;

    if (title.length === 0 || desc.length === 0 || prio < 1 || prio > 3) {
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

async function editTask(id: number): Promise<void> {

    const title: string = "yolo";
    const description: string = "lol";
    const priority: number = 3;
    const status: boolean = true

    try {
        const response: Response = await fetch(`/todo/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "title": title,
                "description": description,
                "priority": priority,
                "status": status
            })
        });
        if (response.status == 201) {
            alert("hat funktioniert");
        } else {
            alert("Es ist ein Fehler aufgetreten");
            throw new Error();
        }
    } catch (err) {
        console.log("Ein Fehler ist aufgetreten", err);
    }
}
