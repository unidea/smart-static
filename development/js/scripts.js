/*!
 * Start Bootstrap - Creative Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

(function($) {
    "use strict"; // Start of use strict

    pepe.googleMap();

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        event.preventDefault();

        var $anchor = $(this);
        var position = $($anchor.attr('href')).offset().top - 50;

        $('html, body').stop().animate({
            scrollTop: position
        }, 1250, 'easeInOutExpo');
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Fit Text Plugin for Main Header
//    $("h1").fitText(
//        1.2, {
//            minFontSize: '35px',
//            maxFontSize: '65px'
//        }
//    );

    // Offset for Main Navigation
    $('#main-navigation, #sub-navigation').affix({
        offset: {
            top: 100
        }
    })

    $('.gallery-box').click(function(event){
      event.preventDefault();
      $(this).ekkoLightbox({
        // gallery: "restaurant",
        // gallery_parent_selector: "#gallery_content",
        // left_arrow_class: "fa fa-chevron-left",
        // right_arrow_class: "fa fa-chevron-right",
        loadingMessage: "Chargement en cours..."
      });
    });


    // Initialize WOW.js Scrolling Animations

    /* Advanced Options
     * data-wow-duration: Change the animation duration
     * data-wow-delay: Delay before the animation starts
     * data-wow-offset: Distance to start the animation (related to the browser bottom)
     * data-wow-iteration: Number of times the animation is repeated
     */

    var wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: 0,
      mobile: true,
      live: true
    });
    wow.init();

    // $(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
    //   event.preventDefault();
    //   $(this).ekkoLightbox();
    // });

})(jQuery); // End of use strict
