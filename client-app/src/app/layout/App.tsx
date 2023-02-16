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
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';


const App = () => {
   const location = useLocation(); 
   
   return (
       <Fragment>
           {location.pathname === '/' ? <HomePage /> : (
               <Fragment>
                   <NavBar />
                   <Container style={{marginTop: '7em'}}>
                       <Outlet />
                   </Container>
               </Fragment>
           )}
       </Fragment>
   );
}

export default observer(App);
