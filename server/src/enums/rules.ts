type Rules = {
    [key: string]: string[];
};


export const Rules: Rules = {
    // "ToDo" : [],
    // "InProgress" : [],
    // "Completed" : []
    "ToDo" : ['InProgress', 'Completed'],
    "InProgress" : ['ToDo', 'Completed'],
    "Completed" : ['InProgress']
}