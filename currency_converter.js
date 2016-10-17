
var socket_cc;
var curforsell_cc;
var curforbuy_cc;
var amount_cc_cc;
var calculate_cc;
var total_cc_cc;
var calcannot_cc;
var curcalc_cc;
var head_text_cc;
var curr_have_cc;
var curr_want_cc;
var curr_amount_cc;
var date_cc = new Date();
var protocol = document.location.protocol;
protocol = protocol.replace(':', '');
if (protocol == 'file')
    protocol = 'http';

var widgetPort = 1;
var widgetPortS = 2;

if (typeof (lang_cc) == 'undefined' || lang_cc === null)
    lang_cc = 'en';
if (typeof (hname_cc) == 'undefined' || hname_cc === null)
    hname_cc = 'http://www.ifc-markets.cn/js/currcalc/www.ifcmarkets.com';
if (typeof (protocol) == 'undefined' || protocol === null)
    protocol = 'https';

$(document).ready(function () {
    //if ($('#ifc_nedcurrconv a').attr('href') == 'http://'+hname_cc+'/'+lang_cc+'/partnership/informers')
    if ($('#ifc_nedcurrconv a').attr('href').indexOf(hname_cc) > -1)
        $.getJSON(protocol + "://" + hname_cc + "/" + lang_cc + "/widgets/CurrConv?callback=?", function (data_cc) {
            // TODO get curr pairs and fill the form

            curforsell_cc = data_cc.phrase.sell;
            curforbuy_cc = data_cc.phrase.buy;
            amount_cc_cc = data_cc.phrase.amount_cc;
            calculate_cc = data_cc.phrase.calculate;
            total_cc_cc = data_cc.phrase.total_cc;
            calcannot_cc = data_cc.phrase.calcannot;
            curcalc_cc = data_cc.phrase.curcalc;
            head_text_cc = data_cc.phrase.headtext;
            curr_have_cc = data_cc.phrase.currhave;
            curr_want_cc = data_cc.phrase.currwant;
            curr_amount_cc = data_cc.phrase.curramount;

            widgetHost = data_cc.charthost;
            widgetPort = data_cc.chartport;
            widgetPortS = data_cc.chartport_https;
//        widgetPort = data_cc.port;

            var htmlbase_cc = ''
                    + '<div class="ifc_cc_head">'
                    + '<img src="' + protocol + '://' + hname_cc + '/images/widget/cc_icon.png"/>'
                    + '<p>' + head_text_cc + '</p>'
                    + '</div>'
                    + '<div class="ifc_cc_body">'
                    + '<div class="ifc_cc_body_left">'
                    + '<label for="cur1_cc">' + curr_have_cc + '</label>'
                    + '<div class="clear"></div>'
                    + '<select id="cur1_cc"></select>'
                    + '<div class="clear"></div>'
                    + '<p id="currname1_cc" class="currname_cc"></p>'
                    + '<div class="clear"></div>'
                    + '<label for="amount_cc">' + curr_amount_cc + '</label>'
                    + '<div class="clear"></div>'
                    + '<div class="currency_symbol"></div>'
                    + '<input type="text" id="amount_cc" name="amount_cc" size="10" autocomplete="off"/>'
                    + '</div>'
                    + '<div class="ifc_cc_switch_button">'
                    + '</div>'
                    + '<div class="ifc_cc_body_right">'
                    + '<label for="cur2_cc">' + curr_want_cc + '</label>'
                    + '<div class="clear"></div>'
                    + '<select id="cur2_cc"></select>'
                    + '<div class="clear"></div>'
                    + '<p id="currname2_cc" class="currname_cc"></p>'
                    + '<div class="clear"></div>'
                    + '<label for="total_cc">' + curr_amount_cc + '</label>'
                    + '<div class="clear"></div>'
                    + '<div class="currency_symbol"></div>'
                    + '<input type="text" id="total_cc" name="total_cc" size="10" autocomplete="off"/>'
                    + '</div>'
                    + '</div>'
                    + '<div class="clear"></div>'
                    + '<div class="footer_cc">'
                    + '<img src="' + protocol + '://' + hname_cc + '/images/front/content/forex_button_data.png"/>'
                    + '<div class="date_time_cc"></div>'
                    + '</div>'
                    + '<div class="clear"></div>'
                    + "";

            $('#ifc_widgetcurrconv').html(htmlbase_cc);

            $('#ifc_nedcurrconv').html($('#ifc_nedcurrconv').html().replace('Provided', head_text_cc));
            for (var v in data_cc.cur) {
                $('#cur1_cc').append('<option value="' + data_cc.cur[v]['symbol'] + '" data="' + data_cc.cur[v]['name'] + '">' + data_cc.cur[v]['symbol'] + '</option>');
                $('#cur2_cc').append('<option value="' + data_cc.cur[v]['symbol'] + '" data="' + data_cc.cur[v]['name'] + '">' + data_cc.cur[v]['symbol'] + '</option>');
            }
            $('#amount_cc').on("change", function () {
                calculateAndShow_cc();
                return false;
            });
            $('#amount_cc').keyup(function () {
                $(this).change();
            });
            $('#cur1_cc').on("change", function () {
                $('#amount_cc').change();
                $('.ifc_cc_body_left #currname1_cc').html($(this).find('option[value=' + $('#cur1_cc').val() + ']').attr('data'));
            });
            $('#cur2_cc').on("change", function () {
                $('#amount_cc').change();
                $('.ifc_cc_body_right #currname2_cc').html($(this).find('option[value=' + $('#cur2_cc').val() + ']').attr('data'));
            });
            $('.ifc_cc_switch_button').on("click", function () {
                var tmp = $('#cur1_cc').val();
                $('#cur1_cc').val($('#cur2_cc').val());
                $('#cur2_cc').val(tmp);
                $('#cur1_cc').change();
                $('#cur2_cc').change();
                $('#amount_cc').change();
            });

            //
            //$('#ifc_widgetcurrconv #tradersCalc .forms_calc').append('<div class="calc_text">'+calcannot+'</div>');
            addJavascript_cc(location.protocol + '//' + hname_cc + '/js/socket.io-1.1.0.js', 'body');
        });

});
/**
 * get's called after everything is loaded
 */
function main_cc() {
//    socket_cc = io.connect("https://"+widgetHost);
    var port = widgetPort;
    if (location.protocol == "https") {
        port = widgetPortS;
    }
    socket_cc = io.connect(protocol + "://" + widgetHost + ":" + port);
    //socket_cc = io.connect('192.168.7.232:8888');

    socket_cc.on('connect', function (data_cc) {
        // ignore
    });
    socket_cc.on('currConvVal', function (data_cc) {
//        console.log(data_cc.currency);
        $('#total_cc').val(Math.round(data_cc.currency * $('#amount_cc').attr('value') * 100000) / 100000);
//        console.log($('#total_cc').val());
    });

    $('#cur1_cc').val('USD');
    $('#cur2_cc').val('EUR');
    $('#amount_cc').val(1);
    $('#amount_cc').change();
    $('.ifc_cc_body_left #currname1_cc').html($('#cur1_cc').find('option[value=' + $('#cur1_cc').val() + ']').attr('data'));
    $('.ifc_cc_body_right #currname2_cc').html($('#cur2_cc').find('option[value=' + $('#cur2_cc').val() + ']').attr('data'));

    setInterval(function () {
        updateClock_cc();
    }, 1000);

}
;

function calculateAndShow_cc() {
    if ($('#cur1_cc option:selected').val() == $('#cur2_cc option:selected').val()) {
        $('#total_cc').val($('#amount_cc').attr('value'));
        return false;
    }
    socket_cc.emit('currConv', {'first': $('#cur1_cc option:selected').val(), 'second': $('#cur2_cc option:selected').val()});
    return false;
}

function updateClock_cc() {
    $('.date_time_cc').html(dateFormat());
}

function dateFormat() {
    var d = new Date();

    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hour = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();

    var output = d.getFullYear() + '/' +
            (('' + month).length < 2 ? '0' : '') + month + '/' +
            (('' + day).length < 2 ? '0' : '') + day + '  ' +
            (('' + hour).length < 2 ? '0' : '') + hour + ':' +
            (('' + minute).length < 2 ? '0' : '') + minute + ':' +
            (('' + second).length < 2 ? '0' : '') + second;

    return output;
}

function addJavascript_cc(jsname, pos) {
    var th = document.getElementsByTagName(pos)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', jsname);
    th.appendChild(s);
    $(s).load(
            function () {
                if (typeof io !== 'undefined')
                    main_cc();
                else
                    console.log('io is undefined');
            }
    );
}
;
