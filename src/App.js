import React from 'react';
import "./App.scss"
import Container from "react-bootstrap/Container";
import {Row} from "react-bootstrap";
import Header from "./components/Header";
import TodoFoldersList from "./components/TodoFolders/TodoFoldersList";
import TodoTasksList from "./components/TodoTasks/TodoTasksList";


const App = () => {
    return (
        <div>
            <Header/>
            <Container className="mt-3">
                <Row>
                    <TodoFoldersList/>
                    <TodoTasksList/>
                </Row>
            </Container>
        </div>
    );
};

export default App;