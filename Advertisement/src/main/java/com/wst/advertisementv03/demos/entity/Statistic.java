package com.wst.advertisementv03.demos.entity;
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
@TableName("Statistic")
public class Statistic {
    private static final long serialVersionUID = 1L;
    private Integer id;
    private Integer createyear;
    private Integer createmonth;
    private Integer createday;
    private Integer operation;
    private String category;
}
