package duan.kingsport.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import duan.kingsport.dao.BookingDAO;
import duan.kingsport.dao.BookingDetailDAO;
import duan.kingsport.entities.Authorized;
import duan.kingsport.entities.Bookingdetails;
import duan.kingsport.entities.Bookings;


@SuppressWarnings("unused")
public interface BookingDetailService {
	
	List<Bookingdetails> findAll();

	Bookingdetails create(Bookingdetails bookingdetails);

	Bookingdetails update(Bookingdetails bookingdetails);

	void delete(Integer id);
	
	Bookingdetails findById(Integer id);
	
	
}
