# Postify

A jQuery plugin that changes links into POST requests.

## Examples
Basic example

```javascript
$('a.postify').postify();
```

... with options

```javascript
$('a.postify').postify({
    confirm: true,
    ajax: true,
    input: 'custom_input',
    input_value: 'yes',
    ajax_onsuccess: function(element, response) {
        console.log(response);
    }
});
```

## Options
option | possible values | default value | description
--- | --- | --- | ---
confirm | string | false | show a confirmation dialog before proceeding
ajax | true, false | false | submit post asynchronously
ajax_onsuccess | function | null | use with 'ajax':true <br> code to be executed after the request is complete. the response from completed request is passed to the function.
input | string | 'postify' | the name of the input field that is added to the form that is submitted
input_value | string | 'ok' | the value of the input field that is added to the form that is submitted
before | function | null | do some stuff before the link is submitted. if the function returns false the submission will abort
