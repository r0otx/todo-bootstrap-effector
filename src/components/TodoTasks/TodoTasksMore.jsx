import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {faArrowLeft, faCheck, faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useStore} from "effector-react";
import {$tasks} from "../../effector/model";
import {completedTask} from "./model";

const TodoTasksMore = (props) => {

    const tasks = useStore($tasks);

    return (
        <Card className={`more-info ${props.active ? "active" : ""}`}>
            <Card.Header>
                <FontAwesomeIcon icon={faArrowLeft} size="sm"  className="mr-1" onClick={() => props.setActive(false)}/>{tasks.map(item => item.id === props.id && item.title)}
                <Button className="float-right ml-1" size="sm" variant="outline-dark"><FontAwesomeIcon icon={faTrash} size="sm" /></Button>
                <Button className="float-right ml-1" size="sm" variant="outline-warning"><FontAwesomeIcon icon={faPencilAlt} size="sm" /></Button>
                <Button className="float-right" size="sm" variant="outline-success" onClick={() => completedTask(tasks.find(item => item.id === props.id))}><FontAwesomeIcon icon={faCheck} size="sm" /></Button>
            </Card.Header>
            <Card.Body>
                <Card.Text className="card-text-more">
                    {tasks.map(item => item.id === props.id && item.description)}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default TodoTasksMore;