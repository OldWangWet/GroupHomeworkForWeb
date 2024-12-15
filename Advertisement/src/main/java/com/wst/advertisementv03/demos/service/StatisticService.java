package com.wst.advertisementv03.demos.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wst.advertisementv03.demos.entity.Advertisement;
import com.wst.advertisementv03.demos.entity.Statistic;

import java.util.List;

/**
 *
 **/
public interface StatisticService {

    Statistic addStatisticInfo(int id1,int id2,Statistic statistic);
    List<Statistic> getStatistic1(int id);
    List<Statistic> getStatistic2(int id);
    Integer findid(String customHeader);
}
