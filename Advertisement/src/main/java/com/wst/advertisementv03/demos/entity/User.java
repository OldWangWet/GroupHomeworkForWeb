package com.wst.advertisementv03.demos.entity;

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
     * 身份
     */
    @TableField("role")
    private Integer role;

    /**
     * 名称
     */
    @TableField("username")
    private String username;

    /**
     * 密码
     */
    @TableField("password")
    private String password;

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

    /**
     * apiEndpoint
     */
    @TableField("apiEndpoint")
    private String apiEndpoint;

    /**
     * profitShare
     */
    @TableField("profitShare")
    private Integer profitShare;

    /**
     * logdatain
     */
    @TableField("logdatain")
    private String logdatain;

    /**
     * logdataout
     */
    @TableField("logdataout")
    private String logdataout;

    /**
     * originurl
     */
    @TableField("originurl")
    private String originurl;

    private Integer generatedTraffic;
    private Integer receivedTraffic;
    private Integer generatedRevenue;
    private Integer receivedRevenue;
}
