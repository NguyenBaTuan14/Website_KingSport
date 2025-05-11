package duan.kingsport.service;

import java.util.List;

import duan.kingsport.entities.Products;



public interface ProductService {
	List<Products> findAll();

	Products create(Products products);

	Products update(Products products);

	void delete(Integer productid);
	
	
	
	Products findByCategory(Integer categoryid);

	Products findById(Integer productid);

	List<Products> findByCategoryId(Integer integer);



}
