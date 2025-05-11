package duan.kingsport.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import duan.kingsport.dao.AuthorizedDAO;
import duan.kingsport.dao.OrderDetailDAO;
import duan.kingsport.entities.Authorized;
import duan.kingsport.entities.Orderdetails;
import duan.kingsport.service.AuthorizedService;
import duan.kingsport.service.OrderDetailService;

@SuppressWarnings("unused")
@Service
public class OrderDetailServiceImpl implements OrderDetailService{
	@Autowired
	OrderDetailDAO orderDetailDAO;

	@Override
	public List<Orderdetails> findAll() {
		// TODO Auto-generated method stub
		return orderDetailDAO.findAll();
	}

	@Override
	public Orderdetails create(Orderdetails orderdetails) {
		// TODO Auto-generated method stub
		return orderDetailDAO.save(orderdetails);
	}

	@Override
	public Orderdetails update(Orderdetails orderdetails) {
		// TODO Auto-generated method stub
		return orderDetailDAO.save(orderdetails);
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		orderDetailDAO.deleteById(id);
	}

	@Override
	public Orderdetails findById(Integer id) {
		// TODO Auto-generated method stub
		return orderDetailDAO.findById(id).get();
	}
	
}
