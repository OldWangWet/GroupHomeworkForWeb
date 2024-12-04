package com.wst.advertisementv02.demos.controller;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wst.advertisementv02.demos.entity.User;
import com.wst.advertisementv02.demos.service.UserService;
import com.wst.advertisementv02.demos.utils.Code;
import com.wst.advertisementv02.demos.utils.R;
import com.wst.advertisementv02.demos.utils.TimeUtil;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("user")
public class UserController {
    @Autowired
    private UserService userService;


    @PostMapping("/list/{current}/{pageSize}")
    public R selectPage(@PathVariable("current") long current,@PathVariable("pageSize") long pageSize,
                        @RequestBody User user){
        //mybatis-plus分页
        Page<User> page = new Page<>(current, pageSize);
        QueryWrapper<User> wrapper = new QueryWrapper<>();

        String md5id = user.getMd5id();
        if (!StringUtils.isEmpty(md5id)){
            wrapper.eq("md5id",md5id);
        }
        wrapper.orderByDesc("id");

        Page<User> result = userService.selectPage(page, wrapper);
        if (StringUtils.isEmpty(String.valueOf(result.getRecords()))){
            return new R(Code.WORK_ERR,"查询为空");
        }
        return new R(Code.WORK_OK,"操作成功",result);
    }
    @PostMapping("/add-one-user")
    public R addUserInfo(@RequestBody User user){
        User flag = userService.addUserInfo(user);
        return new R(Code.WORK_OK,"新增用户成功！",flag);
    }
    @GetMapping("/get-one-user/{md5id}")
    public R getOneUser(@PathVariable("md5id") String md5id){
        User result = userService.getOneUser(md5id);
        if (result==null){
            return new R(Code.WORK_ERR,"查询失败！");
        }
        return new R(Code.WORK_OK,"查询成功",result);
    }
    @PostMapping("/upd-one-user")
    public R updOneUser(@RequestBody User user){
        int flag = userService.updOneUser(user);
        if (flag != 1){
            return new R(Code.WORK_ERR,"修改用户信息失败！");
        }else {
            return new R(Code.WORK_OK,"修改用户信息成功！");
        }
    }



}
