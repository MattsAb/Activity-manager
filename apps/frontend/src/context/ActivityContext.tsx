import type { Activity, Notifications } from '@activity-manager/types';
import { createContext, useContext, useState} from 'react';
import { getActivities } from '../utils/services/activity.api';
import { getNotifications } from '../utils/services/user.api';
    
    type ActivityContextType = {
        activities: Activity[]
        notifications: Notifications | null
        fetchNotifications: () => void
        fetchActivities: () => void
    }
    
    const activityContext = createContext<ActivityContextType | undefined>(undefined);
    
    export function ActivityProvider({ children }: { children: React.ReactNode }) {

        const [activities,setActivities] = useState<Activity[]>([])
        const [notifications, setNotifications] = useState<Notifications | null>(null)

        async function fetchActivities() {
            const result = await getActivities()
            if (result.success && result.data) {
                setActivities(result.data)
            }
        }

        async function fetchNotifications() {
            const result = await getNotifications()
            if (result.success && result.data) {
                setNotifications(result.data)
            }
        }

        return (
            <activityContext.Provider value={{activities, fetchActivities, notifications, fetchNotifications}}>
                {children}
            </activityContext.Provider>
        );
    }
    
    export function useActivity() {
      const ctx = useContext(activityContext);
      if (!ctx) throw new Error('useActivity must be used within activityProvider');
      return ctx;
    }