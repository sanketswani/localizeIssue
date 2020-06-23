var TRange = null;
var TRangeIframe = null;
var strFound;
var strFoundFrame;
var searchingInWindow = false;
var searchingInFrame = false;
var isFirstTime = true;
var prevInput = "";
var str = "";
var exceptionInWindow = false;
document.body.addEventListener('keyup', function (e) {
    if (e.keyCode == 13) {
        str = document.getElementsByClassName('searchBox')[0].value.trim();
        if (str) {
            if (prevInput != "" && prevInput == str) {
                findString();
            }
            else {
                searchingInWindow = false;
                searchingInFrame = false;
                isFirstTime = true;
                prevInput = str;
                if (document.getElementsByTagName("iframe")[0])
                    removeSelection();
                findString();
            }
        }
    }
});

function findString() {
    var iFrame = document.getElementsByTagName("iframe")[0];
    if (str == undefined || str == "") return;
    if (parseInt(navigator.appVersion) < 4) return;
    if (window.find || (iFrame && iFrame.contentWindow.find)) {
        if (window.find && (isFirstTime || searchingInWindow) && !searchingInFrame) {
            isFirstTime = false;
            searchingInWindow = true;
            // CODE FOR BROWSERS THAT SUPPORT window.find
            strFound = window.find(str);
            if (strFound && !window.getSelection().anchorNode) strFound = window.find(str)
            if (!strFound) {
                ///COMMENTED TO PREVENT DOUBLE ENTER KEY PRESS FOR NOT FOUND TEXTS
                //strFound = self.find(str, 0, 1);
                while (window.find(str, 0, 1)) continue;
            }
            if (!strFound) {
                searchingInWindow = false;
                searchingInFrame = true;
            }

        }

        if (iFrame && iFrame.contentWindow.find && (searchingInFrame || !searchingInWindow)) {
            searchingInFrame = true;
            window.getSelection().removeAllRanges();
            strFoundFrame = iFrame.contentWindow.find(str);
            if (strFoundFrame && !iFrame.contentWindow.getSelection().anchorNode) strFoundFrame = iFrame.contentWindow.find(str)
            if (!strFoundFrame) {
                ///COMMENTED TO PREVENT DOUBLE ENTER KEY PRESS FOR NOT FOUND TEXTS
                //strFound = self.find(str, 0, 1);
                while (iFrame.contentWindow.find(str, 0, 1)) continue;
            }
            if (!strFoundFrame) {
                searchingInWindow = false;
                searchingInFrame = false;
            }
        }
    } else if (!window.find && navigator.appName.indexOf("Netscape") != -1) {
        if (TRange != null) {
            TRange.collapse(false);
            strFound = TRange.findText(str);
            if (strFound) TRange.select();
        } else if (TRange == null || strFound == 0) {
            TRange = self.document.body.createTextRange();
            strFound = TRange.findText(str);
            if (strFound) TRange.select();
        }
    }
    if (!strFound && !strFoundFrame) {
        var searchMsg = document.getElementById("searchMsg").textContent;
        if (searchMsg)
            alert(searchMsg + " '" + str + "'");
        else
            alert("No more occurences found for the searched keyword '" + str + "'")
        if (iFrame)
            removeSelection();
        TRange = null;
        searchingInWindow = false;
        searchingInFrame = false;
        isFirstTime = true;
    }
    return;
}

function removeSelection() {
    const sel = document.getElementsByTagName("iframe")[0].contentWindow.getSelection();
    if (sel.rangeCount > 0 && sel.getRangeAt(0).getClientRects().length > 0) { // All browsers, except IE <=8
        sel.removeAllRanges();
    }
}

