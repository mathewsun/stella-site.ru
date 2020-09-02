function reachGoal(goalName, googleGoalCategory, googleGoalAction) {
    if (typeof gtag === 'function') {
        gtag('event', goalName, {'event_category': googleGoalCategory, 'event_action': googleGoalAction});
    }
    if (typeof ym === "function" && Y_METRIC) {
        ym(Y_METRIC, 'reachGoal', goalName);
    }

    if (typeof fbq === 'function') {
        fbq('trackCustom', goalName);
    }
}

function readCookie(cookieName) {
    var re = new RegExp('[; ]' + cookieName + '=([^\\s;]*)');
    var sMatch = (' ' + document.cookie).match(re);
    if (cookieName && sMatch) return unescape(sMatch[1]);
    return '';
}

function showFormErrorMessage(errors) {
    var errorToShow;
    if (Array.isArray(errors)) {
        errorToShow = errors[0];
    } else {
        errorToShow = errors;
    }

    if (errorToShow in ERRORS_MAP) {
        toasterErrorCenter(ERRORS_MAP[errorToShow], '', 3000);
    }
}

function toasterErrorCenter(text, heading, duration) {
    toastr.remove();
    toastr.error(text, heading, {
        showDuration: 300,
        hideDuration: 300,
        timeOut: duration,
        tapToDismiss: true,
        positionClass:'toast-top-center'
    })
}

function toasterSuccessCenter(text, heading, duration) {
    toastr.remove();
    toastr.success(text, heading, {
        showDuration: 300,
        hideDuration: 300,
        timeOut: duration,
        tapToDismiss: true,
        positionClass:'toast-top-center'
    });
}

function isPhoneValid() {
    var val = $('#phoneNumber').val();
    val = val.replace(/[^+0-9]/g, '');
    return val.length === 12;
}