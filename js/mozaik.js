$(document).ready(function () {
    $('.themes').slick({
        dots:           true,
        slidesToShow:   2,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 768,
                settings:   {
                    slidesToShow:   1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});
