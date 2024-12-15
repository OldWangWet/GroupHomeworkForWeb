package com.wst.advertisementv03.demos.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wst.advertisementv03.demos.entity.Advertisement;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 *
 **/
@Mapper
public interface AdvertisementMapper{
    List<Advertisement> getadvertisements(Integer id);
    void emptyadvertisements(Integer id);
    void updateadvertisements(@Param("id") Integer id, @Param("advertisements") List<Advertisement> advertisements);
}
