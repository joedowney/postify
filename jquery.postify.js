(function($) {
    
    $.fn.postify = function(options) {
    
        var settings = {
            'input'               : 'postify',
            'input_value'         : 'ok',
            'confirm'             : false,
            'ajax'                : false,
            'ajax_onsuccess'      : function() { }
        };
        if (options) { 
            $.extend(settings, options);
        }
    
        return this.each(function() {
            $(this).click(function(e) {
            
                e.preventDefault();
                
                var action = $(this).attr('href');
                
                // quit if there is no href attrib
                if ( ! action) {
                    return true;
                }
                
                // confirm ?
                if ( ! settings.confirm || confirm(settings.confirm)) {
                
                    if (settings.ajax) {
                        var link = $(this);
                        var params = settings.input ? settings.input + '=' + settings.input_value : '';
                        $.post(action, params, function(response) {
                            if (settings.ajax_onsuccess) {
                                settings.ajax_onsuccess.call(link, response);
                            }
                        });
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