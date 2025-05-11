package duan.kingsport.service;

import java.util.List;

import org.springframework.stereotype.Service;

import duan.kingsport.entities.Authorized;



@Service
@SuppressWarnings("unused")

public interface AuthorizedService {
	List<Authorized> findAll();

	Authorized create(Authorized authorized);

	Authorized update(Authorized authorized);

	void delete(Integer id);
	
	Authorized findById(Integer id);
	
	Authorized findAllAuthorized(String username);
}
