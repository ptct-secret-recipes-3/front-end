import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
//import axios from 'axios'
import * as yup from 'yup';

export default function Register (props) {

  let schema = yup.object().shape({
    username: yup.string().required("username is required").min("username must be at least 7 characters"),
    password: yup.string().required("password is required").min("password must be at least 7 characters"),
    email: yup.string().email("Must be a valid email").required("email is required to register").max(255),
  })
}