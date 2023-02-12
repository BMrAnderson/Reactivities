import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface LoadingIndicatorRequestProps {
    inverted?: boolean,
    content?: string
}

export default function LoadingIndicator({inverted = true, content = 'Loading...'}: LoadingIndicatorRequestProps){
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content}/>
        </Dimmer>
    )
}