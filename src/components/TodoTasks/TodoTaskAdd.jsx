import React from "react";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import {useFormik} from "formik";
import {setTask} from "./model";
import {useStore} from "effector-react";
import {$selectedFolder} from "../TodoFolders/model";

const TodoTaskAdd = ({showModal, setShowModal}) => {

    const selectedFolder = useStore($selectedFolder);
    const handleClose = () => setShowModal(false);

    const validate = (values) => {
        const errors = {};
        if (!values.title) {
            errors.title = 'Required';
        } else if (values.title.length > 100) {
            errors.title = 'Must be 100 characters or less';
        }
        return errors;
    };

    const addTaskForm = useFormik({
        initialValues: {
            title: "",
            description: "",
        },
        validate,
        onSubmit: (values) => {
            setTask({id: selectedFolder, title: values.title, description: values.description});
            setShowModal(false);
        },
    });

    return (
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
                                     onBlur={addTaskForm.setTouched}
                                     isInvalid={addTaskForm.touched && addTaskForm.errors.title}
                                     isValid={addTaskForm.touched && addTaskForm.values.title.length > 0 && !addTaskForm.errors.title}
                                     aria-describedby="Enter title task"
                                     value={addTaskForm.values.title}
                                     onChange={addTaskForm.handleChange}/>
                        <FormControl.Feedback type="invalid">
                            {addTaskForm.errors.title}
                        </FormControl.Feedback>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text>Description</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="description"
                                     type="textarea"
                                     name="description"
                                     as="textarea"
                                     required
                                     aria-label="Enter description task"
                                     value={addTaskForm.values.description}
                                     onChange={addTaskForm.handleChange}/>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <ButtonGroup>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </ButtonGroup>
                </Modal.Footer>
            </form>
        </Modal>
    );
};

export default TodoTaskAdd;
