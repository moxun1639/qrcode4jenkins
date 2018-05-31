jQuery(function () {
	var displayTimes = 0
	function displayQrcode(event) {
		++displayTimes;
		if (displayTimes == 1) {
			console.log('Welcome to use mx-qrcode. Moxun@2017')
		}
		var qrCode = jQuery(event.target);
		var mxUri = qrCode.find("#mx-uri");
		if (mxUri == null) {
			return;
		}
		var url = mxUri.attr("href");
		if (url.startsWith("/")) {
			url = origin + url;
		}
//		console.log(url)
		var qr = jQuery('<div class="mx-qrcode-qrcode"></div>')
		qr.qrcode({
		  width: 200,
		  height: 200,
		  background : "#ffffff",
			foreground : "#C0DCC0",  
		  text: url
		});
		qr.width(200);
		qr.height(200);
		
		qrDialog = jQuery('<div class="mx-qrcode-dialog"></div>')
		qrDialog.append(qr)
		qrDialog.append('<button class="mx-download-button ui-button ui-widget ui-corner-all">下载</button>')
		qrDialog.append('<textarea class="mx-qrcode-url" readonly="true" disabled="true">' + url + '</textarea>');
		qrDialog.append('<span class="mx-qrcode-author">Moxun</span>');
		
		qrDialog.dialog({
			height: 400,
			width: 400,
			draggable: false,
			resizable: false,
			modal: true,
	      show: {
	        effect: "blind",
	        duration: 350
	      },
	      hide: {
	        effect: "explode",
	        duration: 550
	      }
		});

		qrDialog.find('.mx-download-button').click(function(event) {
			window.open(url);
		})
	}

	setTimeout(function() {
	  jQuery('.mx-qrcode').click(function(event) {
	  		displayQrcode(event);
	  		return false;
	  	});
	  //处理正在编译的工程稍后构建完毕后添加进来的元素
	  jQuery('#buildHistory').click(function(event) {
				var className = event.target.className;
	  		if (className && className.split(' ').indexOf('mx-qrcode') != -1) {
	  			displayQrcode(event);
	  		}
	   });
	}, 1000);
});