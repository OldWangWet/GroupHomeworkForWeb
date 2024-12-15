package com.wst.advertisementv03.demos.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wst.advertisementv03.demos.entity.Fingerprint;
import com.wst.advertisementv03.demos.entity.Advertisement;
import com.wst.advertisementv03.demos.mapper.FingerprintMapper;
import com.wst.advertisementv03.demos.service.FingerprintService;
import com.wst.advertisementv03.demos.utils.TimeUtil;
import javafx.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 **/
@Service
public class FingerprintServiceImpl implements FingerprintService {

    @Autowired
    private FingerprintMapper fingerprintMapper;

    @Override
    public Page<Fingerprint> selectPage(Page<Fingerprint> page, QueryWrapper<Fingerprint> wrapper) {
        return fingerprintMapper.selectPage(page,wrapper);
    }


    @Override
    public Fingerprint addFingerprintInfo(Fingerprint fingerprint) {
        Fingerprint entity = new Fingerprint();
        entity.setMd5id(fingerprint.getMd5id());
        entity.setElectronics(fingerprint.getElectronics());
        entity.setEntertainment(fingerprint.getEntertainment());
        entity.setDailygoods(fingerprint.getDailygoods());
        entity.setFood(fingerprint.getFood());
        fingerprintMapper.addFingerprint(entity);
        return entity;
    }

    @Override
    public Fingerprint getOneFingerprint(String md5id) {
        Fingerprint fingerprint = fingerprintMapper.getFingerprintById(md5id);
        return fingerprint;
    }

    @Override
    public Advertisement getad(String md5id, int id) {
        // 初始化指纹数据
        fingerprintMapper.init(md5id);
        Fingerprint fingerprint = fingerprintMapper.getin(md5id);

        // 组装类别和对应的值
        // 初始化类别和对应的值
        List<String> categories = new ArrayList<>();
        List<Integer> values = new ArrayList<>();

        if (fingerprint.getElectronics() != null) {
            categories.add("electronics");
            values.add(fingerprint.getElectronics());
        }
        if (fingerprint.getEntertainment() != null) {
            categories.add("entertainment");
            values.add(fingerprint.getEntertainment());
        }
        if (fingerprint.getDailygoods() != null) {
            categories.add("dailygoods");
            values.add(fingerprint.getDailygoods());
        }
        if (fingerprint.getFood() != null) {
            categories.add("food");
            values.add(fingerprint.getFood());
        }

// 按值降序排序，同时调整两个数组
        int n = values.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (values.get(j) < values.get(j + 1)) { // 按值降序排序
                    // 交换值
                    int tempValue = values.get(j);
                    values.set(j, values.get(j + 1));
                    values.set(j + 1, tempValue);

                    // 同步交换类别
                    String tempCategory = categories.get(j);
                    categories.set(j, categories.get(j + 1));
                    categories.set(j + 1, tempCategory);
                }
            }
        }

// 根据排序后的类别查找广告
        for (int i = 0; i < n; i++) {
            String category = categories.get(i);
            Advertisement advertisement = fingerprintMapper.getad(category, id);
            if (advertisement != null) {
                return advertisement; // 找到对应的广告后立即返回
            }
        }

        return null; // 如果没有找到广告

    }


    @Override
    public int updOneFingerprint(Fingerprint fingerprint) {
        Fingerprint entity =new Fingerprint();
        entity.setMd5id(fingerprint.getMd5id());
        entity.setElectronics(fingerprint.getElectronics());
        entity.setEntertainment(fingerprint.getEntertainment());
        entity.setDailygoods(fingerprint.getDailygoods());
        entity.setFood(fingerprint.getFood());
        return fingerprintMapper.updateFingerprint(entity);
    }

}
