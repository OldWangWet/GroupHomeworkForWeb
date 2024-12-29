package com.wst.newsv01.demos.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wst.newsv01.demos.entity.News;
import com.wst.newsv01.demos.service.NewsService;
import com.wst.newsv01.demos.utils.Code;
import com.wst.newsv01.demos.utils.R;
import com.wst.newsv01.demos.utils.TimeUtil;
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
@RequestMapping("news")
public class NewsController {

    @Autowired
    private NewsService newsService;

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
                        @RequestBody News news){
        //mybatis-plus分页
        Page<News> page = new Page<>(current, pageSize);
        QueryWrapper<News> wrapper = new QueryWrapper<>();

        String name = news.getName();
        if (!StringUtils.isEmpty(name)){
            wrapper.like("name",name);
        }

        Page<News> result = newsService.selectPage(page, wrapper);
        if (StringUtils.isEmpty(String.valueOf(result.getRecords()))){
            return new R(Code.WORK_ERR,"查询为空");
        }
        return new R(Code.WORK_OK,"操作成功",result);
    }

    @PostMapping("/add-one-news")
    public R addNewsInfo(@RequestBody News news){
        int flag = newsService.addNewsInfo(news);
        if (flag != 1){
            return new R(Code.WORK_ERR,"新增产品失败！");
        }else {
            return new R(Code.WORK_OK,"新增产品成功！");
        }
    }


    @GetMapping("/get-one-news/{id}")
    public R getOneNews(@PathVariable("id") Integer id){
        News result = newsService.getOneNews(id);
        if (!Strings.isNotEmpty(result.getName())){
            return new R(Code.WORK_ERR,"查询失败！");
        }
        return new R(Code.WORK_OK,"查询成功",result);
    }




    @PostMapping("/upd-one-news")
    public R updOneNews(@RequestBody News news){
        int flag = newsService.updOneNews(news);
        if (flag != 1){
            return new R(Code.WORK_ERR,"修改产品信息失败！");
        }else {
            return new R(Code.WORK_OK,"修改产品信息成功！");
        }
    }


}
