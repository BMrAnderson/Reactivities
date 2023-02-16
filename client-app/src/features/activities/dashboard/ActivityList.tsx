import React, {Fragment, SyntheticEvent, useState} from "react";
import { Activities, Activity } from "../../../app/models/Activity";
import {Button, Header, Item, Label, List, Segment} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import {Link, NavLink } from "react-router-dom";
import ActivityListItem from "./ActivityListItem";

export default observer(function ActivityList() {
    const {activityStore} = useStore();
    const {groupedActivitiesByDate} = activityStore;
    
    return (
        <Fragment>
            {groupedActivitiesByDate.map(([group, activites]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>{group}</Header>
                    {activites.map(activity => (<ActivityListItem key={activity.id} activity={activity} />))}
                </Fragment>
            ))}
        </Fragment>

    )
})