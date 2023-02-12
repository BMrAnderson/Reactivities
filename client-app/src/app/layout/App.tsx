import React, {Fragment, useEffect, useState} from 'react';
import logo from './logo.svg';
import './styles.css';
import axios from 'axios';
import {Button, Container, Header, List } from 'semantic-ui-react';
import {Activities, Activity } from '../models/Activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingIndicator from './LoadingIndicator';
import ActivityApiService from '../api/activityApiService';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';


const App = () => {
  const {activityStore} = useStore();
  
    
  useEffect(() => {
      activityStore.loadActivities();
  }, [activityStore]);
  
  return (activityStore.loadingInitial) ? (<LoadingIndicator content='Loading app...'/>) :
      (<Fragment>
            <NavBar />
            <Container style={{marginTop: '7em'}}>
                <ActivityDashboard  />
            </Container>
        </Fragment>
      );
}

export default observer(App);
