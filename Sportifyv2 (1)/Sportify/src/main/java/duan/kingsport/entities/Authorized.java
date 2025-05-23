/*
 * Created on 2023-06-14 ( 09:06:02 )
 * Generated by Telosys ( http://www.telosys.org/ ) version 3.3.0
 */
package duan.kingsport.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * JPA entity class for "Authorized"
 *
 * @author Telosys
 *
 */
@SuppressWarnings("serial")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="authorized", catalog="sportify", uniqueConstraints = {
		@UniqueConstraint(columnNames = {"username", "roleid"})} )
public class Authorized implements Serializable {

  

    //--- ENTITY PRIMARY KEY 
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="authorizedid", nullable=false)
    private Integer    authorizedid ;

    //--- ENTITY DATA FIELDS 
    @Column(name="username", nullable=false, length=16)
    private String     username ;

    @Column(name="roleid", nullable=false, length=10)
    private String     roleid ;


    //--- ENTITY LINKS ( RELATIONSHIP )

    @ManyToOne
    @JoinColumn(name="roleid", referencedColumnName="roleid", insertable=false, updatable=false)
    private Roles      roles ; 

    @ManyToOne
    @JoinColumn(name="username", referencedColumnName="username", insertable=false, updatable=false)
    private Users      users ; 


    

}
