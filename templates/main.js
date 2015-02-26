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

    function reloadStylesheets() {
        var queryString = '?reload=' + new Date().getTime();
        $('link[rel="stylesheet"]').each(function() {
            this.href = this.href.replace(/\?.*|$/, queryString);
        });
    }


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
    function min_selected(q_num) {
        var result = false;
        $.each($('input[id*="q'+(q_num-2)+'"]'), function(index, value) {
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
        $('.custom-page.'+page_num).addClass('active');
        questionnaire.trigger('owl.goTo', page_num-1);
        current_page = page_num;
    }

    $('body').on('click', '.next-verify', function() {
        if (current_page < 7) {
            if ([3, 4, 5, 6].indexOf(current_page) > -1 ) { //Check that at least one checkbox has been checked in slides 3, 4, 5, 6, 7
                if (min_selected(current_page)) {
                    go_to_page(current_page+1)
                } else {
                    $('.error-message').text("Please select at least one option.").show().delay(5000).fadeOut();
                }
            } else { //Go on to the next slide
                go_to_page(current_page+1)
            }
        }
    });

    $('body').on('click', '.prev-verify', function() {
        if (current_page > 1) {
            go_to_page(current_page-1)
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
        } if (current_page - previous_page > 0 && current_page > previous_page) {
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
        var filters = $('.cbp-filter-item-active').map( function() { return $(this).data('filter'); }).toArray().join('');
        //filters = filters.replace('*.','.').replace('.*.','.').replace('.*', '').replace('**', '*');
        if (filters == '*****') {
            filters = '*';
        } else {
            filters = filters.replace(/\*{1,}/g, '');
        }
        console.log(filters);
        gridContainer.cubeportfolio('filter', filters, function () {});
    });



    // activate counters
    gridContainer.cubeportfolio('showCounter', type_filtersContainer.find('.cbp-filter-item'));


    var items = {{items}}
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
            gridContainer.cubeportfolio('destroy');
            gridContainer.cubeportfolio(options_portfolio);
        } else {
            $('.error-message').text("Please select at least one option.").show().delay(5000).fadeOut();
        }
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