$(document).ready(function () {
  

  var list =$(".right-messages");
  var newInput = $(".add_element");
  var icon = $(".chat_send i");
  var text = newInput.val().trim();
  var user = $(".user_name")


  //ricerca dei contatti

  $(".search_bar input").keyup(function(){

    $("#user .user_name").hide();
    var cerca = $(this).val().toLowerCase();
    
    $("#user .user_name h5").filter(function(){

      if($(this,"#user .user_name h5").text().toLowerCase().includes(cerca)){
        $(this).parents().show()
      }
    })
  })


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
        //console.log("log3");
        writeMsg(text);
        //risposta dal contatto
        setTimeout(rispostaContatto, 1000);
      }
      
    }
    
    
  });//fine key up
  

  /* 
    FUNZIONI
  */

  function writeMsg(word){
    sendMsg(word);
    //console.log(word);
    toggleMicReverse();
    newInput.val("");
  }
  
  function sendMsg(word){ 
    var elementNew = $(".template .message ").clone();
    elementNew.children(".message-text").text(word);
    elementNew.children(".data_time").text(addData());
    elementNew.addClass("sent");
    elementNew.appendTo(list);
    $("#body_chat").scrollTop($("#body_chat").prop("scrollHeight"));

    //console.log(elementNew.text());
  }

  function rispostaContatto(){
    var elementNew = $(".template .message ").clone();
    elementNew.children(".message-text").text("Si Si hai ragione!!!");
    elementNew.children(".data_time").text(addData());
    elementNew.addClass("received");
    elementNew.appendTo(list);
    $("#body_chat").scrollTop($("#body_chat").prop("scrollHeight"));
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
