/**
 * Created by Smile on 2015-07-05.
 * Modified by Smile on 2016-06-24.
 * This is the javascript for a markdown compiled html.
 * usage: 
 * <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 * 
 * <body onload= load()>
 * 
 * Split page when print:
 * <style media="print" type="text/css">.pageEnd{page-break-after:always;}</style>
 * <div class="pageEnd"></div>
 */

function load(event) {
    var n = document.getElementsByTagName("li").length;
    for (i = 0; i < n; i++) {
        document.getElementsByTagName("li")[i].addEventListener("click", function() {
            testOnClickLi(this, event);
        });
    }
    var m = document.getElementsByTagName("h3").length;
    for (i = 0; i < m; i++) {
        document.getElementsByTagName("h3")[i].addEventListener("click", function() {
            testOnClickH(this, event);
        });
    }
}

function testOnClickLi(id, e) {
    if (e && e.stopPropagation)
        e.stopPropagation();
    else
        window.event.cancelBubble = true;
    var arr = id.childNodes;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != null) {
            if (arr[i].nodeName == "UL" || arr[i].nodeName == "OL" || arr[i].nodeName == "LI") {
                if (arr[i].style.display == "none") {
                    arr[i].style.display = "block";
                } else {
                    arr[i].style.display = "none";
                }
            }
        }
    };
}

function testOnClickH(id, e) {
    if (e && e.stopPropagation)
        e.stopPropagation();
    else
        window.event.cancelBubble = true;
    var arr = id.nextElementSibling;
    if (arr != null) {
        if (id.nextElementSibling.style.display == "none") {
            id.nextElementSibling.style.display = "block";
        } else {
            id.nextElementSibling.style.display = "none";
        }
    }
}
