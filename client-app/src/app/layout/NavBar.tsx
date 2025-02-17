import React from "react";
import { NavLink } from "react-router-dom";
import {Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar() {
    const {activityStore} = useStore();
    
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src='/assets/logo.png' style={{marginRight: '10px'}} />
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='Activities'/>
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' content='Create Activity' positive /> 
                </Menu.Item>
            </Container>
        </Menu>
    )
}