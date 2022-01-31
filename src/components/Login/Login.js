import classes from './Login.module.css';
import { Form, Button, FormControl, InputGroup, Spinner, Alert, ButtonGroup } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie';
import SubAdmin from './SubAdmin/SubAdmin';


const Login = ({ changeSecured, secured, changeUser}) => {
    
  const link = process.env.REACT_APP_FETCH_LINK

  useEffect(()=>{
    fetch(`${link}/userSubAdmin` , {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response)=>{
      return response.json()
    }).then((response)=>{
      console.log(response);
      if(response.status === 'loggedIn'){
        changeUser(response.user);
        changeSecured(true)
      }else{
        changeSecured(false)
      }
    })
  })

    if (secured) {
        return <Redirect to='/adminPanel'></Redirect>
    }
    return (
    <div className={classes.parentDiv}>
        <SubAdmin changeSecured={changeSecured} changeUser={changeUser} ></SubAdmin>
    </div>
    )
  }

export default Login