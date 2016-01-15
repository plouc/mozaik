(function () {
    'use strict';

    var $container = $('#container');
    var $window    = $(window);
    var $sidebar   = $('.sidebar');
    var $header    = $('.header');
    var $subHeader = $('.sub-header');

    var subHeaderInview = new Waypoint.Inview({
        element: $subHeader,
        context: $container,
        enter:   function () {
            $header.removeClass('header_compact');
        },
        exited:  function () {
            $header.addClass('header_compact');
        }
    });

    var $strata  = $container.find('.page_content > .strata > .strata_in');
    if ($sidebar.length === 1) {
        var stickySidebar = new Waypoint.Sticky({
            element: $sidebar,
            context: $container,
            handler: function () {
                var right = $window.width() - $strata.offset().left - $strata.width();

                this.$element.css('right', right)
            }
        });
    }

    var $article    = $('.article');
    var $toc        = $('.toc');
    var anchorLinks = [];

    function highlightToc() {
        anchorLinks.sort(function (a, b) {
            return a.pos - b.pos;
        });
        $toc.find('.toc-link').removeClass('_is-current');
        if (anchorLinks.length > 0) {
            anchorLinks[0].el.addClass('_is-current');
        }
    }

    if ($article.length === 1 && $toc.length > 0) {
        var $headers = $article.find('h1,h2,h3,h4,h5,h6');
        $headers.each(function (i) {
            var anchorId = this.id;
            var $link    = $toc.find('.toc-link[href="#' + anchorId + '"]');
            if ($link.length >= 0) {
                var inview = new Waypoint.Inview({
                    element: this,
                    context: $container,
                    enter: (function (pos) {
                        return function () {
                            anchorLinks.push({ pos: pos, el: $link });
                            highlightToc();
                        };
                    })(i),
                    exit: (function (pos) {
                        return function () {
                            anchorLinks = anchorLinks.filter(function (anchorLink) {
                                return anchorLink.pos !== pos;
                            });
                            highlightToc();
                        };
                    })(i)
                });
            }
        });
    }
})();
