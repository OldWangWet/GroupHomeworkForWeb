package com.wst.newsv01.demos.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wst.newsv01.demos.entity.News;
import com.wst.newsv01.demos.mapper.NewsMapper;
import com.wst.newsv01.demos.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 **/
@Service
public class NewsServiceImpl implements NewsService {

    @Autowired
    private NewsMapper newsMapper;


    @Override
    public Page<News> selectPage(Page<News> page, QueryWrapper<News> wrapper) {
        return newsMapper.selectPage(page,wrapper);
    }


    @Override
    public int addNewsInfo(News news) {
        News entity = new News();
        entity.setId(news.getId());
        entity.setName(news.getName());
        entity.setPrice(news.getPrice());
        entity.setCategory(news.getCategory());
        entity.setDescription(news.getDescription());
        entity.setPrice(news.getPrice());
        return newsMapper.insert(entity);
    }


    @Override
    public News getOneNews(Integer id) {
        News news = newsMapper.selectById(id);
        return news;
    }



    @Override
    public int updOneNews(News news) {
        News entity = new News();
        entity.setId(news.getId());
        entity.setName(news.getName());
        entity.setPrice(news.getPrice());
        entity.setCategory(news.getCategory());
        entity.setDescription(news.getDescription());
        entity.setPrice(news.getPrice());
        return newsMapper.updateById(entity);
    }
}
