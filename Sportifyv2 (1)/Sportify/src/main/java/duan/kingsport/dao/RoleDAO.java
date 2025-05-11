package duan.kingsport.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import duan.kingsport.entities.Roles;

public interface RoleDAO extends JpaRepository<Roles, String>{
	
}
