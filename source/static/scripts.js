$(document).ready(function () {
    // Smooth Scrolling Function
    $('a[href*=#]:not([href=#])').click(function () {
        var $targ = $(this.hash),
            host1 = this.hostname,
            host2 = location.hostname,
            path1 = this.pathname.replace(/^\//, ''),
            path2 = location.pathname.replace(/^\//, '');

        if (!$targ.length) {
            $targ = $('[name=' + this.hash.slice(1) + ']');
        }

        if ($targ.length && (host1 === host2 || path1 === path2)) {
            $('html, body').animate({ scrollTop: $targ.offset().top }, 1000);

            return false;
        }

        return true;
    });

    // Modal Click Behavior
    $('.js-open-modal').click(function () {
        $('.js-target-modal').addClass('js-active');
        $('#overlay').addClass('js-active');
        $('body').addClass('js-body-modal-active');
    });

    $('.js-close-modal').click(function () {
        $('.js-target-modal').removeClass('js-active');
        $('#overlay').removeClass('js-active');
        $('body').removeClass('js-body-modal-active');
    });

    // Sticky Click Behavior
    $('.js-close-sticky').click(function () {
        $('.js-target-sticky').removeClass('js-active');
    });

    // Search Click Behavior
    $('.js-trigger-search').click(function (e) {
        e.preventDefault();
        $(this).parent().addClass('js-active');
        $('#overlay').addClass('js-active');
    });


    // Table Search
    $('.js-open-table-search').click(function (e) {
        e.preventDefault();
        $(this).parent().siblings('.table-sortable__search').toggleClass('table-sortable__search--active');
    });

    // Main Menu Click Behavior
    $('.js-trigger-menu').click(function (e) {
        $(this).next().addClass('js-active-menu');
    });

    // General Click Behavior for Overlay
    $('#overlay').click(function () {
        $('.js-active').removeClass('js-active');
        $('.js-active-menu').removeClass('js-active-menu');
    });

    // Slider
    $('.slider').slick({
        arrows: true,
        draggable: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    draggable: true
                }
            }
        ]
    });



    // LIST.JS IMPLEMENTATION
    var options = {
        valueNames: [ 'company__name', 'company__category', 'company__type', 'company__founded', 'company__location', 'company__last-update' ]
    };

    var companyNameOnly = {
        valueNames: ['company__name']
    };

    var companyLocationOnly = {
        valueNames: ['company__location']
    };

    var companyList = new List('company_data', options);
    var companyNameList = new List('company_data', companyNameOnly);
    var companyLocationList = new List('company_data', companyLocationOnly)


    function searchReset() {
        $(".search").val("");
        companyList.valueNames = options.valueNames;
        companyList.search();
        console.log(companyList.valueNames)
    }

    console.log(companyList)

// FILTER BY NAME OR LOCATION ONLY
    $(".search").keyup(function() {
        var searchString = $(this).val();
        console.log(searchString);
        if (this.id=="company__name") {
            companyNameList.search(searchString);
        } else if (this.id=="company__location") {
            companyLocationList.search(searchString);
        }
    });
// END FILTER


    // Xs and ESC TO CLOSE OUT FORM
    var searchButtons = $('.table-sortable__search').find("button[type='submit']")

    searchButtons.on("click", function(e) {
        if ($(this).parent().hasClass("table-sortable__search--active")) {
            $(this).parent().removeClass("table-sortable__search--active")
            searchReset();
        }
    })

    $("table").keyup(function(event) {
        if ( event.keyCode == "27" ) {
            $(this).parent().find('.table-sortable__search').removeClass("table-sortable__search--active")
            searchReset();
        }

    });

    // END ESC FORM




}); // doc.ready
