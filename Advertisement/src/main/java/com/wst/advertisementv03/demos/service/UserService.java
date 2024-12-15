package com.wst.advertisementv03.demos.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wst.advertisementv03.demos.entity.Advertisement;
import com.wst.advertisementv03.demos.entity.User;

/**
 *
 **/
public interface UserService {

    Page<User>selectPage(Page<User> page, QueryWrapper<User> wrapper);

    User addUserInfo(User user);

    User getOneUser(Integer id);

    int updOneUser(User user);
}
