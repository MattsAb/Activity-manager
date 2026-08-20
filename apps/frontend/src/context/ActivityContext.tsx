import type { Activity } from '@activity-manager/types';
import { createContext, useContext, useState} from 'react';
import { getActivities } from '../utils/services/activity.api';
    
    type ActivityContextType = {
        activities: Activity[]
        fetchActivities: () => void
    }
    
    const activityContext = createContext<ActivityContextType | undefined>(undefined);
    
    export function ActivityProvider({ children }: { children: React.ReactNode }) {

        const [activities,setActivities] = useState<Activity[]>([])

        async function fetchActivities() {
            console.log('fetching activities')
            const result = await getActivities()
            if (result.success && result.data) {
                setActivities(result.data)
            }
        }

        return (
            <activityContext.Provider value={{activities, fetchActivities}}>
                {children}
            </activityContext.Provider>
        );
    }
    
    export function useActivity() {
      const ctx = useContext(activityContext);
      if (!ctx) throw new Error('useActivity must be used within activityProvider');
      return ctx;
    }