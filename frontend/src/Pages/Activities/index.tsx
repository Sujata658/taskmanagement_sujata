import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { getActivities } from '@/apis/activities/get';
import { Activity } from '@/types/Activity';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const Activities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const location = useLocation();

  useEffect(() => {
    getActivities()
      .then((data) => {
        if (data.length > 0) {
          setActivities(data.reverse());
        } else {
          toast.error('No activities found');

        }
      })
      .catch((error) => {
        toast.error(error.message || 'Error fetching activities');
      });
  }, [location]);

  const renderActivityDescription = (activity: Activity) => {
    switch (activity.action.toLowerCase()) {
      case 'created':
        return `created a new ${activity.actionOnModel.toLowerCase()}.`;
      case 'create':
        return `created a new ${activity.actionOnModel.toLowerCase()}.`;
      case 'updated':
        return `updated a ${activity.actionOnModel.toLowerCase()}.`;
      case 'deleted':
        return `deleted a ${activity.actionOnModel.toLowerCase()}.`;

      case 'updated task status of':
        return `updated task status from ${activity.from} to ${activity.to}.`;
      default:
        return `performed an action on a ${activity.actionOnModel.toLowerCase()}.`;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Activities</h1>
      <div className="max-h-[70vh] overflow-y-auto">
        <ScrollArea>


          { activities.length === 0 ? (
            
              <div className="text-gray-500">No activities found</div>
          ) : null }

          {
          
          
          activities.map((activity) => (
            <Card key={activity._id} className="p-4 border mb-2 rounded-lg shadow-lg bg-background">
              <div className="flex items-center space-x-4">
                <div className="text-gray-500">
                  <span className="font-semibold">You</span> {renderActivityDescription(activity)}
                </div>
                <div className="text-sm text-gray-400">
                  {new Date(activity.createdAt).toLocaleString()}
                </div>
              </div>
            </Card>
          ))}
        </ScrollArea>
        
      </div>
    </div>
  );
};

export default Activities;
