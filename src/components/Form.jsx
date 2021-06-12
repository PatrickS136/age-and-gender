import classes from "./Form.module.css"
import {useState,useRef} from "react"

const Form=()=>{
    const [text,setText]=useState("")
    const nameRef=useRef()
    const submitHandler=(event)=>{
        event.preventDefault()
        const name=nameRef.current.value.trim()
        fetch(`https://api.genderize.io?name=${name}`)
        .then(res=>{
            return res.json()
        }).then(results=>{
            setText(`Your name is : ${name}, you are a ${results["gender"]}`)
        }).catch(err=>{console.log(err)})

        fetch(`https://api.agify.io?name=${name}`)
        .then(res=>{
            return res.json()
        }).then(results=>{
            setText(prev=>{
                console.log(prev)
                setText(prev+` and you are ${results["age"]} years old.`)
                nameRef.current.value=""
            })
        }).catch(err=>{
            console.log(err)
        })
    }

    return <div className={classes.form}>
        <h1>Age and gender</h1>
        <form onSubmit={submitHandler}>
            <label htmlFor="name"><strong>name : </strong></label>
            <input id="name" ref={nameRef} type="name" /><br />
            <button>Submit</button>
            <p>{text}</p>
        </form>
    </div>
}

export default Form;