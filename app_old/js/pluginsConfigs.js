/**
 * Created by nakan on 9/7/15.
 */
// init plugins
$(function(){
    // add table sorter plugin

    $(".list-item table").tablesorter({
        headers: {
            // disable sorter for columns
            1: { sorter: false},
            3: { sorter: false},
            4: { sorter: false}
        },
        // sort third column, order asc
        sortList: [[2,0]]
    });
    // add time picker plugin

    $('#timepicker').datetimepicker({
        format: 'HH:mm'
    });
    // add validation plugin

    $.validator.addMethod("lettersonly-with-space", function(value, element) {
        return this.optional(element) || /^([a-z ,.'-])+$/i.test(value);
    }, "Letters only please");
    $.validator.addMethod("phoneEU", function(phone_number, element) {
        return this.optional(element) || phone_number.length >= 12 &&
            phone_number.match(/^(?:00|\+)(\()?((\d){3})(\)?)[ -]?((\d){3})[ ]?((\d){3})[ ]?((\d){3})$/);
    }, "Please specify a valid phone number,\n example +(420) 111 222 333");

    validator = $('.add-item form').validate({
        rules: {
            'user-name': {
                required: true,
                'lettersonly-with-space': true,
                maxlength: 30
            },
            'user-phone' : {
                phoneEU: true
            },
            'user-time' : {
                time: true
            }
        },
        messages: {
            'user-name': {
                required: "You must enter your full name"
            },
            'user-phone': {
                required: "You must enter your phone number"
            }
        },
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
        submitHandler: function (form) {
            $('.add-item form').find(":text").val('');
        }
    });
});