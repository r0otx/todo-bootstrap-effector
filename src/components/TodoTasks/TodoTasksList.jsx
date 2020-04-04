import React, {useState} from "react";
import {Col} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faEdit, faSearch, faTrash} from "@fortawesome/free-solid-svg-icons";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import TodoTasksMore from "./TodoTasksMore";
import {$tasks} from "../../effector/model";
import {useStore} from "effector-react";
import {delTask, sortDone} from "./model";
import TodoTaskAdd from "./TodoTaskAdd";
import TodoTaskRename from "./TodoTaskRename";

const TodoTasksList = () => {

    const tasks = useStore($tasks);

    const [active, setActive] = useState(false);
    const [id, setId] = useState("");

    const [showRename, setRenameShow] = useState(false);
    const [showTitle, setRenameTitle] = useState("");
    const [showTaskItem, setTaskItem] = useState("");

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);

    const allTasks = tasks.map(item => (
        <ListGroup.Item key={item.id}
                        className="d-flex flex-row align-items-center"
                        variant={item.status === 1 ? "success" : ""}>
            <div className="move">
                <FontAwesomeIcon icon={faBars} size="sm" className="mr-1"/>
            </div>
            <div className="title" onClick={() => {
                setId(item.id);
                setActive(true);
            }}>
                {item.title}
            </div>
            <div className="ml-auto trash">
                <FontAwesomeIcon icon={faEdit} onClick={() => {
                    setRenameShow(true);
                    setRenameTitle(item.title);
                    setTaskItem({listId: item.todoListId, taskId: item.id})}} size="sm"/>
            </div>
            <div className="ml-auto trash">
                <FontAwesomeIcon icon={faTrash}
                                 size="sm"
                                 onClick={() => delTask({listId: item.todoListId, taskId: item.id})}
                />
            </div>
        </ListGroup.Item>
    ));

    return (
        <Col md={8} className="mb-2">
            <Card>
                <Card.Body>
                    <ListGroup horizontal>
                        <DropdownButton variant="outline-primary" id="dropdown-item-button"
                                        title="Filter" className="mr-1">
                            <Dropdown.Item as="button" onClick={() => sortDone()}>Done</Dropdown.Item>
                        </DropdownButton>
                        <Button variant="outline-primary" className="mr-1" onClick={handleShow}>Add</Button>
                        <InputGroup>
                            <FormControl
                                placeholder="Search task"
                                aria-label="Search task"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button variant="outline-secondary">
                                    <FontAwesomeIcon icon={faSearch} size="sm"/>
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </ListGroup>
                </Card.Body>
            </Card>
            <Card className="mt-3">
                <ListGroup variant="flush" className="tasks">
                    {allTasks.length !== 0 ? allTasks : "No tasks"}
                </ListGroup>
            </Card>
            <TodoTasksMore id={id} active={active} setActive={setActive}/>
            <TodoTaskAdd showModal={showModal} setShowModal={setShowModal} />
            <TodoTaskRename showRename={showRename} setRenameShow={setRenameShow} showTitle={showTitle} showTaskItem={showTaskItem} />
        </Col>
    );
};

export default TodoTasksList;