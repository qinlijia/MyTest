$(function () {

    // 六边形图标
    var myChart3 = echarts.init(document.getElementById('six_item'));
    // 指定图表的配置项和数据
    option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            x: 'center',
            y: 'bottom',
            data: ['现在的', '原来的'],
            itemWidth: 15,
            itemHeight: 4,
            itemGap: 50,
            textStyle: {
                color: '#333',
                fontSize: '12',
            }
        },
        radar: {
            shape: 'circle',
            center: ['50%', '42%'],
            radius: 65,
            name: {
                textStyle: {
                    color: '#000',
                    fontSize: '14',
                    fontWeight: 'bold',
                    backgroundColor: '#fff',
                    borderRadius: 3,
                }
            },
            splitArea: {
                areaStyle: {
                    shadowColor: '#fff',
                    shadowBlur: 10
                }
            },
            axisLine: {
                lineStyle: {
                    color: '#999',
                    width: '3',
                    shadowColor: '#fff',
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#999',
                    width: '3',
                    shadowColor: '#fff',
                }
            },
            indicator: [
                {name: '', max: 50000},
                {name: '', max: 50000},
                {name: '', max: 50000},
                {name: '', max: 50000},
                {name: '', max: 50000},
                {name: '', max: 50000},
            ]
        },
        series: [{
            type: 'radar',
            data: [
                {
                    value: [22500, 25400, 25750, 24400, 50000, 16650],
                    name: '现在的',
                    lineStyle: {
                        normal: {
                            // type: 'dashed',
                            width: 4,
                            color: '#aacbdb'
                        }
                    },
                    areaStyle: {
                        normal: {
                            opacity: 0.5,
                            color: '#aacbdb'
                        }
                    }
                },
                {//这是原来的数据
                    value: [34995, 37390, 28978, 29798, 30073, 37593],
                    name: '原来的',
                    symbol: 'rect',
                    symbolSize: 4,
                    lineStyle: {
                        normal: {
                            width: 2,
                            type: 'dashed',
                            color: '#ef2e3c'
                        }
                    }
                }
            ]
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart3.setOption(option);



    // 饼图绘制
    //绘制饼图
    var drawCircle = function(canvasId, data_arr, color_arr, text_arr){
        var drawing = document.getElementById(canvasId);
        // console.log(canvasId, data_arr, color_arr, text_arr)
        if(drawing.getContext) {
            var context = drawing.getContext('2d');
            var radius = drawing.height/2 -10,//半径
                ox = radius +10, oy = radius +10;//圆心
            var width = 30, height = 10, //图例宽高
                posX = ox * 2 +20, posY = 30;//图例位置
            var textX = posX + width + 5, textY = posY + 10;//文本位置
            var startAngle = -Math.PI/2, endAngle = 0;//起始、结束弧度
            context.strokeStyle = '#fff';
            context.lineWidth = 3;
            context.strokeRect(0, 0, drawing.width, drawing.height);
            for(var i=0, len=data_arr.length; i<len; i++) {
                //绘制初始圆
                context.fillStyle = '#fbfbfb';
                context.beginPath();
                context.moveTo(ox, oy);
                context.arc(ox, oy, radius, startAngle, 2*Math.PI , false);
                context.closePath();
                context.fill();
                //绘制饼图
                endAngle += data_arr[i] * 2*Math.PI;
                context.fillStyle = color_arr[i];
                context.beginPath();
                context.moveTo(ox, oy);
                context.arc(ox, oy, radius, startAngle, endAngle-Math.PI/2, false);
                context.closePath();
                context.fill();
                startAngle = endAngle;
                //绘制图例
                context.fillRect(posX, posY + 20 * i, width, height);
                context.moveTo(posX, posY + 20 * i);
                context.font = 'bold 12px Arial';
                var percent = text_arr[i] + ' : ' + data_arr[i]*100 + '%';
                context.fillText(percent, textX, textY + 20 * i);
                //绘制文字
                context.fillStyle = '#fff';
                context.moveTo(ox, oy + 20 * i);
                context.font = 'bold 14px Arial';
                var percent = data_arr[i]*100;
                context.fillText(percent, ox, oy+15);
            }

        }
    };

    var data_arr=[],color_arr=[],text_arr=[];
    $('.gallery-container>.swiper-wrapper>.swiper-slide').each(function(i,d){
       var itemData= $(this).find('canvas').data('number')/100;
       var itemID= $(this).find('canvas').attr('id');
       var itemColor= '#ffd153';
       var itemName=$(this).find('.item-name').text().trim();
        data_arr[0]=itemData;
        color_arr[0]=itemColor;
        text_arr[0]=itemName;
        drawCircle(itemID, data_arr, color_arr, text_arr);
    })

    // 轮播效果
    var galleryTop = new Swiper('.gallery-container', {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }, ation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 5,
        touchRatio: 0.2,
        loop: true,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        coverflowEffect: {
            rotate:0,
            stretch: 0,
            depth: 130,
            modifier: 1,
            slideShadows : false,
        },
        loopedSlides: 5, //looped slides should be the same
        slideToClickedSlide: true,
    });
    galleryTop.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryTop;


    // bmi 阴影效果
    var LX = $('#littleFdj').position().left+$('.bmi-sign-bar .bar-line').position().left+$('#littleFdj').width()/2;
    var LY =$('#littleFdj').position().top+$('.bmi-sign-bar .bar-line').position().top+$('#littleFdj').height()/2;
    var bigX1=$('.celiang .p1').width();
    var bigY1=$('.rule-content').offset().top-$('#bimShadow').offset().top+$('.fdj-img').height()*.3;
    var bigX2= $('.celiang .p2').width();
    var bigY2=$('.rule-content').offset().top-$('#bimShadow').offset().top+$('.fdj-img').height()*.02;


    var w1 = $('.bmi-data-container').width();
    var h1 = $('.bmi-data-container').height();
    $('#bimShadow').attr('width', w1);
    $('#bimShadow').attr('height', h1);
    var bg = document.getElementById('bimShadow');
    var ctx = bg.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(LX,LY);
    ctx.lineTo(bigX1,bigY1);
    ctx.lineTo(bigX2,bigY2);
    ctx.closePath();//闭合路径
    ctx.lineWidth=0;//线的边框为10像素
    ctx.strokeStyle = "rgba(242,242,242,.85)";
    ctx.fillStyle="rgba(242,242,242,.85)";
    ctx.fill();
    ctx.stroke();//绘制定义的图形
    console.log(LX,$('.celiang p').width())

})