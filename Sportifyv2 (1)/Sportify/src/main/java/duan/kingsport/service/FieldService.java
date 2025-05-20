package duan.kingsport.service;

import java.util.List;

import duan.kingsport.entities.Field;
import duan.kingsport.entities.Shifts;





@SuppressWarnings("unused")
public interface FieldService {
	List<Field> findAll();

	List<Field> findBySporttypeId(String cid);
	Field create(Field fields);

	Field update(Field fields);

	void delete(Integer id);
	
	Field findById(Integer id);

	
	List<Field> findSearch(String dateInput, String categorySelect, Integer shiftSelect);
	
	List<Field> findSearchAdd(String dateInput, String categorySelect, Integer shiftSelect, String area);
	
	List<Field> findFieldById(Integer id);
	
	List<Field> findBySporttypeIdlimit3(String cid);
	String findNameSporttypeById(Integer id);
	
	String findIdSporttypeById(Integer id);
	
}
