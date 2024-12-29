package com.wst.newsv01.demos.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wst.newsv01.demos.entity.News;

/**
 *
 **/
public interface NewsService {


    Page<News> selectPage(Page<News> page, QueryWrapper<News> wrapper);

    int addNewsInfo(News news);

    News getOneNews(Integer id);

    int updOneNews(News news);
}
