package com.wst.advertisementv03.demos.controller;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wst.advertisementv03.demos.entity.Advertisement;
import com.wst.advertisementv03.demos.entity.Advertisement;
import com.wst.advertisementv03.demos.service.AdvertisementService;
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
@RequestMapping("advertisement")
public class AdvertisementController {
    @Autowired
    private AdvertisementService advertisementService;

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

    @GetMapping("/getadvertisements/{id}")
    public R getOneAdvertisement(@PathVariable("id") Integer id){
        List<Advertisement> result = advertisementService.getadvertisements(id);
        if (result==null){
            return new R(Code.WORK_ERR,"查询失败！");
        }
        return new R(Code.WORK_OK,"查询成功",result);
    }
    @PostMapping("/updateadvertisement/{id}")
    public R updOneAdvertisement(@PathVariable("id") Integer id, @RequestBody List<Advertisement> advertisements) {
        advertisementService.updateadvertisements(id, advertisements);
        int flag=0;
        if (flag != 1) {
            return new R(Code.WORK_ERR, "修改用户信息失败！");
        } else {
            return new R(Code.WORK_OK, "修改用户信息成功！");
        }
    }


}