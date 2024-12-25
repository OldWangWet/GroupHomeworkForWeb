package com.wst.ecommercev02.demos.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wst.ecommercev02.demos.entity.Product;

/**
 *
 **/
public interface ProductService {


    Page<Product> selectPage(Page<Product> page, QueryWrapper<Product> wrapper);

    int addProductInfo(Product product);

    Product getOneProduct(Integer id);

    int updOneProduct(Product product);
}
