import { observer } from "mobx-react-lite";
import React, {useEffect} from "react";
import {Grid, List} from "semantic-ui-react";
import LoadingIndicator from "../../../app/layout/LoadingIndicator";
import { Activities, Activity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/store";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

export default observer(function ActivityDashboard(){
    const {activityStore} = useStore();
    const {selectedActivity, editMode, activityRegistry, loadActivities} = activityStore;
    
    useEffect(() => {
        if (activityRegistry.size <= 1) loadActivities();
    }, [activityRegistry.size, loadActivities]);

    if (activityStore.loadingInitial) return (<LoadingIndicator content='Loading app...'/>)
    
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity Filters</h2>
            </Grid.Column>
        </Grid>
    )
});