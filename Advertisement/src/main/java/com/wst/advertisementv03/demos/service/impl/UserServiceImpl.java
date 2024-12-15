package com.wst.advertisementv03.demos.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wst.advertisementv03.demos.entity.User;
import com.wst.advertisementv03.demos.mapper.UserMapper;
import com.wst.advertisementv03.demos.service.UserService;
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
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public Page<User> selectPage(Page<User> page, QueryWrapper<User> wrapper) {
        return userMapper.selectPage(page,wrapper);
    }


    @Override
    public User addUserInfo(User user) {
        User entity = new User();
        entity.setUsername(user.getUsername());
        entity.setPassword(user.getPassword());
        entity.setImage(user.getImage());
        entity.setDescription(user.getDescription());
        entity.setProfitShare(user.getProfitShare());
        entity.setOriginurl(user.getOriginurl());
        userMapper.insert(entity);
        Integer id = entity.getId();
        userMapper.createtable(id);
        userMapper.createadlog(id);
        userMapper.createpublog(id);
        return entity;
    }

    @Override
    public User getOneUser(Integer id) {
        User user = userMapper.selectById(id);
        return user;
    }

    @Override
    public int updOneUser(User user) {
        User entity =new User();
        entity.setId(user.getId());
        entity.setUsername(user.getUsername());
        entity.setPassword(user.getPassword());
        entity.setImage(user.getImage());
        entity.setDescription(user.getDescription());
        entity.setProfitShare(user.getProfitShare());
        entity.setLogdatain(user.getLogdatain());
        entity.setLogdataout(user.getLogdataout());
        entity.setApiEndpoint(user.getApiEndpoint());
        entity.setOriginurl(user.getOriginurl());
        entity.setGeneratedTraffic(user.getGeneratedTraffic());
        entity.setReceivedTraffic(user.getReceivedTraffic());
        entity.setGeneratedRevenue(user.getGeneratedRevenue());
        entity.setReceivedRevenue(user.getReceivedRevenue());
        return userMapper.updateById(entity);
    }

}
