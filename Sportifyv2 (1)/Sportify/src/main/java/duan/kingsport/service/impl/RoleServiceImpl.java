package duan.kingsport.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import duan.kingsport.dao.AuthorizedDAO;
import duan.kingsport.dao.RoleDAO;
import duan.kingsport.entities.Authorized;
import duan.kingsport.entities.Roles;
import duan.kingsport.service.AuthorizedService;
import duan.kingsport.service.RoleService;

@SuppressWarnings("unused")
@Service
public class RoleServiceImpl implements RoleService{
	@Autowired
	RoleDAO roleDAO;

	@Override
	public List<Roles> findAll() {
		// TODO Auto-generated method stub
		return roleDAO.findAll();
	}

	@Override
	public Roles create(Roles roles) {
		// TODO Auto-generated method stub
		return roleDAO.save(roles);
	}

	@Override
	public Roles update(Roles roles) {
		// TODO Auto-generated method stub
		return roleDAO.save(roles);
	}

	@Override
	public void delete(String id) {
		// TODO Auto-generated method stub
		roleDAO.deleteById(id);
	}

	@Override
	public Roles findById(String id) {
		// TODO Auto-generated method stub
		return roleDAO.findById(id).get();
	}
}
