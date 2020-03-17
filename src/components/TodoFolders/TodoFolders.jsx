import React from "react";
import {Col} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faFolder, faTrash} from "@fortawesome/free-solid-svg-icons";

const TodoFolders = () => {
    return (
        <Col md={4} className="mb-2">
            <Card>
                <Card.Body>
                    <Button variant="primary" size="xs" block>Add Folder</Button>
                </Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item action href="#link1"><FontAwesomeIcon icon={faEnvelope} size="xs"
                                                                          className="mr-1"/>All</ListGroup.Item>
                    <ListGroup.Item action href="#link2"><FontAwesomeIcon icon={faFolder} size="xs"
                                                                          className="mr-1"/>
                        Folder 1
                        <FontAwesomeIcon icon={faTrash} size="sm" className="float-right"/>
                    </ListGroup.Item>
                    <ListGroup.Item action href="#link3">
                        <FontAwesomeIcon icon={faFolder} size="xs" className="mr-1"/>
                        Folder 2
                        <FontAwesomeIcon icon={faTrash} size="sm" className="float-right"/>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    );
};

export default TodoFolders;