/* eslint-disable */
$(function() {

  /* Services */

  // selectors
  var servicesRadioButtons = $('input.services-list-radio')
  var serviceSelectedId = null;
  var userDataForm = $('add-service-form');
  var serviceIdInput = $('input#selectedServiceId');
  var AddServiceButton = $('.add-service-button');

  // Events
  servicesRadioButtons.change(function() {
    serviceSelectedId = $('.services-list-radio:checked').val();
    // AddServiceButton.prop('disabled', false);
    serviceIdInput.val(serviceSelectedId)
  });

});
