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

  const handleChange = (e) => {
    e.preventDefault()
    const newRegister = {
      username: formData.username.trim(),
      password: formData.password,
      email: formData.email,
    }
  }
