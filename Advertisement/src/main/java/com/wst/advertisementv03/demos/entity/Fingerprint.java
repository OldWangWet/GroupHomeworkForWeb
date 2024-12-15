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
@TableName("fingerprint")
public class Fingerprint implements Serializable{
    private static final long serialVersionUID = 1L;
    private String md5id;
    private Integer electronics;
    private Integer entertainment;
    private Integer dailygoods;
    private Integer food;


}
