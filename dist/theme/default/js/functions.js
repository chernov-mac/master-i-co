function updateSliderInputs(values, inputs) {
    for (var i = 0; i < values.length; i++) {
        inputs[i].val(parseInt(values[i], 10));
    }
}

function setActiveSectionsNavItem() {
    $('#sectionsNav .nav-item').removeClass('active');

    var current = window.location.pathname.split('/')[1].split('.')[0];
    var $link = $('#sectionsNav a[href^="/'+ current +'"]');

    if ($link.length) {
        $link.closest('.nav-item').addClass('active');

        if ($link.hasClass('dropdown-item')) {
            $link.addClass('active');
        }
    }
}
