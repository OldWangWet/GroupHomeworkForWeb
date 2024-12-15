package com.wst.advertisementv03.demos.entity;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.io.Serializable;
@Data
//@TableName("alladvertisement")
public class Advertisement implements Serializable{
    private static final long serialVersionUID = 1L;
    @TableId(value = "id",type = IdType.AUTO)
    private Integer id;
    private String name;
    private String category;
    private String description;
    private String image;
    private String jumpurl;
    private Integer impressions;
    private Integer clicks;
    private Integer conversions;
}
