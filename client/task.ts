export class Task {
    title: string
    status: boolean
    priority: number
    description: string

    constructor(title: string, priority: number, description: string) {
        this.title = title;
        this.priority = priority;
        this.description = description;
    }
}
