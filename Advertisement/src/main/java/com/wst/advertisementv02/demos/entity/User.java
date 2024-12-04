package com.wst.advertisementv02.demos.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 *
 **/
@Data
@TableName("user")
public class User implements Serializable{
    private static final long serialVersionUID = 1L;

    /**
     * 主键
     */
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;

    /**
     * 名称
     */
    @TableField("name")
    private String name;

    /**
     * 密码
     */
    @TableField("password")
    private String password;

    /**
     * 标识
     */
    @TableField("md5id")
    private String md5id;

    /**
     * 数码
     */
    @TableField("electronics")
    private Integer electronics;

    /**
     * 服装
     */
    @TableField("clothing")
    private Integer clothing;

    /**
     * 日用品
     */
    @TableField("dailygoods")
    private Integer dailygoods;

    /**
     * 食品
     */
    @TableField("food")
    private Integer food;
}
