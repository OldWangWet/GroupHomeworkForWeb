package com.wst.advertisementv03.demos.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wst.advertisementv03.demos.entity.Advertisement;
import com.wst.advertisementv03.demos.entity.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 *
 **/
@Mapper
public interface UserMapper extends BaseMapper<User> {
    public void createtable(Integer id);
    public void createadlog(Integer id);
    public void createpublog(Integer id);

}
