// 로딩 애니메이션1
// var i=0;
//    var timer = setInterval(add,20)

//    function add(){
//     i++
//     if(i>100){
//         clearInterval(timer)
//             $('.introAni').fadeOut(500)
//         return false
//     }
//     $('.introAni .box > p').eq(1).text(i+'%')  
//     $('.introAni .box .barani').css({
//         width: i +"%"
//     })
// }

// 로딩 애니메이션2
$(window).on('load', function(){
    setTimeout(function(){
        $('.introBox').fadeOut(500)
    }, 1000)
})
$('.introBox').on('click', function(){
    $(this).fadeOut(100)
})



// 메인슬라이드 : 슬릭슬라이더 연결
$('.slide-group').slick({
    autoplay:true,
    dots:true,
    autoplaySpeed:4500,
    pauseOnFocus:false,
    arrows:true,
    prevArrow:'<button class="prev"><i class="fas fa-angle-left"></i></button>',
    nextArrow:'<button class="next"><i class="fas fa-angle-right"></i></button>',
})

var portNear = $('#portfolio').offset().top
var skillNear = $('#skills').offset().top
var skillNearAni = skillNear -  $(window).height() / 2
// var contactNear = $('#contact').offset().top
var lastNear = $('body').height() - $(window).height()   //마지막구역높이가 화면보다 작을때 쓰는 공식
$('.nav .depth1 > li').on('click', function(e){
    e.preventDefault()
    // $(this).addClass('on').siblings().removeClass('on')
    var num = $(this).index()
    // if (num===0) {
    //     $('html').animate({scrollTop: 0}, 500)
    // } else if (num===1){
    //     $('html').animate({scrollTop: portNear}, 500)
    // } else if (num===2){
    //     $('html').animate({scrollTop: skillNear}, 500)
    // } else {
    //     $('html').animate({scrollTop: lastNear}, 500)
    // }
    switch(num) {
        case 0 : $('html').stop().animate({scrollTop: 0}, 500); break;
        case 1 : $('html').stop().animate({scrollTop: portNear}, 500); break;
        case 2 : $('html').stop().animate({scrollTop: skillNear}, 500); break;
        case 3 : $('html').stop().animate({scrollTop: lastNear}, 500); break;
    }
})

function draw(jumsu, cname){
    var count=0;
    var stop = setInterval(function(){
        count++
        if (count <= jumsu) {
            $(cname).find('.myscore').text(count+'%')
            .css({height: count+'%'})
        } else {clearInterval(stop)}
                return false
    },10)

    
}

$(window).on('scroll', function(){
    var sct = $(this).scrollTop()
    if ( sct < portNear ) {
        $('.depth1 > li').eq(0).addClass('on')
        .siblings().removeClass('on')
    } else if ( sct>=portNear && sct<skillNear ) {
        $('.depth1 > li').eq(1).addClass('on')
        .siblings().removeClass('on')
        $('.skillContainer').removeClass('on').find('.myscore').css({
            height:'0%'
        })
    } else if ( sct>=skillNear && sct<lastNear ) {
        $('.depth1 > li').eq(2).addClass('on')
        .siblings().removeClass('on')
        if ( !$('.skillContainer').hasClass('on') ) {
            $('.skillContainer').addClass('on')
            draw(90, '.html')
            draw(80, '.css')
            draw(70, '.script')
            draw(60, '.jquery')
            draw(50, '.react')
        }
    } else {
        $('.depth1 > li').eq(3).addClass('on')
        .siblings().removeClass('on')
        $('.skillContainer').removeClass('on').find('.myscore').css({
            height:'0%'
        })
    }


})


$('.section').on('mousewheel', function(e, delta){
    // 0보다 크면 위로, 0보다 작으면 아래로
    if (delta>0) {  
        var prev = $(this).prev().offset().top
        $('html').stop().animate({
            scrollTop:prev
        }, 500, 'linear')
    } else if (delta<0) {
        var next = $(this).next().offset().top
        $('html').stop().animate({
            scrollTop:next
        }, 500, 'linear')
    }
})

    //사진 클릭시 팝업 모달박스 나오도록
var linum
$('.gallery li').on('click', function(e){
    e.preventDefault()
    linum = $(this).index()
    var href = $(this).find('a').attr('href')
    var src = $(this).find('img').attr('src')
    var alt = $(this).find('img').attr('alt')
    $('body').append('<div class="outbox"><div class="inbox"></div></div>')
    $('.outbox').css({
        position:'fixed', top:0, left:0, right:0, bottom:0,
        zIndex:'999999', background:'rgba(0,0,0,0.8)'
    })
    $('.inbox').css({
        position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)'
    })
    .append(`<a href="${href}" target="_blank"><img src="${src}" alt="${alt}"></a>`)
    .append('<button class="close"><i class="fas fa-times-circle"></i></button>')
    .append('<button class="arrow prev"><i class="fas fa-angle-left"></i></button><button class="arrow next"><i class="fas fa-angle-right"></i></button>')
    $('.inbox .close').css({
        position:'absolute', top:'-10px', right:'-10px',
        background:'none', border:'none', fontSize:'40px', color:'#fff'
    })
    $('.inbox .prev').css({
        position:'absolute', top:'50%', left:'50%', marginLeft:'-330px', marginTop:'-20px',
        background:'none', border:'none', fontSize:'40px', color:'#fff'
    })
    $('.inbox .next').css({
        position:'absolute', top:'50%', right:'50%', marginRight:'-330px', marginTop:'-20px',
        background:'none', border:'none', fontSize:'40px', color:'#fff'
    })
})

$('body').on('click', '.inbox .close, .outbox', function(){
    $('.outbox').remove()
})

$('body').on('click', '.inbox', function(e){
    e.stopPropagation()
})


function gallery(indexnum){
    var href = $('.gallery li').eq(indexnum).find('a').attr('href')
    var src = $('.gallery li').eq(indexnum).find('img').attr('src')
    var alt = $('.gallery li').eq(indexnum).find('img').attr('alt')
    $('.inbox').find('a').attr({href:href})
    $('.inbox').find('img').attr({src:src, alt:alt})
}

//사진 반복 7은 li갯수
$('body').on('click', '.inbox .next', function(){
    linum++
    if (linum>7) {    //if (linum === $('.gallery li').length)으로 해도됨
        linum = 0
    }
    gallery(linum)
})


$('body').on('click', '.inbox .prev', function(){
    linum--
    if (linum<0) {
        linum = 7
    }
    gallery(linum)
})
