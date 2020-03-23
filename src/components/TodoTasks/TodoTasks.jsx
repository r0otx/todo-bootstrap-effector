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
import TodoTasksMore from "./TodoTasksMore";
import Modal from "react-bootstrap/Modal";
import {$tasks} from "../../effector/model";
import {useStore} from "effector-react";
import {delTask, setTask} from "./model";
import {$selectedFolder} from "../TodoFolders/model";
import {useFormik} from "formik";

const TodoTasks = () => {

    const tasks = useStore($tasks);
    const selectedFolder = useStore($selectedFolder);

    const [active, setActive] = useState(false);
    const [id, setId] = useState("");

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);

    const handleShow = () => setShowModal(true);

    const addTaskForm = useFormik({
        initialValues: {
            title: '',
            description: '',
        },
        onSubmit: (values) => {
            setTask({id: selectedFolder, title: values.title, description: values.description});
        },
    });

    return (
        <Col md={8} className="mb-2">
            <Modal show={showModal} onHide={handleClose}>
                <form name="add task" onSubmit={addTaskForm.handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Add task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                Task title
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="title"
                                     type="text"
                                     name="title"
                                     aria-describedby="Enter title task"
                                     value={addTaskForm.values.title}
                                     onChange={addTaskForm.handleChange}/>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Description</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="description"
                                     type="textarea"
                                     name="description"
                                     as="textarea"
                                     aria-label="Enter description task"
                                     value={addTaskForm.values.description}
                                     onChange={addTaskForm.handleChange}/>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Modal.Footer>
                </form>
            </Modal>
            <Card>
                <Card.Body>
                    <ListGroup horizontal>
                        <DropdownButton variant="outline-primary" id="dropdown-item-button" title="Filter"
                                        className="mr-1">
                            <Dropdown.Item as="button">Favourites</Dropdown.Item>
                            <Dropdown.Item as="button">Done</Dropdown.Item>
                            <Dropdown.Item as="button">Deleted</Dropdown.Item>
                        </DropdownButton>
                        <Button variant="outline-primary" className="mr-1" onClick={handleShow}>Add</Button>
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
                <ListGroup variant="flush" className="tasks">
                        {tasks.map(item => (
                            <ListGroup.Item key={item.id}
                                            action
                                            onClick={() => {
                                                setId(item.id);
                                                setActive(true);
                                            }}
                                            variant={item.completed ? "success" : ""}>
                                <FontAwesomeIcon icon={faBars} size="sm" className="mr-1"/>
                                {item.title}
                                <Button className="float-right" variant="outline-danger" onClick={() => delTask({listId: item.todoListId, taskId: item.id})}>
                                    <FontAwesomeIcon icon={faTrash} size="sm" />
                                </Button>
                            </ListGroup.Item>
                        ))}
                </ListGroup>
            </Card>
            <TodoTasksMore id={id} active={active} setActive={setActive}/>
        </Col>
    );
};

export default TodoTasks;