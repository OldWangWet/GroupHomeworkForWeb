package com.wst.advertisementv02.demos.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wst.advertisementv02.demos.entity.User;

/**
 *
 **/
public interface UserService {


    Page<User>selectPage(Page<User> page, QueryWrapper<User> wrapper);

    User addUserInfo(User user);

    User getOneUser(String md5id);


    int updOneUser(User user);
}
