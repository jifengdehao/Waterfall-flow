window.onload=function(){
    waterfall('main','box');
    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    window.onscroll=function(){
        if(checkscrollside()){
             var oParent = document.getElementById('main');// 父级对象
             for(var i=0;i<dataInt.data.length;i++){
                   var oPin=document.createElement('div'); //添加 元素节点
                   oPin.className='box';                   //添加 类名 className
                    var oBox=document.createElement('div');
                    oBox.className='pic';
                    var oImg=document.createElement('img');
                     oImg.src='./img/'+dataInt.data[i].src;
                    oBox.appendChild(oImg);
                    oPin.appendChild(oBox);
                    oParent.appendChild(oPin)
             }
             waterfall('main','box');
         }
         console.log(document.getElementsByClassName("box").length);
    }
}

    /**
     *
     * @param parent
     * @param child
     */
function waterfall(parent,child){
    var oParent=document.getElementById(parent);// 父级对象
    var aPin=getClassObj(oParent,child);// 获取父级对象class为pic的元素
    var iPic=aPin[0].offsetWidth; //获取单个box的宽度
    var num=Math.floor(document.documentElement.clientWidth / iPic); //获取一行排的列数
    oParent.style.cssText='width:'+iPic * num+'px;margin:0 auto';
    var pinHArr=[];
    for(var i=0;i<aPin.length;i++) {
        if (i < num) {
            pinHArr[i] = aPin[i].offsetHeight;
        }
        else{
             var minH=Math.min.apply(null,pinHArr); //从第二行的第一个开始计算第一行的最少高度
             var minHindex=getminHIndex(pinHArr,minH);//获取第一行最少高度的索引
             aPin[i].style.position='absolute';
             aPin[i].style.top=minH+'px';
             aPin[i].style.left=aPin[minHindex].offsetLeft+'px';
             pinHArr[minHindex]+=aPin[i].offsetHeight;//更新添加了块框后的列高
        }
    }
}

/**
 *
 * @param parent
 * @param className
 * @return {Array} parent下的className的数组
 */
function getClassObj(parent,className){
    var aElements=parent.getElementsByTagName('*');//获取 父级的所有子集
    var picS=[];//创建一个数组 用于收集子元素
    for (var i=0;i<aElements.length;i++) {//遍历子元素、判断类别、压入数组
        if (aElements[i].className==className){
            picS.push(aElements[i]);
        }
    };
    return picS;
}
/**
 * 判断数组对应的下标
 * @param arr
 * @param minH
 * @return {string}
 */
function getminHIndex(arr,minH){
    for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
}
/**
 * 检查是否达到加载条件
 * @return {boolean}
 */

function checkscrollside() {
    var oParent = document.getElementById('main');
    var aPin = getClassObj(oParent, 'pic');
    var lastPinH = aPin[aPin.length - 1].offsetTop + Math.floor(aPin[aPin.length - 1].offsetHeight / 2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;//注意解决兼容性
    var documentH = document.documentElement.clientHeight;//页面高度
    return (lastPinH < scrollTop + documentH) ? true : false;//到达指定高度后 返回true，触发waterfall()函数
}