package com.wst.advertisementv03.demos.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wst.advertisementv03.demos.entity.Advertisement;
import com.wst.advertisementv03.demos.entity.Fingerprint;
import com.wst.advertisementv03.demos.entity.Advertisement;

/**
 *
 **/
public interface FingerprintService {


    Page<Fingerprint>selectPage(Page<Fingerprint> page, QueryWrapper<Fingerprint> wrapper);

    Fingerprint addFingerprintInfo(Fingerprint fingerprint);

    Fingerprint getOneFingerprint(String md5id);

    Advertisement getad(String md5id,int id);

    int updOneFingerprint(Fingerprint fingerprint);
}
