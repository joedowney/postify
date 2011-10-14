(function($) {
    
    $.fn.postify = function(options) {
    
        var settings = {
            'input'               : 'postify',
            'input_value'         : 'ok',
            'confirm'             : false,
            'ajax'                : false,
            'ajax_delete_closest' : false,
            'ajax_onsuccess'      : false,
            'ajax_fade_out'       : 200
        };
        if (options) { 
            $.extend(settings, options);
        }
    
        return this.each(function() {
            $(this).click(function(e) {
                e.preventDefault();
                
                var action = $(this).attr('href');
                
                // die gracefully? if there is no href attrib
                if ( ! action) {
                    return true;
                }
                
                // confirm ?
                if ( ! settings.confirm || confirm(settings.confirm)) {
                
                    if (settings.ajax) {
                        var link = $(this);
                        var params = settings.input ? settings.input + '=' + settings.input_value : '';
                        $.post(action, params, function(response) {
                            if (settings.ajax_delete_closest) {
                                if (settings.ajax_fade_out) {
                                    $(link).closest(settings.ajax_delete_closest).fadeOut(settings.ajax_fade_out);
                                }
                                else {
                                    $(link).closest(settings.ajax_delete_closest).remove();
                                }
                            }
                            if (settings.ajax_onsuccess) {
                                var fnc = settings.ajax_onsuccess;
                                fnc(response);
                            }
                        }, 'json');
                    }
                    
                    else {
                        var form = $('<form action="' + action + '" method="POST">');
                        if (settings.input) {
                            $(form).append('<input type="hidden" name="' + settings.input + '" value="' + settings.input_value + '">');
                        }
                        $("body").append(form);
                        $(form).submit();
                    }
                }
                return false;
            });
        });
        
    };
    
})(jQuery);