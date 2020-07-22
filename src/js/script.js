// const { on } = require("gulp");

$(document).ready(function(){
    //slider
    $('.carousel__slider').slick({
        prevArrow:'<button type="button" class="prev"><img src="/img/icons/slider-arrow.png"></button>',
        nextArrow:'<button type="button" class="next"><img src="/img/icons/slider-arrow.png"></button>',
        responsive:[
            {
                breakpoint: 992,
                settings: {
                    arrows:false,
                    dots: true
                }
            }
        ]
    }
        
    );
    //tabs
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
    //slide of items
    function toogleSlide(item){
        $(item).each(function(i){
            $(this).on('click',function(e){
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__list_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    };
    toogleSlide('.catalog-item__link');
    toogleSlide('.catalog-item__back');
    //opening consultation window
    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').css("display", "flex").hide().fadeIn();
    });
    //closing modal window
    $('.modal__close').on('click', function(){
        $('.overlay,#consultation,#order,#thanks').fadeOut();
    });
    //opening order modal window
    $('.catalog-item__btn').on('click', function(){
        $('.overlay, #order').css("display", "flex").hide().fadeIn();
    });
    $('.catalog-item__btn').each(function(i){
        $(this).on('click', function(){
            $('#order .modal__subtitle').text($('.catalog-item__title').eq(i).text());
            $('.overlay,#order').fadeIn();
        });  
    });
//    form mask
    $('input[name=phone]').mask('+7 (999) 999-99-99');
//    validating function
    function validator(form){
        $(form).validate({
        rules:{
            name:{
                required:true,
                minlength:2
            },
            phone:'required',
            email:{
                required:true,
                email:true
            }
        },
        messages:{
            name:{
                required:'Введите имя',
                minlength:jQuery.validator.format('Минимум {0} символа')
            },
            phone:'Введите номер телефона',
            email:{
                required:'Введите почту',
                email:'Некоректный адрес'
            }
        }
    });
    }
    validator('#consultation .feed-form');
    validator('#order .feed-form');
    validator('.consultation__content .feed-form');


    $('.feed-form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type:"POST",
            url:"mailer/smart.php",
            data:$(this).serialize()
            
        }).done(function(){
            $(this).find("input").val("hui");
            $('#consultation,#order').fadeOut();
            $('.overlay,#thanks').css("display", "flex").hide().fadeIn();
            $('.feed-form').trigger('reset');
        });
        return false;
    });
    //scrool to top
    $(window).scroll(function(){
        if($(this).scrollTop()>1600){
            $('.pageup').fadeIn();
        }
        else{
            $('.pageup').fadeOut();
        } 
    });
    $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html,body").animate({scrollTop:$(_href).offset().top+"px"});
        return false;
    });
    new WOW().init();
});