package duan.kingsport.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import duan.kingsport.GlobalExceptionHandler;
import duan.kingsport.dao.BookingDAO;
import duan.kingsport.dao.BookingDetailDAO;
import duan.kingsport.entities.Bookingdetails;
import duan.kingsport.entities.Bookings;
import duan.kingsport.utils.ErrorResponse;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/rest/bookingdetails/")
public class BookingDetailRestController {
	@Autowired
	MessageSource messagesource;
	@Autowired
	BookingDetailDAO bookingDetailDAO;
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException ex) {
		return GlobalExceptionHandler.handleValidationException(ex);
	}
	@GetMapping("{bookingid}")
    public List<Bookingdetails> getBookingDetails(@PathVariable("bookingid") Integer bookingid) {
        return bookingDetailDAO.detailBooking(bookingid);
    }
}
