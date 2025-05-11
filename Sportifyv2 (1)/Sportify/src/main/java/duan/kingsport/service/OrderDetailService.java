package duan.kingsport.service;

import java.util.List;

import duan.kingsport.entities.Authorized;
import duan.kingsport.entities.Orderdetails;


@SuppressWarnings("unused")
public interface OrderDetailService {
	List<Orderdetails> findAll();

	Orderdetails create(Orderdetails orderdetails);

	Orderdetails update(Orderdetails orderdetails);

	void delete(Integer id);
	
	Orderdetails findById(Integer id);
}
