import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Tick from "../assets/tick-green.svg";
import Delete from "../assets/delete.svg";
import Revert from "../assets/revert.svg";
import Plus from "../assets/plus.svg";
import Pen from "../assets/pencil.svg"

function ToDo() {
    const [tasks, setTasks] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        setItemCount(completed.length + tasks.length);
    }, []);

    const addNewTask = (event) => {
        event.preventDefault();

        let new_task = {
            id: itemCount + 1,
            title: newTask,
        };

        setTasks([...tasks, new_task]);
        setNewTask("");
        setItemCount((prev) => prev + 1);
    };

    const deleteTask = (id) => {
        let new_list = tasks.filter((task) => task.id !== id);
        setTasks(new_list);
    };
    const deleteCompleted = (id) => {
        let new_list = completed.filter((task) => task.id !== id);
        setCompleted(new_list);
    };

    const completeTask = (id) => {
        let current_task = tasks.find((task) => task.id == id);
        setCompleted([...completed, current_task]);

        let new_list = tasks.filter((task) => task.id !== id);
        setTasks(new_list);
    };

    const revertCompleted = (id) => {
        let current_task = completed.find((task) => task.id == id);
        setTasks([...tasks, current_task]);

        let new_list = completed.filter((task) => task.id !== id);
        setCompleted(new_list);
    };
    const editTask = (id) => {
        let current_task = tasks.find((task) => task.id == id);
        setNewTask(current_task.title);

        let new_list = tasks.filter((task) => task.id !== id);
        setTasks(new_list);

        setItemCount((prev) => prev - 1);

    }

    const renderTasks = () => {
        return tasks.map((task) => (
            <ListItem>
                <LeftContainer onClick={() => completeTask(task.id)}>
                    <CheckContainer></CheckContainer>
                    <ItemContent>
                        {task.id}, {task.title}
                    </ItemContent>
                </LeftContainer>
                <RightContainer>
                    <ActionButton onClick={()=> editTask(task.id)}>
                        <ButtonImage src={Pen} alt="Revert" />
                    </ActionButton>
                    <ActionButton onClick={() => deleteTask(task.id)}>
                        <ButtonImage src={Delete} alt="Delete" />
                    </ActionButton>
                </RightContainer>
            </ListItem>
        ));
    };

    const renderCompleted = () => {
        return completed.map((task) => (
            <ListItem>
                <LeftContainer>
                    <CheckContainerCompleted>
                        <TickImage src={Tick} alt="Tick Image" />
                    </CheckContainerCompleted>
                    <ItemContentCompleted>
                        {task.id}, {task.title}
                    </ItemContentCompleted>
                </LeftContainer>
                <RightContainer>
                    <ActionButton onClick={() => revertCompleted(task.id)}>
                        <ButtonImage src={Revert} alt="Revert" />
                    </ActionButton>
                    <ActionButton onClick={() => deleteCompleted(task.id)}>
                        <ButtonImage src={Delete} alt="Delete" />
                    </ActionButton>
                </RightContainer>
            </ListItem>
        ));
    };

    return (
        <Container>
            <Heading>ToDo List</Heading>
            <ToDoContainer>
                <SubHeading>Things to be done</SubHeading>
                <ToDoList>{renderTasks()}</ToDoList>
            </ToDoContainer>
            <NewToDoForm>
                <FormInput
                    placeholder="Type new task..."
                    value={newTask}
                    onChange={(e) => {
                        setNewTask(e.target.value);
                    }}
                />
                <FormSubmitButton
                    onClick={(e) => {
                        addNewTask(e);
                    }}
                >
                    Add New
                </FormSubmitButton>
            </NewToDoForm>
            <ToDoContainer>
                <SubHeading>Completed</SubHeading>
                <ToDoList>{renderCompleted()}</ToDoList>
            </ToDoContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 90%;
    max-width: 1200px;
    padding: 50px 10%;
    border-right: 2px solid #f5f5f5;
    border-left: 2px solid #f5f5f5;
    margin: 0 auto;
    min-height: 100vh;
`;
const Heading = styled.h1`
    font-size: 53px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 40px;
`;
const ToDoContainer = styled.div``;
const SubHeading = styled.h3`
    font-size: 36px;
    color: #050241;
    margin-bottom: 20px;
`;
const ToDoList = styled.ul`
    list-style: none;
`;
const ListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;
const LeftContainer = styled.div`
    display: flex;
    align-items: center;
`;
const CheckContainer = styled.span`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid #050241;
    display: inline-block;
    margin-right: 15px;
    cursor: pointer;
`;
const ItemContent = styled.span`
    font-size: 28px;
`;
const RightContainer = styled.div``;
const ActionButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    margin-right: 20px;
    outline: none;
    &:last-child {
        margin-right: 0;
    }
`;
const ButtonImage = styled.img`
    width: 25px;
    height: 25px;
`;
const TickImage = styled.img``;
const NewToDoForm = styled.form`
    display: flex;
    margin-left: 40px;
    margin-right: 30px;
    position: relative;
    &::before {
        content: "";
        background-image: url(${Plus});
        width: 16px;
        height: 16px;
        display: block;
        position: absolute;
        left: 10px;
        top: 0;
        bottom: 0;
        margin: auto 0;
        z-index: 2;
    }
`;
const FormInput = styled.input`
    display: block;
    width: 100%;
    outline: none;
    border: 1px solid #c6c6c6;
    border-right: none;
    padding: 0 10px 0 35px;
    font-size: 25px;
`;
const FormSubmitButton = styled.button`
    padding: 15px 25px;
    white-space: nowrap;
    border: none;
    background: #050241;
    color: #fff;
    cursor: pointer;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    font-size: 25px;
`;
const CheckContainerCompleted = styled(CheckContainer)`
    display: flex;
    align-items: center;
    justify-content: center;
    border-color: #06c692;
`;
const ItemContentCompleted = styled(ItemContent)`
    color: #06c692;
`;

export default ToDo;
