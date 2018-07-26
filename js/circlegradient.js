function gradientColor(startColor,endColor,step){
    startRGB = this.colorRgb(startColor);//转换为rgb数组模式
    startR = startRGB[0];
    startG = startRGB[1];
    startB = startRGB[2];

    endRGB = this.colorRgb(endColor);
    endR = endRGB[0];
    endG = endRGB[1];
    endB = endRGB[2];

    sR = (endR-startR)/step;//总差值
    sG = (endG-startG)/step;
    sB = (endB-startB)/step;

    var colorArr = [];
    for(var i=0;i<step;i++){
        //计算每一步的hex值
        var hex = this.colorHex('rgb('+parseInt((sR*i+startR))+','+parseInt((sG*i+startG))+','+parseInt((sB*i+startB))+')');
        colorArr.push(hex);
    }
    return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
gradientColor.prototype.colorRgb = function(sColor){
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = sColor.toLowerCase();
    if(sColor && reg.test(sColor)){
        if(sColor.length === 4){
            var sColorNew = "#";
            for(var i=1; i<4; i+=1){
                sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for(var i=1; i<7; i+=2){
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
        }
        return sColorChange;
    }else{
        return sColor;
    }
};

// 将rgb表示方式转换为hex表示方式
gradientColor.prototype.colorHex = function(rgb){
    var _this = rgb;
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if(/^(rgb|RGB)/.test(_this)){
        var aColor = _this.replace(/(?:(|)|rgb|RGB)*/g,"").split(",");
        var strHex = "#";
        for(var i=0; i<aColor.length; i++){
            var hex = Number(aColor[i]).toString(16);
            hex = hex<10 ? 0+''+hex :hex;// 保证每个rgb的值为2位
            if(hex === "0"){
                hex += hex;
            }
            strHex += hex;
        }
        if(strHex.length !== 7){
            strHex = _this;
        }
        return strHex;
    }else if(reg.test(_this)){
        var aNum = _this.replace(/#/,"").split("");
        if(aNum.length === 6){
            return _this;
        }else if(aNum.length === 3){
            var numHex = "#";
            for(var i=0; i<aNum.length; i+=1){
                numHex += (aNum[i]+aNum[i]);
            }
            return numHex;
        }
    }else{
        return _this;
    }
}



//  圆
//获取渐变颜色
var timershow=1;
var gradientA = new gradientColor('#ff3c03','#ff9e14',100)
    ,gradientB = new gradientColor('#ff9e14','#ff9e14',100)

function JDT(settings) {
   var  gradient=gradientA.concat(gradientB),
        vM=0;
    var defaultSetting={
        canvasId:'',   //id
        boxWidthEle:'.canvas-circle',     //盒子元素
        startColor:'#ff3c03',
        middleColor:'#ff9e14',
        endColor:'#ff9e14'

    };
    var option=$.extend({},defaultSetting,settings);
    // console.log(option)

    var w = $(option.boxWidthEle).width(), r = w / 2 - 10, c = w / 2;
    $(option.boxWidthEle+' canvas').attr('width', w);
    $(option.boxWidthEle+' canvas').attr('height', w);
    var score =  $(option.boxWidthEle+' .score').html() * 2;
    var ctx = document.getElementById(option.canvasId).getContext("2d");
    // 画低圆
    ctx.beginPath();
    ctx.strokeStyle = '#e7f6ff';
    ctx.lineWidth =13;
    ctx.arc(c, c, r, -0.5 * Math.PI, 1.5 * Math.PI);
    ctx.stroke();
    //画开始的小圆
    ctx.beginPath();
    ctx.strokeStyle = "#ff3c03";
    ctx.lineWidth =8.5;
    ctx.arc(r + 10 + r * Math.cos(0 / 100 * Math.PI), r + 12+ r * Math.sin(0 / 100 * Math.PI), 2.5, 0, 2 * Math.PI);
    ctx.fillStyle = '#ff3c03'
    ctx.fill();
    ctx.stroke();
    //画外圆
    var i=0;

    var timer= setInterval(function(){
        i+=1;
        vM += 0.01;
        ctx.beginPath();
        ctx.strokeStyle = gradient[i];
        ctx.lineWidth = 13;
        ctx.arc(c, c, r, (vM - 0.01) * Math.PI, vM * Math.PI);
        ctx.stroke();
        if(i>=score){
            //画结束的圆
            ctx.beginPath();
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 6.5;
            ctx.arc(r + 10+ r * Math.cos(i / 100 * Math.PI), r + 10 + r * Math.sin(i / 100 * Math.PI), 4.5, 0, 2 * Math.PI);
            ctx.fillStyle = '#fff'
            ctx.fill();
            ctx.stroke();
            clearInterval(timer);
        }

    },25)
    timershow=2;
}


//调用圆函数


JDT({
    canvasId:'myCanvas2',   //id
    boxWidthEle:'.canvas-box2',     //盒子元素
});
JDT({
    canvasId:'myCanvas1',   //id
    boxWidthEle:'.canvas-box1',     //盒子元素
});
JDT({
    canvasId:'myCanvas3',   //id
    boxWidthEle:'.canvas-box3',     //盒子元素
});



