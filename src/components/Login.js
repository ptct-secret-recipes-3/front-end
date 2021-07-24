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

const CreateLogin = styled.h1`
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

export default function LoginForm (props) {

  let schema = yup.object().shape({
    username: yup.string()
    .required("username is required")
    .min(7,"username must be at least 7 characters"),
    password: yup.string()
    .required("password is required")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must contain 8 characters, One Uppercase, One Lowercase, One Number, and One Special Case Character"),
    confirmPassword: yup.string()
    .required("Please confirm your password")
    .when("password", {
      is: password => (password && password.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref("password")], "Password does not match")
    })
  })

}