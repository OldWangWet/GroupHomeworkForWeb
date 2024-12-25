package com.wst.ecommercev02.demos.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wst.ecommercev02.demos.entity.Product;
import com.wst.ecommercev02.demos.service.ProductService;
import com.wst.ecommercev02.demos.utils.Code;
import com.wst.ecommercev02.demos.utils.R;
import com.wst.ecommercev02.demos.utils.TimeUtil;
import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.UUID;

//import static jdk.nashorn.internal.runtime.regexp.joni.Config.log;

/**
 *
 **/
@RestController
@RequestMapping("product")
public class ProductController {

    @Autowired
    private ProductService productService;

    /**
     * 时间格式化
     */
    private SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy/MM/dd/");

    /**
     * 图片保存路径
     */
    @Value("${file-save-path}")
    private String fileSavePath;


    @PostMapping("/upload")
    public R uploadPicture(@RequestParam("file") MultipartFile file, HttpServletRequest request) {

        String directory = simpleDateFormat.format(TimeUtil.getTime());



        File dir = new File(fileSavePath + directory);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        System.out.println("图片上传，保存的位置:" + fileSavePath + directory);


        String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
        String newFileName = UUID.randomUUID().toString().replaceAll("-", "") + suffix;


        File newFile = new File(fileSavePath + directory + newFileName);

        try {
            file.transferTo(newFile);

            String url = request.getScheme() + "://" + "localhost" + ":" + request.getServerPort() + "/images/" + directory + newFileName;
            System.out.println("图片上传，访问URL：" + url);
            return new R(Code.WORK_OK, "上传成功", url);
        } catch (IOException e) {
            return new R(Code.WORK_ERR, "IO异常");
        }
    }
    @PostMapping("/list/{current}/{pageSize}")
    public R selectPage(@PathVariable("current") long current,@PathVariable("pageSize") long pageSize,
                        @RequestBody Product product){
        //mybatis-plus分页
        Page<Product> page = new Page<>(current, pageSize);
        QueryWrapper<Product> wrapper = new QueryWrapper<>();

        String name = product.getName();
        if (!StringUtils.isEmpty(name)){
            wrapper.like("name",name);
        }

        Page<Product> result = productService.selectPage(page, wrapper);
        if (StringUtils.isEmpty(String.valueOf(result.getRecords()))){
            return new R(Code.WORK_ERR,"查询为空");
        }
        return new R(Code.WORK_OK,"操作成功",result);
    }

    @PostMapping("/add-one-product")
    public R addProductInfo(@RequestBody Product product){
        int flag = productService.addProductInfo(product);
        if (flag != 1){
            return new R(Code.WORK_ERR,"新增产品失败！");
        }else {
            return new R(Code.WORK_OK,"新增产品成功！");
        }
    }


    @GetMapping("/get-one-product/{id}")
    public R getOneProduct(@PathVariable("id") Integer id){
        Product result = productService.getOneProduct(id);
        if (!Strings.isNotEmpty(result.getName())){
            return new R(Code.WORK_ERR,"查询失败！");
        }
        return new R(Code.WORK_OK,"查询成功",result);
    }




    @PostMapping("/upd-one-product")
    public R updOneProduct(@RequestBody Product product){
        int flag = productService.updOneProduct(product);
        if (flag != 1){
            return new R(Code.WORK_ERR,"修改产品信息失败！");
        }else {
            return new R(Code.WORK_OK,"修改产品信息成功！");
        }
    }


}
