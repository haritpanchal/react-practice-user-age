import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";
import UserList from "./UserList";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUserName] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const addUserHandler = (e) => {
    e.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setModalTitle("Invalid Input");
      setModalMessage(
        "Please enter valid username and age (non empty values)."
      );
      setShowModal(true);
      return;
    }

    if (+enteredAge < 1) {
      setModalTitle("Invalid Input");
      setModalMessage("Please enter valid age ( > 0).");
      setShowModal(true);
      return;
    }

    props.onAddUser(enteredUsername, enteredAge);
    setEnteredUserName("");
    setEnteredAge("");
  };

  const changeUserNameHandler = (event) => {
    setEnteredUserName(event.target.value);
  };

  const changeAgeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const clearModalHandler = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showModal === true && (
        <ErrorModal
          title={modalTitle}
          description={modalMessage}
          onConfirm={clearModalHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={changeUserNameHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            min="0"
            onChange={changeAgeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
