package duan.kingsport.service;

import java.util.List;

import duan.kingsport.entities.Authorized;
import duan.kingsport.entities.Teamdetails;


@SuppressWarnings("unused")
public interface TeamDetailService {
	List<Teamdetails> findAll();

	Teamdetails create(Teamdetails teamdetails);

	Teamdetails update(Teamdetails teamdetails);

	void delete(Integer id);
	
	Teamdetails findById(Integer id);
}
