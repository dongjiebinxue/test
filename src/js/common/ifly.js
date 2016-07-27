/**
 * 封装公共的部分
 */
!(function ($) {
    /**
     * 初始化所有内容
     * @param root
     */
    $.init = function (root) {
        $.initTag();
    }
    /**
     * 初始化自定义标签
     */
    $.initTag = function () {
        /**
         * 加载html片断
         */
        $('[ifly-src]').each(function () {
            $this = $(this);
            var src = $this.attr('ifly-src');
            $.ajax({
                url: src,
                async: false,
                success: function (html) {
                    $this.html(html);
                }
            });
        });
    }

    /**
     * 成功提示框
     * @param msg 提示信息
     * @param title 标题
     */
    $.success = function (msg, title) {
        $.msg({
            title: title || '提示',
            text: msg || '操作成功',
            sticky: false,
            time: 500,
            class_name: 'gritter-success gritter-center'
        });
    }

    /**
     * 错误提示框
     * @param msg 提示信息
     * @param title 标题
     */
    $.error = function (msg, title) {
        $.msg({
            title: title || '提示',
            text: msg || '操作失败',
            sticky: false,
            time: 500,
            class_name: 'gritter-error gritter-center'
        });
    }

    /**
     * 警告提示框
     * @param msg 提示信息
     * @param title 标题
     */
    $.warning = function (msg, title) {
        $.msg({
            title: title || '提示',
            text: msg || '出现异常',
            sticky: false,
            time: 500,
            class_name: 'gritter-warning gritter-center'
        });
    }

    /**
     * 信息提示框
     * @param msg 提示信息
     * @param title 标题
     */
    $.info = function (msg, title) {
        $.msg({
            title: title || '提示',
            text: msg || '出现异常',
            sticky: false,
            time: 500,
            class_name: 'gritter-info gritter-center'
        });
    }

    /**
     * 基础消息提示框
     * @param opts 参数列表
     */
    $.msg = function (opts) {
        var defalutOpts = {
            title: '提示',
            text: '...',
            class_name: 'gritter-light gritter-center',
            image: '',
            sticky: true,
            time: '',
            before_open: function () {
            },
            after_open: function (e) {
            },
            before_close: function (e) {
            },
            after_close: function () {
            }
        };
        $.gritter.add($.extend({}, defalutOpts, opts));
    }

    /**
     * 关闭所有的旋转spinner
     */
    $.closeiSpinner = function () {
        $('.ifly-spinner').hide();
    }

    $.getRowBtn = function (id) {
        var _btn = '<div style="margin-left:8px;">' +
            '<div title="编辑所选记录" style="float:left;cursor:pointer;"' +
            'class="ui-pg-div ui-inline-edit"' +
            'ifly-edit="' + id + '"' +
            'onmouseover="$(this).addClass(\'ui-state-hover\');"' +
            'onmouseout="$(this).removeClass(\'ui-state-hover\')">' +
            '<span class="ui-icon ui-icon-pencil"></span>' +
            '</div>' +
            '<div title="删除所选记录" style="float:left;margin-left:5px;"' +
            'class="ui-pg-div ui-inline-del"' +
            'ifly-remove="' + id + '"' +
            'onmouseover="$(this).addClass(\'ui-state-hover\');"' +
            'onmouseout="$(this).removeClass(\'ui-state-hover\');"><span class="ui-icon ui-icon-trash">' +
            '</span>' +
            '</div>' +
            '</div>'
        return _btn;
    }

    $.fn.extend({
        iSpinner: function (opts) {
            var defalutOpts = {
                color: '#000'
            };
            var _this = $(this);
            var _spinner = new Spinner($.extend({}, defalutOpts, opts)).spin(_this[0])
            return {
                stop: function () {
                    _this.hide();
                    _spinner.stop();
                },
                obj: _spinner
            };
        },
        iGrid: function (opts) {
            var defalutOpts = {
                jsonReader: {
                    records: "data.total",
                    root: "data.rows"
                },
                prmNames: [],//请求参数
                datatype: "json",
                height: 500,
                colNames: [],
                colModel: [],
                viewrecords: true,
                rowNum: 20,
                rowList: [10, 20, 50, 100],
                altRows: true,
                multiselect: true,
                multiboxonly: true,
                caption: "表格",
                autowidth: true,
                loadComplete: function () {
                    var table = this;
                    setTimeout(function () {
                        var replacement =
                        {
                            'ui-icon-seek-first': 'icon-double-angle-left bigger-140',
                            'ui-icon-seek-prev': 'icon-angle-left bigger-140',
                            'ui-icon-seek-next': 'icon-angle-right bigger-140',
                            'ui-icon-seek-end': 'icon-double-angle-right bigger-140'
                        };
                        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function () {
                            var icon = $(this);
                            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

                            if ($class in replacement) icon.attr('class', 'ui-icon ' + replacement[$class]);
                        })
                    }, 0);
                },
            };
            $(this).jqGrid($.extend({}, defalutOpts, opts));
        }
    })

    /**
     * 输入对话框
     * @param msg
     * @param ok
     * @param cancle
     */
    $.iPrompt = function (msg, ok, cancle) {
        bootbox.prompt(msg, function (result) {
            if (result) {
                if (ok && $.isFunction(ok)) {
                    ok.apply(this, result);
                }
            } else {
                if (cancle && $.isFunction(cancle)) {
                    cancle.apply(this, result);
                }
            }
        });
    }

    /**
     * 提示对话框
     * @param msg
     * @param ok
     * @param cancle
     */
    $.iAlert = function (msg, ok, cancle) {
        bootbox.alert(msg, function (result) {
            if (result) {
                if (ok && $.isFunction(ok)) {
                    ok.call(ok, result);
                }
            } else {
                if (cancle && $.isFunction(cancle)) {
                    cancle.call(cancle, result);
                }
            }
        });
    }

    /**
     * 确认对话框
     * @param msg
     * @param ok
     * @param cancle
     */
    $.iConfirm = function (msg, ok, cancle) {
        bootbox.confirm(msg, function (result) {
            if (result) {
                if (ok && $.isFunction(ok)) {
                    ok.call(ok, result);
                }
            } else {
                if (cancle && $.isFunction(cancle)) {
                    cancle.call(cancle, result);
                }
            }
        });
    }

    /**
     * 自定义对话框
     * @param msg
     * @param btns
     */
    $.iDialog = function (msg, btns) {
        bootbox.dialog({
            message: msg,
            buttons: btns
        });
    }

    /**
     * 启动初始化
     */
    $(function () {
        $.init();

        $(document).delegate('[ifly-filter-add]', 'click', function () {
            var tbody = $(this).parents('[ifly-filter]').find('tbody');
            tbody.append($('[data-filter-temp]').html());
        });

        $(document).delegate('[ifly-filter-del]', 'click', function () {
            $(this).parent().parent().remove();
        });

    });
})($);