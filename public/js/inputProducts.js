
  var str = "";
  $("#S00").change(function(e) {
    str = $("#S00").val() + " - " + $("#prtNum").val();
    $("#pNum").val(str);
  }); 

$("#prtNum").keyup(function(e) {
    str = $("#S00").val() + " - " + $("#prtNum").val();
     $("#pNum").val(str);
  });


