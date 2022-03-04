
//Exemplo de reconhecimento de fala.
//Nota: o mecanismo de reconhecimento de fala para alguns
//idiomas podem ser baixados para uso off-line.

//Chamado quando o aplicativo é iniciado.
var id= 0
var id2=0
var idEdt="#19"
var msg = ""
var data=0
var hora=0
var minuto=0

app.LoadPlugin("UIExtras")
//app.LoadScript( "https://pdfkit.org/demo/browser.js" )
function OnStart()
{
   app.SetOrientation( "Portrait")
   app.SetStatusBarColor( "#2f4f4f" )
   app.SetNavBarColor( "#2f4f4f" )
   
   app.LoadPlugin( "UIExtras" )
    
  //Layout principla.
  lay = app.CreateLayout( "Linear", "Vertical,FillXY" );	
  lay.SetBackColor( "#f0f8ff" )
  
  //Layout do topo do layout principla
  layTop = app.CreateLayout( "Linear", "Horizontal, FillX, Left" )
  layTop.SetPadding( 0.0,0.01,0.0,0.0)
  layTop.SetBackColor( "#2f4f4f" );
  lay.AddChild( layTop )
  
  lbl = app.CreateText( "Anotações",0.45,null,"left")
  lbl.SetPadding( 0.04,0.01,0.01,0.01 )
  lbl.SetTextSize( 16)
  lbl.SetTextColor( "#ffffff")
  layTop.AddChild( lbl )
  
  btnBook=app.CreateButton("[fa-book]",-1,0.07,"FontAwesome")
  btnBook.SetBackColor( "#2f4f4f" )
  btnBook.SetOnTouch( btnBook_OnTouch );
  layTop.AddChild(btnBook)
  
  //Botões para adição e manipulação de notas
  btnArchive= app.CreateButton("[fa-archive]",-1,0.07,"FontAwesome");
  btnArchive.SetBackColor( "#2f4f4f" )
  btnArchive.SetOnTouch( btnArchive_OnTouch );
  layTop.AddChild(btnArchive);
  
  btnSearch= app.CreateButton("[fa-search]",-1,0.07,"FontAwesome");
  btnSearch.SetBackColor( "#2f4f4f" )
  btnSearch.SetOnTouch( btnSearch_OnTouch );
  layTop.AddChild(btnSearch);
  
  //Cria a lista do layout principla
  list = app.CreateList( "",-1,0.88,"Html")
  list.SetTextColor1( "#404040" )
  list.SetTextColor2( "#f8f8f8" )
  list.SetTextSize2( 2 )
  list.SetDivider(0.005,"#cccccc")
  list.SetPadding(0.025,0.01,0.025,0.01)
  list.SetOnTouch( list_OnTouch )
  lay.AddChild( list )
  
  //Cria um segundo layout para exibição das notas finalizada
  layArchive = app.CreateLayout( "Linear", "Vertical,FillXY" )
  layArchive.SetBackColor( "#f0f8ff" )
  layArchive.SetVisibility("Hide")
  
  layArchiveTop = app.CreateLayout(  "Linear", "Horizontal, FillX, Right" )
  layArchiveTop.SetPadding( 0.0,0.01,0.0,0.0)
  layArchiveTop.SetBackColor( "#8b4513" );
  layArchive.AddChild( layArchiveTop)
  
  lblArchive = app.CreateText( "Anotações Arquivadas",0.48,null,"left")
  lblArchive.SetPadding( 0.04,0.01,0.01,0.01)
  lblArchive.SetTextSize( 16)
  layArchiveTop.AddChild( lblArchive )
  
  btnArchiveTrash= app.CreateButton("[fa-trash]",-1,0.07,"FontAwesome");
  btnArchiveTrash.SetOnTouch( btnArchiveTrash_OnTouch )
  btnArchiveTrash.SetBackColor( "#8b4513" )
  layArchiveTop.AddChild(btnArchiveTrash)
  
  btnArchiveSearch= app.CreateButton("[fa-search]",-1,0.07,"FontAwesome");
  btnArchiveSearch.SetOnTouch( btnArchiveSearch_OnTouch )
  btnArchiveSearch.SetBackColor( "#8b4513" )
  layArchiveTop.AddChild(btnArchiveSearch)
	
  btnArchiveArrow= app.CreateButton("[fa-arrow-right]",-1,0.07,"FontAwesome");
  btnArchiveArrow.SetOnTouch( btnArchiveArrow_OnTouch )
  btnArchiveArrow.SetBackColor( "#8b4513" )
  layArchiveTop.AddChild(btnArchiveArrow)
  
  listArchive = app.CreateList( "",0.98,0.92 ,"Html")
  listArchive.SetTextColor1( "#404040" )
  listArchive.SetTextColor2( "#f8f8f8" )
  listArchive.SetTextSize2( 2 )
  listArchive.SetDivider(0.005,"#cccccc")
  listArchive.SetPadding(0.025,0.01,0.025,0.01)
  listArchive.SetOnTouch( listArchive_OnTouch )
  layArchive.AddChild( listArchive )
  
  layNota = app.CreateLayout( "Linear", "Vertical,FillXY" )
  layNota.SetBackColor( "#000000" )
  layNota.SetPadding( 0.0,0.0,0.0,0.01 )
  layNota.SetVisibility( "Hide" )
  
  layNewSpesh = app.CreateLayout( "Linear", "Horizontal,FillX,Right" )
  layNewSpesh.SetBackColor("#2f4f4f")
  layNota.AddChild( layNewSpesh )
  
  btnNewSpeshArrow = app.CreateButton( "[fa-arrow-down]",0.25,0.07,"FontAwesome" )
  btnNewSpeshArrow.SetTextSize( 16 )
  btnNewSpeshArrow.SetBackColor("#2f4f4f")
  btnNewSpeshArrow.SetOnTouch( btnNewSpeshArrow_OnTouch )
  layNewSpesh.AddChild( btnNewSpeshArrow)
  
  btnNewSpeshSave = app.CreateButton( "Salvar",0.5,0.07,"FontAwesome" )
  btnNewSpeshSave.SetTextSize( 16 )
  btnNewSpeshSave.SetBackColor("#2f4f4f")
  btnNewSpeshSave.SetOnTouch( btnNewSpeshSave_OnTouch )
  layNewSpesh.AddChild( btnNewSpeshSave)
  
  btnNewSpesh = app.CreateButton( "[fa-microphone]",0.25,0.07,"FontAwesome" )
  btnNewSpesh.SetOnTouch( btnNewSpesh_OnTouch )
  btnNewSpesh.SetTextSize( 16 )
  btnNewSpesh.SetBackColor("#2f4f4f")
  layNewSpesh.AddChild( btnNewSpesh )
  
  edtTitle = app.CreateTextEdit( "",0.96,0.07,"Multiline,Left")
  edtTitle.SetPadding( 0.03,0.02,0.02,0.02)
  edtTitle.SetBackColor( "#404040" )
  edtTitle.SetTextColor( "#ffffff" )
  edtTitle.SetTextSize( 16 )
  edtTitle.SetHint("Insira um título (Opcional)")
  edtTitle.SetMargins( 0.01, 0.01, 0.01, 0.01 )
  edtTitle.SetOnFocus( titleSet_OnFocus )
  layNota.AddChild( edtTitle )
  
  edtNota = app.CreateTextEdit( "",0.96,0.82,"Multiline,Left")
  edtNota.SetPadding( 0.03,0.02,0.02,0.02 )
  edtNota.SetBackColor( "#404040" )
  edtNota.SetTextColor( "#ffffff" )
  edtNota.SetTextSize( 16 )
  edtNota.SetHint( "Insira a nota" )
  edtNota.SetMargins(0,0,0.0,0.02)
  edtNota.SetOnFocus( notaSet_OnFocus )
  layNota.AddChild( edtNota )
  
  idNota=app.CreateText("",0,0,)
  layNota.AddChild(idNota)
  
  
  //Adicione layout ao aplicativo.
  app.AddLayout( lay );
  app.AddLayout(layArchive);
  app.AddLayout( layNota )
  
  uix = app.CreateUIExtras();

 layFab = app.CreateLayout( "Linear", "FillXY, Bottom, Right, TouchThrough" );
 fab = uix.CreateFAButton( "[fa-pencil]" );
 fab.SetMargins( 0.02, 0.01, 0.02, 0.01 );
 fab.SetButtonColors( "#db4437", "#c33d32" );
 fab.SetOnTouch( fab_OnTouch);

 layFab = app.CreateLayout( "Linear", "FillXY, Bottom, Right, TouchThrough" );
 fab = uix.CreateFAButton( "[fa-pencil]" );
 fab.SetMargins( 0.02, 0.01, 0.02, 0.01 );
 fab.SetButtonColors( "#db4437", "#c33d32" );
 fab.SetOnTouch( fab_OnTouch );
 layFab.AddChild( fab );

 layFab.AddChild( fab );

 app.AddLayout( layFab );
 
 laySearch = app.CreateLayout( "Absolute", "Horizontal,FillX" )
 laySearch.SetPadding( 0.0,0.01,0.0,0.0 )
 laySearch.SetPosition( 0,0 )
 laySearch.SetBackColor( "#1c1c1c" )
 laySearch.SetVisibility( "Hide" )
	   
 edtSearch = app.CreateTextEdit( "",0.8,null )
 edtSearch.SetOnChange( searchNota )
 edtSearch.SetHint( "Digite o que procura" )
 laySearch.AddChild( edtSearch )
 
 edtSearchArchive = app.CreateTextEdit( "",0.0,0.0 )
 edtSearchArchive.SetOnChange( searchNotaArchive )
 edtSearchArchive.SetHint( "Digite o que procura" )
 laySearch.AddChild( edtSearchArchive )

	   
 btnCloseSearch = app.CreateButton( "[fa-close]",0.18,0.07, "FontAwesome")
 btnCloseSearch.SetOnTouch( btnCloseSearch_OnTouch )
 btnCloseSearch.SetPosition( 0.82,0 )
 laySearch.AddChild( btnCloseSearch )
	   	
  //Criar objeto de reconhecimento  de voz e define retorno de chamada.
  speech = app.CreateSpeechRec();
  speech.SetOnReady( speech_OnReady );
  speech.SetOnResult( speech_OnResult );
  speech.SetOnError( speech_OnError );
 
  player = app.CreateMediaPlayer()
  player.SetFile( "/Sys/Snd/Poing.ogg" )
	
  //Cria ou abre um banco de dados chamado "MyData".
  db = app.OpenDatabase( "MyData" );  
      
  //Cria uma tabela de notas ativas (se ela não existir já).
  db.ExecuteSql( "CREATE TABLE IF NOT EXISTS task_table " +  
       "(id integer primary key, title text, data text, data_num integer, category text)" );  
       
  //Cria uma tabela de notas finalizadas (se ela não existir já).   
  db.ExecuteSql( "CREATE TABLE IF NOT EXISTS arquivo_table " +  
       "(id integer primary key, title text, data text, data_num integer, category integer)" );  
   
  //btnDelete_OnTouch()
  //Obter todas as linhas da tabela de notas ativas - taks_table e exibe no objeto list.
  DisplayAllRows(); 
}

function btnSearch_OnTouch()
{
	   app.AddLayout( laySearch )
	   edtSearchArchive.SetSize(0,0)
       edtSearch.SetSize(0.8,0.07)
	   laySearch.SetVisibility("Show")
}

function  btnArchiveSearch_OnTouch(){
    app.AddLayout( laySearch )
    edtSearchArchive.SetSize(0.8,0.07)
    edtSearch.SetSize(0,0)
	laySearch.SetVisibility("Show")
}


function searchNota()
{
	   let texto = edtSearch.GetText()
	   texto = "'%" + texto + "%'"
	   
	   list.RemoveAll()
	   
	   db.ExecuteSql( "select * from task_table where data like"+texto+"order by data_num desc", [], OnResult ); 

}

function searchNotaArchive(){
      let texto = edtSearchArchive.GetText()
	   texto = "'%" + texto + "%'"
	   
	   listArchive.RemoveAll()
	   
	   db.ExecuteSql( "select * from arquivo_table where data like"+texto+"order by data_num desc", [], OnResultArchive ); 
   
}

function btnCloseSearch_OnTouch()
{
	   app.RemoveLayout( laySearch )
	   app.HideKeyboard()
	   DisplayAllRows()
}

function btnBook_OnTouch(){
    layBook=app.CreateLayout("Linear", "Vertical,FilXY")
    layBook.SetBackColor("#f0f8ff")
    layBook.SetSize(1,1)
    layBook.SetVisibility("Hide")
    
    layTop = app.CreateLayout( "Linear", "Horizontal, FillX, Right" )
    layTop.SetPadding( 0.0,0.01,0.0,0.0)
    layTop.SetBackColor( "#2f4f4f" );
    layBook.AddChild( layTop )
    
    lblBook = app.CreateText( "Instruções de uso",0.8,0.07,"Left" )
    lblBook.SetPadding(0.01,0.01,0.01,0.01)
    lblBook.SetTextSize( 18 )
    layTop.AddChild( lblBook )
      
    btnClose=app.CreateButton("[fa-close]",-1,0.07,"FontAwesome")
    btnClose.SetBackColor( "#2f4f4f" )
    btnClose.SetOnTouch( btnClose_OnTouch );
    layTop.AddChild(btnClose)
    app.ShowProgress( "Abrindo..." )
    web=app.CreateWebView(1.0,0.92)
    web.LoadUrl("https://nota-rapida.cleitoncomfe.repl.co/")
    layBook.AddChild(web)
    
    inter = setTimeout(hideProgress,2000)
      
    app.AddLayout(layBook)
    
    layBook.Animate("SlideFromBottom")
}

function hideProgress()
{
	  app.HideProgress()
    clearTimeout(inter)
    if(!app.IsConnected()){
       alert("Erro: Sem conexão. Verifique sua internet")
    }
}


function btnClose_OnTouch(){
    layBook.Animate("SlideToBottom")
    app.RemoveLayout(layBook)
}

function titleSet_OnFocus()
{
	  edtTitle.SetBackColor( "#404040" )
	  edtNota.SetBackColor( "#404040" )
	  idEdt="#18"
}

function notaSet_OnFocus()
{
	  edtTitle.SetBackColor( "#404040" )
	  edtNota.SetBackColor( "#404040" )
	  idEdt="#19"
}



function btnNewSpeshArrow_OnTouch(){
   layNota.Animate("SlideToBottom") 
   btnNewSpeshSave.SetText( "Salvar") 
   app.HideKeyboard()
   idEdt = "#19"
   layFab.SetVisibility("Show")
}

function btnNewSpeshSave_OnTouch ()
{
	 let title = edtTitle.GetText()
	 let nota = edtNota.GetText()
	 let data = new Date().getTime()
	 let id= parseInt(idNota.GetText())
	 let category = 0
	 
	 if(nota==""){
	    alert("Insira a nota para continuar")
	    return
	 }

	 if(btnNewSpeshSave.GetText()=="Salvar Alteração"){
	    updateNota(title,nota,id)
	    btnNewSpeshSave.SetText( "Salvar" )
	 }else{
	    saveNota(title,nota,data,category)
	 }
	 
	 //layFab.SetVisibility("Show")
}


function btnNewSpesh_OnTouch()
{
	 //Comece a reconhecer audio.
	 speech.Recognize();
}

function fab_OnTouch(){
   layNota.Animate("SlideFromBottom")	 
   edtTitle.SetBackColor("#404040")
   edtNota.SetBackColor("#404040")
   edtTitle.SetText("")
   edtNota.SetText("")
   idEdt = "#19"
   layFab.SetVisibility("Hide")
}

function saveNota(title,nota,data,category)
{
	 //Adicione a mensagem na tablea (com o manipulador de erros).
    db.ExecuteSql( "INSERT INTO task_table (title, data, data_num,category)" +   
        " VALUES (?,?,?,?)", [title,nota, data, category], null, OnError );  
    
    DisplayAllRows();  
    edtTitle.SetText( "" )
    edtNota.SetText( "" )
    app.ShowPopup("Nota salva com sucesso","Short")
    app.HideKeyboard()
    idEdt = "#19"
}

function updateNota(title,nota,id){
    db.ExecuteSql("UPDATE task_table SET  title=?, data=? WHERE data_num="+id, [title, nota], null,OnError)
    
    DisplayAllRows();  
    edtTitle.SetText( "" )
    edtNota.SetText( "" )
    app.ShowPopup("Nota alterada com sucesso","Short")
    app.HideKeyboard()
    idEdt="#19"
}

function list_OnTouch(title,body,type, index)
{
   let opt = "Abrir/Editar,Priorizar,Definir Data,Arquivar,Enviar,Apagar";
   id = body
   msg = title
   dlgOpt = app.CreateListDialog( "O que deseja fazer com a nota?",opt );
   dlgOpt.SetOnTouch( dlgOpt_OnTouch )
   dlgOpt.Show()
}

function dlgOpt_OnTouch(index,n)
{
	  switch(index){
	     case "Abrir/Editar":
	        db.ExecuteSql("select * from task_table where data_num="+id+";", [], resOpenNota, OnError )
	        break
	     case "Priorizar":
	         setPriorizar()
	         //db.ExecuteSql("select * from task_table where data_num="+id+";", [], resPriorizar, OnError )
	         break
	     case "Definir Data":
	         setCalendar()
	         break
	     case "Apagar":
	        let msg = "Deseja realmente apagar a nota? Não há como recuperá-la depois."
	        yesNoDelete = app.CreateYesNoDialog( msg )
	        yesNoDelete.SetOnTouch( yesNoDeleteNota)
	        yesNoDelete.SetButtonText("Sim", "Não")
	        yesNoDelete.Show()
	        break
	     case "Enviar":
	        db.ExecuteSql("select * from task_table where data_num="+id+";", [], resSend, OnError )
	        break
	     case "Arquivar":
	        let conf = confirm("Deseja realmente arquivar a nota?")
	        if(conf){
	           db.ExecuteSql("select * from task_table where data_num="+id+";", [], resArchive, OnError )
	        }
	  }
}

function yesNoDeleteNota(res)
{
	 if(res=="Yes"){
	     removeNota(id)
	 }
}

function setPriorizar(){
   let opt = "Importante,Urgente,Nenhuma"
   dlgPriorizar = app.CreateListDialog( "Classifique em uma categoria", opt )
   dlgPriorizar.SetOnTouch( dlgPriorizar_OnTouch )
   dlgPriorizar.Show()
}

//Atualiza o db com a categoria selecionada
function dlgPriorizar_OnTouch (item)
{
    var category=0
    switch(item){
      case "Nenhuma":
          category=0
          break
      case "Importante":
          category=1
          break
      case "Urgente":
          category=2
    }
    
    let conf=confirm("Classificar na categoria: " + item+"?")
    
    if(conf){
      db.ExecuteSql("UPDATE task_table SET  category=? WHERE data_num="+id, [category], null,OnError) 
      app.ShowPopup("Classificação realizada com sucesso", "Short")
      DisplayAllRows()
    } 
}


function resOpenNota(result){
    layOpen=app.CreateLayout("Linear", "Vertical,FilXY")
    layOpen.SetBackColor("#f0f8ff")
    layOpen.SetSize(1,1)
    layOpen.SetVisibility("Hide")
        
    layTopOpen = app.CreateLayout( "Linear", "Horizontal, FillX, Right" )
    layTopOpen.SetPadding( 0.0,0.01,0.0,0.0)
    layTopOpen.SetBackColor( "#2f4f4f" );
    layOpen.AddChild( layTopOpen )
    
    lblTopOpen = app.CreateText( "",0.6,null,"Left" )
    lblTopOpen.SetPadding( 0.01,0.01,0,0 )
    lblTopOpen.SetTextColor( "#fffffff" )
    lblTopOpen.SetTextSize( 18 )
    layTopOpen.AddChild( lblTopOpen )
    
    btnEdtOpen=app.CreateButton("[fa-pencil]",-1,0.07,"FontAwesome")
    btnEdtOpen.SetBackColor( "#2f4f4f" )
    btnEdtOpen.SetOnTouch( btnEdtOpen_OnTouch );
    layTopOpen.AddChild(btnEdtOpen)
      
    btnCloseOpen=app.CreateButton("[fa-close]",-1,0.07,"FontAwesome")
    btnCloseOpen.SetBackColor( "#2f4f4f" )
    btnCloseOpen.SetOnTouch( btnCloseOpen_OnTouch );
    layTopOpen.AddChild(btnCloseOpen)
    
    lblOpen=app.CreateText("",1.0,0.90,"Multiline,Html,Left")
    lblOpen.SetTextColor("#202020")
    lblOpen.SetTextSize( 16 )
    lblOpen.SetPadding(0.05,0.01,0.02,0.1)
    
    scro = app.CreateScroller( 1,1) 
    scro.AddChild( lblOpen )
    layOpen.AddChild(scro)
    
    lblIdOpen=app.CreateText("",0,0)
    lblIdOpen.SetText(result.rows.item(0).data_num)
    
    lblTopOpen.SetText(result.rows.item(0).title )
    lblOpen.SetText( result.rows.item(0).data )
  
    app.AddLayout(layOpen)
    
    layOpen.Animate("SlideFromBottom")
    
    layFab.SetVisibility( "Hide" )
    app.HideKeyboard()
    
}

function btnEdtOpen_OnTouch()
{  
   layNota.Animate("SlideFromBottom")	 
   edtTitle.SetBackColor("#404040")
   edtTitle.SetText(lblTopOpen.GetText())
   edtNota.SetBackColor("#404040")
   edtNota.SetText(lblOpen.GetText())
   idNota.SetText(lblIdOpen.GetText())
   btnNewSpeshSave.SetText("Salvar Alteração")
   btnCloseOpen_OnTouch()   
   idEdt = "#19"
   layFab.SetVisibility( "Hide" )
   
   
   if(laySearch){
       app.RemoveLayout(laySearch)
       DisplayAllRows()
   }
}

function btnCloseOpen_OnTouch(){
    layOpen.Animate("SlideToBottom")
    app.RemoveLayout( layOpen )
    layFab.SetVisibility( "Show" )
}

function resArchive(res)
{
	 var item = res.rows.item(0)
	 let title = item.title
	 let nota = item.data
	 let category = item.category
	 db.ExecuteSql( "INSERT INTO arquivo_table (title, data, data_num,category)" +   
           " VALUES (?,?,?,?)", [title,  nota, id, category], null, OnError );  
	 removeNota(id)
	 app.ShowPopup("Nota arquvidada com sucesso")
}

function resSend(result)
{
	   let nota = result.rows.item(0).data
	   let title = result.rows.item(0).title
	   let msg = title+"\n"+nota
	   sendFile(msg)
}


function sendFile(msg)
{

    let file = "/sdcard/nota.txt";
    app.WriteFile( file, msg );
	app.SendFile( file, "nota.txt", "Enviar arquivo" ) 
	
}



//Chamada quando o mecanismo de fala está pronto.
function speech_OnReady()
{
    lay=app.CreateLayout("Linear","Vcenter");
    lay.SetSize(0.8,0.3);
    
    btnOnRead=app.CreateText("[fa-microphone]",0.25,0.08,"FontAwesome");
    btnOnRead.SetTextSize(18);
    btnOnRead.SetOnTouch( btnOnRead_OnTouch )
    lay.AddChild(btnOnRead);
    
    lblMsg=app.CreateText("Fale. Estamos ouvindo...",null,null,"Multiline");
    lblMsg.SetTextSize(12);
    lay.AddChild(lblMsg)
    
    dlgOnRead=app.CreateDialog("Reconhecimento de voz");
    dlgOnRead.AddLayout(lay);
    dlgOnRead.Show();
}

function btnOnRead_OnTouch ()
{
    dlgOnRead.Dismiss()
    speech.Recognize()
}

//Chamada com o (s) resultado (s) de reconhecimento.
function speech_OnResult( results )
{
	//Uma série de resultados de reconhecimento é retornada
    //aqui, com o mais provável na frente
    //da Array.
    let str2=edtTitle.GetText()
    let str1 = edtNota.GetText()
    
    let strTitle=results[0]
    let title=""
    title+=str2 + capitalize(strTitle)
    let strNota = results[0];
    let nota = ""
    nota += str1+capitalize(strNota)
   
    if(idEdt=="#18"){
       edtTitle.SetText(title)
    }else{
       edtNota.SetText( nota )
    }
    if(!layNota.IsVisible()){
       layNota.Animate( "SlideFromLeft" )
    }
    
    lblMsg.SetText( "Toque no microfone  para continuar." )
    
    //Fechar o diálogo de ouvvinte
    dlgOnRead.Dismiss();

}

//Chamado se o reconhecimento falhar.
function speech_OnError()
{
    lblMsg.SetText("Erro ao capturar voz. Toque no botão do microfone para reiniciar.","Long" );
    
}


//Chamado quando o usuário toca nossa opção Apagar do objeto list'.
function removeNota(id)  
{   
    //Remova dados.
    db.ExecuteSql( "DELETE FROM task_table WHERE data_num = " + id);  

    //Obter todas as linhas da tabela.
    DisplayAllRows();  
} 


function removeNotaArquivo(id)  
{      
    //Remova dados.
    db.ExecuteSql( "DELETE FROM arquivo_table WHERE data_num = " + id2);  

    //Obter todas as linhas da tabela.
    DisplayAllRowsArchive();
    DisplayAllRows()
    layArchive.Animate( "SlideToRight" )
}  


//Chamado quando o usuário toca seu botão 'Excluir'.
function btnDelete_OnTouch()  
{      
   //Exclua este banco de dados.
   db.Delete();  

   //Obter todas as linhas da tabela.
   DisplayAllRows(); 
}  

//Consulta todas as linhas da tablea task_table
function DisplayAllRows() 
{ 
    list.RemoveAll()
    
    db.ExecuteSql( "select * from task_table order by category desc, data_num desc;", [], OnResult, OnError); 
} 

//Consultas todas as linha da tablea arquivo_table
function DisplayAllRowsArchive() 
{ 
    listArchive.RemoveAll()
    //Obter todas as linhas da tabela.
    db.ExecuteSql( "select * from arquivo_table;", [], OnResultArchive,OnError ); 
} 

//Chamada para mostrar os resultados da consulta na lista do layout principla.
function OnResult( results )   
{  
    var s=""
    var s1 = "<strong><font color =#4169e1>Sem Categoria</font></strong> %"; 
    var s2 = "<strong><font color =#009900>Importante</font></strong> %"; 
    var s3 = "<strong><font color =#ff0000>Urgente</font></strong> %"; 
    var sep = "%"
    var len = results.rows.length;  
    
    for(var i = 0; i < len; i++ )   
    {  
        var item = results.rows.item(i) 
        
        var date = new Date(item.data_num)
        
        var dia = date.getDate()
        var mes  = date.getMonth()+1
        var ano = date.getFullYear()
        var wek = date.getDay()
        var hr=date.getHours()
        var min =date.getMinutes()
        var day = ["Dom", "Seg","Ter","Qua","Qui","Sex","Sab"]
        date =day[ wek]+"  "+dia+"/"+mes+"/"+ano + " " + hr + "h "+min + "mim"
        var title = item.title
        
        //Categoria Nenhuma
        if(item.category==0){
            if(title !=""){
            title = "<strong>"+ item.title +"</strong><br>" 
            }
            if(i<len-1){
                s1 +=title + (item.data).substring(0,70) + " ..." +
                       "<br><small>"+date+"</small>"+":" + 
                       item.data_num+":"+null+sep;   
             }else{
                s1 +=title+ (item.data).substring(0,70) +  " ..." +
                       "<br><small>"+date+"</small>"+":" + 
                       item.data_num+":"+null;  
             }
        
        }
        
        //Categoria Importante
        if(item.category==1){
            //alert(item.category)
            if(title !=""){
            title = "<strong>"+ item.title +"</strong><br>" 
            }
            if(i<len-1){
                s2 +=title + (item.data).substring(0,70) + " ..." +
                       "<br><small>"+date +"</small>"+":" + 
                       item.data_num+":"+null+sep;   
             }else{
                s2 +=title+ (item.data).substring(0,70) +  " ..." +
                       "<br><small>"+date+"</small>"+":" + 
                       item.data_num+":"+null;  
             }
        
        }
        
        //Categoria Urgente
        if(item.category==2){
            //alert(item.category)
            if(title !=""){
            title = "<strong>"+ item.title +"</strong><br>" 
            }
            if(i<len-1){
                s3 +=title + (item.data).substring(0,70) + " ..." +
                       "<br><small>"+date+"</small>"+":" + 
                       item.data_num+":"+null+sep;   
             }else{
                s3 +=title+ (item.data).substring(0,70) +  " ..." +
                       "<br><small>"+date+"</small>"+":" + 
                       item.data_num+":"+null;  
             }
        
        } 
    }
    if(s3!="<strong><font color =#ff0000>Urgente</font></strong> %"){
        s+=s3
    }
    if(s2!="<strong><font color =#009900>Importante</font></strong> %"){
        s+=s2
    }
    if(s1!="<strong><font color =#4169e1>Sem Categoria</font></strong> %"){
        s+=s1
    }

    list.SetList(s,"%")
 
}  

//Chamada para mostrar as notas arquivada na lista do segundo layout
function OnResultArchive( results )   
{   
    /*
    var s = "";  
    var sep = "%" 
    var date = "date"
    var len = results.rows.length;  
    
    if(len==0){
        app.ShowPopup("Nenhuma nota arquivada")
    }else{
        for(var i = 0; i < len; i++ )   
        {  
               var item = results.rows.item(i)  
               var date = new Date(item.data_num)
               var dia = date.getDate()
               var mes  = date.getMonth()+1
               var ano = date.getFullYear()
               var wek = date.getDay()
               var day = ["Dom", "Seg","Ter","Qua","Qui","Sex","Sab"]
               date =day[ wek]+"  "+dia+"/"+mes+"/"+ano
               var title = item.title
               if(title !=""){
                  title = "<strong>"+ item.title +"</strong><br>" 
               }
           
            if(i<len-1){
                s +=title +  item.data +  "<br><small><small>"+date+" </small></small>"+":" + 
                item.data_num+":"+null+sep;  
             }else{
                s +=title + item.data +  
                       "<br><small><small>"+date+" </small></small>"+":" + 
                       item.data_num+":"+null;  
             }
        }  
        
        listArchive.SetList(s,"%")
    }---------------------- */
    
    var s=""
    var s1 = "<strong><font color =#4169e1>Sem Categoria</font></strong> %"; 
    var s2 = "<strong><font color =#009900>Importante</font></strong> %"; 
    var s3 = "<strong><font color =#ff0000>Urgente</font></strong> %"; 
    var sep = "%"
    var len = results.rows.length;  
    
    for(var i = 0; i < len; i++ )   
    {  
        var item = results.rows.item(i) 
        
        var date = new Date(item.data_num)
        
        var dia = date.getDate()
        var mes  = date.getMonth()+1
        var ano = date.getFullYear()
        var wek = date.getDay()
        var hr=date.getHours()
        var min =date.getMinutes()
        var day = ["Dom", "Seg","Ter","Qua","Qui","Sex","Sab"]
        date =day[ wek]+"  "+dia+"/"+mes+"/"+ano + " " + hr + "h "+min + "mim"
        var title = item.title
        
        //Categoria Nenhuma
        if(item.category==0){
            if(title !=""){
            title = "<strong>"+ item.title +"</strong><br>" 
            }
            if(i<len-1){
                s1 +=title + (item.data).substring(0,70) + " ..." +
                       "<br><small>"+date+"</small>"+":" + 
                       item.data_num+":"+null+sep;   
             }else{
                s1 +=title+ (item.data).substring(0,70) +  " ..." +
                       "<br><small>"+date+"</small>"+":" + 
                       item.data_num+":"+null;  
             }
        
        }
        
        //Categoria Importante
        if(item.category==1){
            //alert(item.category)
            if(title !=""){
            title = "<strong>"+ item.title +"</strong><br>" 
            }
            if(i<len-1){
                s2 +=title + (item.data).substring(0,70) + " ..." +
                       "<br><small>"+date +"</small>"+":" + 
                       item.data_num+":"+null+sep;   
             }else{
                s2 +=title+ (item.data).substring(0,70) +  " ..." +
                       "<br><small>"+date+"</small>"+":" + 
                       item.data_num+":"+null;  
             }
        
        }
        
        //Categoria Urgente
        if(item.category==2){
            //alert(item.category)
            if(title !=""){
            title = "<strong>"+ item.title +"</strong><br>" 
            }
            if(i<len-1){
                s3 +=title + (item.data).substring(0,70) + " ..." +
                       "<br><small>"+date+"</small>"+":" + 
                       item.data_num+":"+null+sep;   
             }else{
                s3 +=title+ (item.data).substring(0,70) +  " ..." +
                       "<br><small>"+date+"</small>"+":" + 
                       item.data_num+":"+null;  
             }
        
        } 
    }
    if(s3!="<strong><font color =#ff0000>Urgente</font></strong> %"){
        s+=s3
    }
    if(s2!="<strong><font color =#009900>Importante</font></strong> %"){
        s+=s2
    }
    if(s1!="<strong><font color =#4169e1>Sem Categoria</font></strong> %"){
        s+=s1
    }
    //s+=s3+s2+s1
    listArchive.SetList(s,"%") 
}  

//Funções realiconadas ao segundo layout - notas arquivadas

function btnArchive_OnTouch()
{
	 layArchive.Animate( "SlideFromRight" )
	 layFab.SetVisibility("Hide")
	 DisplayAllRowsArchive()
}

function btnArchiveArrow_OnTouch()
{
	layArchive.Animate( "SlideToRight" )
    layFab.SetVisibility("Show")
}

function btnArchiveTrash_OnTouch()
{   
    len = listArchive.GetLength()
    if(len){
       var conf = confirm("Deseja excluir  todas as notas? Não há como recuperá-las.");
       if(conf){
	        db.ExecuteSql( "DELETE FROM arquivo_table");  
	        DisplayAllRowsArchive() 
	     } 
    }
}

function listArchive_OnTouch (title,body,tipe,index)
{
    id2 = parseInt(body)
	  
	 let opt="Recuperar,Apagar"
	 dlgArchive=app.CreateListDialog("O que deseja fazer?",opt)
	 dlgArchive.SetOnTouch(dlgArchive_OnTouch)
	 dlgArchive.Show()
}

function dlgArchive_OnTouch(item){
    switch(item){
        case "Recuperar":
            db.ExecuteSql("select * from arquivo_table where data_num="+id2+";", [], resArchiveRecuperar, OnError )
            break
        case "Apagar":
            var conf = confirm("Deseja excluir  a  nota? Não há como recuperá-la.");
            if(conf){
	            db.ExecuteSql( "DELETE FROM arquivo_table WHERE data_num = " + id2);  
	            DisplayAllRowsArchive() 
	        }
            break
    }
     
}

function resArchiveRecuperar(res){
  let item = res.rows.item(0)
	let title = item.title
	let nota = item.data
	let data_num= item.data_num
	let category=item.category
	db.ExecuteSql( "INSERT INTO task_table (title, data, data_num, category)" +   
       " VALUES (?,?,?,?)", [title,  nota, data_num, category], null, OnError );  
	removeNotaArquivo(data_num)
	app.ShowPopup("Nota recuperada com sucesso")
}


//Converte primeira letra de uma string para maiúscula
function capitalize(str)
{
	  return str.charAt(0).toUpperCase() + str.slice(1)
}

//Chamada para mostrar erros relacionados as operações com o db.
function OnError( msg )   
{  
    app.Alert( "Error: " + msg);  
    console.log( "Error: " + msg );  
}  

//Alarmes

function setCalendar()
{
   layPicker = app.CreateLayout( "Linear", "Vcenter,FillXY" )
   layPicker.SetSize( 0.8,0.8 )
   layPicker.SetBackColor( "#1c1c1c" )
   uix = app.CreateUIExtras()
   picker= uix.CreateDatePicker()
   let d = new Date()
   let y = d.getFullYear()
   let m = d.getMonth()
   let day = d.getDate()
   picker.SetMinDate(y,m,day)
   picker.SetOnDateChanged(dateChange)
   
   layPicker.AddChild(  picker)
   
   timePicker = uix.CreateTimePicker(null,null,"24Hour")
   timePicker.SetOnTimeChanged(timeChanched)
   layPicker.AddChild( timePicker )
   
   layHPicker=app.CreateLayout("Linear","Horizontal")
   layPicker.AddChild(layHPicker)
   
   btnClosePicker=app.CreateButton("Cancelar",0.31,null)
   btnClosePicker.SetOnTouch(btnClosePicker_OnTouch)
   layHPicker.AddChild(btnClosePicker)
   
   btnGetDateTime=app.CreateButton("Definir",0.31,null)
   btnGetDateTime.SetOnTouch(btnGetDateTime_OnTouch)
   layHPicker.AddChild(btnGetDateTime)
   
   dlgPicker = app.CreateDialog( "Selecione data e hora","NoCancel" )
   dlgPicker.AddLayout( layPicker )
   dlgPicker.Show()
    
}

function btnClosePicker_OnTouch(){
    dlgPicker.Dismiss()
}

function dateChange(year, mon, day)
{
	  data =  new Date(year,mon,day).getTime()
}

function timeChanched(h,m){
    hora=h
    minuto=m    
}


function btnGetDateTime_OnTouch(){
   let d = new Date()
   let newDate = 0
   if(data != 0 && hora != 0){
        newDate = (new Date(data+hora*60*60*1000 +minuto*60*1000).getTime())
   }else if(data != 0 && hora==0){  
        newDate=new Date(data + d.getHours()*60*60*1000+d.getMinutes()*60*1000).getTime()
   }else if(data == 0 && hora !=0){
       let dia = d.getDate()
       let mes= d.getMonth()
       let ano= d.getFullYear()
       newDate = (new Date(ano,mes,dia,hora, minuto).getTime())
   }else if(data==0 && hora==0){
        newDate=d.getTime()   
   } 
    
    db.ExecuteSql("UPDATE task_table SET  data_num=? WHERE data_num="+id, [newDate], Sucess,OnError)

    dlgPicker.Dismiss()
    DisplayAllRows()
    data = 0
    hora = 0
    
}

//Called when alarm is triggered.
//(Even if your app is closed)
function OnAlarm( id )
{
    app.ShowPopup( "Got Alarm: id = " + id )
    player.SeekTo( 0 )
	player.Play()
}

function Sucess()
{
	  app.ShowPopup( "Data definida com suscesso" )
}