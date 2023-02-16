import {Button, Icon, Item, Label, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import React, {SyntheticEvent, useState} from "react";
import { Activity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/store";

interface ActivityListItemAttributes {
    activity: Activity
}

export default function ActivityListItem({activity}:ActivityListItemAttributes){
    const {activityStore} = useStore();
    const {loading, deleteActivity} = activityStore;
    const [target, setTarget] = useState('');
    const handleActivityDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(e.currentTarget.id);
        deleteActivity(id);
    }
    
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' src='/assets/user.png' circular />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Hosted by Brendon Anderson</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock'/> {activity.date}
                    <Icon name='marker' /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
            <Segment clearing>
                {activity.description}
                <Button as={Link} to={`/activities/${activity.id}`} color={'teal'} floated='right' content='View'/>
            </Segment>
        </Segment.Group>
    );
}