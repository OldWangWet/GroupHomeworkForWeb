package com.wst.advertisementv03.demos.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wst.advertisementv03.demos.entity.Advertisement;

import java.util.List;

/**
 *
 **/
public interface AdvertisementService {
    List<Advertisement> getadvertisements(Integer id);
    void updateadvertisements(Integer id, List<Advertisement> list);
}
