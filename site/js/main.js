jQuery(document).ready(function($) {

    'use strict';


    //FULLSCREEN SLIDER
    $('#slides').superslides({
        animation: 'fade'
    });


    //SMOOTH SCROLL
    smoothScroll.init({
        speed: 500, // How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
        callbackBefore: function(toggle, anchor) {}, // Function to run before scrolling
        callbackAfter: function(toggle, anchor) {} // Function to run after scrolling
    });


    //TEXT ROTATOR
    $(".rotate").textrotator({
        animation: "fade", // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
        separator: "," // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
    });


    //MILESTONE
    $('.timer').countTo();


    //ANIMATIONS
    var wow = new WOW({
        boxClass: 'wow', // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset: 0, // distance to the element when triggering the animation (default is 0)
        mobile: false // trigger animations on mobile devices (true is default)
    });
    wow.init();

    // function reloadStylesheets() {
    //     var queryString = '?reload=' + new Date().getTime();
    //     $('link[rel="stylesheet"]').each(function() {
    //         this.href = this.href.replace(/\?.*|$/, queryString);
    //     });
    // }


    // ---------------------------ADIVOSOR CAROUSEL
    var questionnaire = $("#questionnaire-carousel");
    questionnaire.owlCarousel({
        autoPlay: false,
        pagination: true,
        slideSpeed: 500,
        paginationSpeed: 600,
        paginationNumbers: false,
        singleItem: true,
        rewindNav: false,
        scrollPerPage: true,
        mouseDrag: false,
        navigation: false // Show next and prev buttons
        // navigationText: ['<div class="q-buttons owl-prev prev-verify" style="">Previous</div>', '<div class="q-buttons owl-next next-verify" style="">Next</div>']
    });

    var current_page = 1;
    $('.prev-verify').css('visibility', 'hidden');
    function min_selected(q_num) {
        var result = false;
        $.each($('input[id*="q' + (q_num - 2) + '"]'), function(index, value) {
            if (value.checked) {
                result = true;
                return false;
            }
        });
        return result;
    }

    function go_to_page(page_num) {
        $('.custom-page').each(function(index) {
            $(this).removeClass('active');
        });
        $('.custom-page.' + page_num).addClass('active');
        questionnaire.trigger('owl.goTo', page_num - 1);
        current_page = page_num;
        $('.prev-verify').css('visibility', current_page == 1 ? 'hidden':'visible');
        $('.next-verify').css('visibility', current_page == 7 ? 'hidden':'visible');
    }

    $('body').on('click', '.next-verify', function() {
        if (current_page < 7) {
            if ([3, 4, 5, 6].indexOf(current_page) > -1) { //Check that at least one checkbox has been checked in slides 3, 4, 5, 6, 7
                if (min_selected(current_page)) {
                    go_to_page(current_page + 1)
                } else {
                    $('.error-message').text("Please select at least one option.").show().delay(5000).fadeOut();
                }
            } else { //Go on to the next slide
                go_to_page(current_page + 1)
            }
        }
    });

    $('body').on('click', '.prev-verify', function() {
        if (current_page > 1) {
            go_to_page(current_page - 1)
        }
    });

    $('body').on('click', '.custom-page', function(event) {
        var previous_page = current_page;
        current_page = parseInt($(this).find('span').text());
        if ([3, 4, 5, 6].indexOf(previous_page) > -1 && current_page > previous_page) {
            if (min_selected(previous_page)) {
                go_to_page(current_page);
            } else {
                $('.error-message').text("Please select at least one option.").show().delay(5000).fadeOut();
                current_page = previous_page;
            }
        }
        if (current_page - previous_page > 0 && current_page > previous_page) {
            var all_questions_answered = true;
            var missing_question = 3;
            for (var i = 3; i < current_page; i++) {
                if (!min_selected(i)) {
                    all_questions_answered = false;
                    missing_question = i;
                    break
                }
            }
            if (all_questions_answered) {
                go_to_page(current_page);
            } else {
                $('.error-message').text("Please answer some missing questions first.").show().delay(5000).fadeOut();
                go_to_page(missing_question);
                current_page = missing_question;
            }
        } else {
            go_to_page(current_page);
        }
    });



    //---------------------------SCREENDOOR FORM
    new FormRenderer({
        "project_id": 683,
        "afterSubmit": {
          "method": "page",
          "html": "<p>Thanks for submitting our form!</p>"
        }
      });





    //-------------------Accordion Change Chevron--------
    $('.accordion-heading').on('click', 'p', function() {
        var icon = $(this).find('.fa');
        if (icon.attr('class') == 'fa fa-chevron-circle-right') {
            icon.attr('class', 'fa fa-chevron-circle-down');
        } else if (icon.attr('class') == 'fa fa-chevron-circle-down') {
            icon.attr('class', 'fa fa-chevron-circle-right');
        }
    });

    //OWLCAROUSEL TEAM
    $("#team-slider").owlCarousel({
        slideSpeed: 300,
        paginationSpeed: 400,
        autoPlay: true,
        singleItem: false,
        items: 3,
        itemsDesktop: [1200, 3],
        itemsDesktopSmall: [980, 3],
        itemsTablet: [768, 2],
        itemsMobile: [479, 1],
        pagination: true,
        navigation: true, // Show next and prev buttons
        navigationText: ['<i class="pe-7s-angle-left-circle pe-3x"></i>', '<i class="pe-7s-angle-right-circle pe-3x"></i>'],
    });

    // (loadPortfolio($, window, document, undefined))(jQuery, window, document);
    //LIGHTBOX GALLERY





    // init cubeportfolio
    var options_portfolio = {
        defaultFilter: '*',
        animationType: 'flipOut',
        gapHorizontal: 45,
        gapVertical: 30,
        gridAdjustment: 'responsive',
        caption: 'minimal',
        displayType: 'lazyLoading',
        displayTypeSpeed: 100,
        // lightbox
        lightboxDelegate: '.cbp-lightbox',
        lightboxGallery: true,
        lightboxTitleSrc: 'data-title',
        lightboxShowCounter: false,
        // singlePage popup
        singlePageDelegate: '.cbp-singlePage',
        singlePageDeeplinking: true,
        singlePageStickyNavigation: false,
        singlePageShowCounter: false,
        singlePageCallback: function(url, element) {
            // to update singlePage content use the following method: this.updateSinglePage(yourContent)
            var t = this;
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'html',
                timeout: 5000
            })
                .done(function(result) {
                    t.updateSinglePage(result);
                })
                .fail(function() {
                    console.log("error");
                    t.updateSinglePage("Error! Please refresh the page!");
                });
        },
        // single page inline
        singlePageInlineDelegate: '.cbp-singlePageInline',
        singlePageInlinePosition: 'above',
        singlePageInlineShowCounter: false,
        singlePageInlineInFocus: true,
        singlePageInlineCallback: function(url, element) {
            // to update singlePage Inline content use the following method: this.updateSinglePageInline(yourContent)
        }
    }

    var gridContainer = $('#grid-container');
    var type_filtersContainer = $('#type-filters-container');
    var scope_filtersContainer = $('#scope-filters-container');
    var filterContainers = $('.s-filters');
    gridContainer.cubeportfolio(options_portfolio);

    //----------------------- TYPE FILTERS CONTAINER
    filterContainers.on('click', '.cbp-filter-item', function(e) {
        var me = $(this),
            wrap;
        // get cubeportfolio data and check if is still animating (reposition) the items.
        if (!$.data(gridContainer[0], 'cubeportfolio').isAnimating) {
            if (type_filtersContainer.hasClass('cbp-l-filters-dropdown')) {
                wrap = $('.cbp-l-filters-dropdownWrap');
                wrap.find('.cbp-filter-item').removeClass('cbp-filter-item-active');
                wrap.find('.cbp-l-filters-dropdownHeader').text(me.text());
                me.addClass('cbp-filter-item-active');
            } else {
                me.addClass('cbp-filter-item-active').siblings().removeClass('cbp-filter-item-active');
            }
        }
        // filter the items\
        var filters = $('.cbp-filter-item-active').map(function() {
            return $(this).data('filter');
        }).toArray().join('');
        //filters = filters.replace('*.','.').replace('.*.','.').replace('.*', '').replace('**', '*');
        if (filters == '*****') {
            filters = '*';
        } else {
            filters = filters.replace(/\*{1,}/g, '');
        }
        console.log(filters);
        gridContainer.cubeportfolio('filter', filters, function() {});
    });



    // activate counters
    gridContainer.cubeportfolio('showCounter', type_filtersContainer.find('.cbp-filter-item'));


    var items = [{'url': '99-designs', 'scores': [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': '99 Designs'}, {'url': 'adopt-a-hydrant', 'scores': [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0], 'title': 'Adopt-a-Hydrant'}, {'url': 'agreeble', 'scores': [0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0], 'title': 'agreeble'}, {'url': 'antenna', 'scores': [0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0], 'title': 'Antenna'}, {'url': 'bc-ideas', 'scores': [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'BC Ideas'}, {'url': 'catchafire', 'scores': [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Catchafire'}, {'url': 'challenge.gov', 'scores': [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Challenge.gov'}, {'url': 'code-for-philly', 'scores': [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Code for Philly'}, {'url': 'consumer-financial-protection-bureau-credit-card-complaints-database', 'scores': [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Consumer Financial Protection Bureau Credit Card Complaints Database'}, {'url': 'drivebc.ca', 'scores': [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0], 'title': 'Drivebc.ca'}, {'url': 'experiment', 'scores': [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Experiment'}, {'url': 'fixmystreet', 'scores': [0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0], 'title': 'FixMyStreet'}, {'url': 'foldit', 'scores': [1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Foldit'}, {'url': 'govtogetherbc', 'scores': [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], 'title': 'GovTogetherBC'}, {'url': 'grade.dc.gov', 'scores': [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Grade.DC.Gov'}, {'url': 'grouptalent', 'scores': [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0], 'title': 'GroupTalent'}, {'url': 'i-paid-a-bribe', 'scores': [1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1], 'title': 'I Paid a Bribe'}, {'url': 'ibm-on-smarter-sustainable-dubuque', 'scores': [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'IBM on Smarter Sustainable Dubuque'}, {'url': 'ideas-2-action', 'scores': [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Ideas 2 Action'}, {'url': 'ideascale', 'scores': [0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0], 'title': 'IdeaScale'}, {'url': 'innocentive', 'scores': [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Innocentive'}, {'url': 'kickstarter', 'scores': [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0], 'title': 'Kickstarter'}, {'url': 'mashupaustralia', 'scores': [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'MashupAustralia'}, {'url': 'neighbor.ly', 'scores': [0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0], 'title': 'Neighbor.ly'}, {'url': 'nyc-bigapps-challenge', 'scores': [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'NYC BigApps Challenge'}, {'url': 'open-data-500', 'scores': [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Open Data 500'}, {'url': 'openideo', 'scores': [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0], 'title': 'OpenIDEO'}, {'url': 'participatory-budgeting-in-nyc', 'scores': [0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Participatory Budgeting in NYC'}, {'url': 'patient-feedback-challenge', 'scores': [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Patient Feedback Challenge'}, {'url': 'patient-opinion', 'scores': [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0], 'title': 'Patient Opinion'}, {'url': 'peer-to-patent', 'scores': [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0], 'title': 'Peer To Patent'}, {'url': 'placespeak', 'scores': [0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0], 'title': 'PlaceSpeak'}, {'url': 'propeller-health', 'scores': [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0], 'title': 'Propeller Health'}, {'url': 'public-lab', 'scores': [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0], 'title': 'Public Lab'}, {'url': 'pulsepoint-respond', 'scores': [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0], 'title': 'PulsePoint Respond'}, {'url': 'quora', 'scores': [0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0], 'title': 'Quora'}, {'url': 'radiation-watch.org', 'scores': [0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0], 'title': 'Radiation-Watch.org'}, {'url': 'safecast', 'scores': [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0], 'title': 'Safecast'}, {'url': 'seeclickfix', 'scores': [0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0], 'title': 'SeeClickFix'}, {'url': 'spacehive', 'scores': [0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Spacehive'}, {'url': 'stack-exchange', 'scores': [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0], 'title': 'Stack Exchange'}, {'url': 'ted-open-translation-project', 'scores': [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0], 'title': 'TED Open Translation Project'}, {'url': 'tehuan-3.0', 'scores': [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1], 'title': 'Tehuan 3.0'}, {'url': 'topcoder', 'scores': [1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0], 'title': 'topcoder'}, {'url': 'threadless', 'scores': [1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0], 'title': 'Threadless'}, {'url': 'ushahidi', 'scores': [0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0], 'title': 'Ushahidi'}, {'url': 'we-the-people', 'scores': [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'We the People'}, {'url': 'white-house-open-government-initiative', 'scores': [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'White House Open Government Initiative'}, {'url': 'world-bank-ict4gov', 'scores': [0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0], 'title': 'World Bank ICT4Gov'}, {'url': 'xprize', 'scores': [1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'XPRIZE'}, {'url': 'zooniverse', 'scores': [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0], 'title': 'Zooniverse'}]
    var case_study_template = '<li class="cbp-item">' +
        '<div class="cbp-caption">' +
        '<div class="cbp-caption-defaultWrap">' +
        '<img src="img/casestudies/<%= url %>-small.png" alt="" width="100%">' +
        '</div>' +
        '<div class="cbp-caption-activeWrap">' +
        '<div class="cbp-l-caption-alignCenter">' +
        '<div class="cbp-l-caption-body">' +
        '<a href="ajax/<%= url %>.html" class="cbp-singlePage cbp-l-caption-buttonLeft"><i class="pe-3x pe-7s-plus"></i></a>' +
        '<a href="img/casestudies/<%= url %>-big.png" class="cbp-lightbox cbp-l-caption-buttonRight" data-title="Dashboard<br>by Paul Flavius Nechita"><i class="pe-3x pe-7s-search"></i></a>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="cbp-l-grid-projects-title"><%= title %></div>' +
        '</li>';

    //----------------GENERATES REPORT-----------------
    $('#questionnaire').on('click', '.button-generate-report', function() {
        if (min_selected(current_page)) {
            var options = {};
            $.each($('input[name="question"]'), function(index, value) {
                options[this.id] = this.checked ? 1 : 0;
            });
            var point = $.map($('input[name="question"]'), function(value, index) {
                return value.checked ? 1 : 0;
            });
            $('.report-category-heading').hide();
            $('#report').hide();
            $('.relevant-case-study-list').empty();
            for (var key in options) {
                if (options[key]) {
                    $('.' + key).show();
                    $('.' + key.substring(0, 2)).show();
                } else {
                    $('.' + key).hide();
                }
            }
            var points = [];
            for (var o in items) {
                points.push(items[o].scores);
            }
            var tree = createKDTree(points);
            var candidates = tree.knn(point, 5);
            console.log(candidates);
            var new_case_study = _.template(case_study_template);
            for (var i in candidates) {
                if (items[candidates[i]]['title'] != 'EMPTY EXAMPLE') {
                    var data = {
                        "url": items[candidates[i]]['url'].replace(".", "-"),
                        "title": items[candidates[i]]['title']
                    }
                    console.log(data);
                    $(".relevant-case-study-list").append(new_case_study(data));
                }
            }
            $('#report').show();
            $('#relevant-case-studies').show();
            $('#academy-info').show();
            gridContainer.cubeportfolio('destroy');
            gridContainer.cubeportfolio(options_portfolio);
            //Scroll to report part of page
            $('html, body').animate({
                scrollTop: $("#report").offset().top - 40
            }, 1000);
        } else {
            $('.error-message').text("Please select at least one option.").show().delay(5000).fadeOut();
        }
    });


    // ---------------------------------------------------------------add listener for load more click
    $('.cbp-l-loadMore-button-link').on('click', function(e) {
        e.preventDefault();
        var clicks, me = $(this),
            oMsg;
        if (me.hasClass('cbp-l-loadMore-button-stop')) return;
        // get the number of times the loadMore link has been clicked
        clicks = $.data(this, 'numberOfClicks');
        clicks = (clicks) ? ++clicks : 1;
        $.data(this, 'numberOfClicks', clicks);

        // set loading status
        oMsg = me.text();
        me.text('LOADING...');

        // perform ajax request
        $.ajax({
            url: me.attr('href'),
            type: 'GET',
            dataType: 'HTML'
        })
            .done(function(result) {
                var items, itemsNext;
                // find current container
                items = $(result).filter(function() {
                    return $(this).is('div' + '.cbp-loadMore-block' + clicks);
                });
                gridContainer.cubeportfolio('appendItems', items.html(),
                    function() {
                        // put the original message back
                        me.text(oMsg);
                        // check if we have more works
                        itemsNext = $(result).filter(function() {
                            return $(this).is('div' + '.cbp-loadMore-block' + (clicks + 1));
                        });
                        if (itemsNext.length === 0) {
                            me.text('NO MORE WORKS');
                            me.addClass('cbp-l-loadMore-button-stop');
                        }
                    });
            })
            .fail(function() {
                // error
            });
    });

    //PARALLAX BACKGROUND
    $(window).stellar({
        horizontalScrolling: false,
    });


    //PRELOADER
    $('#preload').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.


    //HEADER ANIMATION
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });

});

// CONTACT FORM FUNCTION
var contact_send = function() {

    'use strict';

    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();

    if (name == "") {
        alert("Your name is empty!");
        $("#name").focus();
    } else if (email == "") {
        alert("Your email address is empty!");
        $("#email").focus();
    } else if (message == "") {
        alert("Your message is empty!");
        $("#message").focus();
    } else {
        $.post("contact.send.php", {
            name: name,
            email: email,
            message: message
        }, function(result) {
            if (result == "SUCCESS") {
                alert("Your contact form is sent.");
                setTimeout(function() {
                    $("#name").val("");
                    $("#email").val("");
                    $("#message").val("");
                }, 3000);
            } else {
                alert("Your contact form isn't sent. Please check fields and try again.");
            }
        });
    }

};