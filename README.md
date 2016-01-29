# Postify

A jQuery plugin that changes links into POST requests.

## Options
option | possible values | default value | description
--- | --- | --- | ---
confirm | true, false | false | show a confirm dialog before proceeding
ajax | true, false | false | submit post asynchronously
ajax_onsuccess | function</td> | --- | use with 'ajax':true <br> code to be executed after the request is complete. the response from completed request is passed to the function.
input | | postify | the name of the input field that is added to the form that is submitted
input_value | | ok | the value of the input field that is added to the form that is submitted