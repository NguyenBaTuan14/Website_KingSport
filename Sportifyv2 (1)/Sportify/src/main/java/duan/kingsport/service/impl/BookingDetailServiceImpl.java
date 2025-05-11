package duan.kingsport.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import duan.kingsport.dao.AuthorizedDAO;
import duan.kingsport.dao.BookingDetailDAO;
import duan.kingsport.entities.Authorized;
import duan.kingsport.entities.Bookingdetails;
import duan.kingsport.service.AuthorizedService;
import duan.kingsport.service.BookingDetailService;

@SuppressWarnings("unused")
@Service
public class BookingDetailServiceImpl implements BookingDetailService{
	@Autowired
	BookingDetailDAO bookingDetailDAO;

	@Override
	public List<Bookingdetails> findAll() {
		// TODO Auto-generated method stub
		return bookingDetailDAO.findAll();
	}

	@Override
	public Bookingdetails create(Bookingdetails bookingdetails) {
		// TODO Auto-generated method stub
		return bookingDetailDAO.save(bookingdetails);
	}

	@Override
	public Bookingdetails update(Bookingdetails bookingdetails) {
		// TODO Auto-generated method stub
		return bookingDetailDAO.save(bookingdetails);
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		bookingDetailDAO.deleteById(id);
	}

	@Override
	public Bookingdetails findById(Integer id) {
		// TODO Auto-generated method stub
		return bookingDetailDAO.findById(id).get();
	}
	
}
