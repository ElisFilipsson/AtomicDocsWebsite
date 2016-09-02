/* js/btn.js */

$('.btn').on("click", function () {
    $(this).addClass('btn--click');
});

$('.btn').on("mouseover", function () {
    $(this).addClass('btn--hover');
});

$('.btn').on("mouseout", function () {
    $(this).removeClass('btn--hover');
    $(this).removeClass('btn--click');
});