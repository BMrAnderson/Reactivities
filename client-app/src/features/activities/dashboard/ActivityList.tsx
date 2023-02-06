import React from "react";
import { Activities, Activity } from "../../../app/models/Activity";
import {Button, Item, Label, List, Segment} from "semantic-ui-react";

interface ActivityListRequestProps {
    activities: Activity[],
    onActivitySelect: (id: string) => void,
    onActivityDelete: (id: string) => void
}

export default function ActivityList({activities, onActivitySelect, onActivityDelete}: ActivityListRequestProps){
    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => onActivitySelect(activity.id)} floated='right' color='blue' content='View' />
                                <Button onClick={() => onActivityDelete(activity.id)} floated='right' color='red' content='Remove' />
                                <Label basic content={activity.category}/>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}