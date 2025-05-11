package duan.kingsport.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import duan.kingsport.GlobalExceptionHandler;
import duan.kingsport.dao.ShiftDAO;
import duan.kingsport.dao.UserDAO;
import duan.kingsport.entities.Bookingdetails;
import duan.kingsport.entities.Shifts;
import duan.kingsport.entities.Users;
import duan.kingsport.utils.ErrorResponse;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/rest/shifts/")
public class ShiftRestController {
	
	@Autowired
	MessageSource messagesource;
	@Autowired
	ShiftDAO shiftDAO;
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException ex) {
		return GlobalExceptionHandler.handleValidationException(ex);
	}
	@GetMapping("getAll")
	public ResponseEntity<List<Shifts>> getAll(){
		return ResponseEntity.ok(shiftDAO.findAll());
	}
}	
