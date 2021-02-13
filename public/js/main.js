/* eslint-disable */
$(
  (function(pailan, axios, undefined) {
    /* Services */

    // selectors
    var serviceSelectedId = null;
    var userDataForm = $('add-service-form');
    var csrfInput = $('input[name="_csrf"]');
    var serviceIdInput = $('input#selectedServiceId');
    var AddServiceButton = $('#add-service-button');
    var ServiceLogos = $('#add-service').find('.default-service-box');
    var ServiceRows = $('#services-list').find('.default-service-row');
    var UserInput = $('input#user');
    var PasswordInput = $('input#password');
    var ServiceInput = $('input#service');

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

    if (pailan.user && pailan.user.services === 3) {
      var handler = StripeCheckout.configure({
        key: pailan.stripe.pkey,
        image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
        locale: 'auto',
        token: function(token) {
          var data = {
            _csrf: csrfInput.val(),
            token: token,
            user: UserInput.val(),
            password: PasswordInput.val(),
            selectedServiceId: serviceIdInput.val(),
          };
          axios
            .post('/services/add', data)
            .then(function(response) {
              if (response.status === 200) {
                window.location.assign('/services')
              }
            })
            .catch(function(error) {
              window.location.reload(true);
            });
        },
      });

      AddServiceButton.click(function(event) {
        handler.open({
          name: 'Pailan',
          description: 'Service Subscription',
          zipCode: true,
          billingAddress: true,
          email: pailan.user.email,
          image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
          locale: 'auto',
        });
        event.preventDefault();
      });

      window.addEventListener('popstate', function() {
        handler.close();
      });
    }
  })(window.pailan || {}, window.axios),
);
