import moment from "moment";

export const formatDueDate = (duedate: string) => {
    const dueDate = moment(duedate);
    const now = moment();
    const hoursLeft = dueDate.diff(now, 'hours');
    const daysLeft = dueDate.diff(now, 'days');

    if (hoursLeft <= 0) return 'Overdue';
    if (hoursLeft <= 24) return `${hoursLeft} hours left`;
    if (daysLeft <= 1) return `${daysLeft} day left`;
    return `${daysLeft} days left`;
};