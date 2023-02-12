import { makeAutoObservable, runInAction } from "mobx";
import ActivityApiService from "../api/activityApiService";
import { Activity } from "../models/Activity";
import {v4 as uuid} from "uuid";

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>();
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
    constructor() {
        makeAutoObservable(this);
    }
    
    get activitiesByDate(){
        return Array
            .from(this.activityRegistry.values())
            .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }
    
    loadActivities = async () => {
        try {
            const result = await ActivityApiService.list();
            result.activities.forEach(activity => {
                activity.date = this.parseDate(activity.date);
                this.activityRegistry.set(activity.id, activity);
            })
            this.setLoadingInitial(false);
        } catch (e){
            console.log(e);
            this.setLoadingInitial(false);
        }
    }
    
    private setLoadingInitial = (state: boolean) => this.loadingInitial = state;
    
    private parseDate = (date: string) => date.split('T')[0];
    
    selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
    }
    cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
    }
    
    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await ActivityApiService.add(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);  
                this.selectedActivity = activity;
                this.editMode = false;
            })
        }catch (e){
            console.log(e);
            runInAction(() => {
                this.loading = false;  
            })
        }
    }
    editActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await ActivityApiService.update(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            });
        }catch (e) {
            console.log(e);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    
    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await ActivityApiService.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
                this.loading = false;
            })
        } catch (e){
            console.log(e);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
    
    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }
    
    closeForm = () => {
        this.editMode = false;
    }
    
    
}