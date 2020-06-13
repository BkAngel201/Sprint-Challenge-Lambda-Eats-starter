import React, { useState, useEffect } from "react";
import styled from "styled-components"
import Header from "./Header"
import * as yup from "yup"
import axios from "axios"

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 700px;
    margin: auto;
`

const FormTitle = styled.h3`
    text-align: center;
`

const FormImg = styled.img`
    width: 100%;
    height: auto;
    margin-bottom: 15px;
`

const FormSectionTitle = styled.div`
    background-color: lightgrey;
    padding: 15px 20px;
    border: 1px solid black;
    border-top: 0;
    border-bottom: 0;
    & h4 {
        margin-top: 0px;
        padding: 0;
        margin-bottom: 3px;
    }
    & span {
        display: flex;
    }
`

const FormSection = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border: 1px solid black;
    border-top: 0;
    border-bottom: 0;
    padding: 20px;
    & select {
        width: 200px;
    }
    & .radio-button {
        width: 100%;
    }
    & .checkbox {
        width: 50%;
    }
    & textarea {
        width: 100%;
    }
    & input[type="text"] {
        width: 100%;
    }
    &.last-one {
        border-bottom: 1px solid black;
        margin-bottom: 20px;
    }
`
const Error = styled.p`
    color: red;`

const FormButton = styled.button`
    width: 100%;
    background-color: lightgreen;
    border: 1px solid black;
    padding: 20px;

`

const Pizza = () => {

    const [customPizza, setCustomPizza] = useState({
        name: "",
        size: "small",
        sauce: "original",
        toppings: [],
        instructions: ""
    })
    const [errors, setErrors] = useState({
        name: ""
    })
    const formSchema = yup.object().shape({
        name: yup
            .string()
            .min(2, `The name need to have at least 2 character`)
            .required("This field is required"),
    })

    const [buttonDisabled, setButtonDisabled] = useState(true)

    const [order,setOrder] = useState({})

    const validateChange = e => { 
        yup.reach(formSchema, e.target.name)
        .validate(e.target.value)
        .then(valid => {
            setErrors({
                ...errors,
                [e.target.name]: ""
            })
        })
        .catch(error => {
            setErrors({
                ...errors,
                [e.target.name]: error.errors[0]
            })
        })
    }

    const handleChange = (e) => {
        e.persist()
        let newFormValues = {}
        if(e.target.type === "checkbox"){
           let newToppings = [];
           if(!customPizza.toppings.includes(e.target.value)) {
               newToppings=[...customPizza.toppings, e.target.value]
           } else {
               newToppings = customPizza.toppings.filter(el => el !== e.target.value)
           }
            newFormValues = {
                ...customPizza,
                toppings: newToppings,
            }
        } else {
            newFormValues = {
                ...customPizza,
                [e.target.name]: e.target.value
            }
        }
        if(e.target.name === "name") {
            validateChange(e)
        }
        setCustomPizza(newFormValues)
    }
    
    const handleSubmit = e => {
        e.preventDefault()
        axios
            .post("https://reqres.in/api/users", customPizza)
            .then(res => {
                setOrder(res.data)
                setCustomPizza({
                    name: "",
                    size: "small",
                    sauce: "original",
                    toppings: [],
                    instructions: ""
                }) 
            })
            .catch(err => console.log(err.response))
    }

    useEffect(() => {
        formSchema.isValid(customPizza).then(isValid => {
            setButtonDisabled(!isValid)
        })
    }, [customPizza, formSchema])


  return (
    <>
      <Header/>
      <Form onSubmit={handleSubmit}>
        <FormTitle>Build Your Own Pizza</FormTitle>
        <FormImg src="https://images.unsplash.com/photo-1565357253897-79d691886a73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
        <FormSectionTitle>
            <h4>Choice of Size</h4>
            <span>Required</span>
        </FormSectionTitle>
        <FormSection>
            <select id="size" name="size" onChange={handleChange}>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
            </select>
        </FormSection>
        <FormSectionTitle>
            <h4>Choice of Sauce</h4>
            <span>Required</span>
        </FormSectionTitle>
        <FormSection>
            <label className="radio-button" htmlFor="original"><input checked type="radio" id="original" name="sauce" value="original" onChange={handleChange} />Original Red</label>
            <label className="radio-button" htmlFor="garlic"><input type="radio" id="garlic" name="sauce" value="garlic" onChange={handleChange} />Garlic Ranch</label>
            <label className="radio-button" htmlFor="bbq"><input type="radio" id="bbq" name="sauce" value="bbq" onChange={handleChange} />BBQ Sauce</label>
            <label className="radio-button" htmlFor="spinach"><input type="radio" id="spinach" name="sauce" value="spinach" onChange={handleChange} />Spinach Alfredo</label>
        </FormSection>
        <FormSectionTitle>
            <h4>Add Toppings</h4>
            <span>Choose up to 4</span>
        </FormSectionTitle>
        <FormSection>
            <label className="checkbox" htmlFor="pepproni"><input type="checkbox" id="pepproni" name="pepproni" value="pepproni" onChange={handleChange} />Pepproni</label>
            <label className="checkbox" htmlFor="sausage"><input type="checkbox" id="sausage" name="sausage" value="sausage" onChange={handleChange} />Sausage</label>
            <label className="checkbox" htmlFor="canadianbacon"><input type="checkbox" id="canadianbacon" name="canadianbacon" onChange={handleChange} value="canadianbacon" />Canadian Bacon</label>
            <label className="checkbox" htmlFor="onion"><input type="checkbox" id="onion" name="onion" value="onion" onChange={handleChange} />Onion</label>
            <label className="checkbox" htmlFor="pinneaple"><input type="checkbox" id="pinneaple" name="pinneaple" value="pinneaple" onChange={handleChange} />Pinneaple</label>
            <label className="checkbox" htmlFor="blackolives"><input type="checkbox" id="blackolives" name="blackolives" value="blackolives" onChange={handleChange} />Black Olives</label>
            <label className="checkbox" htmlFor="dicedtomatoes"><input type="checkbox" id="dicedtomatoes" name="dicedtomatoes" value="dicedtomatoes" onChange={handleChange} />Diced Tomatoes</label>
            <label className="checkbox" htmlFor="extracheese"><input type="checkbox" id="extracheese" name="extracheese" value="extracheese" onChange={handleChange} />Extra Cheese</label>
        </FormSection>
        <FormSectionTitle>
            <h4>Special Instructions</h4>
        </FormSectionTitle>
        <FormSection>
            <textarea name="instructions" id="instructions" onChange={handleChange} value={customPizza.instructions}></textarea>
        </FormSection>
        <FormSectionTitle>
            <h4>Your Name</h4>
        </FormSectionTitle>
        <FormSection>
            <input type="text" name="name" id="name" value={customPizza.name} onChange={handleChange} />
            {errors.name.length > 0 ? <Error>{errors.name}</Error> : null}
        </FormSection>
        <FormSection className="last-one">
            <FormButton type="submit" disabled={buttonDisabled}>Add to Order</FormButton>
        </FormSection>
      </Form>
      <pre>{JSON.stringify(order, null, 2)}</pre>
    </>
  );
};
export default Pizza;