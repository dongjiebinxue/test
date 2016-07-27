var simlist = {
    oneUrl: 'api/simCard/simlist.json',
    listUrl: 'api/simCard/simlist.json',
    delUrl: 'api/simCard/del.json',
    listId: '#grid-table',
    listPagerId: '#grid-pager'
};

simlist.edit = function (id) {
    crossroads.parse('simcard/simform');
}

simlist.remove = function (id) {
    console.log(id)
    $.iConfirm('您确定要删除吗？', function () {
        $.iAjax(simlist.delUrl, {}, function () {
            $.success();
        }, 'POST');
    })
}

simlist.seach = function (id) {
    $.get('src/tpl/common/filter.html', function (html) {
        var msg = juicer(html,{fields:[{name:'ID',code:'id'},{name:'IMSI',code:'imsi'}]});
        $.iDialog(msg, {
            "success": {
                "label": "<span class='icon-search'></span>查询",
                "className": "btn-sm btn-success",
                "callback": function () {
                    var fileds = $('ifly-filter').find('data-filed');
                    var ops = $('ifly-filter').find('data-op');
                    var vos = $('ifly-filter').find('data-vo');
                    var params = {};
                    $.each(fileds, function (i, o) {
                        if (vos[i] != '') {
                            params[o] = vos[i];
                        }
                    })
                    $(simlist.listId).setGridParam(params).trigger("reloadGrid");
                }
            },
            "button": {
                "label": "<span class='icon-retweet'></span>重置",
                "className": "btn-sm"
            }
        })
    })
}


$(function ($) {
    // 列表
    $(simlist.listId).iGrid({
        caption: "XXX列表",
        url: simlist.listUrl,
        colNames: [' ', 'ID', 'Last Sales', 'Name', 'Stock', 'Ship via', 'Notes'],
        colModel: [
            {
                name: '操作',
                index: '',
                width: 80,
                fixed: true,
                sortable: false,
                resize: false,
                formatter: function (cellvalue, options, rowObject) {
                    return $.getRowBtn(rowObject.id);
                }
            },
            {name: 'id', index: 'id', width: 60},
            {name: 'sdate', index: 'sdate', width: 90},
            {name: 'name', index: 'name', width: 150},
            {name: 'stock', index: 'stock', width: 70},
            {name: 'ship', index: 'ship', width: 90},
            {name: 'note', index: 'note', width: 150}
        ],
        pager: simlist.listPagerId
    });
    /**
     * 行内编辑功能
     */
    $(document).delegate('[ifly-edit]', 'click', function () {
        var id = $(this).attr('ifly-edit');
        simlist.edit(id);
    });

    /**
     * 行内删除功能
     */
    $(document).delegate('[ifly-remove]', 'click', function () {
        var id = $(this).attr('ifly-remove');
        simlist.remove(id);
    });

    // 工具栏
    $(simlist.listId).jqGrid('navGrid', simlist.listPagerId,
        {
            edit: false,
            editicon: 'icon-pencil blue',
            add: false,
            addicon: 'icon-plus-sign purple',
            del: false,
            delicon: 'icon-trash red',
            search: false,
            searchicon: 'icon-search orange',
            refresh: true,
            refreshicon: 'icon-refresh green',
            view: false,
            viewicon: 'icon-zoom-in grey'
        }
        )
        .navButtonAdd(simlist.listPagerId, {
            caption: "",
            buttonicon: "icon-trash red",
            onClickButton: function () {
                simlist.remove($(simlist.listId).jqGrid('getGridParam', 'selarrrow'));
            },
            position: "first"
        })
        .navButtonAdd(simlist.listPagerId, {
            caption: "",
            buttonicon: "icon-plus-sign purple",
            onClickButton: function () {
                crossroads.parse('simcard/simform');
            },
            position: "first"
        })
        .navButtonAdd(simlist.listPagerId, {
            caption: "",
            buttonicon: "icon-search orange",
            onClickButton: function () {
                simlist.seach();
            },
            position: "first"
        })
});
