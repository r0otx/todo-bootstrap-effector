import React from "react";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import {useFormik} from "formik";
import {setFolder} from "./model";

const TodoFolderAdd = ({show, setShow}) => {

    const handleClose = () => setShow(false);

    const validate = (values) => {
        const errors = {};
        if (!values.title) {
            errors.title = 'Required';
        } else if (values.title.length > 100) {
            errors.title = 'Must be 100 characters or less';
        }
        return errors;
    };

    const addFolderForm = useFormik({
        initialValues: {
            title: "",
        },
        validate,
        onSubmit: (values) => {
            setFolder(values.title);
            setShow(false);
        },
    });

    return (
        <Modal show={show} onHide={handleClose}>
            <form name="add folder" onSubmit={addFolderForm.handleSubmit}>
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
                        <FormControl id="basic-url" name="title" aria-describedby="basic-addon3"
                                     value={addFolderForm.values.title}
                                     onChange={addFolderForm.handleChange}
                                     isInvalid={addFolderForm.touched && addFolderForm.errors.title}
                                     isValid={addFolderForm.touched && addFolderForm.values.title.length > 0 && !addFolderForm.errors.title}
                                     onBlur={addFolderForm.setTouched}/>
                        <FormControl.Feedback type="invalid">
                            {addFolderForm.errors.title}
                        </FormControl.Feedback>
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

export default TodoFolderAdd;