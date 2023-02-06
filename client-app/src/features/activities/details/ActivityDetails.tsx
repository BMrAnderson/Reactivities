import React from "react";
import {Button, Card, Icon, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";

interface ActivityDetailsRequestProps {
    activity: Activity
    onActivitySelectCancel : () => void,
    onFormOpen: (id: string) => void
}

export default function ActivityDetails({activity, onActivitySelectCancel, onFormOpen}: ActivityDetailsRequestProps){
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => onFormOpen(activity.id)} basic color='blue' content='Edit' />
                    <Button onClick={onActivitySelectCancel} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}