import { Navbar, Container, Row, Col } from 'react-bootstrap';
import classes from './Admin.module.css';
import Sidebar from '../Sidebar/Sidebar'
import { useState } from 'react';
import AddAccess from '../AddAccess/AddAccess';
import { Redirect } from 'react-router';
import AddProduct from '../AddProduct/AddProduct';
import EditCoupons from '../EditCoupons/EditCoupons';
import EditCategories from '../EditCategories/EditCategories';
import BrandNameEdit from '../BrandNameEdit/BrandNameEdit';
import EditProduct from '../EditProduct/EditProduct';
import EditAccess from '../EditAccesoriesHandler/EditAccess';
import UserOrderTracker from '../UserOrderTracker/UserOrderTracker';
import OrderStatusUpdate from '../OrderStatusUpdate/OrderStatusUpdate';
import OrderReceived from '../OrderReceived/OrderReceived';
// import SubAdmin from '../SubAdmin/SubAdmin';
import RemoveProduct from '../RemoveProduct/RemoveProduct';
import { useCookies } from 'react-cookie';
import Statics from '../Statics/Statics';
import { useEffect } from 'react';


const Admin = ({ secured, changeSecured , user}) => {
    
    const [currentFunc, changeCurrentFunc] = useState('chart');
    const [cookies, setCookies, removeCookies] = useCookies(['sub'])
    const logoutHandler = () => {
        console.log('clicked')
        removeCookies('sub');
        changeSecured(false)
    }
    if(!secured){
        return <Redirect to='/login'></Redirect>
    } else {
        return (
    <div>
    <Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">
            CycleHub  SubAdmin
        </Navbar.Brand>
        <Navbar.Brand className={'justify-content-end'}>
            <span onClick={logoutHandler} className={classes.logoutSpan}>LogOut</span>
        </Navbar.Brand>
        </Container>
    </Navbar>
    <div>
        <Row className={ 'sidebarDiv' }>
            <Col xs={ 3 } className={'sidebar'}>
                <Sidebar changeCurrentFunc = { changeCurrentFunc } user={user}></Sidebar>
            </Col>
                <Col xs={9} className={'mainBar'}>
                {currentFunc === 'removeProduct' && <RemoveProduct user={user}></RemoveProduct>}        
                {currentFunc === 'chart' && <Statics user={ user } ></Statics>}        
                { currentFunc === 'addAccess' && <AddAccess user={ user } ></AddAccess> }
                { currentFunc === 'addProduct' && <AddProduct user={ user } ></AddProduct>}
                { currentFunc === 'couponEdit' && <EditCoupons user={ user } ></EditCoupons> }
                { currentFunc === 'categoryEdit' &&  <EditCategories user={ user } ></EditCategories>}
                { currentFunc === 'brandNameEdit' && <BrandNameEdit user={ user } ></BrandNameEdit>}
                { currentFunc === 'accessCategoryEdit'&&<EditAccess user={ user } ></EditAccess>}      
                { currentFunc === 'editProduct' && <EditProduct user={ user } ></EditProduct>}
                { currentFunc === 'editAccess' && <EditAccess user={ user } ></EditAccess>}
                { currentFunc === 'userOrderTracker' && <UserOrderTracker user={ user } ></UserOrderTracker>}
                { currentFunc === 'orderReceieved' && <OrderReceived user={ user } ></OrderReceived>}
                { currentFunc === 'orderStatusUpdate' && <OrderStatusUpdate user={ user } ></OrderStatusUpdate>}        
            </Col>
        </Row>
    </div>        
    </div>
    )   
    }
}

export default Admin