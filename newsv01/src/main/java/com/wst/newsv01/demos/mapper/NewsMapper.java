package com.wst.newsv01.demos.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wst.newsv01.demos.entity.News;
import org.apache.ibatis.annotations.Mapper;

/**
 *
 **/
@Mapper
public interface NewsMapper extends BaseMapper<News> {
}
