$(function(){

    setActiveSectionsNavItem();

    $('.editable input').editable();

    $(window).on('resize', function(){
        if ($(window).width() > 991) {
            $('html').removeClass('nav-open');
        }
    });

    $.each($('.Nnavigation'), function(item, navi){
        beautifyPagination(navi);
    });

});
