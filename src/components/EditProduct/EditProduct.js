import { Form , Button, Modal, ModalBody, Spinner, Alert} from 'react-bootstrap'
import { useEffect, useState, useRef } from 'react'
import Select from 'react-select';

const EditProduct = () => {
    
    const [product, changeProduct] = useState([]);
    const [singleProduct, changeSingleProduct] = useState(false);
    const [coupons, changeCoupons] = useState(false);
    const [category, changeCategory] = useState(false);
    const [modalLoading, changeModalLoading] = useState(false);
    const [added, setAdded] = useState(false);
    const overPriceRef = useRef();
    const nameRef = useRef();
    const emiRef = useRef();
    const priceRef = useRef();
    const descRef = useRef();



    const link = process.env.REACT_APP_FETCH_LINK

    useEffect(() => {
        changeModalLoading(true);
        fetch(`${link}/productDisplay`).then((res) => {
            return res.json()
        }).then((response) => {
            const array = response.map((item) => {
                return { label: item.name, value: item }
            })
            changeProduct(array);
            fetch(`${link}/couponDisplay`).then((response) => {
                return response.json();
            }).then((response) => {
                const array = response.map((item) => {
                    return { label: item.code, value: item }
                })
                changeCoupons(array);                
                fetch(`${link}/categoryDisplay`).then((response) => {
                    return response.json();
                }).then((response) => {
                    const array = response.map((item) => {
                        return { label: item.name, value: item }
                    })
                    changeCategory(array);
                    changeModalLoading(false);
                })
            })
        })
    }, [])
    console.log(singleProduct)
    const productSelector = (value) => {
        changeModalLoading(true)
        setTimeout(() => {
            changeSingleProduct(value.value)
            changeModalLoading(false);
            setAdded(false)
        }, 2000);
    }
        const userTypes = [
    { label: "Male", value: 'm' },
    { label: "Female", value: 'f' },
    { label: "Young Male", value: 'ym' },
    {label: "Young Female", value: 'yf'}
    ];


    const submitHandler = () => {
        changeModalLoading(true);
        if (singleProduct)
        {
            
            const dataObj = {
                id: singleProduct._id,
                name: nameRef.current.value?nameRef.current.value:singleProduct.name,
                overprice: overPriceRef.current.value?overPriceRef.current.value:singleProduct.overprice,
                price: priceRef.current.value ? priceRef.current.value : singleProduct.price,
                desc: descRef.current.value ? descRef.current.value : singleProduct.desc,
                type: singleProduct.type,
                category: singleProduct.category,
                coupon: singleProduct.coupon,
                emi: emiRef.current.value ? emiRef.current.value : singleProduct.emi
            }
            fetch(`${link}/updateProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(dataObj)
            }).then((response) => {
                return response.json();
            }).then((response) => {
                console.log(response)
                if (response.status) {
                    setAdded({ nature: 'error', msg: response.status });
                } else {
                    setAdded({ nature: 'success', msg: 'Edited in the database' });
                }
                changeModalLoading(false)
            })
        } else {
            changeModalLoading(false)
            return 
        }
    }
    return (
        <>
            {(added && added.nature === 'error') && <Alert variant='danger'>{added.msg}</Alert>}
            {(added && added.nature === 'success') && <Alert variant='info'>{ added.msg }</Alert>}
            

            <Modal show={modalLoading} background='static' keyboard={false}>
                <ModalBody>
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner> 
                </ModalBody>
            </Modal>
            <div>
                { !modalLoading && <><Form.Group className="mb-3 mt-3">
                <Form.Label>Select Product</Form.Label>
                    <Select defaultValue={singleProduct.name} options={product} onChange={(value) => {productSelector(value) } }></Select>
            </Form.Group>

            <Form.Group className="mb-3 mt-3">
                
                { singleProduct && <> <Form.Label>Product Name</Form.Label> <Form.Control type="text"   readOnly placeholder={singleProduct.name} /> 
                <Form.Control ref={nameRef} placeholder={'Edit the Name'} className={'mt-2'}></Form.Control></>}
            </Form.Group>
                    
            <Form.Group className="mb-3">
                                {singleProduct &&<><Form.Label>Overprice</Form.Label>
  <Form.Control type="number" min="0"  readOnly  placeholder={singleProduct.overprice} />
                <Form.Control ref={overPriceRef} placeholder={'Edit the Overprice'} className={'mt-2'}></Form.Control></>}
            </Form.Group>
                
            <Form.Group className="mb-3">
               
                {singleProduct && <>  <Form.Label>Product Price</Form.Label><Form.Control type="number" min="1"  readOnly   placeholder={singleProduct.price} />
                <Form.Control ref={priceRef} placeholder={'Edit the price'} className={'mt-2'}></Form.Control></>}
            </Form.Group>
                
            <Form.Group className="mb-3">
               
                {singleProduct &&<> <Form.Label>Product Description</Form.Label>  <Form.Control type="text"  readOnly placeholder={singleProduct.desc} />
                <Form.Control ref={descRef} placeholder={'Edit the Description'} className={'mt-2'}></Form.Control></>}
            </Form.Group>

            <Form.Group className="mb-3">
                
                {singleProduct && <><Form.Label>EMI Available</Form.Label> <Form.Control type="text"  readOnly placeholder={singleProduct.emi} />
                <Form.Control ref={emiRef} placeholder={'Edit the emi'} className={'mt-2'}></Form.Control></>}
            </Form.Group>
                    
            <Form.Group className="mb-3">
                {singleProduct &&
                    <>
                <Form.Label>User Type</Form.Label>
                  <Select isMulti={true} options={userTypes} onChange={(value)=>{
                    let prevProduct = singleProduct;
                    prevProduct.type = value;
                    changeSingleProduct(prevProduct);
                }} defaultValue={singleProduct.type}></Select>
                </>
                }
            </Form.Group>
            
                <Form.Group className="mb-3">
                {singleProduct && <>
                <Form.Label>Product Category</Form.Label>
                <Select isMulti={true} options={category} onChange={(value)=>{
                    let prevProduct = singleProduct;
                    prevProduct.category = value;
                    changeSingleProduct(prevProduct);
                }} defaultValue={singleProduct.category}></Select></>}        
            </Form.Group>
            
            <Form.Group className="mb-3">
                {singleProduct && <>
                <Form.Label>Coupons Associated</Form.Label>
                 <Select isMulti={true} options={coupons} onChange={(value)=>{
                    let prevProduct = singleProduct;
                    prevProduct.coupon = value;
                    changeSingleProduct(prevProduct)
                }} defaultValue={singleProduct.coupon}></Select></>}                
            </Form.Group>

            
        { singleProduct &&  <Button variant="primary" type="submit" onClick={submitHandler}>
            Submit
        </Button> }
        </>}
            
            </div>
        </>
    )
}

export default EditProduct