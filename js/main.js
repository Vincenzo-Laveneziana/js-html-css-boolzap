$(document).ready(function () {
  

  var list =$("#msg");
  var newInput = $(".add_element");
  var icon = $(".chat_send i");


  newInput.keyup(function(event){
    //console.log(event.which);
    if(event.which !== 32){
      toggleMic();
    }
    
    if(event.which == 13) {
      var text = newInput.val().trim();
      console.log("ok");
      
      if(text !== "") {
        console.log("ok");
        sendMsg(text);
        toggleMicReverse();
        newInput.val("");
      }
    }

  });
  
  function sendMsg(word) { 
    var elementNew = $(".template li").clone();
    elementNew.prepend('<p> ' + word + " <span class='data_time'>15.30</span>" + '</p>');
    elementNew.appendTo(list);
    list.scrollTop(list.innerHeight());
  }

  function toggleMic() {
    $('.rec').hide();
    $('.send').show();
  }

  function toggleMicReverse() {
    $('.rec').show();
    $('.send').hide();
  }
});
