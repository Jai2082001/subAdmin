import { Form , Button, Modal, Spinner, InputGroup} from 'react-bootstrap'
import { useRef, useState } from 'react';
import classes from './AddSubAdmin.module.css'

const AddSubAdmin = () => {
    const usernameRef = useRef();
    const passwordRef = useRef();
    const phoneNumberRef = useRef();
    const emailRef = useRef();
    const addCycle = useRef();
    const removeCycle = useRef();
    const updateCycle = useRef();
    const addAccess = useRef();
    const updateAccess = useRef();
    const orderList = useRef();
    const userRemoval = useRef();
    const removeAccess = useRef();

    const [loading, changeLoading] = useState(false);
    
    // const validation = ({field, minlength, nature}) => {
    //     let flag = 0
    //     if (field.length === minlength) {
    //         flag++;
    //     }
    //     if (nature !== 'num') {
    //         field.map((item) => {
    //             if()
    //         })
    //     } else {
            
    //     }
    // }

    const buttonHandler = () => {
        changeLoading(true);
        console.log('here');
        fetch('https://cycle-backend-1.herokuapp.com/addSubAdmin', {
            headers: {
                username: usernameRef.current.value,
                password: passwordRef.current.value,
                phoneNumber: phoneNumberRef.current.value,
                email: emailRef.current.value,
                addCycle: addAccess.current.checked,
                removeCycle: removeCycle.current.checked,
                updateCycle: updateCycle.current.checked,
                addAccess: addAccess.current.checked,
                updateAccess: updateAccess.current.checked,
                removeAccess: removeAccess.current.checked,
                orderList: orderList.current.checked,
                userRemoval: userRemoval.current.checked
            }
        }).then((response) => {
            return response.json();
        }).then((resp) => {
            console.log('here')
            changeLoading(false);
        })
    }


    if (loading) {
        return (
            <div>
                <Modal.Dialog>
                    <Modal.Body>
                        <Spinner animation="border" role="status">
                        </Spinner>
                    </Modal.Body>
                </Modal.Dialog>
            </div>
        )
    } else {
        return (
        <div>
            <Form.Group className="mb-3 mt-3">
                <Form.Label>Type in Username</Form.Label>
                <Form.Control type="text" ref={usernameRef} placeholder="Enter Name" />
                </Form.Group>
            <Form.Group className="mb-3 mt-3">
                <Form.Label>Type In Password</Form.Label>
                <Form.Control type="text" ref={passwordRef} placeholder="Enter Password" />
            </Form.Group>
            <Form.Group className="mb-3 mt-3">
                <Form.Label>Enter The Phone Number</Form.Label>
                <Form.Control type="text" ref={phoneNumberRef} placeholder="Enter Phone Number" />
                </Form.Group>
            <Form.Group className="mb-3 mt-3">
                <Form.Label>Enter The Email of the SubAdmin</Form.Label>
                <Form.Control type="text" ref={emailRef} placeholder="Enter Email" />
                </Form.Group>
            <Form.Group>
                    <InputGroup>
                    <div className={classes.checkboxContainer}>
                        <div><input type='checkbox' ref={addCycle}></input><span>Add Cycle</span></div>        
                        <div><input type='checkbox' ref={removeCycle}></input><span>Remove Cycle</span></div>        
                        <div><input type='checkbox' ref={updateCycle}></input><span>Update Cycle</span></div>        
                        <div><input type='checkbox' ref={addAccess}></input><span>Accessories Add</span></div>            
                        <div><input type='checkbox' ref={removeAccess}></input><span>Accessories Remove</span></div>            
                        <div><input type='checkbox' ref={updateAccess}></input><span>Accessories Update</span></div>            
                        <div><input type='checkbox' ref={orderList}></input><span>Order List</span></div>
                        <div><input type='checkbox' ref={userRemoval}></input><span>User Removal</span></div>                
                    </div>
                    </InputGroup>
            </Form.Group>
            <Button onClick={buttonHandler}>Add the SubAdmin</Button>
        </div>
    )
    }
}

export default AddSubAdmin