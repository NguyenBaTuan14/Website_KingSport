package duan.kingsport.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import duan.kingsport.dao.AuthorizedDAO;
import duan.kingsport.dao.VoucherDAO;
import duan.kingsport.entities.Authorized;
import duan.kingsport.entities.Voucher;
import duan.kingsport.service.AuthorizedService;
import duan.kingsport.service.VoucherService;

@SuppressWarnings("unused")
@Service
public class VoucherServiceImpl implements VoucherService{
	@Autowired
	VoucherDAO voucherDAO;

	@Override
	public List<Voucher> findAll() {
		// TODO Auto-generated method stub
		return voucherDAO.findAll();
	}

	@Override
	public Voucher create(Voucher voucher) {
		// TODO Auto-generated method stub
		return voucherDAO.save(voucher);
	}

	@Override
	public Voucher update(Voucher voucher) {
		// TODO Auto-generated method stub
		return voucherDAO.save(voucher);
	}

	@Override
	public void delete(String id) {
		// TODO Auto-generated method stub
		voucherDAO.deleteById(id);
	}

	@Override
	public Voucher findById(String id) {
		// TODO Auto-generated method stub
		return voucherDAO.findById(id).get();
	}

	@Override
	public List<Voucher> findByVoucherId(String voucherid) {
		// TODO Auto-generated method stub
		return voucherDAO.findByVoucherId(voucherid);
	}
	
}
