/* eslint-disable */
$(function() {

  /* Services */

  // selectors
  var serviceSelectedId = null;
  var userDataForm = $('add-service-form');
  var serviceIdInput = $('input#selectedServiceId');
  var AddServiceButton = $('#add-service-button');
  var ServiceLogos = $('#add-service').find('.default-service-box');
  var ServiceRows = $('#services-list').find('.default-service-row');
  var UserInput = $('#user');
  var PasswordInput = $('#password');
  var ServiceInput = $('#service');

  // Events
  ServiceLogos.click(function(event) {
    // put the id in the hidden input
    serviceSelectedId = $(this).data('id');
    serviceIdInput.val(serviceSelectedId);

    // put the service's name in the input
    ServiceInput.val($(this).data('name'));

    // enable the form to be used
    UserInput.prop('disabled', false);
    PasswordInput.prop('disabled', false);

    // toggles active class
    ServiceLogos.removeClass('active');
    $(this).addClass('active');
  });
});
