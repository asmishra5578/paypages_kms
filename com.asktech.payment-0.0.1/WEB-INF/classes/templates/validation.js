function isCardValid(value) {
	if (value.length >= 13 && value.length <= 16) {
		var s = value.substr(0, 1);
		if (s == 4 || s == 5 || s == 6 || s == 8) {
			return true;
		}
		s = value.substr(0, 2);
		if (s == 37) {
			return true;
		}
	}
	return false;
}
/*
$("input").on("copy paste cut", function(e) {
	e.preventDefault();
});*/
$("input").on("focus", function() {
	$(document.activeElement).css("background-color", "#ffff9e");
});
$("input").on("focusout", function() {
	$("input").css("background-color", "#ffffff");
});

$("input").on("keydown keyup change", function(e) {
	var charCode = e.which ? e.which : e.keyCode;
	if ($(this).attr("id") == "cr_no") {
		if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
			e.preventDefault();
		}
		if ($(this).val().length >= 16) {
			if (charCode != 46 && charCode > 31) {
				e.preventDefault();
			}
		}
	} else if (
		$(this).attr("id") == "cr_name" ||
		$(this).attr("id") == "ben_nm"
	) {
		if (
			(charCode < 65 || charCode > 90) &&
			charCode != 46 &&
			charCode != 32 &&
			charCode > 31
		) {
			e.preventDefault();
		}
	} else if ($(this).attr("id") == "cvv") {
		if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
			e.preventDefault();
		}
		if ($(this).val().length >= 3) {
			if (charCode != 46 && charCode > 31) {
				e.preventDefault();
			}
		}
	} else if ($(this).attr("id") == "ben_upi") {
		var v = $(this).val();
		var asciichar = v.charCodeAt(v.length - 1);
		
		if (
			asciichar < 45 ||
			(asciichar > 57 && asciichar < 64) ||
			(asciichar > 122)|| (asciiats > 90 && asciiats < 97) || (asciiats == 47)		
		) {	
			
			$(this).val(v.substring(0, v.length - 1));
			e.preventDefault();
		}
		
		var asciiats = v.charCodeAt(0);
		if (asciiats < 45 || (asciiats > 57 && asciiats < 64) || (asciiats > 122) || (asciiats > 90 && asciiats < 97) || (asciiats == 47)) {
			$(this).val(v.substring(0, v.length - 1));
			e.preventDefault();
		}
		
	}
});

$("#walletsubmit").on("click", function(e) {
	if(!checkWalletBank($('#walletname').val(), 'walletname')){
		e.preventDefault();
	}
});

$("#walletname").on("change", function(e) {
	lowlight('walletname');
});

function checkWalletBank(code, id) {
	console.log(code);
	if (parseInt(code) < 1000) {
		if(id === 'walletname'){
			highlight(id, 'Wallet not selected');
		}else if(id === 'banknames'){
			highlight(id, 'Bank not selected');
		}
		return false;
	}
	return true;
}
function highlight(elementid, message) {
	lowlight(elementid);
	$("#" + elementid).addClass("errorhighlight");
	$(
		"<div style='color:red;font-size:14px;' class='errmsg'>" +
		message +
		"</div>"
	).insertAfter("#" + elementid);
}



function lowlight(elementid) {
	$("#" + elementid).removeClass("errorhighlight");
	$(".errmsg").remove();
	
}

function resetforms() {

	if ("#banknames".length) {
		$("#banknames").val(0);
		$("#ben_nm").val("");
	}
	if ("#cr_name".length) {

		$("#cr_name").val("");
		$('#cr_no').val("");
		$('#year').val(0);
		$('#month').val(1);
		$('#cvv').val("");
	}
	if ("ben_upi".length) {
		$('#ben_upi').val("");
	}
	if ("walletname".length) {
		$('walletname').val(0);
	}
}

