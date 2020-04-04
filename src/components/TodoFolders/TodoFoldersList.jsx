import React, {useEffect, useState} from "react";
import {Col} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faFolder, faTrash} from "@fortawesome/free-solid-svg-icons";
import {delFolder, getFolders, selectedFolder} from "./model";
import {useStore} from "effector-react";
import {$folders} from "../../effector/model";
import Preloader from "../common/Preloader";
import {getTasks} from "../TodoTasks/model";
import TodoFolderAdd from "./TodoFolderAdd";
import TodoFolderRename from "./TodoFolderRename";

const TodoFoldersList = () => {

    const folders = useStore($folders);

    const [showRename, setRenameShow] = useState(false);
    const [showTitle, setRenameTitle] = useState("");

    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(true);
    };

    useEffect(() => {
        getFolders(null).then((response) => getTasks(response.data[0].id));
    }, []);

    const allFolders = folders.map(item => {
        return (
            <ListGroup.Item className="d-flex flex-row align-items-center" key={item.id} href={`#${item.id}`}
                            onClick={() => {
                                getTasks(item.id).then();
                                selectedFolder(item.id);
                            }}>
                <div>
                    <FontAwesomeIcon icon={faFolder} size="xs" className="mr-1"/>
                </div>
                <div className="title">
                    {item.title}
                </div>
                <div className="ml-auto trash">
                    <FontAwesomeIcon icon={faEdit} onClick={() => {setRenameShow(true); setRenameTitle(item.title)}} size="sm"/>
                </div>
                <div className="ml-auto trash">
                    <FontAwesomeIcon icon={faTrash} onClick={() => delFolder(item.id)} size="sm"/>
                </div>
            </ListGroup.Item>
        )
    });

    if (folders.length === 0) {
        return (
            <Col md={4}>
                <Preloader/>
            </Col>
        );
    }

    return (
        <Col md={4} className="mb-2">
            <Card>
                <Card.Body>
                    <Button variant="primary" size="xs" block onClick={handleShow}>Add Folder</Button>
                </Card.Body>
                <ListGroup variant="flush" className="folders">
                    {allFolders.length !== 0 ? allFolders : "No folders"}
                </ListGroup>
            </Card>
            <TodoFolderAdd show={show} setShow={setShow} />
            <TodoFolderRename showRename={showRename} setRenameShow={setRenameShow} showTitle={showTitle} />
        </Col>
    );
};

export default TodoFoldersList;