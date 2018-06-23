function updateSliderInputs(values, inputs) {
    for (var i = 0; i < values.length; i++) {
        inputs[i].val(parseInt(values[i], 10));
    }
}

function setActiveSectionsNavItem() {
    $('#sectionsNav .nav-item').removeClass('active');

    var current = window.location.pathname.split('/')[1].split('.')[0],
        $link;

    if (!current) {
        $link = $('#sectionsNav a[href="/"]');
    } else {
        $link = $('#sectionsNav a[href^="/'+ current +'"]');
    }

    if ($link.length) {
        $link.closest('.nav-item').addClass('active');

        if ($link.hasClass('dropdown-item')) {
            $link.addClass('active');
        }
    }
}

function initContactUsMap(mapId){
    // var myLatlng = new google.maps.LatLng(44.433530, 26.093928);
    var myLatlng = new google.maps.LatLng(46.3347946, 48.0639941);
    var mapOptions = {
        zoom: 17,
        center: myLatlng,
        // styles: [
        //     {
        //         "featureType": "water",
        //         "stylers":[
        //             {"saturation": 43},
        //             {"lightness":-11},
        //             {"hue":"#0088ff"}
        //         ]
        //     },
        //     {
        //         "featureType":"road",
        //         "elementType":"geometry.fill",
        //         "stylers":[
        //             {"hue":"#ff0000"},
        //             {"saturation":-100},
        //             {"lightness":99}
        //         ]
        //     },
        //     {
        //         "featureType":"road",
        //         "elementType":"geometry.stroke",
        //         "stylers":[
        //             {"color":"#808080"},
        //             {"lightness":54}
        //         ]
        //     },
        //     {
        //         "featureType":"landscape.man_made",
        //         "elementType":"geometry.fill",
        //         "stylers":[
        //             {"color":"#ece2d9"}
        //         ]
        //     },
        //     {
        //         "featureType":"poi.park",
        //         "elementType":"geometry.fill",
        //         "stylers":[
        //             {"color":"#ccdca1"}
        //         ]
        //     },
        //     {
        //         "featureType":"road",
        //         "elementType":"labels.text.fill",
        //         "stylers":[
        //             {"color":"#767676"}
        //         ]
        //     },
        //     {
        //         "featureType":"road",
        //         "elementType":"labels.text.stroke",
        //         "stylers":[
        //             {"color":"#ffffff"}
        //         ]
        //     },
        //     {
        //         "featureType":"poi",
        //         "stylers":[
        //             {"visibility":"off"}
        //         ]
        //     },
        //     {
        //         "featureType":"landscape.natural",
        //         "elementType":"geometry.fill",
        //         "stylers":[
        //             {"visibility":"on"},
        //             {"color":"#b8cb93"}
        //         ]
        //     },
        //     {
        //         "featureType":"poi.park",
        //         "stylers":[
        //             {"visibility":"on"}
        //         ]
        //     },
        //     {
        //         "featureType":"poi.sports_complex",
        //         "stylers":[
        //             {"visibility":"on"}
        //         ]
        //     },
        //     {
        //         "featureType":"poi.medical",
        //         "stylers":[
        //             {"visibility":"on"}
        //         ]
        //     },
        //     {
        //         "featureType":"poi.business",
        //         "stylers":[
        //             {"visibility":"simplified"}
        //         ]
        //     }
        // ],
        scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
    };
    var map = new google.maps.Map(document.getElementById(mapId), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        title: "Мастер&Ко"
    });
    marker.setMap(map);
}

function beautifyPagination(pagination) {
    $(pagination).addClass('pagination');
    $.each($(pagination).find('a, span'), function(key, item){
        if ($(item).attr('href')) {
            $(item).wrap('<span class="page-item"></span>').addClass('page-link');
        } else if ($(item).hasClass('nav_ext')) {
            $(item).wrap('<span class="page-item"><a href="javascript:void(0)" class="page-link"></a></span>');
        } else {
            $(item).wrap('<span class="active page-item"><a href="javascript:void(0)" class="page-link"></a></span>');
        }
    });
}

// Plugins

$.fn.editable = function() {
    this.map(function(i, el){
        var $input = $(el),
            $field = $input.closest('.editable__field'),
            $wrapper = $input.closest('.editable'),
            $represent = $wrapper.find('.editable__represent'),
            $editBtn = $represent.find('a[data-editable="edit"]'),
            $cancelBtn = $field.find('a[data-editable="cancel"]'),
            originalValue = $input.val();

        init();


        // Functions

        function init() {
            $input
                .removeClass('editable')
                .data('original-value', originalValue)
                .data('last-value', originalValue);

            // wrapInput();
        }
        function wrapInput() {
            $field = $input.closest('.bmd-form-group').wrap('<div class="editable__field"></div>').closest('.editable__field');
            $wrapper = $field.wrap('<div class="editable"></div>').closest('.editable');
            $represent = $('<div class="editable__represent"><span class="value">'+ originalValue +'</span></div>');
            $editBtn = $('<a href="javascript:void(0)" data-editable="edit">Изменить</a>');
            $cancelBtn = $('<a href="javascript:void(0)" data-editable="cancel">Отмена</a>');

            $represent.append($editBtn);
            $field.append($cancelBtn);
            $wrapper.prepend($represent);
        }

        // Events

        $editBtn.on('click', function(e){
            e.preventDefault();
            $wrapper.addClass('editing');

            $input.val($input.data('last-value')).focus();
        });
        $cancelBtn.on('click', function(e){
            e.preventDefault();
            $wrapper.removeClass('editing');

            $input.data('last-value', $input.val());
            $input.val($input.data('original-value'));
        });

    }).get();
};

$.fn.amount = function() {
    this.map(function(i, el){
        var $input = $(el),
            $wrapper = $input.closest('.amount'),
            $minusBtn = $wrapper.find('[data-toggle="amount"][data-action="minus"]'),
            $plusBtn = $wrapper.find('[data-toggle="amount"][data-action="plus"]'),
            min = +$input.attr('min'),
            max = +$input.attr('max'),
            originalValue = +$input.val();
        
        init();



        // Functions

        function init() {
            setValue(+originalValue);
        }

        function setValue(value) {
            if (isValid(value)) {
                $input.val(value);
                setButtonsState(value);
            } else {
                setValue(validateValue(value));
            }
        }

        function isValid(value) {
            return value >= min && value <= max;
        }

        function validateValue(value) {
            value = +value;
            if (value < min) {
                return min;
            } else if (value > max) {
                return max;
            } else {
                return value;
            }
        }

        function setButtonsState(value) {
            if (value <= min) {
                $minusBtn.addClass('btn-default');
            } else {
                $minusBtn.removeClass('btn-default');
            }

            if (value >= max) {
                $plusBtn.addClass('btn-default');
            } else {
                $plusBtn.removeClass('btn-default');
            }
        }

        // Events

        $minusBtn.on('click', function(e){
            e.preventDefault();
            var delta = +$(this).attr('value') || 1;
            var value = +$input.val() - delta;
            setValue(value);
        });

        $plusBtn.on('click', function(e){
            e.preventDefault();
            var delta = +$(this).attr('value') || 1;
            var value = +$input.val() + delta;
            setValue(value);
        });

        $input.on('change', function(e){
            var value = +$input.val();
            setValue(value);
        });

    }).get();
};
