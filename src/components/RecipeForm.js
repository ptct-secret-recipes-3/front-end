import React, { useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
//import axios from 'axios'
import * as yup from 'yup';
import styled from 'styled-components'

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

const CreateRecipe = styled.h1`
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

export default function Form(props) {


    let schema = yup.object().shape({
        title: yup.string().required('title must be at least 2 characters').min(2, 'title must be at least 2 characters'),
        source: yup.string().required('source must be at least 2 characters').min(2, 'source must be at least 2 characters'),
        ingredients: yup.string().required('ingredients must be at least 2 characters').min(2, 'ingredients must be at least 2 characters'),
        instructions: yup.string().required('instructions must be at least 2 characters').min(2, 'instructions must be at least 2 characters'),
        category: yup.string().required('category must be at least 2 characters').min(2, 'category must be at least 2 characters')
    })

    const initialFormData = {
        title: '',
        source: '',
        ingredients: '',
        instructions: '',
        category: ''
    }

    const defaultErrors = {
        title: '',
        source: '',
        ingredients: '',
        instructions: '',
        category: ''
    }

    const [formData, setFormData] = useState(initialFormData)
    const [errors, setErrors] = useState(defaultErrors)
    const [buttonDisable, setButtonDisable] = useState(true)
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        schema.isValid(formData).then(valid => setButtonDisable(!valid))
    }, [schema, formData])

    const setValidationErrors = (name, value) => {
        yup
            .reach(schema, name)
            .validate(value)
            .then(() => setErrors({ ...errors, [name]: "" }))
            .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const trueValue = type === 'checkbox' ? checked : value;
        setValidationErrors(name, trueValue)
        setFormData({
            ...formData, [name]: trueValue
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newRecipe = {
            title: formData.title.trim(),
            source: formData.source,
            ingredients: formData.ingredients,
            instructions: formData.instructions,
            category: formData.category
        }
        axios.post(`http://locahost:5000/api/recipes`, newRecipe)
            .then(res => setRecipes([...recipes, res.data]))
        setFormData(initialFormData)
        
    }


    return (
        <div>
            <BigContainer className="big-container">
            <CreateRecipe>Create a New Recipe!</CreateRecipe>
            <FormStyling id='recipe-form' onSubmit={handleSubmit}>

                <label /> Recipe Name:
                    <input type="text" name='title' id='title-input' onChange={handleChange} value={formData.title} />
                <br />
                <label /> Source:
                <input type="text" name='source' id='source-input' onChange={handleChange} value={formData.source} />
                <br />
                <label /> Ingredients:
                    <input type="text" name='ingredients' id='ingredients-input' onChange={handleChange} value={formData.ingredients} />
                <br />
                <label /> Instructions:
                    <input type="text" name='instructions' id='instructions-input' onChange={handleChange} value={formData.instructions} />
                <br />
                <label /> Category:
                    <input type="text" name='category' id='category-input' onChange={handleChange} value={formData.category} />
                <br />

                <div style={{ color: "red" }}>
                    <div style={{ color: "red" }}>
                        {errors.title} <br />

                        {errors.source} <br />

                        {errors.ingredients} <br />

                        {errors.instructions} <br />

                    </div>
                </div>
                <BlackButton name='submit' disabled={buttonDisable} id='order-button'> Complete Recipe</BlackButton>
            </FormStyling>
            </BigContainer>
        </div>

    )
}
