$(function() {

  // Services
  var services = $('.services-list-radio')
  var serviceId = null;
  services.change(function() {
    serviceId = $('.services-list-radio:checked').val();
  });

});
