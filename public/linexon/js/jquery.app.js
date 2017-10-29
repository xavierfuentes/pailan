(function ($) {
  function initNavbarStickey() {
    $(window).scroll(() => {
      const scroll = $(window).scrollTop();
      if (scroll >= 50) {
        $('.sticky').addClass('darkheader');
      } else {
        $('.sticky').removeClass('darkheader');
      }
    });
  }

  function initSmoothLink() {
    $('.navigation-menu a').on('click', function (event) {
      const $anchor = $(this);
      $('html, body')
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr('href')).offset().top - 0,
          },
          1500,
          'easeInOutExpo',
        );
      event.preventDefault();
    });
  }

  function initNavbarToggler() {
    const scroll = $(window).scrollTop();

    $('.navbar-toggle').on('click', function (event) {
      $(this).toggleClass('open');
      $('#navigation').slideToggle(400);
    });

    $('.navigation-menu>li')
      .slice(-2)
      .addClass('last-elements');
  }

  function initScrollspy() {
    $('#navigation').scrollspy({ offset: 70 });
  }

  function initClientSlider() {
    $('#clients-slider').owlCarousel({
      loop: true,
      autoplay: true,
      autoplayTimeout: 1000, // Set AutoPlay to 1 seconds
      nav: false,
      margin: 10,
      dots: false,
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 3,
        },
        960: {
          items: 5,
        },
        1200: {
          items: 6,
        },
      },
    });
  }

  function initContactForm() {
    $('#contact-form').submit(function () {
      const action = $(this).attr('action');

      $('#message').slideUp(750, () => {
        $('#message').hide();

        $('#submit')
          .before('<img src="images/ajax-loader.gif" class="contact-loader" />')
          .attr('disabled', 'disabled');

        $.post(
          action,
          {
            name: $('#name').val(),
            email: $('#email').val(),
            comments: $('#comments').val(),
          },
          (data) => {
            document.getElementById('message').innerHTML = data;
            $('#message').slideDown('slow');
            $('#cform img.contact-loader').fadeOut('slow', function () {
              $(this).remove();
            });
            $('#submit').removeAttr('disabled');
            if (data.match('success') != null) $('#cform').slideUp('slow');
          },
        );
      });

      return false;
    });
  }

  function initMagnificVideo() {
    $(document).ready(() => {
      $('.video-play-icon').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false,
      });
    });
  }

  function init() {
    initNavbarStickey();
    initSmoothLink();
    initNavbarToggler();
    // initScrollspy();
    initClientSlider();
    initContactForm();
    initMagnificVideo();
  }
  init();
}(jQuery));
