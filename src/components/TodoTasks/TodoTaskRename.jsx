import React from "react";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import {useFormik} from "formik";
import {renameTask} from "./model";

const TodoTaskRename = ({showRename, setRenameShow, showTitle, showTaskItem}) => {

    console.log(showTitle);

    const handleClose = () => setRenameShow(false);

    const validate = (values) => {
        const errors = {};
        if (!values.title) {
            errors.title = 'Required';
        } else if (values.title.length > 100) {
            errors.title = 'Must be 100 characters or less';
        }
        return errors;
    };

    const renameFolderForm = useFormik({
        initialValues: {
            title: showTitle,
        },
        enableReinitialize: true,
        validate,
        onSubmit: (values) => {
            setRenameShow(false);
            renameTask({values, showTaskItem}).then();
        },
    });

    return (
        <Modal show={showRename} onHide={handleClose}>
            <form name="rename folder" onSubmit={renameFolderForm.handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Rename Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon3">
                                Task title
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="basic-url" name="title" aria-describedby="basic-addon3"
                                     value={renameFolderForm.values.title}
                                     onChange={renameFolderForm.handleChange}
                                     isInvalid={renameFolderForm.touched && renameFolderForm.errors.title}
                                     isValid={renameFolderForm.touched && renameFolderForm.values.title.length > 0 && !renameFolderForm.errors.title}
                                     onBlur={renameFolderForm.setTouched}/>
                        <FormControl.Feedback type="invalid">
                            {renameFolderForm.errors.title}
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

export default TodoTaskRename;