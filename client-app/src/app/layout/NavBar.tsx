import React from "react";
import {Button, Container, Menu } from "semantic-ui-react";

interface NavBarRequestProps {
    onFormOpen: () => void
}

export default function NavBar({onFormOpen}: NavBarRequestProps) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src='/assets/logo.png' style={{marginRight: '10px'}} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities'/>
                <Menu.Item>
                    <Button onClick={onFormOpen} content='Create Activity' positive /> 
                </Menu.Item>
            </Container>
        </Menu>
    )
}