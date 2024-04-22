import {Task} from './task';

let inputAddTitle: HTMLInputElement = document.querySelector('#inputAddTitle');
let inputAddForm: HTMLFormElement = document.querySelector('#inputAddForm');
let inputAddBeschreibung = document.querySelector('#inputAddBeschreibung');
let inputAddPrio = document.querySelector('#inputAddPrio');

inputAddForm.addEventListener('submit', postTask);

async function postTask(e: Event)  {
    e.preventDefault();
    let title: string = inputAddTitle.value.trim();
    let desc: string = inputAddTitle.value.trim();
    let prio: string = inputAddTitle.value.trim();

    if (title.length === 0 || desc.length === 0 || prio.length === 0) {
        inputAddForm.reportValidity();
        inputAddForm.innerText = "Bitte trage alle Felder ein!";
    }
    try {
        const res: Response = await fetch("/todo",
            {
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
        if (res.status == 201) {
            inputAddForm.reset();
        } else if (res.status === 400) {
            inputAddForm.innerText = json.message;
        }
    } catch (err) {
        console.log("Fehler", err);
    }
}