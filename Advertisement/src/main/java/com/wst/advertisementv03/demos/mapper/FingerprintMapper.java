package com.wst.advertisementv03.demos.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.wst.advertisementv03.demos.entity.Advertisement;
import com.wst.advertisementv03.demos.entity.Fingerprint;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 *
 **/
@Mapper
public interface FingerprintMapper extends BaseMapper<Fingerprint> {
    int addFingerprint(@Param("fingerprint") Fingerprint fingerprint);
    Fingerprint getFingerprintById(@Param("md5id") String md5id);
    int updateFingerprint(@Param("fingerprint") Fingerprint fingerprint);
    void init(@Param("md5id") String md5id);
    Fingerprint getin(@Param("md5id") String md5id);
    Advertisement getad(@Param("category") String category, @Param("id") Integer id);

}
