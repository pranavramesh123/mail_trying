$(document).ready(function () {
    setTimeout(function () {
        $('body').addClass('loaded');
    }, 500);
    setTimeout(function () {
        $('.pl').css({
            zIndex: 'auto'
        });
    }, 1200)
});
//return to login-enter window animation
$('.gob1').on('click', function () {
    $('.sec1').animate({
        left: '0'
    }, 300);
    $('.sec2').animate({
        left: '100%'
    }, 300);
    mail.value = '';
    document.getElementsByClassName('passInput')[0].value = '';
    $('#req3').css({
        visibility: 'hidden'
    });
    $('.passInput').css({
        borderBottom: '1px solid lightgrey'
    });
});
//go to create account window animation
$('.createAcc').on('click', function () {
    $('.sec3').animate({
        left: '13%'
    }, 300);
    $('.sec1').animate({
        left: '100%'
    }, 300);
    $('.logo').css({
        visibility: 'hidden'
    })
});
//return to main window from creating new acc
$('.back2btn').on('click', function () {
    $('.sec1').animate({
        left: '0'
    }, 300);
    $('.sec3').animate({
        left: '100%'
    }, 300);
    $('.logo').css({
        visibility: 'visible'
    });
    mail.value = '';
});
//logout from mail to main window
$('.close').on('click', function () {
    $('.mailArea').css({
        visibility: 'hidden'
    });
    $('.sec1').animate({
        left: '0'
    }, 300);
    $('.sec2').animate({
        left: '100%'
    }, 300);
    mail.value = '';
    document.getElementsByClassName('passInput')[0].value = '';
    $('#req3').css({
        visibility: 'hidden'
    });
    $('.passInput').css({
        borderBottom: '1px solid lightgrey'
    });
    $('.hide').css({
        visibility: 'hidden'
    });
    $('.message').css({
        visibility: 'hidden'
    });
    $('.hide2').css({
        visibility: 'hidden'
    });
    $('.message2').css({
        visibility: 'hidden'
    });
});
$('.sendLetterBtn').on('click', function () {
    document.getElementsByClassName('sendTo')[0].value = '';
    //    document.getElementsByClassName('sendFrom')[0].value = '';
    document.getElementsByClassName('sendText')[0].value = '';
});
$('.hide').on('click', function () {
    if (document.getElementsByClassName('message')[0].style.display == 'none' || document.getElementsByClassName('message')[0].style.visibility == 'hidden') {
        $('.message').css({
            display: 'block'
            , visibility: 'visible'
        });
    }
    else {
        $('.message').css({
            display: 'none'
            , visibility: 'hidden'
        });
    }
});
//check inmail
$('.checkLett').on('click', function () {
    $('.hide').css({
        visibility: 'visible'
    });
    $('.message').css({
        visibility: 'visible'
        , display: 'block'
    });
});
//check outmail
$('.checkLett2').on('click', function () {
    $('.hide2').css({
        visibility: 'visible'
    });
    $('.message2').css({
        visibility: 'visible'
        , display: 'block'
    });
});
//hide letters(OPTIONALLY!NOT MUST_HAVE)
$('.hide2').on('click', function () {
    if (document.getElementsByClassName('message2')[0].style.display == 'none' || document.getElementsByClassName('message2')[0].style.visibility == 'hidden') {
        $('.message2').css({
            display: 'block'
            , visibility: 'visible'
        });
    }
    else {
        $('.message2').css({
            display: 'none'
            , visibility: 'hidden'
        });
    }
});