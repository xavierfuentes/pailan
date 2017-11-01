/* eslint-disable */
$(function() {

  /* Services */

  // selectors
  var serviceSelectedId = null;
  var userDataForm = $('add-service-form');
  var serviceIdInput = $('input#selectedServiceId');
  var AddServiceButton = $('#add-service-button');
  var ServiceLogos = $('#add-service').find('.service-logo');
  var UserInput = $('#user');
  var PasswordInput = $('#password');

  // Events
  ServiceLogos.click(function(event) {
    serviceSelectedId = $(this).data('id');
    serviceIdInput.val(serviceSelectedId);
    UserInput.prop('disabled', false);
    PasswordInput.prop('disabled', false);
    ServiceLogos.removeClass('active');
    $(this).addClass('active');
  })

});
