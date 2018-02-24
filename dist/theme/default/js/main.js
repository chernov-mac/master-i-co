$(function(){

    $('#reviews.slick .reviews-inner').slick({
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 500,
        fade: false,
        arrows: false,
        dots: true,
        dotsClass: 'carousel-indicators slick-indicators',
        appendDots: $('#reviews.slick'),
        cssEase: 'ease-in-out',
        lazyLoading: 'progressive'
    });

    $('.header-slider').slick({
        initialSlide: 1,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 5000,
        speed: 800,
        fade: false,
        arrows: false,
        dots: false,
        cssEase: 'ease-in-out',
        lazyLoading: 'progressive'
    });

});
