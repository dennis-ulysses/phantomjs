var system = require('system');
var url;

if (system.args[1]) {
    url = system.args[1];
}
else {
    url = "http://localhost.pilate.es/test.html";
}

var page = new WebPage();

page.settings.userAgent = "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; InfoPath.2; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET4.0C; .NET4.0E)";
//page.settings.userAgent = "Mozilla/5.0 (Windows; U; Windows NT 5.1; en; rv:1.9.1.1) Gecko/20090715 Firefox/3.5";
page.settings.localToRemoteUrlAccessEnabled = true;

page.onError = function (msg, trace) {
    logEvent("error", url, msg);
};

function logEvent(event, url, data) { 
    // btoa won't encode certain characters
    var e_url = escape(url);
    var e_data = escape(data);

    console.log([+new Date()+"000", event, btoa(e_url), btoa(e_data)].join("|"));
}

function doFinish(status) {
    // Write 'finish' event.
    if (!status) {
        logEvent("finishForced", url, page.content);
    }
    else {
        logEvent("finish", url, page.content);
    }

    phantom.exit();
}

setInterval(doFinish, 6000);
page.open(url, doFinish);
