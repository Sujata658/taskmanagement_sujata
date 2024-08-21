export const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'High':
            return 'bg-red-500 text-white';
        case 'Normal':
            return 'bg-yellow-500 text-black';
        case 'Low':
            return 'bg-green-500 text-white';
        default:
            return 'bg-gray-500 text-white';
    }
};