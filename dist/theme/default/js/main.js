$(function(){

    setActiveSectionsNavItem();

    $('.editable input').editable();
    $('.amount input').amount();

    $(window).on('resize', function(){
        if ($(window).width() > 991) {
            $('html').removeClass('nav-open');
        }
    });

    $.each($('.Nnavigation'), function(item, navi){
        beautifyPagination(navi);
    });

    // Checkbox controlling collapse panel
    $('.panel-control input[type="checkbox"]').on('change', function(event) {
        // event.stopPropagation();
        if ($(this).is(':checked')) {
            $('.collapse' + $(this).closest('.panel-control').data('panel-control')).stop().slideDown('fast');
        } else {
            $('.collapse' + $(this).closest('.panel-control').data('panel-control')).stop().slideUp('fast');
        }
    });

});
