package com.wst.advertisementv03.demos.controller;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wst.advertisementv03.demos.entity.Statistic;
import com.wst.advertisementv03.demos.entity.Advertisement;
import com.wst.advertisementv03.demos.service.StatisticService;
import com.wst.advertisementv03.demos.utils.Code;
import com.wst.advertisementv03.demos.utils.R;
import com.wst.advertisementv03.demos.utils.TimeUtil;
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
import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("statistic")
public class StatisticController {
    @Autowired
    private StatisticService statisticService;

    @Value("${file-save-path}")
    private String fileSavePath;

    @PostMapping("/upload")
    public R uploadImage(@RequestParam("file") MultipartFile file, HttpServletRequest request) {

        File dir = new File(fileSavePath);
        if (!dir.exists()) {
            dir.mkdirs();
        }
        System.out.println("图片上传，保存的位置:" + fileSavePath );

        String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
        String newFileName = UUID.randomUUID().toString().replaceAll("-", "") + suffix;

        File newFile = new File(fileSavePath  + newFileName);
        try {
            file.transferTo(newFile);

            String url = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + "/images/"  + newFileName;
            System.out.println("图片上传，访问URL：" + url);
            return new R(Code.WORK_OK, "上传成功", url);
        } catch (IOException e) {
            return new R(Code.WORK_ERR, "IO异常");
        }
    }

    @PostMapping("/add-one-statistic/{id1}")
    public R addStatisticInfo(
            @PathVariable Integer id1,
            @RequestBody Statistic statistic,
            @RequestHeader("Content-Type") String contentType, // 获取指定的请求头
            @RequestHeader(value = "Custom-Header", required = false) String customHeader // 获取自定义头
    ) {
        // 打印请求头
        System.out.println("Content-Type: " + contentType);
        System.out.println("Custom-Header: " + customHeader);

        Integer id2=statisticService.findid(customHeader);

        if(id2==null)id2=1;

        // 业务逻辑
        Statistic flag = statisticService.addStatisticInfo(id1,id2,statistic);
        return new R(Code.WORK_OK, "新增用户成功！", flag);
    }
    @GetMapping("/getadlog/{id}")
    public R getadlog(@PathVariable("id") Integer id){
        List<Statistic>result=statisticService.getStatistic1(id);
        if (result==null){
            return new R(Code.WORK_ERR,"查询失败！");
        }
        return new R(Code.WORK_OK,"查询成功",result);
    }
    @GetMapping("/getpublog/{id}")
    public R getpublog(@PathVariable("id") Integer id){
        List<Statistic>result=statisticService.getStatistic2(id);
        if (result==null){
            return new R(Code.WORK_ERR,"查询失败！");
        }
        return new R(Code.WORK_OK,"查询成功",result);
    }
}
