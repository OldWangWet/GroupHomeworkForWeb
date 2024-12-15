package com.wst.advertisementv03.demos.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wst.advertisementv03.demos.entity.Statistic;
import com.wst.advertisementv03.demos.mapper.StatisticMapper;
import com.wst.advertisementv03.demos.service.StatisticService;
import com.wst.advertisementv03.demos.utils.TimeUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 **/
@Service
public class StatisticServiceImpl implements StatisticService {

    @Autowired
    private StatisticMapper statisticMapper;


    @Override
    public Statistic addStatisticInfo(int id1,int id2,Statistic statistic) {
        Statistic entity = new Statistic();
        LocalDate today = LocalDate.now();

        // 提取年、月、日并转化为 Integer
        Integer year = today.getYear();
        Integer month = today.getMonthValue();
        Integer day = today.getDayOfMonth();
        entity.setCreateyear(year);
        entity.setCreatemonth(month);
        entity.setCreateday(day);
        entity.setOperation(statistic.getOperation());
        entity.setCategory(statistic.getCategory());
        statisticMapper.addStatistic1(id1,entity);
        statisticMapper.addStatistic2(id2,entity);
        return entity;
    }
    @Override
    public List<Statistic> getStatistic1(int id){
       return statisticMapper.getStatistic1(id);
    }
    @Override
    public List<Statistic> getStatistic2(int id){
        return statisticMapper.getStatistic2(id);
    }

    @Override
    public Integer findid(String customHeader){
        return statisticMapper.findid(customHeader);
    }


}
