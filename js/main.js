$(document).ready(function () {
  

  var list =$("#msg");
  var newInput = $(".add_element");
  var icon = $(".chat_send i");


  newInput.keyup(function(event){
    var text = newInput.val().trim();

    //console.log(event.which);
    if(event.which !== 32){
      if(text !== ""){
        toggleMic();
        console.log("ok2");
      }
    } 
    
    if(event.which == 13) {
      if(text !== "") { 
        sendMsg(text);
        console.log(text);
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
    //console.log(elementNew.text());
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
