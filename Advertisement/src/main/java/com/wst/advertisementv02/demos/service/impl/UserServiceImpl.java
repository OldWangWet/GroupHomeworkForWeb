package com.wst.advertisementv02.demos.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wst.advertisementv02.demos.entity.User;
import com.wst.advertisementv02.demos.mapper.UserMapper;
import com.wst.advertisementv02.demos.service.UserService;
import com.wst.advertisementv02.demos.utils.TimeUtil;
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
        entity.setId(user.getId());
        entity.setName(user.getName());
        entity.setPassword(user.getPassword());
        entity.setMd5id(user.getMd5id());
        userMapper.insert(entity);
        return entity;
    }


    @Override
    public User getOneUser(String md5id) {
        Map<String, Object> map=new HashMap<>();
        map.put("md5id",md5id);//条件1
        List<User> users = userMapper.selectByMap(map);
        if(!users.isEmpty())
            return users.get(0);
        return null;
    }

    @Override
    public int updOneUser(User user) {
        User tmpuser = userMapper.selectById(user.getId());

        // 对 user 的字段进行 null 检查
        Integer newElectronicsValue = (tmpuser.getElectronics() != null ? tmpuser.getElectronics() : 0) + (user.getElectronics() != null ? user.getElectronics() : 0);
        Integer newClothingValue = (tmpuser.getClothing() != null ? tmpuser.getClothing() : 0) + (user.getClothing() != null ? user.getClothing() : 0);
        Integer newDailygoodsValue = (tmpuser.getDailygoods() != null ? tmpuser.getDailygoods() : 0) + (user.getDailygoods() != null ? user.getDailygoods() : 0);
        Integer newFoodValue = (tmpuser.getFood() != null ? tmpuser.getFood() : 0) + (user.getFood() != null ? user.getFood() : 0);

        User entity = new User();
        entity.setId(user.getId());
        entity.setName(user.getName());
        entity.setPassword(user.getPassword());
        entity.setMd5id(user.getMd5id());
        entity.setElectronics(newElectronicsValue);
        entity.setClothing(newClothingValue);
        entity.setDailygoods(newDailygoodsValue);
        entity.setFood(newFoodValue);
        return userMapper.updateById(entity);
    }

}
