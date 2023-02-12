import React, {SyntheticEvent, useState} from "react";
import { Activities, Activity } from "../../../app/models/Activity";
import {Button, Item, Label, List, Segment} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ActivityList() {
    const {activityStore} = useStore();
    const {loading, deleteActivity, selectActivity, activitiesByDate} = activityStore;
    const [target, setTarget] = useState('');
    const handleActivityDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(e.currentTarget.id);
        deleteActivity(id);
    }
    
    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectActivity(activity.id)} floated='right' color='blue' content='View' />
                                <Button id={activity.id} loading={loading && activity.id === target} onClick={(e) => handleActivityDelete(e, activity.id)} floated='right' color='red' content='Remove' />
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
})