package duan.kingsport.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import duan.kingsport.dao.AuthorizedDAO;
import duan.kingsport.dao.OrderDAO;
import duan.kingsport.dao.OrderDetailDAO;
import duan.kingsport.entities.Authorized;
import duan.kingsport.entities.Orderdetails;
import duan.kingsport.entities.Orders;
import duan.kingsport.service.AuthorizedService;
import duan.kingsport.service.OrderService;



@SuppressWarnings("unused")
@Service
public class OrderServiceImpl implements OrderService{
	@Autowired
	OrderDAO orderDAO;
	@Autowired
	OrderDetailDAO orderDetailDAO;

	@Override
	public List<Orders> findAll() {
		// TODO Auto-generated method stub
		return orderDAO.findAll();
	}

	@Override
	public Orders create(JsonNode orderData) {
		// TODO Auto-generated method stub
		ObjectMapper mapper = new ObjectMapper();
		
		Orders order = mapper.convertValue(orderData, Orders.class);
		orderDAO.save(order);
		
		TypeReference<List<Orderdetails>> type = new TypeReference<List<Orderdetails>>() {};
		List<Orderdetails> details = mapper.convertValue(orderData.get("orderDetails"), type).stream()
				.peek(d -> d.setOrders(order)).collect(Collectors.toList());
		orderDetailDAO.saveAll(details);
		
		return order;
	}

	@Override
	public Orders findById(Integer id) {
		// TODO Auto-generated method stub
		return orderDAO.findById(id).get();
	}
	
	@Override
	public Orders update(Orders orders) {
		// TODO Auto-generated method stub
		return orderDAO.save(orders);
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		orderDAO.deleteById(id);
	}

	@Override
	public List<Orders> findByUsername(String username) {
		return orderDAO.findByUsername (username);
	}

	

	

	
}
