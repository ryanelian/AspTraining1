import { faChevronUp, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const SubmitButton: React.FunctionComponent<{
    busy: boolean
}> = (props) => {

    let icon = faChevronUp;
    let pulse = false;
    if (props.busy) {
        icon = faSpinner;
        pulse = true;
    }

    return (
        <button type="submit" className="btn btn-primary">
            <FontAwesomeIcon icon={icon} pulse={pulse}></FontAwesomeIcon>
            <span className="ms-2">Submit</span>
        </button>
    );
};
