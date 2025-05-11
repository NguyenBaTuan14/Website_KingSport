package duan.kingsport.service;

import java.util.List;

import duan.kingsport.entities.Authorized;
import duan.kingsport.entities.Teams;


@SuppressWarnings("unused")
public interface TeamService {
	List<Teams> findAll();

	Teams create(Teams teams);

	Teams update(Teams teams);

	void delete(Integer id);
	
	Teams findById(Integer id);
}
