$(function () {
    crossroads.addRoute('simcard/{code}', function(code) {
        $.get('src/tpl/simcard/'+code+'.html',function(html){
            $('[ifly-view]').html(html);
        })
    });

    crossroads.addRoute('simcard/{code}/{id}', function(code,id) {
        $.get('src/tpl/simcard/'+code+'.html',function(html){
            $('[ifly-view]').html(html);
        })
    });

    crossroads.addRoute('common/{code}', function(code) {
        $.get('src/tpl/common/'+code+'.html',function(html){
            $('[ifly-view]').html(html);
        })
    });

    $('[ifly-href]').each(function () {
        this.onclick = function (e) {
            e.preventDefault();
            crossroads.parse($(this).attr('ifly-href'));
        }
    })
 /*   bootbox.prompt("What is your name?", function(result) {
        if (result === null) {
            //Example.show("Prompt dismissed");
        } else {
            //Example.show("Hi <b>"+result+"</b>");
        }
    });*/


    /*crossroads.parse('simcard/ddd');*/
});