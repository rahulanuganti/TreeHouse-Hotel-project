import React, { useEffect, useState } from 'react'
import { bookRoom, getRoomById } from '../utils/ApiFunctions'
import { useNavigate, useParams} from 'react-router-dom'
import moment from "moment"
import BookingSummary from './BookingSummary'
import {Form, FormControl} from 'react-bootstrap'

const BookingForm = () => {
    const [isValidate, setIsValidate]  = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [roomPrice, setRoomPrice]  = useState(0)
    const [booking, setBooking]  = useState({
        guestName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numberOfAdults: "",
        numberOfChildren: ""
    })
    const [roomInfo, setRoomInfo] = useState({
        photo: "",
        roomType: "",
        roomPrice: ""
    })

    const {roomId} = useParams()
    const navigate = useNavigate()


    const handleInputChange = (e) =>{
        const {name, value} = e.target
        setBooking({...booking, [name]: value})
        setErrorMessage("")
    }
    const getRoomPriceById = async(roomId) => {
        try{
            const response = await getRoomById(roomId)
            setRoomPrice(response.roomPrice)
        }catch(error){
            throw new Error(error)
        }
    }
    useEffect(() => {
        getRoomPriceById(roomId)
    }, [roomId])
    
    const calculatePayment = () =>{
        const checkInDate = moment(booking.checkInDate)
        const checkOutDate = moment(booking.checkOutDate)
        const diffInDays = checkOutDate.diff(checkInDate, "days")
        const price = roomPrice ? roomPrice: 0
        return diffInDays* price

        // if (!checkInDate.isValid() || !checkOutDate.isValid()) {
        //     return 0; 
        // }
        // const diffInDays = checkOutDate.diff(checkInDate, 'days');
        //     if (diffInDays <= 0) {
        //     return 0;
        // }
        // const price = roomPrice ? roomPrice : 0;
        // return diffInDays * price;
    }

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numberOfAdults)
        const childrenCount = parseInt(booking.numberOfChildren)
        const totalCount = adultCount + childrenCount
        return totalCount >= 1 && adultCount >=1 
    }
    const isCheckOutDateValid = () =>{
        if(!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))){
            setErrorMessage("Check-out date must come after check-in date")
            return false
        }else{
            setErrorMessage("")
            return true
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.currentTarget
        if(form.checkValidity() === false || !isCheckOutDateValid() ||  !isGuestCountValid()){
            e.stopPropagation()
        }else{
            setIsSubmitted(true)
        }
        setIsValidate(true)
    }

    const handleBooking = async() => {
        try{
            const confirmationCode = await bookRoom(roomId, booking)
            setIsSubmitted(true)
            navigate("/", {state: {message: confirmationCode}})
        }catch(error){
            setErrorMessage(error.message)
            navigate("/", {state: {error: errorMessage}})
        }
    }
    
    return (
        <>
            <div className='container mb-5'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='card card-body mt-5'>
                            <h4 className='card-title'> Reserve Room</h4>
                            <Form noValidate validated={isValidate} onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label  htmlFor="guestName">Full Name : </Form.Label>
                                    < FormControl
                                        required
                                        type="text"
                                        id = "guestName"
                                        name = "guestName"
                                        value = {booking.guestName}
                                        placeholder = "Enter your full name"
                                        onChange = {handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your fullname
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="guestEmail">Email : </Form.Label>
                                    <FormControl 
                                        required
                                        type= "text"
                                        id = "guestEmail"
                                        name = "guestEmail"
                                        value = {booking.guestEmail}
                                        placeholder = "Enter your Email"
                                        onChange = {handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please Enter your Email
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <fieldset style={{border: "2px"}}>
                                    <legend>Lodging period</legend>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <Form.Label htmlFor="checkInDate">Check-In Date: </Form.Label>
                                            <FormControl 
                                                required
                                                type= "date"
                                                id = "checkInDate"
                                                name = "checkInDate"
                                                value = {booking.checkInDate}
                                                placeholder = "check-in Date"
                                                onChange = {handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please select the check-in date
                                            </Form.Control.Feedback>
                                        </div>
                                        <div className='col-6'>
                                            <Form.Label htmlFor="checkOutDate">Check-Out Date: </Form.Label>
                                            <FormControl 
                                                required
                                                type= "date"
                                                id = "checkOutDate"
                                                name = "checkOutDate"
                                                value = {booking.checkOutDate}
                                                placeholder = "check-out Date"
                                                onChange = {handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please select the check-out date
                                            </Form.Control.Feedback>
                                        </div>
                                        {errorMessage && <p className='error-message text-danger'>{errorMessage}</p>}
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <legend>Number of Guests</legend>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <Form.Label htmlFor="numberOfAdults">Adults : </Form.Label>
                                            <FormControl 
                                                required
                                                type= "number"
                                                id = "numberOfAdults"
                                                name = "numberOfAdults"
                                                value = {booking.numberOfAdults}
                                                min = {1}
                                                placeholder = "0"
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please select atleast 1 adult.
                                            </Form.Control.Feedback>
                                        </div>
                                        <div className='col-6'>
                                            <Form.Label htmlFor="numberOfChildren">Children : </Form.Label>
                                            <FormControl 
                                                
                                                type= "number"
                                                id = "numberOfChildren"
                                                name = "numberOfChildren"
                                                value = {booking.numberOfChildren}
                                                min = {0}
                                                placeholder = "0"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </fieldset>
                                <div className='form-group mt-2 mb-2'>
                                    <button 
                                        className='btn btn-hotel'
                                        type='submit'
                                    >
                                        Continue
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        {isSubmitted && (
                            <BookingSummary 
                                booking={booking}
                                payment={calculatePayment}
                                isFormValid={isValidate}
                                onConfirm={handleBooking}
                            />
                        )}    
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookingForm