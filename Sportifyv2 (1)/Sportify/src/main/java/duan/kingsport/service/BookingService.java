package duan.kingsport.service;

import java.util.List;

import duan.kingsport.entities.Authorized;
import duan.kingsport.entities.Bookings;


@SuppressWarnings("unused")
public interface BookingService {
	List<Bookings> findAll();

	Bookings create(Bookings bookings);

	Bookings update(Bookings bookings);

	void delete(Integer id);
	
	Bookings findById(Integer id);

	List<Object[]> getBookingInfoByUsername(String username);
	Object[] getBookingInfoByBookingDetail(String bookingid);
	
	int countBooking();
}
