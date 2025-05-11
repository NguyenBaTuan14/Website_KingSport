package duan.kingsport.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import duan.kingsport.dao.AuthorizedDAO;
import duan.kingsport.dao.UserDAO;
import duan.kingsport.entities.Authorized;
import duan.kingsport.entities.Users;
import duan.kingsport.service.AuthorizedService;
import duan.kingsport.service.UserService;

@SuppressWarnings("unused")
@Service
public class UserServiceImpl implements UserService{
	@Autowired
	UserDAO userDAO;

	@Override
	public List<Users> findAll() {
		// TODO Auto-generated method stub
		return userDAO.findAll();
	}

	@Override
	public Users create(Users users) {
		// TODO Auto-generated method stub
		return userDAO.save(users);
	}

	@Override
	public Users update(Users users) {
		// TODO Auto-generated method stub
		return userDAO.save(users);
	}

	@Override
	public void delete(String id) {
		// TODO Auto-generated method stub
		userDAO.deleteById(id);
	}

	@Override
	public Users findById(String id) {
		// TODO Auto-generated method stub
		return userDAO.findById(id).get();
	}

	@Override
	public Object findByUsername(String username) {
		// TODO Auto-generated method stub
		return userDAO.findByUsername(username);
	}
	
}
