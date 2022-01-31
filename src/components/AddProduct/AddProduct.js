import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useRef, useState, useEffect } from 'react';
import Select from 'react-select';


const AddProduct = ({user}) => {
    const nameRef = useRef();
    const priceRef = useRef();
    const descRef = useRef();
    const overPriceRef = useRef();
    const frontRef = useRef();
    const rearRef = useRef();
    const frameRef = useRef();
    const gearRef = useRef();
    const brakeRef = useRef();
    const tireRef = useRef();
    const weightRef = useRef();
    const inputRef = useRef();
    const suspensionRef = useRef();
    const dispalyImageRef = useRef();
    const descPoint1 = useRef();
    const descPoint2 = useRef();
    const descPoint3 = useRef();
    const descPoint4 = useRef()
    const quantity = useRef()
    let array = [];

    const [loading, changeLoading] = useState(false);
    const [brand, changeBrand] = useState([]);
    const [quantityState, changeQuantityState] = useState(false);
    const [category, changeCategory] = useState([]);
    const [product, changeProduct] = useState({});
    const [coupon, changeCoupon] = useState([]);
    const [added, setAdded] = useState(false);
    const [categories, changeCategoryType] = useState(false);
    const [parentCategory, changeParentCategory] = useState([]);
    const [brandType, changeBrandType] = useState(false);
    const [userType, changeUser] = useState(false);
    const [productType, changeProductType] = useState(false);
    const [parentProductType, changeParentProductType] = useState([]);
    let data = {};
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_FETCH_LINK}/brandDisplaySub`, {
            headers: {
                subid: user._id
            }
        }).then((response) => {
            return response.json();
        }).then((response) => {
            const array = response.map((item) => {
                return { label: item.subName, value: item }
            })
            console.log(array);
            changeBrand(array);
        })
        fetch(`${process.env.REACT_APP_FETCH_LINK}/categoryDisplay`).then((response) => {
            return response.json();
        }).then((response) => {
            const array = response.map((item) => {
                return { label: item.name, value: item }
            })
            changeParentCategory(response)
        })
        fetch(`${process.env.REACT_APP_FETCH_LINK}/couponDisplay`).then((response) => {
            return response.json();
        }).then((response) => {
            const array = response.map((item) => {
                return { label: item.code, value: item }
            })
            changeCoupon(array)
            fetch(`${process.env.REACT_APP_FETCH_LINK}/displayProductType`).then((response)=>{
                return response.json()
            }).then((response)=>{
                console.log(response);
                changeParentProductType(response)
            })
        })
    }, [])


    let riderOption = [
        { label: 'Backpacks', value: 'Backpacks'}, 
        {label: 'Compression and Inner Wear', value: 'Compression and Inner Wear' },
        { label: 'Eyewear', value: 'Eyewear' },
        {label: 'Face Masks', value: 'Face Masks'},
        { label: 'Footwear', value: 'Footwear' },
        { label: 'Gloves', value: 'Gloves' },
        { label: 'Helmets', value: 'Helmets' },
        { label: 'Jerseys', value: 'Jerseys' },
        { label: 'Recovery and Body Care', value: 'Recovery and Body Care' },
        { label: 'Shorts', value: 'Shorts' },
        {label: 'T-Shirts', value: 'T-Shirts'}
    ]
    let cycleOptions = [
        { label: 'Bags and Car Racks', value: 'Bags and Car Racks' },
        { label: 'Bells and Horns', value: 'Bells and Horns' },
        { label: 'Bottles and Bottle Cages', value: 'Bottles and Bottle Cages' },
        { label: 'Components and Spares', value: 'Components and Spares' },
        { label: 'GPS and Cyclocomputers', value: 'GPS and Cyclocomputers' },
        { label: "Lights", value: 'Lights' },
        { label: "Locks", value: "Locks" },
        { label: "Maintenance and Care", value: 'Maintenance and Care' },
        { label: "Mudguards and Protection", value: "Mudguards and Protection" },
        { label: 'Others', value: 'Other' },
        { label: 'Pumps', value: 'Pumps' },
        { label: 'Stands', value: 'Stands' },
        { label: 'Tires and Tubes', value: 'Tires and Tubes' },
        { label: 'Tools', value: 'Tools' },
        { label: 'Trainers', value: 'Trainers' },
        { label: 'Wheels', value: 'Wheels' }
    ]
    
    const userTypesArray = [
        { label: "Male", value: 'm' },
        { label: "Female", value: 'f' },
        { label: "Young Male", value: 'ym' },
        { label: "Young Female", value: 'yf' }
    ];

    let options = [
        { label: 'Rider', value: 'Rider' },
        {label: 'Cycle' , value: 'Cycle'}
    ]
    const stockType = [
        { label: 'In Stock', value: true },
        {label: 'Out of Stock', value: false}
    ]

    const emiAvailability = [
        { label: 'Yes', value: true },
        {label: 'No', value: false}
    ]

    const typeProduct = parentProductType.map((singleItem)=>{
        return {label: singleItem.name, value: singleItem}
    })

    typeProduct.push({label: 'Cycle', value: {name: 'Cycle'}})
    typeProduct.push({label: 'Accessories', value: {name: 'access'}})

    console.log(product)
    console.log(categories)

    const buttonHandler = (event) => {
        event.preventDefault();

        console.log(inputRef.current.files)
        
        if(inputRef.current.files <=0 || dispalyImageRef.current.files<=0){
            return
        }
        setAdded(false)
        changeLoading(true);
        const files = inputRef.current.files;        
        if (files.length > 0) {
            const delay = (file) => {
            return new Promise((resolve) => {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file)
                fileReader.onload = function (event) {
                    resolve(event.target.result);
                };
            })
        }
        const doNextPromise = (d) => {
            delay(files[d])
                .then(x => {
                    array.push(x);
                    d++;
                    if (d < files.length) {
                        doNextPromise(d)
                    }
                    else {
                        const fileReader = new FileReader();
                        const file = dispalyImageRef.current.files[0];
                      
                        fileReader.readAsDataURL(file);
                        fileReader.onload = function (event) {
                        let date = new Date();
                        let dateText = date.toLocaleDateString();
                        let dataObj;
                        
                            if (categories === 'Cycle') {

                            dataObj = {
                            name: nameRef.current.value,
                            price: priceRef.current.value,
                            category: product.category,
                            coupon: product.coupon,
                            userType: product.userType,
                            brand: product.brand,
                            desc: descRef.current.value,
                            emi: product.emi,
                            overprice: overPriceRef.current.value,
                            tire: tireRef.current.value,
                            frame: frameRef.current.value,
                            brake: brakeRef.current.value,
                            gear: gearRef.current.value,
                            weight: weightRef.current.value,
                            images: array,
                            displayimages: event.target.result,
                            dateadded: dateText,
                            stock: product.stockType,
                            front: frontRef.current.value,
                            rear: rearRef.current.value,
                            suspension: suspensionRef.current.value,
                            quantity: quantity.current.value,
                            categories: categories
                        }    
                        } else if (categories === 'access') {
                            dataObj = {
                                name: nameRef.current.value,
                                price: priceRef.current.value,
                                category: product.category,
                                coupon: product.coupon,
                                cycleType: product.cycleType,
                                riderType: product.riderType,
                                cycle: product.cycleType,
                                descPoint1: descPoint1.current.value,
                                descPoint2: descPoint2.current.value,
                                descPoint3: descPoint3.current.value,
                                descPoint4: descPoint4.current.value,
                                brand: product.brand,
                                desc: descRef.current.value,
                                emi: product.emi,
                                overprice: overPriceRef.current.value,
                                images: array,
                                displayimages: event.target.result,
                                dateadded: dateText,
                                stock: product.stockType,
                                quantity: quantity.current.value,
                                forProduct: product.type,
                                categories: categories
                            }
                        } else {
                            console.log(categories)
                            dataObj = {
                                name: nameRef.current.value,
                                price: priceRef.current.value,
                                category: product.category,
                                coupon: product.coupon,
                                descPoint1: descPoint1.current.value,
                                descPoint2: descPoint2.current.value,
                                descPoint3: descPoint3.current.value,
                                descPoint4: descPoint4.current.value,
                                brand: product.brand,
                                desc: descRef.current.value,
                                emi: product.emi,
                                overprice: overPriceRef.current.value,
                                images: array,
                                displayimages: event.target.result,
                                dateadded: dateText,
                                stock: product.stockType,
                                quantity: quantity.current.value,
                                categories: categories,
                                category: product.category
                            }
                        }
                    
                    fetch(`${process.env.REACT_APP_FETCH_LINK}/addProduct`, {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            "Content-Type": 'application/json',
                            'addedby': user._id
                        },
                        body: JSON.stringify(dataObj)
                    }).then((response) => {
                        return response.json()
                    }).then((response) => {
                        console.log(response)
                        changeLoading(false)
                        if (response.status) {
                            setAdded({ nature: 'error', msg: 'Already in the database' });
                        } else {
                            setAdded({ nature: 'success', msg: 'Added In The Database' });
                        }
                    })
                    }
                    }

                })
           
            }
         
        doNextPromise(0);        
        } else {
        const fileReader = new FileReader();
        const file = dispalyImageRef.current.files[0];         
        fileReader.readAsDataURL(file);
            fileReader.onload = function (event) {
                let dataObj;
                let dateText;
                let date
                if (categories === 'Cycle') {
                    date = new Date();
                    dateText = date.toLocaleDateString();
                    dataObj = {
                    name: nameRef.current.value,
                    price: priceRef.current.value,
                    category: product.category,
                    coupon: product.coupon,
                    userType: product.userType,
                    brand: product.brand,
                    desc: descRef.current.value,
                    emi: product.emi,
                    overprice: overPriceRef.current.value,
                    tire: tireRef.current.value,
                    frame: frameRef.current.value,
                    brake: brakeRef.current.value,
                    gear: gearRef.current.value,
                    weight: weightRef.current.value,
                    images: array,
                    displayimages: event.target.result,
                    dateadded: dateText,
                    stock: product.stockType,
                    front: frontRef.current.value,
                    rear: rearRef.current.value,
                    suspension: suspensionRef.current.value,
                    quantity: quantity.current.value,
                    productType: product.type,
                    categories: categories
                }    
                } else if (categories === 'access') {
                    date = new Date();
                    dateText = date.toLocaleDateString();
                    dataObj = {
                        name: nameRef.current.value,
                        price: priceRef.current.value,
                        category: product.category,
                        coupon: product.coupon,
                        riderType: product.riderType,
                        cycleType: product.cycleType,
                        descPoint1: descPoint1.current.value,
                        descPoint2: descPoint2.current.value,
                        descPoint3: descPoint3.current.value,
                        descPoint4: descPoint4.current.value,
                        brand: product.brand,
                        desc: descRef.current.value,
                        emi: product.emi,
                        overprice: overPriceRef.current.value,
                        images: array,
                        displayimages: event.target.result,
                        dateadded: dateText,
                        stock: product.stockType,
                        quantity: quantity.current.value,
                        forProduct: product.type,
                        categories: categories
                    }
                }
                else {
                    console.log(categories)
                     dataObj = {
                        name: nameRef.current.value,
                        price: priceRef.current.value,
                        category: product.category,
                        coupon: product.coupon,
                        descPoint1: descPoint1.current.value,
                        descPoint2: descPoint2.current.value,
                        descPoint3: descPoint3.current.value,
                        descPoint4: descPoint4.current.value,
                        brand: product.brand,
                        desc: descRef.current.value,
                        emi: product.emi,
                        overprice: overPriceRef.current.value,
                        images: array,
                        displayimages: event.target.result,
                        dateadded: dateText,
                        stock: product.stockType,
                        quantity: quantity.current.value,
                        categories: categories,
                        category: product.category  
                    }
                }
                
                fetch(`${process.env.REACT_APP_FETCH_LINK}/addProduct`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'addedby': user._id,
                        "Content-Type": 'application/json',
                    },
                    body: JSON.stringify(dataObj)
                }).then((response) => {
                    return response.json()
                }).then((response) => {
                    console.log(response)
                    changeLoading(false)
                    if (response.status) {
                        setAdded({ nature: 'error', msg: response.status });
                    } else {
                        setAdded({ nature: 'success', msg: 'Added In The Database' });
                    }
                })
            }
        }
        
    }
    return (
            
            <Form>

                <Alert variant='secondary' className={'mt-3 mb-3'}>Every Field is Important Dont Leave Any Field Unattended</Alert>

                {(added && added.nature === 'error') && <Alert variant='danger'>{added.msg}</Alert>}
                {(added && added.nature === 'success') && <Alert variant='info'>{added.msg}</Alert>}

                <Form.Group className='mb-3 mt-3'>
                    <Form.Label>Product Type</Form.Label>
                    <Select options={typeProduct} onChange={(value) => {
                        let productPrev = product;
                        productPrev.productType = value;
                        console.log(parentCategory)
                        let newArray = parentCategory.filter((item)=>{
                            return item.parentName === value.value.name
                        })
                        newArray = newArray.map((item)=>{
                            return {label: item.name, value: item}
                        })
                        console.log(newArray)
                        changeCategory(newArray)
                        changeProduct(productPrev)
                        changeCategoryType(value.value.name)
                    }}></Select>
                </Form.Group>
                    
                {categories &&
                <Form.Group className='mb-3'>
                        <Form.Label>Brand Name</Form.Label>
                        <Select options={brand} onChange={(value) => {
                            let productPrev = product;
                            productPrev.brand = value;
                            changeProduct(productPrev);
                        }}></Select>
                </Form.Group>}
            
            {categories &&
                <Form.Group className='mb-3'>
                    <Form.Label>In Stock or not</Form.Label>
                    <Select options={stockType} onChange={(value) => {
                        console.log('here')
                        console.log(value)
                        if (value.value) {
                            changeQuantityState(true)
                        } else {
                            changeQuantityState(false)
                        }
                        let productPrev = product;
                        productPrev.stockType = value.value;
                        changeProduct(productPrev)
                    }}>
                    </Select>
                </Form.Group>
           
            }
            {
                !quantityState  && categories &&
                <Form.Group className='mb-3'>
                    <Form.Label>Product Quantity</Form.Label>
                    <Form.Control readOnly type='number' ref={quantity} value='0' placeholder='Enter Product Quantity'></Form.Control>
                </Form.Group>
                }

                {quantityState && categories &&
                <Form.Group className='mb-3'>
                    <Form.Label>Product Quantity</Form.Label>
                    <Form.Control min='1' type='number' ref={quantity} placeholder='Enter Product Quantity'></Form.Control>
                </Form.Group>
                }
    


            {categories &&
            <Form.Group className='mb-3'>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control type='text' ref={nameRef} placeholder='Enter Product Name'></Form.Control>
                </Form.Group>}
            {categories && <Form.Group className='mb-3'>
                <Form.Label>Price of the Product</Form.Label>
                <Form.Control type='number' ref={priceRef} placeholder='Enter price'></Form.Control>
            </Form.Group>}
            {categories && <Form.Group className='mb-3'>
                <Form.Label>Overprice of the Product</Form.Label>
                <Form.Control type='number' ref={overPriceRef} placeholder='Enter overprice'></Form.Control>
            </Form.Group>}

                {categories && <Form.Group className="mb-3">
                    <Form.Label>Coupon Applicable</Form.Label>
                        <Select isMulti={true} options={coupon} onChange={(value) => {
                            let productPrev = product;
                            productPrev.coupon = value;
                            console.log(product)
                            changeProduct(productPrev);
                        }}></Select>
                    </Form.Group>
                }
                
                {categories &&        
                <Form.Group className="mb-3">
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control type="text" ref={descRef} placeholder="Enter Description" />
                </Form.Group>}
            
                {categories !== 'Cycle' && categories &&
                <Form.Group className='mb-3'>
                    <Form.Label>Description Point 1</Form.Label>
                    <Form.Control type='text' ref={descPoint1} placeholder='Enter Description Point 1'></Form.Control>
                </Form.Group>}
                
            
                {categories !== 'Cycle'&& categories  &&
                <Form.Group className='mb-3'>
                    <Form.Label>Description Point 2</Form.Label>
                    <Form.Control type='text' ref={descPoint2} placeholder='Enter Description Point 2'></Form.Control>
                </Form.Group>}
            
                {categories !== 'Cycle'&& categories &&
                <Form.Group className='mb-3'>
                    <Form.Label>Description Point 3</Form.Label>
                    <Form.Control type='text' ref={descPoint3} placeholder='Enter Description Point 3'></Form.Control>
                </Form.Group>}
            
                {categories !== 'Cycle'&& categories  &&
                <Form.Group className='mb-3'>
                    <Form.Label>Description Point 4</Form.Label>
                    <Form.Control type='text' ref={descPoint4} placeholder='Enter Description Point 4'></Form.Control>
                </Form.Group>}


                {categories !== 'access' && categories &&
                <Form.Group className="mb-3">
                    <Form.Label>{`Enter ${categories} Category`}</Form.Label>
                    <Select  options={category} onChange={(value) => {
                        let productPrev = product;
                        console.log(product)
                        productPrev.category = value;
                        changeProduct(productPrev);
                    }}></Select>
                </Form.Group>
                }
                
                {categories === 'Cycle' &&
                <Form.Group className={'mb-3'}>
                    <Form.Label>Enter User Type</Form.Label>
                        <Select isMulti={ true } options={userTypesArray} onChange={(value) => {
                        let productPrev = product;
                        productPrev.userType = value    
                    }}></Select>    
                </Form.Group>}
                
                

                {categories === 'access' &&
                    
                <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Accessory Type</Form.Label>
                    <Select options={options} onChange={(value) => {
                            console.log(value);
                    if (value.value === 'Rider') {
                        changeProductType('rider')
                    } else if(value.value === 'Cycle'){
                        changeProductType('cycle') 
                    } else {
                        changeProductType(false)
                    }
                    let productPrev = product;
                    productPrev.type = value.value;
                    changeProduct(productPrev);
                }}></Select>
                        {productType === 'rider' && <Select onChange={(value) => {
                            let productPrev = product;
                            productPrev.riderType = value.value;
                            changeProduct(productPrev);
                        }} options={riderOption}></Select>}
                        {productType === 'cycle' && <Select onChange={(value) => {
                            let productPrev = product;
                            productPrev.cycleType = value.value;
                            changeProduct(productPrev);
                        }} options={cycleOptions}></Select>}
                    </Form.Group>}


                {categories === 'Cycle' && 
                <>
                    <Form.Group className="mb-3">
                        <Form.Label>Frame Materal</Form.Label>
                        <Form.Control type="text" ref={frameRef} placeholder="Enter Frame Type" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Brakes</Form.Label>
                        <Form.Control type="text" ref={brakeRef} placeholder="Enter Brake Type" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>No of Gears</Form.Label>
                        <Form.Control type="text" ref={gearRef} placeholder="Enter Gear Type" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Wheel Size</Form.Label>
                        <Form.Control type="text" ref={tireRef} placeholder="Enter Wheel Size" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Front Deraileur</Form.Label>
                        <Form.Control type="text" ref={frontRef} placeholder="Enter Front Derail Type" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Rear Deraileur</Form.Label>
                        <Form.Control type="text" ref={rearRef} placeholder="Enter Rear Deraileur Type" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Suspension Type</Form.Label>
                        <Form.Control type="text" ref={suspensionRef} placeholder="Enter Suspension Type" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Weight Of Cycle</Form.Label>
                        <Form.Control type="text" ref={weightRef} placeholder="Enter Weight of the Cycle" />
                    </Form.Group>
                    
                </>
                }

            {categories &&
                <Form.Group className="mb-3">
                        <Form.Label>EMI Available</Form.Label>
                        <Select options={emiAvailability} onChange={(value) => {
                            let productPrev = product;
                            productPrev.emi = value.value;
                            changeProduct(productPrev);
                        }}></Select>
                </Form.Group>}

            {categories &&
                <>
                <p>Main Display Image  <input type='file' className='mt-2 mb-2' ref={dispalyImageRef} accept='image/jpeg, image/png'></input></p>
                <p>Secondary Display Image  <input type="file" className='mb-2' multiple accept='image/jpeg, image/png' ref={inputRef} /></p>
                <Button variant="primary" type="submit" onClick={buttonHandler}>{!loading && 'Submit'}{loading && <Spinner animation='grow'></Spinner>}</Button>
                </>
            }
            </Form> 
        )
}

export default AddProduct;








// import { Form, Button, Alert } from 'react-bootstrap';
// import { useRef, useState, useEffect } from 'react';
// import Select from 'react-select';
// import {Spinner, Modal} from 'react-bootstrap'


// const AddProduct = ({user}) => {
//     const nameRef = useRef();
//     const priceRef = useRef();
//     const descRef = useRef();
//     const overPriceRef = useRef();
//     const frontRef = useRef();
//     const rearRef = useRef();
//     const frameRef = useRef();
//     const gearRef = useRef();
//     const brakeRef = useRef();
//     const tireRef = useRef();
//     const weightRef = useRef();
//     const inputRef = useRef();
//     const suspensionRef = useRef();
//     const dispalyImageRef = useRef();
//     const quantity = useRef();
//     let array = [];
//     const [brand, changeBrand] = useState([]);
//     const [category, changeCategory] = useState([]);
//     const [product, changeProduct] = useState({});
//     const [coupon, changeCoupon] = useState([]);
//     const [added, setAdded] = useState(false);
//     const [productType, changeProductType] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [singleProduct, changeSingleProduct] = useState(false);

//     let data = {};

//     let link = process.env.REACT_APP_FETCH_LINK
//     useEffect(() => {
//         setLoading(true)
//         fetch(`${link}/brandDisplaySub`, {
//             headers: {
//                 subid: user._id
//             }
//         }).then((response) => {
//             return response.json();
//         }).then((response) => {
//             const array = response.map((item) => {
//                 return { label: item.subName, value: item }
//             })
//             console.log(array);
//             changeBrand(array);
//         })
//         fetch(`${link}/categoryDisplay`).then((response) => {
//             return response.json();
//         }).then((response) => {     
//             const array = response.map((item) => {
//                 return { label: item.name, value: item }
//             })
//             changeCategory(array)
//         })
//         fetch(`${link}/couponDisplay`).then((response) => {
//             return response.json();
//         }).then((response) => {
//             const array = response.map((item) => {
//                 return { label: item.code, value: item }
//             })
//             changeCoupon(array)
//             fetch(`${link}/displayProductType`).then((response)=>{
//                 return response.json()
//             }).then((response)=>{
//                 changeProductType(response)
//                 setLoading(false)
//             })
//         })
//     }, [])


//     console.log(productType)
//     const userTypes = [
//         { label: "Male", value: 'm' },
//         { label: "Female", value: 'f' },
//         { label: "Young Male", value: 'ym' },
//         { label: "Young Female", value: 'yf' }
//     ];

//     const stockType = [
//         { label: 'In Stock', value: true },
//         {label: 'Out of Stock', value: false}
//     ]

    
//     let riderOption = [
//         { label: 'Backpacks', value: 'Backpacks'}, 
//         {label: 'Compression and Inner Wear', value: 'Compression and Inner Wear' },
//         { label: 'Eyewear', value: 'Eyewear' },
//         {label: 'Face Masks', value: 'Face Masks'},
//         { label: 'Footwear', value: 'Footwear' },
//         { label: 'Gloves', value: 'Gloves' },
//         { label: 'Helmets', value: 'Helmets' },
//         { label: 'Jerseys', value: 'Jerseys' },
//         { label: 'Recovery and Body Care', value: 'Recovery and Body Care' },
//         { label: 'Shorts', value: 'Shorts' },
//         {label: 'T-Shirts', value: 'T-Shirts'}
//     ]
//     let cycleOptions = [
//         { label: 'Bags and Car Racks', value: 'Bags and Car Racks' },
//         { label: 'Bells and Horns', value: 'Bells and Horns' },
//         { label: 'Bottles and Bottle Cages', value: 'Bottles and Bottle Cages' },
//         { label: 'Components and Spares', value: 'Components and Spares' },
//         { label: 'GPS and Cyclocomputers', value: 'GPS and Cyclocomputers' },
//         { label: "Lights", value: 'Lights' },
//         { label: "Locks", value: "Locks" },
//         { label: "Maintenance and Care", value: 'Maintenance and Care' },
//         { label: "Mudguards and Protection", value: "Mudguards and Protection" },
//         { label: 'Others', value: 'Other' },
//         { label: 'Pumps', value: 'Pumps' },
//         { label: 'Stands', value: 'Stands' },
//         { label: 'Tires and Tubes', value: 'Tires and Tubes' },
//         { label: 'Tools', value: 'Tools' },
//         { label: 'Trainers', value: 'Trainers' },
//         { label: 'Wheels', value: 'Wheels' }
//     ]

//     const emiAvailability = [
//         { label: 'Yes', value: true },
//         {label: 'No', value: false}
//     ]

//     const typeProduct = productType.map((singleItem)=>{
//         return {label: singleItem.name, value: singleItem}
//     })

//     typeProduct.push({label: 'Cycle', value: {name: 'Cycle'}})
//     typeProduct.push({label: 'Accessories', value: {name: 'access'}})

//     console.log(product)
//     const buttonHandler = (event) => {
//         event.preventDefault();
//         const files = inputRef.current.files;
//         if (files.length > 0) {
//             const delay = (file) => {
//             return new Promise((resolve) => {
//                 const fileReader = new FileReader();
//                 fileReader.readAsDataURL(file)
//                 fileReader.onload = function (event) {
//                     resolve(event.target.result);
//                 };
//             })
//         }
//         const doNextPromise = (d) => {
//             delay(files[d])
//                 .then(x => {
//                     array.push(x);
//                     d++;
//                     if (d < files.length) {
//                         doNextPromise(d)
//                     }
//                     else {
//                         const fileReader = new FileReader();
//                         const file = dispalyImageRef.current.files[0];
                      
//                         fileReader.readAsDataURL(file);
//                         fileReader.onload = function (event) {
//                         const date = new Date();
//                         const dateText = date.toLocaleDateString();
//                         const dataObj = {
//                         name: nameRef.current.value,
//                         price: priceRef.current.value,
//                         category: product.category,
//                         coupon: product.coupon,
//                         type: product.type,
//                         brand: product.brand,
//                         desc: descRef.current.value,
//                         emi: product.emi,
//                         overprice: overPriceRef.current.value,
//                         tire: tireRef.current.value,
//                         frame: frameRef.current.value,
//                         brake: brakeRef.current.value,
//                         gear: gearRef.current.value,
//                         weight: weightRef.current.value,
//                         images: array,
//                         displayimages: event.target.result,
//                         dateadded: dateText,
//                         stock: product.stockType,
//                         front: frontRef.current.value,
//                         rear: rearRef.current.value,
//                         suspension: suspensionRef.current.value,
//                         quantity: quantity.current.value
//                     }
//                     fetch(`${link}/addProduct`, {
//                         method: "POST",
//                         headers: {
//                             'Accept': 'application/json',
//                             "Content-Type": 'application/json',
//                         },
//                         body: JSON.stringify(dataObj)
//                     }).then((response) => {
//                         return response.json()
//                     }).then((response) => {
//                         console.log(response)
//                         if (response.status) {
//                             setAdded({ nature: 'error', msg: response.status });
//                         } else {
//                             setAdded({ nature: 'success', msg: 'Added In The Database' });
//                         }
//                     })
//                     }
//                     }

//                 })
           
//             }
         
//         doNextPromise(0);        
//         } else {
//         const fileReader = new FileReader();
//         const file = dispalyImageRef.current.files[0];         
//         fileReader.readAsDataURL(file);
//             fileReader.onload = function (event) {

//                 const date = new Date();
//                 const dateText = date.toLocaleDateString();
//                 const dataObj = {
//                     name: nameRef.current.value,
//                     price: priceRef.current.value,
//                     category: product.category,
//                     coupon: product.coupon,
//                     type: product.type,
//                     brand: product.brand,
//                     desc: descRef.current.value,
//                     emi: product.emi,
//                     overprice: overPriceRef.current.value,
//                     tire: tireRef.current.value,
//                     frame: frameRef.current.value,
//                     brake: brakeRef.current.value,
//                     gear: gearRef.current.value,
//                     weight: weightRef.current.value,
//                     images: array,
//                     displayimages: event.target.result,
//                     dateadded: dateText,
//                     stock: product.stockType,
//                     front: frontRef.current.value,
//                     rear: rearRef.current.value,
//                     suspension: suspensionRef.current.value,
//                     quantity: quantity.current.value
//                 }
//                 fetch(`${link}/addProduct`, {
//                     method: "POST",
//                     headers: {
//                         'Accept': 'application/json',
//                         "Content-Type": 'application/json',
//                     },
//                     body: JSON.stringify(dataObj)
//                 }).then((response) => {
//                     return response.json()
//                 }).then((response) => {
//                     console.log(response)
//                     if (response.status) {
//                         setAdded({ nature: 'error', msg: response.status });
//                     } else {
//                         setAdded({ nature: 'success', msg: 'Added In The Database' });
//                     }
//                 })
//             }
//         }
        
//     }
//         return (

//             <>
//             {loading && 

//             <Modal.Dialog>
//                 <Modal.Body><Spinner animation="border" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </Spinner></Modal.Body>
//             </Modal.Dialog>
//         }
            
//             {!loading && 
//             <>
//             <Form>
//                 <Alert variant="secondary" className={'mt-3 mb-3'}>Every Field is Important Do not Leave Any Field Unattended</Alert>
                
//                 {(added && added.nature === 'error') && <Alert variant='danger'>{added.msg}</Alert>}
//                 {(added && added.nature === 'success') && <Alert variant='info'>{added.msg}</Alert>}



//                 <Form.Group className="mb-3 mt-3">
//                     <Form.Label>Brand Name</Form.Label>
//                     <Select options={brand} onChange={(value) => {
//                         let productPrev = product;
//                         console.log(product)
//                         productPrev.brand = value;
//                         changeProduct(productPrev);
//                     }}></Select>
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Product Category</Form.Label>
//                     <Select isMulti={true} options={category} onChange={(value) => {
//                         let productPrev = product;
//                         console.log(product)
//                         productPrev.category = value;
//                         changeProduct(productPrev);
//                     }}></Select>
//                 </Form.Group>
//                 <Form.Group className='mb-3'>
//                     <Form.Label>In Stock or not</Form.Label>
//                     <Select options={stockType} onChange={(value) => {
//                         console.log('here')
//                         console.log(value)
//                         let productPrev = product;
//                         productPrev.stockType = value.value;
//                         changeProduct(productPrev)
//                     }}>
//                     </Select>
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>User Type</Form.Label>
//                     <Select isMulti={true} options={userTypes} onChange={(value) => {
//                         let productPrev = product;
//                         console.log(product)
//                         productPrev.type = value;
//                         changeProduct(productPrev);
//                     }}></Select>
                    
//                 </Form.Group>
            
//                 <Form.Group className="mb-3">
//                     <Form.Label>Coupon Applicable</Form.Label>
//                     <Select isMulti={true} options={coupon} onChange={(value) => {
//                         let productPrev = product;
//                         productPrev.coupon = value;
//                         console.log(product)
//                         changeProduct(productPrev);
//                     }}></Select>

//                 </Form.Group>

//                 <Form.Group className="mb-3 mt-3">
//                     <Form.Label>Product Name</Form.Label>
//                     <Form.Control type="text" ref={nameRef} placeholder="Enter Name" />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label>Overprice</Form.Label>
//                     <Form.Control type="number" ref={overPriceRef} placeholder="Enter Overprice" />
//                 </Form.Group>
            
//                 <Form.Group className="mb-3">
//                     <Form.Label>Product Price</Form.Label>
//                     <Form.Control type="number" ref={priceRef} placeholder="Enter Price" />
//                 </Form.Group>
            
//                 <Form.Group>
//                     <Form.Label>Product Quantity</Form.Label>
//                     <Form.Control type='number' ref={quantity} placeholder='Enter Product Quantity'></Form.Control>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label>Product Description</Form.Label>
//                     <Form.Control type="text" ref={descRef} placeholder="Enter Description" />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Frame Material</Form.Label>
//                     <Form.Control type="text" ref={frameRef} placeholder="Enter Frame Type" />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Brakes</Form.Label>
//                     <Form.Control type="text" ref={brakeRef} placeholder="Enter Brake Type" />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>No of Gears</Form.Label>
//                     <Form.Control type="text" ref={gearRef} placeholder="Enter Gear Type" />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Wheel Size</Form.Label>
//                     <Form.Control type="text" ref={tireRef} placeholder="Enter Wheel Size" />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Front Deraileur</Form.Label>
//                     <Form.Control type="text" ref={frontRef} placeholder="Enter Front Derail Type" />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Rear Deraileur</Form.Label>
//                     <Form.Control type="text" ref={rearRef} placeholder="Enter Rear Deraileur Type" />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Suspension Type</Form.Label>
//                     <Form.Control type="text" ref={suspensionRef} placeholder="Enter Suspension Type" />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>Weight Of Cycle</Form.Label>
//                     <Form.Control type="text" ref={weightRef} placeholder="Enter Weight of the Cycle" />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                     <Form.Label>EMI Available</Form.Label>
//                     <Select options={emiAvailability} onChange={(value) => {
//                         let productPrev = product;
//                         productPrev.emi = value.value;
//                         changeProduct(productPrev);
//                     }}></Select>
//                 </Form.Group>

//                 <p>Main Display Image  <input type='file' className='mt-2 mb-2' ref={dispalyImageRef} accept='image/jpeg, image/png'></input></p>
//                 <p>Secondary Display Image  <input type="file" className='mb-2' multiple accept='image/jpeg, image/png' ref={inputRef} /></p>

//                 <Button variant="primary" type="submit" onClick={buttonHandler}>
//                     Submit
//                 </Button>
//             </Form>

//             </>}
//          </>
//         )
// }

// export default AddProduct