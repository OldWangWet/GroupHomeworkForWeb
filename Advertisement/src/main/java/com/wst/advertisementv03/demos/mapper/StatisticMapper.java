package com.wst.advertisementv03.demos.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wst.advertisementv03.demos.entity.Statistic;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
/**
 *
 **/
@Mapper
public interface StatisticMapper extends BaseMapper<Statistic> {

    void addStatistic1(@Param("id") Integer id,@Param("statistic") Statistic statistic);
    void addStatistic2(@Param("id") Integer id,@Param("statistic") Statistic statistic);
    List<Statistic> getStatistic1(@Param("id") Integer id);
    List<Statistic> getStatistic2(@Param("id") Integer id);
    Integer findid(@Param("customHeader") String customHeader);
}
