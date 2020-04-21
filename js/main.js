$(document).ready(function () {
  

  var list =$(".right-messages.active");
  var newInput = $(".add_element");
  var icon = $(".chat_send i");
  var text = newInput.val().trim();
  var search = $(".search_bar input");
  var emoticon = $(".chat_emoticon i");


  //ricerca dei contatti
  search.keyup(function(){

    $("#user .user_name").hide();

    var nomeCercato = search.val().trim().toLowerCase();

    $("#user .user_name").each(function(){
      var nomeContatto = $(this).find('h5').text();
      if(nomeContatto.toLowerCase().includes(nomeCercato)){
        $(this).show();
      }
    })
      
  })

  //cambio conversazione

  $(".user_name").click(function(){

    var conversazione = $(this).attr("data-conversazione");
    var contattoImg = $(this).find("img").attr("src");
    var contattoNome = $(this).find("h5").text();
    var oraAccesso = $(this).children("span").text();
    var vecchioAccesso = $(".last_access_info")

    $(".user_name").removeClass("active");
 
  
    $(".right-messages").removeClass("active")

    $(".right-messages[data-conversazione = '" + conversazione +"']").addClass("active");

    $(this,".user_name").addClass("active");


    $("#guest_chat .last_access img").attr("src", contattoImg);
    $("#guest_chat .last_access h5 ").text(contattoNome);
    $("#guest_chat .last_access .data_time ").text(oraAccesso);
  })


  //alla presione del tasto emoticon
  emoticon.click(function(){
    
    $("#functions").toggle()
    
  });

  //quando scrivo un mess al clicc dell'incona plane lo invio
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

  //richiamo la funzione per eliminare i messaggi
  deletMess()

  

  /* 
    FUNZIONI
  */
  //funziona per eliminare messaggi e far apparire il menu nascosto
  function deletMess(){
    //al click apri il menu nascosto
    $(".fa-chevron-down").click(function(){
      $(this).next().toggleClass("hide_menu")
      scrollMessaggio ()
    })


    
    $(".sotto_menu").mouseleave(function(){
      $(".sotto_menu").removeClass("hide_menu")
    })

    //cancella un elemento
    $(".sotto_menu .delete").click(function(){
      $(this).parents("li").remove()
    })
  }

  
  //Funzione per inviare un messaggio
  function writeMsg(word){ 
    deletMess()
    list = $(".right-messages.active");
    var elementNew = $(".template li").clone();
    elementNew.find(".message-text").text(word);
    elementNew.find(".data_time").text(addData());
    elementNew.addClass("sent");
    elementNew.appendTo(list);
    newInput.val("");
    toggleMicReverse();
    //console.log(elementNew.text());
    scrollMessaggio();
    
  } 


  //Ricevere un messaggio dal contatto
  function rispostaContatto(){
    list = $(".right-messages.active");
    var risposte = ["Si si hai ragione!!!", 
                    "Stiamo lavorando attivamente per lei",
                    "No problem!!",
                    "L'analcolico biondo che fa impazzire il mondo",
                    "Voto diescccciiii",
                    "Li vuoi quei kiwi?"
    ];
    //console.log(risposte);
    
    var random = Math.floor(Math.random()* risposte.length);
    //console.log(random);
    
    var elementNew = $(".template li").clone();
    elementNew.find(".message-text").text(risposte[random]);
    elementNew.find(".data_time").text(addData());
    elementNew.addClass("received");
    elementNew.appendTo(list);
    scrollMessaggio();
    deletMess()
    
    $(".user_name.active").find(".data_time").text(addData())
    $(".last_access_info").find(".data_time").text(addData())
    $(".user_name.active .user_name_text").find("span").text(risposte[random])
  }

  //funzione per far scollare la pagina
  function scrollMessaggio (){
    var pixelScroll = $(".right-messages.active").height();

    $("#body_chat").animate({
      scrollTop: pixelScroll
    },500)
  }

  //Funzioni di show e hide icon mic-plane
  function toggleMic(){
    icon.removeClass("fa-microphone").addClass("fa-paper-plane");
  }

  function toggleMicReverse(){
    icon.removeClass("fa-paper-plane").addClass("fa-microphone");
  }


  //funzione che aggiunge gli zeri alle date esempio 12:6 --> 12:06
  function addData(){
    var dateNow = new Date();
    return hourNow = (dateNow.getHours()<10?'0':'') 
                      + dateNow.getHours() 
                      + ':' + 
                     (dateNow.getMinutes()<10? '0':'') 
                      + dateNow.getMinutes();
  }

  
});//fine ready
