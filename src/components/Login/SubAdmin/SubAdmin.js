import {Form, Button, ButtonGroup} from 'react-bootstrap'
import { useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';

const SubAdmin = ({ changeSecured, changeUser }) => {
    
    const usernameRef = useRef();
    const passwordRef = useRef();
    const [cookies, setCookies, removeCookies] = useCookies(['jwt']);
    const link = process.env.REACT_APP_FETCH_LINK;


    useEffect(() => {
        console.log('hello');
        fetch(`${link}/userSubAdmin`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',      
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response);
            if (response.status === 'loggedIn') {
                changeUser(response.user)
                changeSecured(true);
            }else{
                changeSecured(false)
            }
        })
    }, [])

    const subAdminLoginHandler = (event) => {
        event.preventDefault();
        console.log('here');
        fetch(`${link}/loginSubAdmin`, {
            credentials: 'include',
            headers: {
                username: usernameRef.current.value,
                password: passwordRef.current.value,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response);
            if (response.message === 'done') {
                changeUser(response.user);
                changeSecured(true)                
            }
        })
    }
    return (
        <div>
            <h2>SubAdmin</h2>
             <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter Username</Form.Label>
                    <Form.Control ref={usernameRef} type="text" placeholder="Enter Username" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control ref={passwordRef}  placeholder="Password" />
                </Form.Group>
                <ButtonGroup>
                    <Button variant="primary" type="submit" onClick={subAdminLoginHandler}>
                        Login 
                    </Button>
               </ButtonGroup>
            </Form>
        </div>
    )
}

export default SubAdmin