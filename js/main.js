$(document).ready(function () {
  

  var list =$("#msg");
  var newInput = $(".add_element");
  var icon = $(".chat_send i");
  var text = newInput.val().trim();
  var arrow = $("fas fa-chevron-down");


  //al click
  icon.click(function(){
    text = newInput.val().trim();
    if(text !== ""){ 
      writeMsg(text);
    }
  })


  //alla pressione tasto invio
  /* 
  L'ho voluto implementare in maniera che,
  lo switch delle icone avviene solo quando c'è del testo al suo
  interno, altrimenti se io mi posiziono sopra e non metto niente dentro l'icona invio non appare.
  */
  newInput.keyup(function(event){
    text = newInput.val().trim();

   // console.log(event.which);
    if(event.which !== 32){
      if(text !== ""){
        toggleMic();
      } else if(event.which !== 32 || text !== "" ){
        toggleMicReverse();
      }
    }
    
    if(event.which == 13){
      if(text !== ""){ 
        console.log("log3");
        writeMsg(text);
      }
    }
  });//fine key up
  

  function writeMsg(word){
    sendMsg(word);
    //console.log(word);
    toggleMicReverse();
    newInput.val("");
  }
  
  function sendMsg(word){ 
    var elementNew = $(".template .posted ").clone();
    elementNew.prepend("<p>" + word + "<span>"+ addData() +"</span>" + "</p>"); 
    elementNew.appendTo(list);
    $(".posted span").addClass("data_time");
    $("#body_chat").scrollTop($("#body_chat").prop("scrollHeight")); 
    //console.log(elementNew.text());
  }

  function toggleMic(){
    $(".rec").hide();
    $(".send").show();
  }

  function toggleMicReverse(){
    $(".rec").show();
    $(".send").hide();
  }

  function addData(){
    var dateNow = new Date();
    return hourNow = (dateNow.getHours()<10?'0':'') 
                      + dateNow.getHours() 
                      + ':' + 
                     (dateNow.getMinutes()<10? '0':'') 
                      + dateNow.getMinutes();
  }

  
});//fine ready
