import React from "react";
import {Grid, List} from "semantic-ui-react";
import { Activities, Activity } from "../../../app/models/Activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface ActivityDashboardRequestProps {
    activities: Activity[],
    selectedActivity: Activity | undefined,
    onActivitySelect: (id: string) => void,
    onActivitySelectCancel: () => void,
    onFormOpen: (id : string) => void,
    onFormClose: () => void,
    onCreateOrEditActivity: (activity: Activity) => void,
    onDeleteActivity: (id: string) => void,
    editMode: boolean
}

export default function ActivityDashboard({activities, 
                                           selectedActivity, 
                                           onActivitySelect, 
                                           onActivitySelectCancel,
                                           onFormOpen, 
                                           onFormClose, 
                                           onCreateOrEditActivity,
                                           onDeleteActivity,
                                           editMode}: ActivityDashboardRequestProps) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList activities={activities} 
                              onActivitySelect={onActivitySelect} 
                              onActivityDelete={onDeleteActivity}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity 
                    && !editMode
                    && <ActivityDetails activity={selectedActivity} 
                                        onActivitySelectCancel={onActivitySelectCancel}
                                        onFormOpen={onFormOpen}/>}
                
                {editMode 
                    && <ActivityForm activity={selectedActivity}
                                     onFormClose={onFormClose}
                                     onCreateOrEditActivity={onCreateOrEditActivity}/>}
            </Grid.Column>
        </Grid>
    )
}