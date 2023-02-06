import React, {Fragment, useEffect, useState} from 'react';
import logo from './logo.svg';
import './styles.css';
import axios from 'axios';
import {Button, Container, Header, List } from 'semantic-ui-react';
import {Activities, Activity } from '../models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';


const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  
  const handleSelectActivity = (id: string) => setSelectedActivity(activities.find(a => a.id === id));
  const handleCancelSelectActivity = () => setSelectedActivity(undefined);
  const handleOpenForm = (id? : string) => {
      id ? handleSelectActivity(id) : handleCancelSelectActivity();
      setEditMode(true);
  }
  const handleFormClose = () => setEditMode(false);
    
  useEffect(() => {
    axios.get<Activities>("http://localhost:5000/api/Activities")
        .then((response) => {
          setActivities(response.data.activities);
        });
  }, []);
  
  return (
    <Fragment>
        <NavBar onFormOpen={handleOpenForm}/>
        <Container style={{marginTop: '7em'}}>
            <ActivityDashboard activities={activities}
                               selectedActivity={selectedActivity}
                               onActivitySelect={handleSelectActivity}
                               onActivitySelectCancel={handleCancelSelectActivity}
                               onFormOpen={handleOpenForm}
                               onFormClose={handleFormClose}
                               editMode={editMode}
            />
        </Container>
    </Fragment>
  );
}

export default App;
