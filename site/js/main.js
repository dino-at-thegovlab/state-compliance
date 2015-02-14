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
		callbackBefore: function ( toggle, anchor ) {}, // Function to run before scrolling
		callbackAfter: function ( toggle, anchor ) {} // Function to run after scrolling
	 });
	 
	 
	//TEXT ROTATOR
	$(".rotate").textrotator({
	  animation: "fade", // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
	  separator: "," // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
	});

	  
	//MILESTONE
    $('.timer').countTo();
		
 	 	
	//ANIMATIONS
	var wow = new WOW(
	  {
		boxClass:     'wow',      // animated element css class (default is wow)
		animateClass: 'animated', // animation css class (default is animated)
		offset:       0,          // distance to the element when triggering the animation (default is 0)
		mobile:       false        // trigger animations on mobile devices (true is default)
	  }
	);
	wow.init();

    // function reloadStylesheets() {
    //     var queryString = '?reload=' + new Date().getTime();
    //     $('link[rel="stylesheet"]').each(function () {
    //         this.href = this.href.replace(/\?.*|$/, queryString);
    //     });
    // }

	  
	//OWLCAROUSEL TESTIMONIAL
	$("#quote").owlCarousel({
		autoPlay: false,
        pagination : true, 
		slideSpeed : 500,
		paginationSpeed : 600,
        paginationNumbers: true,
		singleItem:true,
        rewindNav: false,
        scrollPerPage : true,
        mouseDrag: false,
		navigation : true, // Show next and prev buttons
		navigationText : ['<div class="q-buttons owl-prev" style="">Previous</div>','<div class="q-buttons owl-next" style="">Next</div>']
	});
    // var owl = $('#quote').data('owlCarousel');
    // var currentPage = 1;
    // console.log(currentPage);
    // $('#quote').on('click', '.owl-next', function() {
    //     currentPage ++;
    //     owl.jumpTo(1);
    //     console.log(currentPage);
    // });
	
    var items = [{'url': 'adopt-a-hydrant', 'scores': [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0], 'title': 'Adopt-a-Hydrant'}, {'url': 'agreeble', 'scores': [0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0], 'title': 'agreeble'}, {'url': 'bc-ideas', 'scores': [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'BC Ideas'}, {'url': 'catchafire', 'scores': [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Catchafire'}, {'url': 'challenge.gov', 'scores': [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Challenge.gov'}, {'url': 'code-for-philly', 'scores': [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Code for Philly'}, {'url': 'consumer-financial-protection-bureau-credit-card-complaints-database', 'scores': [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Consumer Financial Protection Bureau Credit Card Complaints Database'}, {'url': 'drivebc.ca', 'scores': [0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0], 'title': 'Drivebc.ca'}, {'url': 'experiment', 'scores': [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0], 'title': 'Experiment'}, {'url': 'fixmystreet', 'scores': [0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0], 'title': 'FixMyStreet'}, {'url': 'foldit', 'scores': [1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Foldit'}, {'url': 'govtogetherbc', 'scores': [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], 'title': 'GovTogetherBC'}, {'url': 'grade.dc.gov', 'scores': [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Grade.DC.Gov'}, {'url': 'grouptalent', 'scores': [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0], 'title': 'GroupTalent'}, {'url': 'i-paid-a-bribe', 'scores': [1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1], 'title': 'I Paid a Bribe'}, {'url': 'kickstarter', 'scores': [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Kickstarter'}, {'url': 'innocentive', 'scores': [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'title': 'Innocentive'}, {'url': 'mindlab', 'scores': [0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'MindLab'}, {'url': 'open-data-500', 'scores': [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], 'title': 'Open Data 500'}, {'url': 'quora', 'scores': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'title': 'Quora'}, {'url': 'pulsepoint-respond', 'scores': [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0], 'title': 'PulsePoint Respond'}, {'url': 'tehuan-3.0', 'scores': [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1], 'title': 'Tehuan 3.0'}, {'url': 'threadless', 'scores': [1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0], 'title': 'Threadless'}, {'url': 'ushahidi', 'scores': [0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0], 'title': 'Ushahidi'}, {'url': 'empty-example', 'scores': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 'title': 'EMPTY EXAMPLE'}]
    var case_study_template = '<li class="case-study">'+
                    '<div class="">'+
                        '<div class="">'+
                            '<a href="<%= url %>.html" class="" data-title=""><img src="img/casestudies/<%= url %>-small.png" alt="" width="100%"></a>'+
                        '</div>'+
                        '<div class="">'+
                            '<div class="">'+
                                '<div class="">'+
                                    '<a href="ajax/.html" class=""><i class="pe-3x pe-7s-plus"></i></a>'+
                                '</div>'+
                            '</div>'+
                        '</div>' +
                    '</div>' +
                    '<div class=""><%= title %></div>' +
                    '<div class=""></div>' +
                '</li>';


    //----------------GENERATES REPORT-----------------
    $('#questionnaire').on('click', '.button-generate-report', function() {
        var options = {};
        $.each($('input[name="question"]'), function(index, value) { 
            options[this.id] = this.checked ? 1 : 0; 
        });
        var point = $.map($('input[name="question"]'), function(value, index) { return value.checked?1:0 ; });
        //var answers = $.map($('input[name="question"]'), function(value, index) { return value.checked? value.id:0 ; });
        //console.log(answers);
        //console.log(point);
        $('.report-category-heading').hide();
        $('#report').hide();
        for (var key in options) {
            if (options[key]) {
                $('.'+ key).show();
                $('.'+key.substring(0,2)).show();
            } else {
                $('.'+key).hide();
            }
        }
        var points = [];
        for (var o in items) {
            points.push(items[o].scores);
        }
        var tree = createKDTree(points);
        var candidates = tree.knn(point, 5);
        console.log(candidates);
        $('#report').show();
        $('#relevant-case-studies').show();
        var new_case_study = _.template(case_study_template);
        for (var i in candidates) {
            var data = {"url":items[candidates[i]]['url'], "title":items[candidates[i]]['title']}
            $("#relevant-case-study-list").append(new_case_study(data));
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
 
		slideSpeed : 300,
		paginationSpeed : 400,
        autoPlay : true,
		singleItem:false,
		items : 3,
		itemsDesktop : [1200,3],
		itemsDesktopSmall : [980,3],
		itemsTablet: [768,2],
		itemsMobile : [479,1],
        pagination : true,
		navigation : true, // Show next and prev buttons
		navigationText : ['<i class="pe-7s-angle-left-circle pe-3x"></i>','<i class="pe-7s-angle-right-circle pe-3x"></i>'],
	});
  
  
	//LIGHTBOX GALLERY
	(function ($, window, document, undefined) {

    var gridContainer = $('#grid-container'),
        filtersContainer = $('#filters-container');

	// init cubeportfolio
    gridContainer.cubeportfolio({

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
        singlePageCallback: function (url, element) {

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
    });

    // add listener for filters click
    filtersContainer.on('click', '.cbp-filter-item', function (e) {

        var me = $(this), wrap;

        // get cubeportfolio data and check if is still animating (reposition) the items.
        if ( !$.data(gridContainer[0], 'cubeportfolio').isAnimating ) {

            if ( filtersContainer.hasClass('cbp-l-filters-dropdown') ) {
                wrap = $('.cbp-l-filters-dropdownWrap');

                wrap.find('.cbp-filter-item').removeClass('cbp-filter-item-active');

                wrap.find('.cbp-l-filters-dropdownHeader').text(me.text());

                me.addClass('cbp-filter-item-active');
            } else {
                me.addClass('cbp-filter-item-active').siblings().removeClass('cbp-filter-item-active');
            }

        }

        // filter the items
        gridContainer.cubeportfolio('filter', me.data('filter'), function () {});

    });

    // activate counters
    gridContainer.cubeportfolio('showCounter', filtersContainer.find('.cbp-filter-item'));


    // add listener for load more click
    $('.cbp-l-loadMore-button-link').on('click', function(e) {

        e.preventDefault();

        var clicks, me = $(this), oMsg;

        if (me.hasClass('cbp-l-loadMore-button-stop')) return;

        // get the number of times the loadMore link has been clicked
        clicks = $.data(this, 'numberOfClicks');
        clicks = (clicks)? ++clicks : 1;
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
        .done( function (result) {
            var items, itemsNext;

            // find current container
            items = $(result).filter( function () {
                return $(this).is('div' + '.cbp-loadMore-block' + clicks);
            });

            gridContainer.cubeportfolio('appendItems', items.html(),
                 function () {
                    // put the original message back
                    me.text(oMsg);

                    // check if we have more works
                    itemsNext = $(result).filter( function () {
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

})(jQuery, window, document);

 
}); 


$(window).load(function(){
	
	
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
	var contact_send = function(){
	
	'use strict';
	
	var name 	= $("#name").val();
	var email	= $("#email").val();
	var message = $("#message").val();
	
	if ( name=="" ){ alert("Your name is empty!"); $("#name").focus(); }
	else if ( email=="" ){ alert("Your email address is empty!"); $("#email").focus(); }
	else if ( message=="" ){ alert("Your message is empty!"); $("#message").focus(); }
	else {
		$.post("contact.send.php", { name:name, email:email, message:message }, function( result ){
			if ( result=="SUCCESS" ){
				alert("Your contact form is sent.");
				setTimeout(function(){
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