$(function () {
    waterfall();
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    $(document).one('scroll',function(){
            if(checkscrollside()){
                $.getJSON("data/data.json",function (data) {
                    console.log(data);
                    if(data.status === 1){
                        $.each( data.data, function( index, value ){
                            var $oBox = $('<div>').addClass('box').appendTo( $( "#main" ) );
                            var $oPic = $('<div>').addClass('pic').appendTo( $oBox );
                            $('<img>').attr('src','img/' +value.imgSrc).appendTo($oPic);
                        });
                        waterfall();
                    }
                });

         }
    });
});
function waterfall() {
    var $aPin=$("#main>div");
    var iPinW=$aPin.eq(0).innerWidth();//获取每一列单个的宽度   width()返回的
    var num = Math.floor( $( window ).width() / iPinW );//每行中能容纳的pin个数【窗口宽度除以一个块框宽度】
    $( "#main" ).css({
       'width':iPinW * num ,
        'margin' :'0 auto'
    });
    var pinHArr=[];
    $aPin.each( function( index, value ){
        var pinH = $aPin.eq( index ).height();
        if( index < num ){
            pinHArr[ index ] = pinH; //第一行中的num个块框pin 先添加进数组pinHArr
        }else{
            var minH = Math.min.apply( null, pinHArr );//数组pinHArr中的最小值minH
            var minHIndex = $.inArray( minH, pinHArr );
            $( value ).css({
                'position': 'absolute',
                'top': minH + 15,
                'left': $aPin.eq( minHIndex ).position().left
            });
            //数组 最小高元素的高 + 添加上的aPin[i]块框高
            pinHArr[ minHIndex ] += $aPin.eq( index ).height() + 15;//更新添加了块框后的列高
        }
    });

}

function checkscrollside(){
    var $aPin = $( "#main>div" );
    var lastPinH = $aPin.last().get(0).offsetTop + Math.floor($aPin.last().height()/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop = $( window ).scrollTop();//注意解决兼容性
    var documentH = $( document ).width();//页面高度
    return (lastPinH < scrollTop + documentH ) ? true : false;//到达指定高度后 返回true，触发waterfall()函数
}