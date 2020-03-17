import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const TodoTasksMore = (props) => {
    return (
        <Card className="more-info active">
            <Card.Header>
                <FontAwesomeIcon icon={faArrowLeft} size="sm"  className="mr-1" onClick={() => props.setShow(false)}/>{props.state[props.id - 1].name}
                <Button className="float-right ml-1" size="sm" variant="outline-dark">Del</Button>
                <Button className="float-right ml-1" size="sm" variant="outline-warning">Edit</Button>
                <Button className="float-right" size="sm" variant="outline-success">Complete</Button>
            </Card.Header>
            <Card.Body>
                <Card.Text className="card-text-more">
                    {props.state[props.id - 1].description}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default TodoTasksMore;