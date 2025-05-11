package duan.kingsport.service;

import java.util.List;

import duan.kingsport.entities.Authorized;
import duan.kingsport.entities.Field;
import duan.kingsport.entities.Sporttype;


@SuppressWarnings("unused")
public interface SportTypeService {
	List<Sporttype> findAll();

	Sporttype create(Sporttype sporttype);

	Sporttype update(Sporttype sporttype);

	void delete(String id);
	
	List<Sporttype> findSporttypeById(String id);
	

}
