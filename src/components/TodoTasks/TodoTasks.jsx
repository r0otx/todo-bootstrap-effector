import React, {useState} from "react";
import {Col} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import {ReactSortable} from "react-sortablejs";
import TodoTasksMore from "./TodoTasksMore";

const TodoTasks = () => {

    const [state, setState] = useState([
        {id: 1, name: "Buy new car Mercedes", description: "Lorem ipsum huipsum pidripsum lorem ipsum huipsum pidripsum lorem ipsum huipsum pidripsum lorem ipsum huipsum pidripsum lorem ipsum huipsum pidripsum lorem ipsum huipsum pidripsum"},
        {id: 2, name: "Search my first high paid job", description: "Lorem ipsum huipsum pidripsum lorem ipsum huipsum pidripsum lorem ipsum huipsum pidripsum lorem ipsum huipsum pidripsum lorem ipsum huipsum pidripsum lorem ipsum huipsum pidripsum"},
        {id: 3, name: "Send dick pic mail to my ex-wife", description: "Lorem ipsum huipsum pidripsum lorem ipsum huipsum pidripsum lorem ipsum huipsum pidripsum lorem ipsum huipsum pidripsum lorem ipsum huipsum pidripsum lorem ipsum huipsum pidripsum"}
        ]);

    const [show, setShow] = useState(false);
    const [id, setId] = useState();

    return (
        <Col md={8} className="mb-2">
            <Card>
                <Card.Body>
                    <ListGroup horizontal>
                        <DropdownButton variant="outline-primary" id="dropdown-item-button" title="Filter"
                                        className="mr-1">
                            <Dropdown.Item as="button">Favourites</Dropdown.Item>
                            <Dropdown.Item as="button">Done</Dropdown.Item>
                            <Dropdown.Item as="button">Deleted</Dropdown.Item>
                        </DropdownButton>
                        <Button variant="outline-primary" className="mr-1">Add</Button>
                        <InputGroup>
                            <FormControl
                                placeholder="Search task"
                                aria-label="Search task"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button variant="outline-secondary"><FontAwesomeIcon icon={faSearch}
                                                                                     size="sm"/></Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </ListGroup>
                </Card.Body>
            </Card>
            <Card className="mt-3">
                <ListGroup variant="flush">
                    <ReactSortable list={state} setList={setState} animation={300} handle={"svg"}>
                        {state.map(item => (
                            <ListGroup.Item key={item.id}
                                            action
                                            onClick={() => setId([item.id]) & setShow(true)}
                                            variant="success">
                                <FontAwesomeIcon icon={faBars} size="sm" className="mr-1"/>
                                {item.name}
                                <FontAwesomeIcon icon={faTrash} size="sm" className="float-right"/>
                            </ListGroup.Item>
                        ))}
                    </ReactSortable>
                </ListGroup>
            </Card>
            {show ? <TodoTasksMore setShow={setShow} state={state} id={id} /> : null}
        </Col>
    );
};

export default TodoTasks;