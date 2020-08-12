$(function () {
    $('.content-holder table').each(function () {
        removeAttr(this);
    });

    $('.content-holder table tr').each(function () {
        removeAttr(this);
    });

    $('.content-holder table tr td').each(function () {
        removeAttr(this);
    });

    $('.table-style').each(function () {

        $(this).children('tbody').children('tr').each(function (index) {
            if (index % 2 != 0) {
                $(this).addClass('odd');
            }
        });

        $(this).children('tbody').children('tr').first().addClass('tr-header');
    });
    
    $('.table-style-double').each(function () {

        $(this).children('tbody').children('tr').each(function (index) {
            if (!(index % 4 == 0 || index % 4 == 3)) {
                $(this).addClass('odd');
            }
        });

        $(this).children('tbody').children('tr').first().addClass('tr-header');
    });
    
    $('.table-style-double1').each(function () {

        $(this).children('tbody').children('tr').each(function (index) {
            if (!(index % 4 == 0 || index % 4 == 3)) {
                $(this).addClass('odd');
            }
        });

        $(this).children('tbody').children('tr').first().addClass('tr-header');
    });
    
});

function removeAttr(target) {
    $(target).removeAttr('style');
    $(target).removeAttr('width');
    $(target).removeAttr('height');
    //$(target).removeAttr('align');
    $(target).removeAttr('valign');
    $(target).removeAttr('border');
    $(target).removeAttr('bgcolor');
}