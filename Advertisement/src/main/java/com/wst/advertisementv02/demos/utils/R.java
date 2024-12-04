package com.wst.advertisementv02.demos.utils;

public class R {

    private String code;
    private String message;
    private Object data;

    public R() {
    }

    public R(String code, String message) {
        this.code = Code.WORK_OK;
        this.message = message;
    }

    public R(String code, String message, Object data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }


}
