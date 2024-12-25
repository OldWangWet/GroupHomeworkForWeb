package com.wst.ecommercev02.demos.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wst.ecommercev02.demos.entity.Product;
import com.wst.ecommercev02.demos.mapper.ProductMapper;
import com.wst.ecommercev02.demos.service.ProductService;
import com.wst.ecommercev02.demos.utils.TimeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 **/
@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductMapper productMapper;


    @Override
    public Page<Product> selectPage(Page<Product> page, QueryWrapper<Product> wrapper) {
        return productMapper.selectPage(page,wrapper);
    }


    @Override
    public int addProductInfo(Product product) {
        Product entity = new Product();
        entity.setId(product.getId());
        entity.setName(product.getName());
        entity.setPrice(product.getPrice());
        entity.setCategory(product.getCategory());
        entity.setDescription(product.getDescription());
        entity.setPrice(product.getPrice());
        return productMapper.insert(entity);
    }


    @Override
    public Product getOneProduct(Integer id) {
        Product product = productMapper.selectById(id);
        return product;
    }



    @Override
    public int updOneProduct(Product product) {
        Product entity = new Product();
        entity.setId(product.getId());
        entity.setName(product.getName());
        entity.setPrice(product.getPrice());
        entity.setCategory(product.getCategory());
        entity.setDescription(product.getDescription());
        entity.setPrice(product.getPrice());
        return productMapper.updateById(entity);
    }
}
