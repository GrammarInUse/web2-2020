/* French initialisation for the jQuery UI date picker plugin. */
/* Written by St&#233;phane Nahmani (sholby@sholby.net). */
(function($) {
        $.ui.datepicker.regional['vi'] = {
                renderer: $.ui.datepicker.defaultRenderer,
                monthNames: ['Th&#225;ng 1','Th&#225;ng 2','Th&#225;ng 3','Th&#225;ng 4','Th&#225;ng 5','Th&#225;ng 6',
                'Th&#225;ng 7','Th&#225;ng 8','Th&#225;ng 9','Th&#225;ng 10','Th&#225;ng 11','Th&#225;ng 12'],
                monthNamesShort: ['T1','T2','T3','T4','T5','T6',
                'T7','T8','T9','T10','T11','T12'],
                dayNames: ['Ch&#7911; nh&#7853;t','Th&#7913; 2','Th&#7913; 3','Th&#7913; 4','Th&#7913; 5','Th&#7913; s&#225;u','Th&#7913; 7'],
                dayNamesShort: ['CN','Th&#7913; 2','Th&#7913; 3','Th&#7913; 4','Th&#7913; 5','Th&#7913; 6','Th&#7913; 7'],
                dayNamesMin: ['CN','Hai','Ba','T&#432;','N&#259;m','S&#225;u','B&#7843;y'],
                dateFormat: 'dd/mm/yyyy',
                firstDay: 1,
                prevText: 'L&#249;i', prevStatus: 'Xem th&#225;ng tr&#432;&#7899;c',
                prevJumpText: 'L&#249;i', prevJumpStatus: 'Xem n&#259;m tr&#432;&#7899;c',
                nextText: 'Ti&#7871;p', nextStatus: 'Xem th&#225;ng ti&#7871;p theo',
                nextJumpText: 'Ti&#7871;p', nextJumpStatus: 'Xem n&#259;m sau',
                currentText: 'Hi&#7879;n t&#7841;i', currentStatus: 'Xem th&#225;ng hi&#7879;n t&#7841;i',
                todayText: 'H&#244;m nay', todayStatus: 'Xem h&#244;m nay',
                clearText: 'X&#243;a', clearStatus: 'X&#243;a c&#225;c ng&#224;y &#273;&#432;&#7907;c ch&#7885;n',
                closeText: '&#272;&#243;ng', closeStatus: '&#272;&#243;ng',
                yearStatus: 'Xem th&#234;m m&#7897;t n&#259;m n&#7919;a', monthStatus: 'Xem th&#234;m m&#7897;t n&#259;m n&#7919;a',
                weekText: 'Tu&#7847;n', weekStatus: 'Tu&#7847;n c&#7911;a n&#259;m',
                dayStatus: 'Ch&#7885;n ng&#224;y dd/MM/yyyy',
                defaultStatus: 'Ch&#7885;n ng&#224;y',
                isRTL: false
        };
        $.extend($.ui.datepicker.defaults, $.ui.datepicker.regional['vi']);
})(jQuery);
