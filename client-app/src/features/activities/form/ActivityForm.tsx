import { observer } from "mobx-react-lite";
import React, {ChangeEvent, useEffect, useState} from "react";
import {Link, useNavigate, useParams } from "react-router-dom";
import {Button, Form, Segment } from "semantic-ui-react";
import LoadingIndicator from "../../../app/layout/LoadingIndicator";
import { Activity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from "uuid";

export default observer(function ActivityForm(){
    const {activityStore} = useStore();
    const {loading, createActivity, editActivity, loadActivity, loadingInitial} = activityStore;
    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        description: '',
        date: '',
        category: '',
        city: '',
        venue: ''
    });
    const {id} = useParams();
    const navigate = useNavigate();
    const handleSubmit = () => {
        if (!activity.id){
            activity.id = uuid();
            createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }else {
            editActivity(activity).then(() => navigate(`/activities/${activity.id}`));
        }
    }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value})
    }
    
    useEffect(() => {
        if (id) loadActivity(id).then(activity =>  {
            setActivity(activity!);
        });
    }, [id, loadActivity])
    
    if (loadingInitial) return <LoadingIndicator content='Loading activity...' /> 
    
    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' name='title' value={activity.title} onChange={handleInputChange}/>
                <Form.TextArea placeholder='Description' name='description' value={activity.description} onChange={handleInputChange}/>
                <Form.Input placeholder='Category' name='category' value={activity.category} onChange={handleInputChange}/>
                <Form.Input placeholder='Date' type='date' name='date' value={activity.date} onChange={handleInputChange}/>
                <Form.Input placeholder='City' name='city' value={activity.city} onChange={handleInputChange}/>
                <Form.Input placeholder='Venue' name='venue' value={activity.venue} onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel'/>
            </Form>
        </Segment>
    )
});