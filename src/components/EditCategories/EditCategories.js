import { Form, Button, ButtonGroup, Dropdown, Alert, Spinner } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import classes from './EditCategories.module.css';
import Select from 'react-select';

const EditCategories = () => {

    const [categoryAction, changeCategoryAction] = useState('addCategory');
    const [inputFocus, changeInputFocus] = useState(false);
    const [dataArray, changeDataArray] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [remover, setRemover] = useState('');
    const categoryNameRef = useRef();
    const [category, changeCategory] = useState(false)

    let updatedDataArray = []
    updatedDataArray = dataArray.map((item)=>{
        return {label: item.name, value: item}
    })

    const link = process.env.REACT_APP_FETCH_LINK

    useEffect(() => {
        fetch(`${link}/categoryDisplay`).then((response) => {
            return response.json()
        }).then((response) => {
            console.log(response);
            changeDataArray(response);
        })
    }, [loading])

    const removeHandler = (itemName) => {
        setLoading(true)
        const array = dataArray.filter((item) => {
            return item.name !== itemName.name;
        })
        changeDataArray(array)
        fetch(`${link}/categoryRemove`, {
            headers: {
                name: itemName.name
            }
        }).then((response) => {
            return response.json();
        }).then((response) => {
            setError('removeDone');
            setLoading(false);
        })
    }
    const buttonHandler = (event) => {
        event.preventDefault();
        if (categoryNameRef.current.value === '') {
            setError('categoryName');
            return 
        } else {
            setLoading(true)
            fetch(`${link}/categoryAdd`, {
                headers: {
                    name: categoryNameRef.current.value
                }
            }).then((response) => {
                return response.json();
            }).then((response) => {
                console.log(response)
                setLoading(false)
            })
        }
    }


    return (
        <div>
            <Form>

            <ButtonGroup className={'mt-2'}>
            <Button onClick={()=>{changeCategoryAction('addCategory')}}>Add Category</Button>
            <Button className='ms-3' onClick={()=>{changeCategoryAction('removeCategory')}}>Remove Category</Button>
            </ButtonGroup>
                
            
            {categoryAction === 'addCategory' && <>
            <Form.Group className="m-3" controlId="formBasicEmail">
                <Form.Label>Category Name</Form.Label>
                <Form.Control ref={ categoryNameRef } type="email" placeholder="Enter Category" />
            </Form.Group>
                    
            <Button onClick={buttonHandler} variant="primary" type="submit">
                        {loading && <Spinner animation="border" role="status">
  <span className="visually-hidden">Loading...</span>
</Spinner>} {!loading && 'Submit' }
            </Button>
                    
            { error === 'categoryName' && <div>
                    <Alert variant='danger'>Category Name Cannot Be Empty</Alert>
                    </div>}
            </>
            }

                

            {categoryAction === 'removeCategory' &&
                <div className={'mt-3'}>
                    <Select options={updatedDataArray} onChange={(value)=>{
                     changeCategory(value.value)
                }}></Select>


                {category && <Button className='mt-2' style={{maxWidth: '200px'}} onClick={()=>{
                    removeHandler(category)
                }} variant='danger'>Remove Brand</Button>}
                
                {error === 'removeDone' && <Alert variant='info'>{ 'Successfully Removed' }</Alert>}
                </div>
            }
            
        </Form>
        </div>
    )
}

export default EditCategories