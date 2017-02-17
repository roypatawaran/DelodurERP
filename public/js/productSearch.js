
  var str = "";
  $("#S00").change(function(e) {
    str = $("#S00").val() + " - " + $("#prtNum").val();
    $("#prodNum").val(str);
  }); 

