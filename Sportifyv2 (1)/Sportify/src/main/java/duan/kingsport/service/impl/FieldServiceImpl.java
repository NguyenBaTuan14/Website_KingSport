package duan.kingsport.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import duan.kingsport.dao.FieldDAO;
import duan.kingsport.entities.Field;
import duan.kingsport.entities.Shifts;
import duan.kingsport.service.FieldService;


@SuppressWarnings("unused")
@Service
public class FieldServiceImpl implements FieldService{
	@Autowired
	FieldDAO fieldDAO;
	
	@Override
	public List<Field> findAll() {
		// TODO Auto-generated method stub
		return fieldDAO.findAll();
	}
	@Override
	public Field findById(Integer id) {
		// TODO Auto-generated method stub
		return fieldDAO.findById(id).get();
	}
	@Override
	public List<Field> findBySporttypeId(String cid) {
		// TODO Auto-generated method stub
		return fieldDAO.findBySporttypeId(cid);
	}
	@Override
	public Field create(Field fields) {
		// TODO Auto-generated method stub
		return fieldDAO.save(fields);
	}

	@Override
	public Field update(Field fields) {
		// TODO Auto-generated method stub
		return fieldDAO.save(fields);
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		fieldDAO.deleteById(id);
	}
	@Override
	public List<Field> findSearch(String dateInput, String categorySelect, Integer shiftSelect) {
		// TODO Auto-generated method stub
		return fieldDAO.findSearch(dateInput, categorySelect, shiftSelect);
	}
	@Override
	public List<Field> findFieldById(Integer id) {
		// TODO Auto-generated method stub
		return fieldDAO.findFieldById(id);
	}
	@Override
	public String findNameSporttypeById(Integer id) {
		// TODO Auto-generated method stub
		return fieldDAO.findNameSporttypeById(id);
	}
	@Override
	public String findIdSporttypeById(Integer id) {
		// TODO Auto-generated method stub
		return fieldDAO.findIdSporttypeById(id);
	}
	@Override
	public List<Field> findBySporttypeIdlimit3(String cid) {
		// TODO Auto-generated method stub
		return fieldDAO.findBySporttypeIdlimit3(cid);
	}
	@Override
	public List<Field> findSearchAdd(String dateInput, String categorySelect, Integer shiftSelect, String area) {
		// TODO Auto-generated method stub
		return fieldDAO.findSearchAdd(dateInput, categorySelect, shiftSelect, area);
	}
	
	
	


	
	
}
