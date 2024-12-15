package com.wst.advertisementv03.demos.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wst.advertisementv03.demos.entity.Advertisement;
import com.wst.advertisementv03.demos.mapper.AdvertisementMapper;
import com.wst.advertisementv03.demos.service.AdvertisementService;
import com.wst.advertisementv03.demos.utils.TimeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 **/
@Service
public class AdvertisementServiceImpl implements AdvertisementService {

    @Autowired
    private AdvertisementMapper advertisementMapper;


    @Override
    public List<Advertisement> getadvertisements(Integer id){
        return advertisementMapper.getadvertisements(id);
    }

    @Override
    public void updateadvertisements(Integer id, List<Advertisement> list){
        advertisementMapper.emptyadvertisements(id);
        advertisementMapper.updateadvertisements(id, list);
    }

}
