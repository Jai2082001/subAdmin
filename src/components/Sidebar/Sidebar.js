import classes from './Sidebar.module.css'
import { Button } from 'react-bootstrap'


const Sidebar = ({ changeCurrentFunc, user }) => {
    
    const addAccessoriesHandler = (event) => {
        console.log(event.target.id)
        changeCurrentFunc(event.target.id);
    }

    const validatingboolean = (string) => {
        return string === 'true'
    }


    // console.log(validatingboolean(user.addaccess));

    console.log(user)
    
        return (
        <div className={ classes.sidebarDiv }>
            <Button id='addProduct' onClick={addAccessoriesHandler}  disabled={!validatingboolean(user.productedit)}>Add Products</Button>
            <Button id='brandNameEdit' onClick={addAccessoriesHandler} disabled={!validatingboolean(user.brandedit)}>Edit Brands</Button>
            <Button id='removeProduct' onClick={addAccessoriesHandler} disabled={!validatingboolean(user.removeedit)}>Remove Products</Button>
        </div>
    )
}

export default Sidebar

 {/* <Button id='categoryEdit' onClick={addAccessoriesHandler} disabled={!validatingboolean(user.categoryedit)}>Edit Category</Button> */}
            {/* <Button id='couponEdit' onClick={addAccessoriesHandler} disabled={!validatingboolean(user.couponedit)}>Edit Coupons</Button> */}
// {/* <Button id='subAdmin' onClick={ addAccessoriesHandler } disabled={validatingboolean(user.)}>Sub Admin Edit</Button> */}
// <Button id='addAccess' onClick={addAccessoriesHandler}  disabled={!validatingboolean(user.addaccess)} >Add Accessories</Button>
// <Button id='editAccess' onClick={addAccessoriesHandler} disabled={!validatingboolean(user.updateaccess)}  >Edit Accessories</Button>
// <Button id='addProduct' onClick={addAccessoriesHandler} disabled={!validatingboolean(user.addcycle)} >Add Cycles</Button>
// <Button id='editProduct' onClick={addAccessoriesHandler} disabled={!validatingboolean(user.updatecycle)} >Edit Cycles</Button>
// <Button id='couponEdit' onClick={addAccessoriesHandler} disabled={!validatingboolean(user.updatecoupon)} >Edit Coupons</Button>
{/* <Button id='accessCategoryEdit' onClick={addAccessoriesHandler} disabled={!validatingboolean(user.addaccess)} >Accessories Category Edit</Button> */}
{/* <Button id='categoryEdit' onClick={addAccessoriesHandler} disabled={!validatingboolean(user.)} >Cycle Category Edit</Button> */}
{/* <Button id='brandNameEdit' onClick={ addAccessoriesHandler } disabled={!validatingboolean(user.addaccess)} >Brand Name Edit</Button> */}
{/* <Button id='orderTracker' onClick={addAccessoriesHandler} disabled={!validatingboolean(user.orderlist)} >Order Tracker</Button> */}
{/* <Button id='userData' onClick={addAccessoriesHandler} disabled={!validatingboolean(user.addaccess)} >User Database</Button> */}
{/* <Button id='userOrderTracker' onClick={addAccessoriesHandler} disabled={!validatingboolean(user.addaccess)} >User Order Tracker</Button> */}
{/* <Button id='orderReceieved' onClick={addAccessoriesHandler} disabled={!validatingboolean(user.addaccess)} >Order Received</Button> */}
{/* <Button id='orderStatusUpdate' onClick={addAccessoriesHandler} disabled={!validatingboolean(user.addaccess)} >Order Status Updation</Button> */}