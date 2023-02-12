import { Activities, Activity } from "../models/Activity";
import agent from "./agent";

export default class ActivityApiService {
     public static list():Promise<Activities>{
         return agent.requests.get<Activities>('/activities');
     }
     public static get(id: string):Promise<Activity>{
         return agent.requests.get<Activity>(`/activities/${id}`)
     }
     public static add(activity: Activity):Promise<void> {
         return agent.requests.post<void>('/activities', activity);
     }
     public static update(activity: Activity):Promise<void> {
         return agent.requests.put<void>(`/activities`, activity);
     }
     public static delete(id: string):Promise<void> {
         return agent.requests.delete<void>(`/activities/${id}`);
     }
}