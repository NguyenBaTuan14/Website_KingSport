package duan.kingsport.service;

import java.util.List;

import duan.kingsport.entities.Authorized;
import duan.kingsport.entities.Roles;


@SuppressWarnings("unused")
public interface RoleService {
	List<Roles> findAll();

	Roles create(Roles roles);

	Roles update(Roles roles);

	void delete(String id);
	
	Roles findById(String id);
}
