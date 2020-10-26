export function checkPhone(value) { //验证手机号
    //校验手机号
    const ex = /^1[345789]\d{9}$/;
    if (!ex.test(value)) {
        return false;
    }
    return true;
}

// var imgurlapi =  "http://192.168.188.4/";
//上传附件
export function uploadPic(id, callback) {
    var uploader = WebUploader.create({
        swf: '../../static/js/webuploader-0.1.5/Uploader.swf',
        auto: true,
        pick: {
            id: '#' + id,
            label: '添加附件'
        },
        server: process.env.BASE_API + 'IGIP-BWZL-FILE/FileUploadServlet',

        duplicate: true,
        fileVal: 'filedata',
        accept: {
            title: 'Images',
            extensions: 'jpg,png,jpeg,gif',
            mimeTypes: 'image/*'
        },

        fileSizeLimit: 200 * 1024 * 1024, // 200 M
        fileSingleSizeLimit: 50 * 1024 * 1024 // 50 M
    });
    uploader.on('uploadSuccess', function(file, result) {
        // console.log(file)
        callback(result);
    });
    // uploader.on( 'uploadError', function( file ) {
    //     console.log(file)
    // });
    // uploader.on( 'uploadComplete', function( file ) {
    //     console.log(file)
    // });
}
export function myPrint(id) { //打印
    if (id) { //打印部分内容
        const bdhtml = window.document.body.innerHTML; //获取当前页的html代码
        const prnhtml = document.getElementById(id).innerHTML;
        window.document.body.innerHTML = prnhtml;
        window.print();
        window.history.go(0);
    } else { //打印整个网页
        window.print();
    }
}
export function uniq(array) { //数组去重
    var temp = []; //一个新的临时数组
    for (var i = 0; i < array.length; i++) {
        if (temp.indexOf(array[i]) == -1) {
            temp.push(array[i]);
        }
    }
    return temp;
}

export function timeFn(d1, d2) { //di作为一个变量传进来
    //如果时间格式是正确的，那下面这一步转化时间格式就可以不用了
    var dateBegin = new Date(d1.replace(/-/g, "/")); //将-转化为/，使用new Date
    var dateEnd = new Date(d2.replace(/-/g, "/")); //获取当前时间
    var dateDiff = dateEnd.getTime() - dateBegin.getTime(); //时间差的毫秒数
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)); //计算出相差天数
    // var leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
    // var hours=Math.floor(leave1/(3600*1000))//计算出小时数
    // //计算相差分钟数
    // var leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
    // var minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
    // //计算相差秒数
    // var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
    // var seconds=Math.round(leave3/1000)
    // console.log(" 相差 "+dayDiff+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒")
    // console.log(dateDiff+"时间差的毫秒数",dayDiff+"计算出相差天数",leave1+"计算天数后剩余的毫秒数"
    //     ,hours+"计算出小时数",minutes+"计算相差分钟数",seconds+"计算相差秒数");

    return dayDiff;
}
//阿拉伯数字转换为简写汉字
export function changeNumberToChinese(money) {
    var cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //汉字的数字
    var cnIntRadice = new Array("","拾","佰","千"); //整数基本单位
    var cnFloRadice = new Array("",""); //小数基本单位
    var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
    var cnDecUnits = new Array("千克"); //对应小数部分单位
    var cnInteger = "整"; //整数金额时后面跟的字符
    var cnIntLast = "点"; //整型完以后的单位
    var maxNum = 999999999999999.9999; //最大处理的数字

    var IntegerNum; //金额整数部分
    var DecimalNum; //金额小数部分
    var ChineseStr = ""; //输出的中文金额字符串
    var parts; //分离金额后用的数组，预定义
    var decLen;

    if (money == "") {
        return "";
    }

    money = parseFloat(money);

    if (money >= maxNum) {
        $.alert('超出最大处理数字');
        return "";
    }

    if (money == 0) {
        ChineseStr = cnNums[0] + cnIntLast + cnInteger;
        //document.getElementById("show").value=ChineseStr;
        return ChineseStr;
    }

    money = money.toString(); //转换为字符串
    if (money.indexOf(".") == -1) {
        IntegerNum = money;
        DecimalNum = '';
    } else {
        parts = money.split(".");
        IntegerNum = parts[0];
        DecimalNum = parts[1].substr(0, 4);
    }

    if (parseInt(IntegerNum, 10) > 0) { //获取整型部分转换
        var zeroCount = 0;
        var IntLen = IntegerNum.length;
        for (var i = 0; i < IntLen; i++) {
            var n = IntegerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n == "0") {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    ChineseStr += cnNums[0];
                }
                zeroCount = 0; //归零
                ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }

            if (m == 0 && zeroCount < 4) {
                ChineseStr += cnIntUnits[q];
            }
        }

        ChineseStr += cnIntLast;
        //整型部分处理完毕

    }

    if (DecimalNum != '') { //小数部分
        decLen = DecimalNum.length;
        var float_ = (DecimalNum / 100) * 100;
        for (var i = 0; i < decLen; i++) {
            n = DecimalNum.substr(i, 1);
            if (n != '0') {
                ChineseStr += cnNums[Number(n)] + cnFloRadice[Number(i)];
            }else {
                ChineseStr += cnNums[Number(n)] + cnDecUnits
            }
        }
        ChineseStr += cnDecUnits[0];
    }
    if(DecimalNum == ''){
      ChineseStr += cnNums[0]  + cnDecUnits;
    }
    if (ChineseStr == '') {
        ChineseStr += cnNums[0] + cnInteger;
    } else if (DecimalNum == '') {
        ChineseStr += cnInteger;
    }
    // alert(ChineseStr);
    return ChineseStr;
}
//将阿拉伯数字金额转换成大写
export function changeMoneyToChinese(money) {

    var cnNums = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"); //汉字的数字
    var cnIntRadice = new Array("", "拾", "佰", "仟"); //基本单位
    var cnIntUnits = new Array("", "万", "亿", "兆"); //对应整数部分扩展单位
    var cnDecUnits = new Array("角", "分", "毫", "厘"); //对应小数部分单位
    var cnInteger = "整"; //整数金额时后面跟的字符
    var cnIntLast = "元"; //整型完以后的单位
    var maxNum = 999999999999999.9999; //最大处理的数字

    var IntegerNum; //金额整数部分
    var DecimalNum; //金额小数部分
    var ChineseStr = ""; //输出的中文金额字符串
    var parts; //分离金额后用的数组，预定义
    var decLen;

    if (money == "") {
        return "";
    }

    money = parseFloat(money);

    if (money >= maxNum) {
        $.alert('超出最大处理数字');
        return "";
    }

    if (money == 0) {
        ChineseStr = cnNums[0] + cnIntLast + cnInteger;
        //document.getElementById("show").value=ChineseStr;
        return ChineseStr;
    }

    money = money.toString(); //转换为字符串
    if (money.indexOf(".") == -1) {
        IntegerNum = money;
        DecimalNum = '';
    } else {
        parts = money.split(".");
        IntegerNum = parts[0];
        DecimalNum = parts[1].substr(0, 4);
    }

    if (parseInt(IntegerNum, 10) > 0) { //获取整型部分转换
        var zeroCount = 0;
        var IntLen = IntegerNum.length;
        for (var i = 0; i < IntLen; i++) {
            var n = IntegerNum.substr(i, 1);
            var p = IntLen - i - 1;
            var q = p / 4;
            var m = p % 4;
            if (n == "0") {
                zeroCount++;
            } else {
                if (zeroCount > 0) {
                    ChineseStr += cnNums[0];
                }
                zeroCount = 0; //归零
                ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
            }

            if (m == 0 && zeroCount < 4) {
                ChineseStr += cnIntUnits[q];
            }
        }

        ChineseStr += cnIntLast;
        //整型部分处理完毕

    }

    if (DecimalNum != '') { //小数部分
        decLen = DecimalNum.length;
        for (var i = 0; i < decLen; i++) {
            n = DecimalNum.substr(i, 1);
            if (n != '0') {
                ChineseStr += cnNums[Number(n)] + cnDecUnits[i];
            }
        }
    }
    if (ChineseStr == '') {
        ChineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (DecimalNum == '') {
        ChineseStr += cnInteger;
    }
    // alert(ChineseStr);
    return ChineseStr;
}

export function lookPic(element) { //点击查看图片大图
    var l_pic = element.src; //获取到当前点击的图片路径
    // 添加弹出层用于展示大图
    var l_style = document.createElement("style"); //添加样式
    l_style.innerHTML = "@charset 'utf-8'; *{padding: 0; margin: 0; } .lookPic-popup{position: fixed;top:0;left:0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); z-index: 1000;overflow:hidden;  } .lookPic-popup #lookPic-close{position: absolute; right: 0; top: 0; z-index: 1010; width: 38px; height: 38px; cursor: pointer; border: 0; background: none; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABQCAYAAADSm7GJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkxN0U0OEFFRUI5NzExRTdCNDk5REUzQ0I5MDk2MDZFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkxN0U0OEFGRUI5NzExRTdCNDk5REUzQ0I5MDk2MDZFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTE3RTQ4QUNFQjk3MTFFN0I0OTlERTNDQjkwOTYwNkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTE3RTQ4QURFQjk3MTFFN0I0OTlERTNDQjkwOTYwNkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz72pwHcAAAMI0lEQVR42uxd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); background-position: 40px 40px; } .lookPic-popup #lookPic-img{position: absolute;top:50%;left:50%; width: 55%; background:url(" + l_pic + ") no-repeat center;background-size:100%; transform: rotate(0deg); cursor: move; }.lookPic-popup #lookPic-img:after{content:'';display:inline-block;padding-bottom:100%;width:.1px;vertical-align:middle;} .lookPic-popup .lookPic-effect{position: absolute; bottom: 18%; width: 270px; left: 50%; margin-left: -135px; text-align: justify; text-align-last: justify; } .lookPic-popup .lookPic-effect button{width: 38px; height: 38px; border-radius: 8px; border: 0; background-color: rgba(0,0,0,0.6); } .lookPic-popup .lookPic-effect #lookPic-left{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABQCAYAAADSm7GJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkxN0U0OEFFRUI5NzExRTdCNDk5REUzQ0I5MDk2MDZFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkxN0U0OEFGRUI5NzExRTdCNDk5REUzQ0I5MDk2MDZFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTE3RTQ4QUNFQjk3MTFFN0I0OTlERTNDQjkwOTYwNkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTE3RTQ4QURFQjk3MTFFN0I0OTlERTNDQjkwOTYwNkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz72pwHcAAAMI0lEQVR42uxd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); background-position: 0 0; } .lookPic-popup .lookPic-effect #lookPic-right{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABQCAYAAADSm7GJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkxN0U0OEFFRUI5NzExRTdCNDk5REUzQ0I5MDk2MDZFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkxN0U0OEFGRUI5NzExRTdCNDk5REUzQ0I5MDk2MDZFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTE3RTQ4QUNFQjk3MTFFN0I0OTlERTNDQjkwOTYwNkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTE3RTQ4QURFQjk3MTFFN0I0OTlERTNDQjkwOTYwNkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz72pwHcAAAMI0lEQVR42uxd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); background-position: 0 40px; } .lookPic-popup .lookPic-effect #lookPic-big{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABQCAYAAADSm7GJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkxN0U0OEFFRUI5NzExRTdCNDk5REUzQ0I5MDk2MDZFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkxN0U0OEFGRUI5NzExRTdCNDk5REUzQ0I5MDk2MDZFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTE3RTQ4QUNFQjk3MTFFN0I0OTlERTNDQjkwOTYwNkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTE3RTQ4QURFQjk3MTFFN0I0OTlERTNDQjkwOTYwNkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz72pwHcAAAMI0lEQVR42uxd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); background-position: 80px 0px; } .lookPic-popup .lookPic-effect #lookPic-small{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABQCAYAAADSm7GJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkxN0U0OEFFRUI5NzExRTdCNDk5REUzQ0I5MDk2MDZFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkxN0U0OEFGRUI5NzExRTdCNDk5REUzQ0I5MDk2MDZFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTE3RTQ4QUNFQjk3MTFFN0I0OTlERTNDQjkwOTYwNkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTE3RTQ4QURFQjk3MTFFN0I0OTlERTNDQjkwOTYwNkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz72pwHcAAAMI0lEQVR42uxdC3AW1RXePEhABcpLkgARrBXRImgR6MOIghUEq460tjNVaey0hZna2kwVx2mnM20d0Wo7HWdorValPohQSECCFgnhpfIoZcorPFICxghBXgkCCZC/506+HU8vd3fv7t5d/vzdM/PNn+zuPf/d++29e+85554/K5VKWYlkrmQnTZAQnEhCcCIJwYlcEMnVuKYr4bTi+KWEKYQSwhcJ/Ql9cO44YS/hX4QaQhXh0/+jdl1AGOfSnt3w9wrCrYRzLh3wbcIE/H/M5TvfAx//I1kes2hB2BLCJMJRHBtDeIRwB6GL5g2fJLxKeIawK4YG7kn4JhrvOsIANOonePDWECoJqwlRLCNaCJdoXltM+NDh3ECXc7KcVfIhCHbBnakO2US4mvAGoT11vpwkbCGsIKwm1BJaFdedIfyOcJHH9wbFJYRZhJaUnmwm3B5BPY5pfv8+QhcXPeLc3pS+nKfDqwc/S3jY4Vw94SXCUsJmwhnpfB5hNOEuwv2EfuxcLeEewnaDvWYsoRw9wkJ9qgkfEBoIJ/AauYIwEZ+2vEKYgZHGhBzDKMLlP4Rp7DtSGM1OeOgSI8GVYrRl7TqbMEJxbZbfHrxJ8ZQcIswg5Pp4orsSygjHmZ4jhK8Y6jGTCafYKDGbUORRZgJhI6vPe4SeEffgFSFHrzzCAj892E3Z5whnFUp2E4oDVnAIYT3TJRpieMjGHE34FPr2E0b5KJtD+C2rz3IcM0nwZqn9VhIuDkhuhaRrUxiCJ7s8KXtBVpCbF0/wEqarDg9T0HduPfQ0hXjwHmL1+aVhgksUvW4V6u6H3MWSjrcJQ9n/rX4JflpB7GnCWsKTIYdXQfI6pvfFgHqeQPk2j/o8R2j26N0vsXscbJDgr2GyNE9qSzEZ7aGhK59QJZWtwmuvWBoNfRG8Dr2ikvAIGjDf4EyzmDVEu8+h1ULj2LPlZz2utXv5dJdr+rE5wnOGCbZfB3MlotZ6kCx67lKpzFs4bmFlE5jgKyJaynD8hFVwoc+ypaz3Fnhcu0+DYIHf4LrDHsuXIATbJL8qETbTRc+D0rWLGLkW5i+uBLuZKvfEYJB4nnAAf0/BMkZXbsNnNdMRVubjszcMOkFlAz6PSO0oLFYPYFlmy0EXPYfY3xWEqYQ2dkwYbRrx99Z0tEWfIvyNmU2/4aPsdfhcbbA+m1mDjwih5zY8JEWKh0+Q/D3CvbC2veyiZxEe/PtxbZt0Xqyhh+C7SnRt0V/HArw+JpLfIvwcf99E+ItmuYH4rJOOzyKMl44V4HMm4UF2vBVm17WSQaI/0x9E2plpVyXCyPGmpq4lHufbFMS7Evx7wtWEf4d8inVlI25YWGGu8VHONtifliw5D8Gg72T3LZaOTZUIbmVOgYz0Jg3AZ2FMdTiJYazQZ68RPaSXVM8UhrQJktluOqEH4R/wcPHv/pOkt1Dx/ssogvM0XFNRkMx7pY7Ug+DLpePLAS7fAcEVsOM6ST57yBoy1eF/Cp8Xx1iPfOYg0JUP8HmrwXqMY/e9KlMJbmATk24x1KELmwQ1+ii3iM12RxmqyzTm7arPVIK3snM3xFCHMexVsdNHuWVsBv2Ex7WtbHbrJNdj6WL5mMkHlSzMFW7XuHY8XKvBlrQK68cPmXVkVgzWrKfY9/3MZ9nvsrJlLtfdS3iNUOhiG7c9Mx8aCEh4HeZX4UjpJZ0TPvjnWb1LXfTcwa6bq3DR5sFxcdjJnq9SWgCfqpBGw/Znlbuujtmj/ZpHs5ghXrg2vx2gDvmw79p1mGzYmySbKv8qmR8fc9HzA+naeZIJ9Zqgtmjud/xxhATfx76nJqCOfvBR2wT92kcwwhcI77M6iPKPR0SwIPcVibANHs6GrggS4DKf2aOHByX4BhZ7dZQwKAJyexM+YhWcFEKXqN82pms7YZqLz3UY4Q+IJVPJ44YJzsErgss6zQgS8bpYJpVdAJI/H8ab9DIrvMZwoFyO5PSvMqBT9IQ5UkO0IixnEbw4y5nr0JaPCXcrnPKPGSS4XNL9vs/wINH270g6KvBKC0xwLymiT7ynuhkilz88n4SIxFDhRkQ7nPOIQGxCuE4vNmGpNEQyJ3ijwgccJParG+5LHgVcIzq8oirFGnMlixBch6XEvoDLg77wHk1khvJJcPmZliIYQUbAOpUNi9lOGElWWepI0HmSV2smHBh+RBVVacHmLZZGzQHvSdjHF7L2Uy2/PJdJMkrwHuZDQRkmAH56bSmGQx7+MzWGZViQ4DY5/ml6KnxU5Q7CtYTLgcGaQQU5GOHscsMUo0KgoDtLmo7vlJQdRNzWlx0qmk0YSfgFWwrZcoBwUxqS60TylogC32s1SH43ysB3LsJG+yThRwonRSv8qGJrSA5MjwIXKfygcwk/JTSluZUvD5EXU+Aznu2jrKmtK7b1LUtDT6CtKypcRXjBZYmhkrOYpX41jXutSVQhVqzZo13WasRhl2u0bytWCKF6sCzdCZMRhSHsuJchdCQbvlrhtNiCyUxlpvhXO5uEITiRTupNSiQhOJGE4EQSghNJCE4kITiRhOCE4EQyVXJDlBV2ZuH6Gmd1bAQTAei2i+yw1WFr3mZ1WLIWW+pddE45uBIxJQHsrCJM5M8sL4auLbpCCkDriUiRgghswUL392HH3YW6tsPJL5zkz8ANmhWhPXoQ7MNHsffZ5H0KXX9HThIRCtTH6Vq/aReedsh/JQzrDQgiq4Z7zckZMR870+1kLN/KwDxZKjdfrUbmH11yt0u6y52u17VFX2V1pOcbxo4J16Bwp4n9PmLDc6ti+BfRFCL6oNQ6fw+RLcINN8PAYJROebKEqFyGIprkFsvfDg4uBbinYdLxJstp87zGEzMWgdW2tCCiw08QXjYiOhoVvWhrBubJshSRkGF7sqrn2lIZdIgeLkUnbEDYSJAbHoCbk0W8G/tmWJ4sCyTWGiK5ACE/KhFzjIFBCO4phdosDZjAS+AyRdgOl3syLE+WSZIDk+tF8ItM0fqQcdFjkVtrFRtKufwx4jxZOjCZJ8sUyaHIdSN4FNvZcBw90NQN54OMMiydmjCbDRLorpsnS3cLjKk8WSZIDk2uG8ELmbKHY4hhCpKTy0+eLF2YypMVlmQj5DoR3J/tLjxgaDdDFChnORtN6RzpsCswTpILTZHrlAjtLmbCfM36LKVDukk658lykkasg1Ub3YdijVsNu4Msu1HWV+4QlS36Rvb34hgJE9tLrrU6ft9B93ohOnmynCSqPFk6JFeDVJlkyxS5TgQPt20ghPUxkStyZX3J6tjzNFizTJA8WSq5EHmy3EhWkXsz4SNT3iQ7T9YBw6Y7LxOcZfnLVeknT5aTXMg8WTokhyLXiWD7yY3z3XsED5afXlNv6efJ0pW482SlLPdffWm3Qv4qjGqS1cZuNi7pjs8TPsp09jxZhS4TKnniVWSS4I/ZsJkXA7ld2GvhoI9ynTlPliBshQe5RkhWEWxP4cUuwdExEHy99dmuuC0+yvnJk6VbjzjyZA0AuUMd3rm7TJKsIniNtCaOWvjPsflZ04q8y79iw3RZiDqI8KMXMDFrUEy8TJIriLpScW4XJlQ3GyXZwWzYzn4RJTcV7UZrO93+uQA273TNk6XCQFiidEyVRYoN94FcjU4napjC+yIkmGfVeyeD8mSpyN3tkzAjJDudmCilGeodwU0XIsOOCdtvuuXJkuu2x+F7drikVzRCsttJOY9VjuGheSXT/0aG5cni5Na5kFug6aAITLLX7xodYsrmGHofd5XyUe0PGbKTjnmybGKcyN3u08UZmGQvxbdIYbJL8c4L80SvkQL4xkT0fhc3/QCCAd5EuO4cDL/jHfy9KpIfDfj9FQ6EbINLNsj9OJH8bpi46LsRxsJTIJX6HLLzEcHB8201p2kqJRN5siwpJxgn99KQD62K5Jawge8ligrXI0BtpAPZuYjFekpRdg+SgmVqnixLkXx0a0hy3UiuNrGzQQzNr6fUvwDegkaowbJjv0Nw3RnEO3XvBKmQ8jD5awnYg3sgcLEO7dbH8OtnGdpYTFaHhN3ZwEWYLx8l3Alzpo6cxq4D4YzfYSUSm4RJo9QXJJcgSGAQ3HfCxSWSce4n/JNQY3X8eldz0tydi+BEOoEkG8ATghNJCE4kbeW/AgwAqWn8spgMkicAAAAASUVORK5CYII=); background-position: 80px 40px; } .lookPic-popup .lookPic-effect #lookPic-cover{background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAABQCAYAAADSm7GJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjkxN0U0OEFFRUI5NzExRTdCNDk5REUzQ0I5MDk2MDZFIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjkxN0U0OEFGRUI5NzExRTdCNDk5REUzQ0I5MDk2MDZFIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OTE3RTQ4QUNFQjk3MTFFN0I0OTlERTNDQjkwOTYwNkUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OTE3RTQ4QURFQjk3MTFFN0I0OTlERTNDQjkwOTYwNkUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz72pwHcAAAMI0lEQVR42uxdC3AW1RXePEhABcpLkgARrBXRImgR6MOIghUEq460tjNVaey0hZna2kwVx2mnM20d0Wo7HWdorValPohQSECCFgnhpfIoZcorPFICxghBXgkCCZC/506+HU8vd3fv7t5d/vzdM/PNn+zuPf/d++29e+85554/K5VKWYlkrmQnTZAQnEhCcCIJwYlcEMnVuKYr4bTi+KWEKYQSwhcJ/Ql9cO44YS/hX4QaQhXh0/+jdl1AGOfSnt3w9wrCrYRzLh3wbcIE/H/M5TvfAx//I1kes2hB2BLCJMJRHBtDeIRwB6GL5g2fJLxKeIawK4YG7kn4JhrvOsIANOonePDWECoJqwlRLCNaCJdoXltM+NDh3ECXc7KcVfIhCHbBnakO2US4mvAGoT11vpwkbCGsIKwm1BJaFdedIfyOcJHH9wbFJYRZhJaUnmwm3B5BPY5pfv8+QhcXPeLc3pS+nKfDqwc/S3jY4Vw94SXCUsJmwhnpfB5hNOEuwv2EfuxcLeEewnaDvWYsoRw9wkJ9qgkfEBoIJ/AauYIwEZ+2vEKYgZHGhBzDKMLlP4Rp7DtSGM1OeOgSI8GVYrRl7TqbMEJxbZbfHrxJ8ZQcIswg5Pp4orsSygjHmZ4jhK8Y6jGTCafYKDGbUORRZgJhI6vPe4SeEffgFSFHrzzCAj892E3Z5whnFUp2E4oDVnAIYT3TJRpieMjGHE34FPr2E0b5KJtD+C2rz3IcM0nwZqn9VhIuDkhuhaRrUxiCJ7s8KXtBVpCbF0/wEqarDg9T0HduPfQ0hXjwHmL1+aVhgksUvW4V6u6H3MWSjrcJQ9n/rX4JflpB7GnCWsKTIYdXQfI6pvfFgHqeQPk2j/o8R2j26N0vsXscbJDgr2GyNE9qSzEZ7aGhK59QJZWtwmuvWBoNfRG8Dr2ikvAIGjDf4EyzmDVEu8+h1ULj2LPlZz2utXv5dJdr+rE5wnOGCbZfB3MlotZ6kCx67lKpzFs4bmFlE5jgKyJaynD8hFVwoc+ypaz3Fnhcu0+DYIHf4LrDHsuXIATbJL8qETbTRc+D0rWLGLkW5i+uBLuZKvfEYJB4nnAAf0/BMkZXbsNnNdMRVubjszcMOkFlAz6PSO0oLFYPYFlmy0EXPYfY3xWEqYQ2dkwYbRrx99Z0tEWfIvyNmU2/4aPsdfhcbbA+m1mDjwih5zY8JEWKh0+Q/D3CvbC2veyiZxEe/PtxbZt0Xqyhh+C7SnRt0V/HArw+JpLfIvwcf99E+ItmuYH4rJOOzyKMl44V4HMm4UF2vBVm17WSQaI/0x9E2plpVyXCyPGmpq4lHufbFMS7Evx7wtWEf4d8inVlI25YWGGu8VHONtifliw5D8Gg72T3LZaOTZUIbmVOgYz0Jg3AZ2FMdTiJYazQZ68RPaSXVM8UhrQJktluOqEH4R/wcPHv/pOkt1Dx/ssogvM0XFNRkMx7pY7Ug+DLpePLAS7fAcEVsOM6ST57yBoy1eF/Cp8Xx1iPfOYg0JUP8HmrwXqMY/e9KlMJbmATk24x1KELmwQ1+ii3iM12RxmqyzTm7arPVIK3snM3xFCHMexVsdNHuWVsBv2Ex7WtbHbrJNdj6WL5mMkHlSzMFW7XuHY8XKvBlrQK68cPmXVkVgzWrKfY9/3MZ9nvsrJlLtfdS3iNUOhiG7c9Mx8aCEh4HeZX4UjpJZ0TPvjnWb1LXfTcwa6bq3DR5sFxcdjJnq9SWgCfqpBGw/Znlbuujtmj/ZpHs5ghXrg2vx2gDvmw79p1mGzYmySbKv8qmR8fc9HzA+naeZIJ9Zqgtmjud/xxhATfx76nJqCOfvBR2wT92kcwwhcI77M6iPKPR0SwIPcVibANHs6GrggS4DKf2aOHByX4BhZ7dZQwKAJyexM+YhWcFEKXqN82pms7YZqLz3UY4Q+IJVPJ44YJzsErgss6zQgS8bpYJpVdAJI/H8ab9DIrvMZwoFyO5PSvMqBT9IQ5UkO0IixnEbw4y5nr0JaPCXcrnPKPGSS4XNL9vs/wINH270g6KvBKC0xwLymiT7ynuhkilz88n4SIxFDhRkQ7nPOIQGxCuE4vNmGpNEQyJ3ijwgccJParG+5LHgVcIzq8oirFGnMlixBch6XEvoDLg77wHk1khvJJcPmZliIYQUbAOpUNi9lOGElWWepI0HmSV2smHBh+RBVVacHmLZZGzQHvSdjHF7L2Uy2/PJdJMkrwHuZDQRkmAH56bSmGQx7+MzWGZViQ4DY5/ml6KnxU5Q7CtYTLgcGaQQU5GOHscsMUo0KgoDtLmo7vlJQdRNzWlx0qmk0YSfgFWwrZcoBwUxqS60TylogC32s1SH43ysB3LsJG+yThRwonRSv8qGJrSA5MjwIXKfygcwk/JTSluZUvD5EXU+Aznu2jrKmtK7b1LUtDT6CtKypcRXjBZYmhkrOYpX41jXutSVQhVqzZo13WasRhl2u0bytWCKF6sCzdCZMRhSHsuJchdCQbvlrhtNiCyUxlpvhXO5uEITiRTupNSiQhOJGE4EQSghNJCE4kITiRhOCE4EQyVXJDlBV2ZuH6Gmd1bAQTAei2i+yw1WFr3mZ1WLIWW+pddE45uBIxJQHsrCJM5M8sL4auLbpCCkDriUiRgghswUL392HH3YW6tsPJL5zkz8ANmhWhPXoQ7MNHsffZ5H0KXX9HThIRCtTH6Vq/aReedsh/JQzrDQgiq4Z7zckZMR870+1kLN/KwDxZKjdfrUbmH11yt0u6y52u17VFX2V1pOcbxo4J16Bwp4n9PmLDc6ti+BfRFCL6oNQ6fw+RLcINN8PAYJROebKEqFyGIprkFsvfDg4uBbinYdLxJstp87zGEzMWgdW2tCCiw08QXjYiOhoVvWhrBubJshSRkGF7sqrn2lIZdIgeLkUnbEDYSJAbHoCbk0W8G/tmWJ4sCyTWGiK5ACE/KhFzjIFBCO4phdosDZjAS+AyRdgOl3syLE+WSZIDk+tF8ItM0fqQcdFjkVtrFRtKufwx4jxZOjCZJ8sUyaHIdSN4FNvZcBw90NQN54OMMiydmjCbDRLorpsnS3cLjKk8WSZIDk2uG8ELmbKHY4hhCpKTy0+eLF2YypMVlmQj5DoR3J/tLjxgaDdDFChnORtN6RzpsCswTpILTZHrlAjtLmbCfM36LKVDukk658lykkasg1Ub3YdijVsNu4Msu1HWV+4QlS36Rvb34hgJE9tLrrU6ft9B93ohOnmynCSqPFk6JFeDVJlkyxS5TgQPt20ghPUxkStyZX3J6tjzNFizTJA8WSq5EHmy3EhWkXsz4SNT3iQ7T9YBw6Y7LxOcZfnLVeknT5aTXMg8WTokhyLXiWD7yY3z3XsED5afXlNv6efJ0pW482SlLPdffWm3Qv4qjGqS1cZuNi7pjs8TPsp09jxZhS4TKnniVWSS4I/ZsJkXA7ld2GvhoI9ynTlPliBshQe5RkhWEWxP4cUuwdExEHy99dmuuC0+yvnJk6VbjzjyZA0AuUMd3rm7TJKsIniNtCaOWvjPsflZ04q8y79iw3RZiDqI8KMXMDFrUEy8TJIriLpScW4XJlQ3GyXZwWzYzn4RJTcV7UZrO93+uQA273TNk6XCQFiidEyVRYoN94FcjU4napjC+yIkmGfVeyeD8mSpyN3tkzAjJDudmCilGeodwU0XIsOOCdtvuuXJkuu2x+F7drikVzRCsttJOY9VjuGheSXT/0aG5cni5Na5kFug6aAITLLX7xodYsrmGHofd5XyUe0PGbKTjnmybGKcyN3u08UZmGQvxbdIYbJL8c4L80SvkQL4xkT0fhc3/QCCAd5EuO4cDL/jHfy9KpIfDfj9FQ6EbINLNsj9OJH8bpi46LsRxsJTIJX6HLLzEcHB8201p2kqJRN5siwpJxgn99KQD62K5Jawge8ligrXI0BtpAPZuYjFekpRdg+SgmVqnixLkXx0a0hy3UiuNrGzQQzNr6fUvwDegkaowbJjv0Nw3RnEO3XvBKmQ8jD5awnYg3sgcLEO7dbH8OtnGdpYTFaHhN3ZwEWYLx8l3Alzpo6cxq4D4YzfYSUSm4RJo9QXJJcgSGAQ3HfCxSWSce4n/JNQY3X8eldz0tydi+BEOoEkG8ATghNJCE4kbeW/AgwAqWn8spgMkicAAAAASUVORK5CYII=); background-position: 40px 0px; } .lookPic-effect button img{width: 100%; }";
    document.head.appendChild(l_style);

    //添加dom
    var html = "<div id='lookPic-img' style='width:55%;'></div> <div class='lookPic-effect'> <button id='lookPic-left'></button> <button id='lookPic-right'></button> <button id='lookPic-big'></button> <button id='lookPic-small'></button> <button id='lookPic-cover'></button> </div> <button id='lookPic-close'></button>";
    var l_div = document.createElement("div");
    l_div.innerHTML = html;
    l_div.className = "lookPic-popup";
    document.body.appendChild(l_div);


    var l_left = document.getElementById("lookPic-left"),
        l_right = document.getElementById("lookPic-right"),
        l_big = document.getElementById("lookPic-big"),
        l_small = document.getElementById("lookPic-small"),
        l_cover = document.getElementById("lookPic-cover"),
        l_close = document.getElementById("lookPic-close");



    var i = 0;
    var j = 0;
    var l_img = document.getElementById('lookPic-img');
    l_img.style.marginLeft = -l_img.offsetLeft / 2 + "px";
    l_img.style.marginTop = -l_img.offsetTop / 2 + "px";
    l_left.onclick = function() {
        i++;
        l_img.style.transform = "rotate(" + (i * -90 + j * 90) + "deg)";
    }
    l_right.onclick = function() {
        j++;
        l_img.style.transform = "rotate(" + (i * -90 + j * 90) + "deg)";
    }
    l_big.onclick = function() {
        var width = l_img.style.width;
        l_img.style.width = parseInt(width) + 5 + "%";
    }
    l_small.onclick = function() {
        var width = l_img.style.width;
        if (parseInt(width) > 6) {
            l_img.style.width = parseInt(width) - 5 + "%";
        }
    }
    l_cover.onclick = function() {
        var width = l_img.style.width;
        l_img.style.width = "100%";
    }
    l_close.onclick = function() {
        document.body.removeChild(l_div);
    }

    //图片移动

    var c_left;
    var c_top;
    l_img.onmousedown = function(ev) {　　　　
        var oevent = ev || event;

        var m_left = parseInt(l_img.style.marginLeft);
        var m_top = parseInt(l_img.style.marginTop);
        console.log(m_left, m_top);　　　　
        var distanceX = oevent.clientX - l_img.offsetLeft + m_left;　　　　
        var distanceY = oevent.clientY - l_img.offsetTop + m_top;

        document.onmousemove = function(ev) {　　　　　　
            var oevent = ev || event;　　　　　　
            l_img.style.left = oevent.clientX - distanceX + 'px';　　　　　　
            l_img.style.top = oevent.clientY - distanceY + 'px';　　　　
        }　　　　
        document.onmouseup = function() {　　　　　　
            document.onmousemove = null;　　　　　　
            document.onmouseup = null;　　　　
        }　　　　
    }
}

export function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strHours = date.getHours();
    var strMinutes = date.getMinutes();
    var strSeconds = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (strHours >= 0 && strHours <= 9) {
        strHours = "0" + strHours;
    }
    if (strMinutes >= 0 && strMinutes <= 9) {
        strMinutes = "0" + strMinutes;
    }
    if (strSeconds >= 0 && strSeconds <= 9) {
        strSeconds = "0" + strSeconds;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + strHours + seperator2 + strMinutes +
        seperator2 + strSeconds;
    return currentdate;
}

export function mul(a, b) {
    return parseFloat(parseFloat(a * b).toFixed(2));
}

export function except(a, b) {
    return parseFloat(parseFloat(a / b).toFixed(2));
}

export function add(a, b) {
    return parseFloat(parseFloat(a + b).toFixed(2));
}

export function minus(a, b) {
    return parseFloat(parseFloat(a - b).toFixed(2));
}

//如果数字含有小数部分，那么可以将小数部分单独取出
//将小数部分的数字转换为字符串的方法：

var chnNumChar = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
var chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
var chnUnitChar = ["", "拾", "佰", "仟"];

var chnNumCharSimple = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
var chnUnitSectionSimple = ["", "万", "亿", "万亿", "亿亿"];
var chnUnitCharSimple = ["", "十", "百", "千"];

var numToChn = function(num) {
    var index = num.toString().indexOf(".");
    if (index != -1) {
        var str = num.toString().slice(index);
        var a = "点";
        for (var i = 1; i < str.length; i++) {
            a += chnNumChar[parseInt(str[i])];
        }
        return a;
    } else {
        return '';
    }
}

var numToChnSimple = function(num) {
    var index = num.toString().indexOf(".");
    if (index != -1) {
        var str = num.toString().slice(index);
        var a = "点";
        for (var i = 1; i < str.length; i++) {
            a += chnNumCharSimple[parseInt(str[i])];
        }
        return a;
    } else {
        return '';
    }
}

//定义在每个小节的内部进行转化的方法，其他部分则与小节内部转化方法相同
function sectionToChinese(section) {
    var str = '',
        chnstr = '',
        zero = false,
        count = 0; //zero为是否进行补零， 第一次进行取余由于为个位数，默认不补零
    while (section > 0) {
        var v = section % 10; //对数字取余10，得到的数即为个位数
        if (v == 0) { //如果数字为零，则对字符串进行补零
            if (zero) {
                zero = false; //如果遇到连续多次取余都是0，那么只需补一个零即可
                chnstr = chnNumChar[v] + chnstr;
            }
        } else {
            zero = true; //第一次取余之后，如果再次取余为零，则需要补零
            str = chnNumChar[v];
            str += chnUnitChar[count];
            chnstr = str + chnstr;
        }
        count++;
        section = Math.floor(section / 10);
    }
    return chnstr;
}

function sectionToChineseSimple(section) {
    var str = '',
        chnstr = '',
        zero = false,
        count = 0; //zero为是否进行补零， 第一次进行取余由于为个位数，默认不补零
    while (section > 0) {
        var v = section % 10; //对数字取余10，得到的数即为个位数
        if (v == 0) { //如果数字为零，则对字符串进行补零
            if (zero) {
                zero = false; //如果遇到连续多次取余都是0，那么只需补一个零即可
                chnstr = chnNumCharSimple[v] + chnstr;
            }
        } else {
            zero = true; //第一次取余之后，如果再次取余为零，则需要补零
            str = chnNumCharSimple[v];
            str += chnUnitCharSimple[count];
            chnstr = str + chnstr;
        }
        count++;
        section = Math.floor(section / 10);
    }
    return chnstr;
}



//定义整个数字全部转换的方法，需要依次对数字进行10000为单位的取余，然后分成小节，按小节计算，当每个小节的数不足1000时，则需要进行补零

export function TransformToChinese(num) {
    var a = numToChn(num);
    num = Math.floor(num);
    var unitPos = 0;
    var strIns = '',
        chnStr = '';
    var needZero = false;

    if (num === 0) {
        return chnNumChar[0];
    }
    while (num > 0) {
        var section = num % 10000;
        if (needZero) {
            chnStr = chnNumChar[0] + chnStr;
        }
        strIns = sectionToChinese(section);
        strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
        chnStr = strIns + chnStr;
        needZero = (section < 1000) && (section > 0);
        num = Math.floor(num / 10000);
        unitPos++;
    }

    return chnStr + a;
}

export function TransformToChineseSimple(num) {
    var a = numToChnSimple(num);
    num = Math.floor(num);
    var unitPos = 0;
    var strIns = '',
        chnStr = '';
    var needZero = false;

    if (num === 0) {
        return chnNumCharSimple[0];
    }
    while (num > 0) {
        var section = num % 10000;
        if (needZero) {
            chnStr = chnNumCharSimple[0] + chnStr;
        }
        strIns = sectionToChineseSimple(section);
        strIns += (section !== 0) ? chnUnitSectionSimple[unitPos] : chnUnitSectionSimple[0];
        chnStr = strIns + chnStr;
        needZero = (section < 1000) && (section > 0);
        num = Math.floor(num / 10000);
        unitPos++;
    }

    return chnStr + a;
}
// 粮仓3D图
export function show3D_(data_3d_new) {
    var _xyz = []; //(x,y,z)数组，便于计算

    // 读取data到上面4个数组中
    data_3d_new.forEach(function(item) {
        var xValue = item.pan < 90 ? -item.an / 1000.0 : item.an / 1000.0;
        var yValue = item.bn / 1000.0;
        var zValue = item.height;
        _xyz.push({ x: xValue, y: yValue, z: zValue });
    });

    // 求数组的最小x
    Array.prototype.xMin = function() {
        var ret = this[0].x;
        this.forEach(function(item, index, arr) {
            if (item.x < ret)
                ret = item.x;
        });
        return ret;
    }

    // 求数组的最小y
    Array.prototype.yMin = function() {
        var ret = this[0].y;
        this.forEach(function(item, index, arr) {
            if (item.y < ret)
                ret = item.y;
        });
        return ret;
    }

    // 求数组的最大x
    Array.prototype.xMax = function() {
        var ret = this[0].x;
        this.forEach(function(item, index, arr) {
            if (item.x > ret)
                ret = item.x;
        });
        return ret;
    }

    // 求数组的最大y
    Array.prototype.yMax = function() {
        var ret = this[0].y;
        this.forEach(function(item, index, arr) {
            if (item.y > ret)
                ret = item.y;
        });
        return ret;
    }

    // 距离(x, y)最接近的点的z值
    Array.prototype.zNearest = function(x, y) {
        var obj = this[0];
        var obj_delta = (obj.x - x) * (obj.x - x) + (obj.y - y) * (obj.y - y);
        this.forEach(function(item, index, arr) {
            var item_delta = (item.x - x) * (item.x - x) + (item.y - y) * (item.y - y);
            if (item_delta < obj_delta) {
                obj = item;
                obj_delta = item_delta;
            }
        });
        return obj.z;
    }

    // 最大最小放到变量中，避免重复计算
    var _x_min = _xyz.xMin(); // x最小值
    var _x_max = _xyz.xMax(); // x最大值
    var _y_min = _xyz.yMin(); // y最小值
    var _y_max = _xyz.yMax(); // 也最大值
    var _zxy = _xyz.zNearest(_x_min, _y_min); // 距离(_x_min, _y_min)最近的点的z值
    var _zxY = _xyz.zNearest(_x_min, _y_max); // 距离(_x_min, _y_min)最近的点的z值
    var _zXy = _xyz.zNearest(_x_max, _y_min); // 距离(_x_min, _y_min)最近的点的z值
    var _zXY = _xyz.zNearest(_x_max, _y_max); // 距离(_x_min, _y_min)最近的点的z值

    // 根据上面计算结果，追加四个角点
    _xyz.push({ x: _x_min, y: _y_min, z: _zxy });
    _xyz.push({ x: _x_min, y: _y_max, z: _zxY });
    _xyz.push({ x: _x_max, y: _y_min, z: _zXy });
    _xyz.push({ x: _x_max, y: _y_max, z: _zXY });

    var _x = []; //x轴
    var _y = []; //y轴
    var _z = []; //z轴

    // 转换为plotly需要的数组格式
    _xyz.forEach(function(item) {
        _x.push(item.x);
        _y.push(item.y);
        _z.push(item.z);
    });

    /*
    function numberOrder(a, b) {
        return Number(a) - Number(b);
    }

    // Get min/max values
    var _x_sorted = [].concat(_x).sort(numberOrder);
    var _y_sorted = [].concat(_y).sort(numberOrder);
    var _x_min = _x_sorted[0];
    var _x_max = _x_sorted[_x_sorted.length - 1];
    var _y_min = _y_sorted[0];
    var _y_max = _y_sorted[_y_sorted.length - 1];

    _xyz.forEach(function (item) {
        item.dxy = Math.sqrt((item.x - _x_min) * (item.x - _x_min) + (item.y - _y_min) * (item.y - _y_min));
        item.dxY = Math.sqrt((item.x - _x_min) * (item.x - _x_min) + (item.y - _y_max) * (item.y - _y_max));
        item.dXy = Math.sqrt((item.x - _x_max) * (item.x - _x_max) + (item.y - _y_min) * (item.y - _y_min));
        item.dXY = Math.sqrt((item.x - _x_max) * (item.x - _x_max) + (item.y - _y_max) * (item.y - _y_max));
    });
    */

    var _data = [{
        type: 'mesh3d',
        opacity: 0.9,
        "colorscale": [
            [
                0,
                "#aaaaaa"
            ],
            [
                0.125,
                "#aaaa88"
            ],
            [
                0.25,
                "#aaaa66"
            ],
            [
                0.375,
                "#aaaa55"
            ],
            [
                0.5,
                "#aaaa44"
            ],
            [
                0.625,
                "#aaaa33"
            ],
            [
                0.75,
                "#aaaa22"
            ],
            [
                0.875,
                "#aaaa11"
            ],
            [
                1,
                "#aaaa00"
            ]
        ],
        intensity: _z,
        x: _x,
        y: _y,
        z: _z
    }];

    var _layout = {
        paper_bgcolor: "#eeeeee",
        "scene": {
            "camera": {
                "eye": {
                    "y": -1.8,
                    "x": 0.6,
                    "z": 0.8
                },
                "up": {
                    "y": 0,
                    "x": 0,
                    "z": 1
                },
                "center": {
                    "y": 0,
                    "x": 0,
                    "z": 0
                }
            },
            "xaxis": {
                "type": "linear",
                "autorange": true,
                "gridwidth": 1
            },
            "yaxis": {
                "type": "linear",
                "autorange": true,
                "gridwidth": 1
            },
            "zaxis": {
                "range": [
                    0,
                    10
                ],
                "type": "linear",
                "autorange": false,
                "gridwidth": 1
            },
        },
    };

    Plotly.newPlot('myDiv', _data, _layout);
}
