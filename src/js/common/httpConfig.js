/**
 * 主要用于与后端数据的交互，带进度条
 */
!(function () {
    /**
     * 异步请求全局配置
     */
    $.ajaxSetup({
        cache: false,
        timeout: 40000, //超时时间：40秒
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (textStatus == "timeout")
                $.error("网络连接超时！");
            else if (XMLHttpRequest.status == 550)
                $.error("550 Error Message");
            else if (XMLHttpRequest.status == "403")
                $.error("您没有权限访问该资源！");
            else if (XMLHttpRequest.status == "404")
                $.error("您访问的地址或页面不存在！");
            else if (XMLHttpRequest.status == "500") {
                $.warning("维护人员正在抢修中，稍后再试...");
                console.group("错误信息");
                console.log(XMLHttpRequest.responseText);
                console.groupEnd();
            } else
                $.warning("维护人员正在抢修中，稍后再试...");
        }
    });

    /**
     * IAjax 默认参数
     */
    var defalutOpts = {
        url: '',
        data: {},
        type: 'GET',
        dataType: 'JSON',
        beforeSend: function (xhr) {
            $('[data-spinner]').iSpinner();
        },
        success: function (result, status, xhr) {
            dealResult(result, status, xhr);
        },
        complete: function (xhr, status) {
            $.closeiSpinner();
        }
    };


    /**
     * Ajax参数配置
     * @param obj [必填] 可以是string或object类型,当为string类型表示Url,为object类型表示options
     * @param data 请求参数
     * @param success 成功处理
     * @param method 请求方法
     * @param fail 失败处理
     */
    $.iAjax = function (obj, data, success, method, fail) {
        //当为string类型表示Url
        if (typeof obj == 'string') {
            var opts = {
                url: obj,
                data: data ? data : {},
                type: method ? method : 'GET',
                success: function (result, status, xhr) {
                    dealResult(result, status, xhr, success, fail);
                }
            }
            $.ajax($.extend({}, defalutOpts, opts));
        } else if (typeof obj == 'object') {
            //为object类型表示options
            var opts = $.extend({}, defalutOpts, obj);
            opts.success = function (result, status, xhr) {
                dealResult(result, status, xhr, obj.success, obj.fail);
            };
            $.ajax(opts);
        } else {
            console.error('iAjax参数配置有误！' + obj);
        }
    }

    /**
     * 处理请求结果
     * @param result 请求结果
     * @param status 请求状态
     * @param xhr 请求异常
     * @param success 成功处理
     * @param fail 失败处理
     */
    function dealResult(result, status, xhr, success, fail) {
        try {
            if (result.code == 0) {
                if (success && $.isFunction(success)) {
                    success.apply(this, arguments);
                }
            } else if (result.code == '1001' || !$.checkNull(result.code)) {
                $.warning("维护人员正在抢修中，稍后再试...");
            } else {
                if (fail && $.isFunction(fail)) {
                    fail.apply(this, arguments);
                } else {
                    $.warning(result.msg);
                }
            }
        } catch (e) {
            if (typeof window.console !== 'undefined') {
                $.warning("维护人员正在抢修中，稍后再试...");
                console.error(e);
            }
        }
    }
})($);