import React, {useEffect, useState} from "react";
import {Col} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faFolder, faTrash} from "@fortawesome/free-solid-svg-icons";
import {
    $input,
    delFolder,
    getFolders,
    getTasks,
    onTextChanged, selectedFolder,
    setFolder,
    somethingAdded
} from "./model";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import {useStore} from "effector-react";
import {$folders} from "../../effector/model";

const TodoFolders = () => {

    const input = useStore($input);
    const folders = useStore($folders);


    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        somethingAdded();
    };
    const handleSave = () => {
        setShow(false);
        setFolder(input);
        somethingAdded();
    };
    const handleShow = () => setShow(true);

    useEffect(() => {
        getFolders()
    }, []);

    return (
        <Col md={4} className="mb-2">
            <Card>
                <Card.Body>
                    <Button variant="primary" size="xs" block onClick={handleShow}>Add Folder</Button>
                </Card.Body>
                <ListGroup variant="flush" className="folders">
                    <ListGroup.Item action href="#link1">
                        <FontAwesomeIcon icon={faEnvelope} size="xs" className="mr-1"/>All</ListGroup.Item>
                    {folders.map(item => {
                        return (
                            <ListGroup.Item action key={item.id} href={`#${item.id}`} onClick={() => {getTasks(item.id); selectedFolder(item.id)}}>
                                <FontAwesomeIcon icon={faFolder} size="xs" className="mr-1"/>
                                {item.title}
                                <FontAwesomeIcon icon={faTrash} onClick={() => delFolder(item.id)} size="sm" className="float-right"/>
                            </ListGroup.Item>
                            )
                    })}
                </ListGroup>
            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon3">
                                Folder title
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" aria-describedby="basic-addon3"
                                     value={input} onChange={onTextChanged}/>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
};

export default TodoFolders;