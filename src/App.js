import React from 'react';
import "./App.scss"
import Container from "react-bootstrap/Container";
import {Row} from "react-bootstrap";
import Header from "./components/Header";
import TodoFolders from "./components/TodoFolders/TodoFolders";
import TodoTasks from "./components/TodoTasks/TodoTasks";


const App = () => {
    return (
        <div>
            <Header/>
            <Container className="mt-3">
                <Row>
                    <TodoFolders/>
                    <TodoTasks/>
                </Row>
            </Container>
        </div>
    );
};

export default App;
