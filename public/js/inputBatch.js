
  var str = "";
  $("#S00").change(function(e) {
    str = $("#S00").val() + $("#C01").val() + $("#C02").val();
    $("#batchCode").val(str);
  }); 
$("input[id^=C]").keyup(function(e) {
  $("input[id^=C]").each(function(index) {
    str = $("#S00").val() + $("#C01").val() + $("#C02").val();
  });
   $("#batchCode").val(str);
});


// $("#alternatives").keypress(function(event){
// 	if(event.which === 13){
// 		var alternaText = $(this).val();
// 		$(this).val("");
// 		$("#inpgrp").append("<span><input readonly class=\"form-control \" name=\"alternatives[]\" type=\"text\" value="+alternaText + "></span>");
// 	};
// 		$("span").click(function(event){
//   		$(this).remove();
//   		event.stopPropagation();
// 	   })
// })

// $('#formid').on('keyup keypress', function(e) {
//   var keyCode = e.keyCode || e.which;
//   if (keyCode === 13) { 
//     e.preventDefault();
// //     return false;
// //   }
// });