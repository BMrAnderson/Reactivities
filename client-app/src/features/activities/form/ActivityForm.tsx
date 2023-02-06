import React from "react";
import {Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";

interface ActivityFormRequestProps {
    activity : Activity | undefined,
    onFormClose: () => void
}

export default function ActivityForm({activity, onFormClose}: ActivityFormRequestProps){
    return (
        <Segment clearing>
            <Form>
                <Form.Input placeholder='Title'/>
                <Form.TextArea placeholder='Description' />
                <Form.Input placeholder='Category' />
                <Form.Input placeholder='Date' />
                <Form.Input placeholder='City' />
                <Form.Input placeholder='Venue' />
                <Button floated='right' positive type='submit' content='Submit'/>
                <Button onClick={onFormClose} floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
}