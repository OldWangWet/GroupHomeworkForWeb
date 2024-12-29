package com.wst.newsv01.demos.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

/**
 *
 **/
@Data
@TableName("News")
public class News implements Serializable{
    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;

    /**
     * 图片
     */
    @TableField("name")
    private String name;

    /**
     * 图片
     */
    @TableField("price")
    private double price;

    /**
     * 图片
     */
    @TableField("category")
    private String category;


    /**
     * 图片
     */
    @TableField("image")
    private String image;

    /**
     * 描述
     */
    @TableField("description")
    private String description;


}
