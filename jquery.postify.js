(function($) {

    var defaults = {
        'input'               : 'postify',
        'input_value'         : 'ok',
        'confirm'             : false,
        'ajax'                : false,
        'ajax_onsuccess'      : null,
        'before'              : null
    };

    var settings = {};

    var methods = {
        init : function(options) {
            settings = $.extend(true, defaults, options);
            return this.each(function() {
                $(this).bind('click.postify', function(e) {

                    e.preventDefault();

                    // before
                    if (settings.before && ! settings.before.call(this)) {
                        return false;
                    }

                    // confirm
                    if (settings.confirm) {
                        methods.confirm.call(this);
                    }
                    else {
                        methods.send.call(this);
                    }
                });
            });
        },
        confirm : function() {
            if (confirm(settings.confirm)) {
                methods.send.call(this);
            }
        },
        send : function() {

            var action = $(this).attr('href');

            // quit if there is no href attrib
            if ( ! action) {
                return false;
            }

            // ajax ?
            if (settings.ajax) {
                var link = $(this);
                var params = settings.input ? settings.input + '=' + settings.input_value : '';
                $.post(action, params, function(response) {
                    if (settings.ajax_onsuccess) {
                        settings.ajax_onsuccess.call(link, response);
                    }
                }, 'json');
            }
            
            // normal form submission
            else {
                var form = $('<form action="' + action + '" method="POST">');
                if (settings.input) {
                    $(form).append('<input type="hidden" name="' + settings.input + '" value="' + settings.input_value + '">');
                }
                $(form).appendTo('body').submit();
            }

        },
        destroy : function() {
            return this.each(function() {
                this.unbind('.postify');
            });
        },
        get_setting : function(setting_name) {
            if (settings[setting_name]) {
                return settings[setting_name];
            } else {
                return false;
            }
        }
    };

    $.fn.postify = function(args) {
        if (methods[args]) {
            return methods[args].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if(typeof args === 'object' || ! args) {
            return methods.init.call(this, args);
        }
        else {
            $.error('Method ' +  args + ' does not exist for postify');
        }
    }

})(jQuery);