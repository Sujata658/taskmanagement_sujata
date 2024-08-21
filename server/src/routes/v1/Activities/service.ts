import { ActivityModel } from "./model";

const ActivitiesService = {
    async getActivities(user:string) {
        const activities = await ActivityModel.find({
            author: user,
        }).populate('author').populate('actionOn');
        return activities;
    },
};
export default ActivitiesService;