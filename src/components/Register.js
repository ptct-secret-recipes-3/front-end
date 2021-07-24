import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
//import axios from 'axios'
import * as yup from 'yup';
import styled from 'styled-components';

const BigContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: pink;
    width: 20%;
    border-radius: 8px;
    margin: auto;
    margin-top: 5%;
    margin-bottom: 5%;
    border: 4px solid black;
`;

const CreateRegister = styled.h1`
    color: white;
    border: 2px solid black;
    border-radius: 8px;
    background: black;
    font-size: 1.7rem;
    margin-top: 1rem;
    padding: 1rem;
`;

const BlackButton = styled.button`
color: white;
border: 2px solid black;
border-radius: 8px;
background: black;
font-size: 0.7rem;
margin-top: 1rem;
padding: 0.5rem;
margin-bottom: 1rem;
`;

const FormStyling = styled.form`
  display: flex;
    flex-direction: column;
    width: 90%;
`;



export default function RegisterForm (props) {

  let schema = yup.object().shape({
    username: yup.string()
    .required("username is required")
    .min(7,"username must be at least 7 characters"),
    password: yup.string()
    .required("password is required")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must contain 8 characters, One Uppercase, One Lowercase, One Number, and One Special Case Character"),
    email: yup.string()
    .email("Must be a valid email")
    .required("email is required to register").max(255),
  })


  const initialFormData = {
    username: "",
    password: "",
    email: "",
  }

  const initialFormErrors = {
    username: "",
    password: "",
    email: "",
  }

  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState(initialFormErrors)
  const [buttonDisable, setButtonDisable] = useState(true)

  useEffect(() => {
    schema.isValid(formData).then(valid => setButtonDisable(!valid))
  },[formData])

  const setValidationErrors = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => setErrors({...errors, [name]: "" }))
      .catch((err) => setErrors({...errors, [name]: err.errors[0] }))
  }

  const onSubmit = (evt) => {
    evt.preventDefault()
    const newRegister = {
      username: formData.username.trim(),
      password: formData.password,
      email: formData.email,
    }
    console.log(newRegister)
  }

  const onChange = (evt) => {
    const {name, value, type, checked} = evt.target;
    const trueValue = type === "checkbox" ? checked: value;
    setValidationErrors(name, trueValue)
    setFormData({
      ...formData, [name]: trueValue
    })  
  }

  return (
    <form className = "register-form" onSubmit={onSubmit}>
      <div>
        <BigContainer>
          <div className = "errors" style={{color: "red"}}>
            <div>{errors.username}</div>
            <div>{errors.password}</div>
            <div>{errors.email}</div>
          </div>

          <CreateRegister>Sign up for Secret Recipes!</CreateRegister>

          <FormStyling >
            <label /> Username:
              <input type="text" name="username" id="username-input" onChange={onChange} value={formData.username} />
            <br />
            <label /> Password:
              <input type="text" name="password" id="password-input" onChange={onChange} value={formData.password} />
            <br />
            <label /> Email:
              <input type="text" name="email" id="email-input" onChange={onChange} value={formData.email} />
            <br />
            <BlackButton name="submit" disabled={buttonDisable} id="register-button"> Register </BlackButton>
          </FormStyling>

        </BigContainer>
      </div>
    </form>
  )
}
