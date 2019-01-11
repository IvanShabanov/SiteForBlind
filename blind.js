function setCookieBlind(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    expires = "";
    var domain = "domain=" + document.domain + ";path=/";
    var setc = cname + "=" + cvalue;
    if (expires != "") {
        setc = setc + "; " + expires
    }
    setc = setc + "; " + domain;
    document.cookie = setc;
};

function getCookieBlind(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};


function deleteCookieBlind(name) {
    setCookieBlind(name, "moot")
}

function blind_init() {
    var thislocation = window.location.href + ' 2)' + window.location + ' 3)' + document.location + ' 4)' + location;
    var head = '';
    head += '<link href="/blind/blind_common.css" rel="stylesheet" type="text/css">';
    head += '<link href="/blind/blind.css" rel="alternate stylesheet" type="text/css" title="blind_default">';
    head += '<link href="/blind/blind_f_s.css" rel="alternate stylesheet" type="text/css" title="smallfont">';
    head += '<link href="/blind/blind_f_b.css" rel="alternate stylesheet" type="text/css" title="bigfont">';
    head += '<link href="/blind/blind_c_bw.css" rel="alternate stylesheet" type="text/css" title="colorBlackWhite">';
    head += '<link href="/blind/blind_c_wb.css" rel="alternate stylesheet" type="text/css" title="colorWhiteBlack">';
    head += '<link href="/blind/blind_c_bg.css" rel="alternate stylesheet" type="text/css" title="colorBrownGreen">';
    head += '<link href="/blind/blind_c_bb.css" rel="alternate stylesheet" type="text/css" title="colorBlues">';
    head += '<link href="/blind/blind_c_by.css" rel="alternate stylesheet" type="text/css" title="colorBlueYellow">';
    head += '<link href="/blind/blind_c_yb.css" rel="alternate stylesheet" type="text/css" title="colorYellowBlue">';
    head += '<link href="/blind/blind_no_img.css" rel="alternate stylesheet" type="text/css" title="imageHide">';
    head += '<link href="/blind/blind_yes_img.css" rel="alternate stylesheet" type="text/css" title="imageShow">';
    head += '<link href="/blind/blind_serif.css" rel="alternate stylesheet" type="text/css" title="styleSerif">';
    head += '<link href="/blind/blind_sans.css" rel="alternate stylesheet" type="text/css" title="styleSans">';
    head += '<link href="/blind/blind_after.css" rel="alternate stylesheet" type="text/css" title="blind_default">';
    head += '<link href="/blind/blind_panel.css" rel="alternate stylesheet" type="text/css" title="blind_default">';
    document.write(head);

    if (thislocation.indexOf('?blind=false') > 0) {
        setCookieBlind('SiteForBlind', '0');
        blind_choose('none');
    };
    if (thislocation.indexOf('?blind=true') > 0) {
        setCookieBlind('SiteForBlind', '1');
    };
    if (getCookieBlind('SiteForBlind') == '1') {
        blind_choose('default');
    } else {

    }
}


function disableAllStylesheet() {
    var i, cacheobj, altsheets = [""]
    for (i = 0; (cacheobj = document.getElementsByTagName("link")[i]); i++) {
        var rel = cacheobj.getAttribute("rel");
        if (rel !== null) {
            if (cacheobj.getAttribute("rel").toLowerCase() == "alternate stylesheet" && cacheobj.getAttribute("title")) { //if this is an alternate stylesheet with title
                cacheobj.disabled = true //disable chosen style sheet
            }
        }
    }
};


function blind_choose(option) {
    var font = getCookieBlind('blindfont');
    var style = getCookieBlind('blindfontstyle');
    var color = getCookieBlind('blindcolor')
    var image = getCookieBlind('blindimage')
    var title = '';
    var i, cacheobj;

    if (option != 'none') {
        setCookieBlind('SiteForBlind', '1');
        if (style == '') {
            setCookieBlind('blindfontstyle', 'styleSans');
            font = 'styleSans';
        }
        if (font == '') {
            setCookieBlind('blindfont', 'normalfont');
            font = 'normalfont';
        }
        if (color == '') {
            setCookieBlind('blindcolor', 'colorBlackWhite');
            color = 'colorBlackWhite';
        }
        if (image == '') {
            setCookieBlind('blindimage', 'imageShow');
            image = 'imageShow';
        }
        if (option.indexOf('style') > -1) {
            setCookieBlind('blindfontstyle', option);
            style = option;
        }
        if (option.indexOf('font') > -1) {
            setCookieBlind('blindfont', option);
            font = option;
        }
        if (option.indexOf('color') > -1) {
            setCookieBlind('blindcolor', option);
            color = option;
        }
        if (option.indexOf('image') > -1) {
            if (image == 'imageShow') {
                image = 'imageHide';
            } else {
                image = 'imageShow';
            }
            setCookieBlind('blindimage', image);

        }
        for (z = 0; z < 2; z++) {
            for (i = 0; (cacheobj = document.getElementsByTagName("link")[i]); i++) {
                var rel = cacheobj.getAttribute("rel");
                if (rel !== null) {
                    if (rel.toLowerCase() == "alternate stylesheet" && cacheobj.getAttribute("title")) {
                        title = cacheobj.getAttribute("title");
                        cacheobj.disabled = true;
                        if ((title == image) || (title == style) || (title == font) || (title == color) || (title == 'blind_default')) {
                            cacheobj.disabled = false;
                        }
                    }
                }
            }
        }
        SiteBlindSet();
    } else {
        setCookieBlind('SiteForBlind', '0');
        disableAllStylesheet();
        SiteBlindUnSet();
    }
}

$(document).ready(function () {
    var panel = '';
    panel += '<div class="blindpanel" id="blindpanel">';
    panel += '<div class="forstandart">';
    panel += '  <a class="toblind" onclick="blind_choose(\'default\')">Перейти в версию для слабовидящих</a>';
    panel += '</div>';
    panel += '<div class="forblind">';
    panel += '  <a class="tostandart" onclick="blind_choose(\'none\')">Вернуться в стандартную версию сайта</a>';
    panel += '  <div class="blind deliver"></div>';
    panel += '  <div class="blind styleSans" onclick="blind_choose(\'styleSans\')" title="Шрифт без засечек">Ft</div>';
    panel += '  <div class="blind styleSerif" onclick="blind_choose(\'styleSerif\')"  title="Шрифт с засечками">Ft</div>';
    panel += '  <div class="blind deliver"></div>';
    panel += '  <div class="blind smallfont" onclick="blind_choose(\'smallfont\')" title="Маленький размер шрифта">A</div>';
    panel += '  <div class="blind normalfont" onclick="blind_choose(\'normalfont\')" title="Средний размер шрифта">A</div>';
    panel += '  <div class="blind bigfont" onclick="blind_choose(\'bigfont\')"  title="Большой размер шрифта">A</div>';
    panel += '  <div class="blind deliver"></div>';
    panel += '  <div class="blind colorBlackWhite" onclick="blind_choose(\'colorBlackWhite\')" title="Изменить цветовую схему">c</div>';
    panel += '  <div class="blind colorWhiteBlack" onclick="blind_choose(\'colorWhiteBlack\')" title="Изменить цветовую схему">c</div>';
    panel += '  <div class="blind colorBrownGreen" onclick="blind_choose(\'colorBrownGreen\')" title="Изменить цветовую схему">c</div>';
    panel += '  <div class="blind colorBlues" onclick="blind_choose(\'colorBlues\')" title="Изменить цветовую схему">c</div>';
    panel += '  <div class="blind colorYellowBlue" onclick="blind_choose(\'colorYellowBlue\')" title="Изменить цветовую схему">c</div>';
    panel += '  <div class="blind colorBlueYellow" onclick="blind_choose(\'colorBlueYellow\')" title="Изменить цветовую схему">c</div>';
    panel += '  <div class="blind deliver"></div>';
    panel += '  <div class="blind imageHide" onclick="blind_choose(\'image\')" title="Вкл/выкл показ изображений"></div>';
    panel += '</div>';
    panel += '</div>';
    $('body').append(panel);
});

function SiteBlindSet() {
    /* Тут код при инициализации режира для слабовидящих */
}

function SiteBlindUnSet() {
    /* Тут код при отключении режира для слабовидящих */
}


blind_init();
