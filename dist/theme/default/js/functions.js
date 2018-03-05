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
