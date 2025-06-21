package com.code.treehousehotel.exception;

public class InvalidBookingRequestException extends RuntimeException{
    public InvalidBookingRequestException(String message){
        super(message);
    }
}
