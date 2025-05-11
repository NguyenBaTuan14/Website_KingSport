package duan.kingsport.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import duan.kingsport.dao.AuthorizedDAO;
import duan.kingsport.dao.BookingDAO;
import duan.kingsport.entities.Authorized;
import duan.kingsport.entities.Bookings;
import duan.kingsport.service.AuthorizedService;
import duan.kingsport.service.BookingService;

@SuppressWarnings("unused")
@Service
public class BookingServiceImpl implements BookingService{
	@Autowired
	BookingDAO bookingDAO;
	@Autowired

	@Override
	public List<Bookings> findAll() {
		// TODO Auto-generated method stub
		return bookingDAO.findAll();
	}

	@Override
	public Bookings create(Bookings bookings) {
		// TODO Auto-generated method stub
		return bookingDAO.save(bookings);
	}

	@Override
	public Bookings update(Bookings bookings) {
		// TODO Auto-generated method stub
		return bookingDAO.save(bookings);
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		bookingDAO.deleteById(id);
	}

	@Override
	public Bookings findById(Integer id) {
		// TODO Auto-generated method stub
		return bookingDAO.findById(id).get();
	}

	

	@Override
	public List<Object[]> getBookingInfoByUsername(String username) {
		// TODO Auto-generated method stub
		return bookingDAO.getBookingInfoByUsername(username);
	}

	@Override
	public Object[] getBookingInfoByBookingDetail(String bookingid) {
		// TODO Auto-generated method stub
		return bookingDAO.getBookingInfoByBookingDetail(bookingid);
	}

	@Override
	public int countBooking() {
		// TODO Auto-generated method stub
		return bookingDAO.countBooking();
	}

	
}
