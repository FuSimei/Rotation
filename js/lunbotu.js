var oLi = $('.wrapper .content div'),
    oLtBtn = $('.wrapper .btn .ltBtn'),
    oRtBtn = $('.wrapper .btn .rtBtn'),
    $li = $('.wrapper .radio ul li'),
    len = $li.length,
    timer,
    initTimer,
    num = 0;


// 设置最开始图片div样式
function init(oIndex) {
	oLi.css({'width':'310px', 'height':'200px', 'top':'50%', 'margin-top':'-100px', 'left':'900px','z-index':1});
	oLi.eq(num % 8).css({'left':0, 'opacity':0.6});
	oLi.eq((num+1) % 8).css({'width':'430px', 'height':'280px', 'top':'50%', 'margin-top':'-140px','left':'240px', 'opacity':1, 'z-index':100});
	$li.eq((num+1) % 8).prop('class','actRadio')
	oLi.eq((num+2) % 8).css({'left':'590px', 'opacity':0.6});
}

// 当图片向左运动时
// 让左边的图片先出去接到最右边（第一张（此时第二张正中间）），剩下的依次往左动
function leftMove() {
    oLi.css({'z-index':1});
    $li.prop('class','radio')
	oLi.eq(num % 8).css({'left':'900px'});
	oLi.eq((num+1) % 8).animate({'left':0, 'opacity':0.6,'width':'310px', 'height':'200px', 'top':'50%', 'margin-top':'-100px'});
    oLi.eq((num+2) % 8).css('z-index',100);
    oLi.eq((num+2) % 8).animate({'width':'430px', 'height':'280px', 'top':'50%', 'margin-top':'-140px','left':'240px', 'opacity':1});
    $li.eq((num+2) % 8).prop('class','actRadio')
    oLi.eq((num+3) % 8).animate({'left':'590px', 'opacity':0.6,'width':'310px', 'height':'200px', 'top':'50%', 'margin-top':'-100px'});
    num++;
    // $('li').removeClass()
}

// 当图片向右运动时
// 让右边的图片先出去接到最左边（第三张（此时第二张正中间）），剩下的依次往右动
function rightMove() {
	oLi.css({'z-index':1});
    $li.prop('class','radio');
	oLi.eq((num+2) % 8).css({'left':'-310px'});
	oLi.eq((num+7) % 8).animate({'left':0, 'opacity':0.6,'width':'310px', 'height':'200px', 'top':'50%', 'margin-top':'-100px'});
	oLi.eq(num % 8).css('z-index',100);
	oLi.eq(num % 8).animate({'width':'430px', 'height':'280px', 'top':'50%', 'margin-top':'-140px','left':'240px', 'opacity':1});
	$li.eq(num % 8).prop('class','actRadio')
	oLi.eq((num+1) % 8).animate({'left':'590px', 'opacity':0.6,'width':'310px', 'height':'200px', 'top':'50%', 'margin-top':'-100px'});
	num--;
}
// rightMove()


init();
// 设置定时器让图片按一定规律运动
var timer = setInterval(leftMove, 2000);

// 点击事件 右边图标  左边  小圆点
// 每次点击前清楚定时器 点击时执行运动函数 点击完成后在按原来的规律运动
oLtBtn.on('click', function() {
	clearInterval(timer);
	rightMove();
	timer = setInterval(leftMove, 2000);
});
oRtBtn.on('click', function() {
    clearInterval(timer);
	leftMove();
	timer = setInterval(leftMove, 2000);
});


// 点击前先清楚定时器  获取小圆点的索引
// 执行函数的实参为索引 -1  
for(var i = 0; i < len; i++) {
	$li.on('click',  function() {
	// console.log($(this).index());
    	
	clearInterval(timer);

	oIndex = $(this).index() - 1;
	num = oIndex;
 //    oLi.css({'z-index':1});
    
	// oLi.eq(oIndex-2).css({'left':'-310px'});
	// oLi.eq(oIndex-1).animate({'left':0, 'opacity':0.6,'width':'310px', 'height':'200px', 'top':'50%', 'margin-top':'-100px'});
 //    oLi.eq(oIndex).animate({'width':'430px', 'height':'280px', 'top':'50%', 'margin-top':'-140px','left':'240px', 'opacity':1, 'z-index':100});
 //    $li.eq(oIndex).prop('class','actRadio')
 //    oLi.eq(oIndex+1).animate({'left':'590px', 'opacity':0.6,'width':'310px', 'height':'200px', 'top':'50%', 'margin-top':'-100px'});
  
  
    initTimer = setTimeout(function() {
    	// $li.prop('class','radio')
    	// init(num);
    },300)
  
    timer = setInterval(function() {
    	// leftMove(oIndex + 1);
    	$li.prop('class','radio')
    	init(num);
    	leftMove();
    }, 2000);
    // timer = setTimeout(leftMove, 2000);
})
}
