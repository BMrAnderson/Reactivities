import { observer } from "mobx-react-lite";
import React, {useEffect} from "react";
import {Link, useParams } from "react-router-dom";
import {Button, Card, Grid, Icon, Image } from "semantic-ui-react";
import LoadingIndicator from "../../../app/layout/LoadingIndicator";
import { Activity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/store";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsHeader from "./ActivityDetailsHeader";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";

export default observer(function ActivityDetails() {
    const {activityStore} = useStore();
    const {selectedActivity: activity, loadingInitial, loadActivity} = activityStore;
    const {id} = useParams();
    
    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity])
    
    if (loadingInitial || !activity) return <LoadingIndicator />;
    
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailsHeader activity={activity} />
                <ActivityDetailsInfo activity={activity}/>
                <ActivityDetailsChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailsSidebar />
            </Grid.Column>
        </Grid>
    )
});