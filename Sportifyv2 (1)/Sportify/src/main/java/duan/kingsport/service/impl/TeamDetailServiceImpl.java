package duan.kingsport.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import duan.kingsport.dao.AuthorizedDAO;
import duan.kingsport.dao.TeamDetailDAO;
import duan.kingsport.entities.Authorized;
import duan.kingsport.entities.Teamdetails;
import duan.kingsport.service.AuthorizedService;
import duan.kingsport.service.TeamDetailService;

@SuppressWarnings("unused")
@Service
public class TeamDetailServiceImpl implements TeamDetailService{
	@Autowired
	TeamDetailDAO teamDetailDAO;

	@Override
	public List<Teamdetails> findAll() {
		// TODO Auto-generated method stub
		return teamDetailDAO.findAll();
	}

	@Override
	public Teamdetails create(Teamdetails teamdetails) {
		// TODO Auto-generated method stub
		return teamDetailDAO.save(teamdetails);
	}

	@Override
	public Teamdetails update(Teamdetails teamdetails) {
		// TODO Auto-generated method stub
		return teamDetailDAO.save(teamdetails);
	}

	@Override
	public void delete(Integer id) {
		// TODO Auto-generated method stub
		teamDetailDAO.deleteById(id);
	}

	@Override
	public Teamdetails findById(Integer id) {
		// TODO Auto-generated method stub
		return teamDetailDAO.findById(id).get();
	}
	
}
