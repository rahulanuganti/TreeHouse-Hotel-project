package com.code.treehousehotel.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponse {
    private Long id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String guestName;
    private int numOfAdults;
    private int numOfChildren;
    private int totalNumOfGuest;
    private String bookingConfirmationCode;
    private RoomResponse room;
    public BookingResponse(Long id, LocalDate checkInDate, LocalDate checkoutDate, String bookingConfirmationCode){
        this.id = id;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkoutDate;
        this.bookingConfirmationCode = bookingConfirmationCode;
    }

    public BookingResponse(Long bookingId, LocalDate checkInDate, LocalDate checkOutDate, String guestFullName, String guestEmail, int numOfAdults, int numOfChildren, int totalNumOfGuest, String bookingConfirmationCode, RoomResponse room) {
    }
}
