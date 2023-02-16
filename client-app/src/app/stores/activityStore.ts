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

    //Set the initial loading indicator to an on or off state.
    private setLoadingInitial = (state: boolean) => this.loadingInitial = state;
    
    //Parse a given datetime string and return the formatted date result.
    private parseDate = (date: string) => date.split('T')[0];
    
    //Retrieve an activity by the given id from the activity registry.
    private get = (id: string) => this.activityRegistry.get(id);
    
    //Set the activity inside the activity registry.
    private set = (activity: Activity) => { 
        activity.date = this.parseDate(activity.date);
        this.activityRegistry.set(activity.id, activity);
    }
    
    //Delete the activity with with the given id from the activity registry.
    private delete = (id: string) => this.activityRegistry.delete(id);
    
    //Retrieve all the activities from the registry sorted by their date.
    get activitiesByDate(){
        return Array
            .from(this.activityRegistry.values())
            .sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    }
    
    get groupedActivitiesByDate(){
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = activity.date;
                activities[date] = activities[date] ? [...activities[date], activity] : [activity];
                return activities;
            }, {} as {[key: string] : Activity[]})
        )
    }
    
    //Load all the activities.
    loadActivities = async () => {
        this.setLoadingInitial(true);
        try {
            const result = await ActivityApiService.list();
            result.activities.forEach(activity => {
                activity.date = this.parseDate(activity.date);
                this.set(activity);
            })
            this.setLoadingInitial(false);
        } catch (e){
            console.log(e);
            this.setLoadingInitial(false);
        }
    }
    
    //Load a single activity by given id.
    loadActivity = async (id: string) => {
        this.setLoadingInitial(true);
        let activity = this.get(id);
        try {
            if (!activity) {
                activity = await ActivityApiService.get(id);
                this.set(activity);
            }
            runInAction(() => this.selectedActivity = activity);
            this.setLoadingInitial(false);
            return activity;
        }catch (e) {
            console.log(e);
            this.setLoadingInitial(false);
        }
    }
    
    //Create a single activity.
    createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await ActivityApiService.add(activity);
            runInAction(() => {
                this.set(activity);  
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
    
    //Modify an existing activity.
    editActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await ActivityApiService.update(activity);
            runInAction(() => {
                this.set(activity);
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
    
    //Remove an existing activity given by id.
    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await ActivityApiService.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id);
                this.loading = false;
            })
        } catch (e){
            console.log(e);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}