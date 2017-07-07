  //圖層顯示，1=bNodes;2=bNodes+sNodes;3=sNodes
  $('.sNodes').hide();
  $('#chaL').on('click', function(){
    var mapL = parseInt($(this).val());
    mapL++;
    if( mapL>3  ) mapL=1;
    chaMapL(mapL);
  } );
  function chaMapL(mapL){
    //console.log(mapL);
    $('#chaL').val(mapL);
    switch( mapL ){
      case 1:
        $('.sNodes').hide();
        $('.bNodes').show();
        $('#lv1').show();
        $('#lv3').hide();
      break;
      case 2:
        $('.sNodes').show();
        $('.bNodes').show();
        $('#lv1').hide();
        $('#lv3').hide();
      break;
      case 3:
        $('.sNodes').show();
        $('.bNodes').hide();
        $('#lv1').hide();
        $('#lv3').show();
      break;
    }
  }
  //先定義開圖的位置與大小
  let sW = $(document).width();
  let sH = $(document).height();
  //因為d3.js的translate(0,0)跟x=0,y=0不太一樣，有偏移
  let oX = parseInt(130);
  let oY = parseInt(125);
  $('svg>g').attr({
    'transform':'translate(0,0)scale(0.5)',
  });
  //svg拖曳
  var x,y,s;
  var svg = d3.select('body').attr('width', "100%").attr('height', "100%");
  var container = svg.select("svg").select('g');
  var zoom = d3.behavior
               .zoom()
               .translate([0, 0])
               .scale(0.5)
               .on("zoom", zoomed);
  svg.call(zoom);
  function zoomed() {
    if ($("svg > g").css("transform")) {
        $("svg > g").css("transform", "");
        $("svg > g").removeAttr('style');
    }
    var transAttr = $("svg > g").attr("transform");
    container.attr("transform",
        "translate(" + zoom.translate() + ")" +
        "scale(" + zoom.scale() + ")"
    );
  }
  //svg放大縮小
  d3.selectAll('.zoom').on('click', zoomClick);
  var clickNum = parseInt(0);
  function zoomClick(){
    var transAttr = $("svg > g").attr("transform").replace( 'translate(','' ).split(')');
    var translate = transAttr[0].split(',');
    var scale = parseFloat(transAttr[1].replace( 'scale(','' ));

    if( $(this).attr('id')==='zoom_in' ){
      //alert('hi');
      console.log( [translate,scale] );
      zoom.translate( [ translate[0], translate[1] ] );
      zoom.scale( scale );
      console.log( [translate,scale] );
      scale=scale+parseFloat(0.1);
    }else{
      if( scale<=0.4 ) return true;
      scale=scale-parseFloat(0.1);
    }

    zoom.scale( scale );
    //zoom.translate( translate[0], translate[1] );
    container.attr("transform", "translate(" +translate.join(',')+ ") scale(" + scale + ")");
  }
  //點擊選單
  $('body').on('click touchsstart',function(e){
    //console.log( e.target.id );
    if( (e.target.id==='svg1' || e.target.id==='chaL' || e.target.id==='zoom_in' || e.target.id==='zoom_out' || e.target.id==='') && $('.Menus_group').css('display')==='block' )
      $('.Menus_group').hide();
  });
  $('[id^=g_]').on( 'click mouseover mouseout touch', function(e){

    if( e.type === 'click' || e.type==='touch' ){

      var menusShow = $('.Menus_group').css('display');
      var oldClickNodes = $('.Menus_group').attr('oldClickNodes');
      var indicator = $(this).attr('id').split('_');
      //console.log(map_sn);
      //點擊小節點後出現的選單，點到大節點就跳出
      if( indicator[1].split('-').length==3 && (map_sn==3 || map_sn==5 || map_sn==10) ) return true;
      if( indicator[1].split('-').length==2 && map_sn==4 ) return true;
      //if( menusShow === 'none'  ) $('.Menus_group').show();
      if( menusShow === 'block' && oldClickNodes===$(this).attr('id') )  $('.Menus_group').hide();
      var chaX = parseFloat(e.pageX)+parseInt(0);
      var chaY = parseFloat(e.pageY)+parseInt(15);
      //console.log(indicator[1]);

      showMenusGroup( chaX, chaY, indicator[1] );
    }else if( e.type === 'mouseover' || e.type==='touch' ){
      var chaX = parseFloat(e.pageX)+parseInt(5);
      var chaY = parseFloat(e.pageY)-parseInt(25);
      var gId = $(this).attr('id');
      $('#tooltip-content').show()
                           .css("transform", "translate(" + chaX + "px," + chaY + "px)");
      $('[id^=start_]').each( function(){
        var iId = $(this).attr('id').split('_');
        var startStatus = parseInt($('#'+gId).attr( iId[1] ));
        var chaImage = 's_02.png';
        if( startStatus == 1 ) var chaImage = 'star_01.png';
        $(this).attr('src','images/'+chaImage)
               .css('width','20px')
               .css('background-size','cover');
      } );
    }else if( e.type === 'mouseout' ){
      $('#tooltip-content').hide();
    }

  } );
  function showMenusGroup( chaX, chaY, indicator){
    //console.log( [chaX, chaY, indicator] );
    //從資料庫撈相關影片、試題是否存在

    //處理indicator有 4-s-04[4-n-06] 類似的情況
    var strChk = indicator.indexOf('[');
    if( strChk>-1 ) indicator = indicator.substr( 0, strChk );
    //console.log( [map_sn,indicator] );
    if( typeof(map_sn)==='undefined' ) $('body').html('<font size="21px" color="white">the url no map_sn, Please View Coding. thx.</font>');
    $.ajax({
      url: "php_PDO/menusChk.php",
      method: "POST",
      data: { map_sn:map_sn ,searchNodes: indicator },
      dataType:'json',
      success:function(msg){

        //console.log([ msg,indicator]);
        if( !msg ) $('.Menus_group').hide();
        else $('.Menus_group').show();
        for( var key in msg ){
          //console.log( msg );
          if( !msg[key] ) $('#'+key).hide();
          else $('#'+key).show();
          switch( key ){
            case 'media_edu':
              $('#media_edu').attr( 'indicator', indicator )
                             .off('click')
                             .on( 'click', function(){
                                //console.log([msg,indicator]);
                                window.open( "../../../modules.php?op=modload&name=assignMission&file=ks_viewskill&ind=" +indicator+ "&mid="+ msg['mapping_sn'] +"#parentHorizontalTab1", "_blank");
                              } );
            break;
            case 'practice':
              $('#practice').attr( 'indicator', indicator )
                            .off('click')
                            .on( 'click', function(){
                                window.open( "../../../modules.php?op=modload&name=assignMission&file=ks_viewskill&ind=" +indicator+ "&mid="+ msg['mapping_sn'] +"#parentHorizontalTab2", "_blank");
                              } );
            break;
            case 'commponent':
            
              $('#commponent').attr('indicator', indicator)
                .off('click')
                .on('click', function () {
                  let indicatorSplit = indicator.split('-S');
                  let url = '../../New_CR/' +indicatorSplit[0]+'/'+ indicatorSplit[0] + "_component_1.html?auto=1"
                  // window.open("../../../modules.php?op=modload&name=assignMission&file=ks_viewskill&ind=" + indicator + "&mid=" + msg['mapping_sn'] + "#parentHorizontalTab2", "_blank");
                  window.open(url,'','width= 1280, height = 768')
                });
            break;
            case 'CR':
              $('#'+key).hide();
            break;
            case 'DA':
              $('#DA').attr( 'indicator', indicator )
                             .off('click')
                             .on( 'click', function(){
                                //console.log([msg,indicator]);
                                window.open( "../../../modules.php?op=modload&name=DynamicAdaptiveTest&file=DA&map_sn="+map_sn+"&id="+indicator, "_blank");
                              } );
              //$('#'+key).hide();
            break;

          }



        }
      },
      error:function( xhr, ajaxOptions, thrownError ){ console.log( thrownError ); }
    });

    $('.Menus_group').css("transform", "translate(" + chaX + "px," + chaY + "px)")
                     .attr('oldClickNodes', 'g_'+indicator );
  }
  //節點狀態顯示
  $("svg circle").tipsy({
    gravity: 'e',
    html: true,
    title: function () {
        var id = $(this).attr("id");
        var indicate_text = $("text[id=" + id + "]").attr("text");
        return indicate_text;
    }
  });
  //針對節點狀態換圖
  $( function(){
    var elemExsit; //PVC 0308 add
    for( var key in stuNodesStatus ){
      elemExsit = document.getElementById("g_"+key); //PVC 0308 add
      if(elemExsit != null){
        $('#g_' + key).attr({
          'DA': stuNodesStatus[key]['DA:'],
          'RC': stuNodesStatus[key]['RC:'],
          'practice': stuNodesStatus[key]['practice:'],
          'media': stuNodesStatus[key]['media_edu:'], //20170406_teresa add for video status
          'status': stuNodesStatus[key]['status:'],
        });
      }
    
      if( key.split('-').length==4 ){
        //小節點
        var chaImage = 's_no_exam.png';
        if( stuNodesStatus[key]['status:'] == 0 ) chaImage = 's_remedy.png';
        if( stuNodesStatus[key]['status:'] == 1 ) chaImage = 's_pass.png';
      }else{
        //大節點
        var chaImage = 'b_no_exam.png';
        if( stuNodesStatus[key]['status:'] == 0 ) chaImage = 'b_remedy.png';
        if( stuNodesStatus[key]['status:'] == 1 ) chaImage = 'b_pass.png';
      }
      //PVC 0308 add
      if (elemExsit != null) {

        $('#g_'+key+' pattern').attr('id','pa_'+key);
        $('#g_'+key+' image').attr('xlink:href','images/'+chaImage);
        $('#g_'+key+' circle').attr( 'fill', 'url(#pa_'+key+')' );
      }
    }
  //teresa 20170411 add
    for( var key in stuNodesStatus2 ){
    	elemExsit = document.getElementById("g_"+key); 
        if(elemExsit != null){
          $('#g_' + key).attr({
            'status': stuNodesStatus2[key]['bstatus:'],
            'pass': stuNodesStatus2[key]['status:']
          });
        }; 
        if( key.split('-').length!=4 ){
	        //大節點
	        var chaImage = 'b_no_exam.png';
	        if( stuNodesStatus2[key]['bstatus:'] == 0 ) chaImage = 'b_remedy.png';
	        if( stuNodesStatus2[key]['bstatus:'] == 1 ) chaImage = 'b_pass.png';
	        if( stuNodesStatus2[key]['status:'] == 0 )  chaImage = 'b_remedy.png';
	   }
       if (elemExsit != null) {
	        $('#g_'+key+' pattern').attr('id','pa_'+key);
            $('#g_'+key+' image').attr('xlink:href','images/'+chaImage);
            $('#g_'+key+' circle').attr( 'fill', 'url(#pa_'+key+')' );
       }
    }
  } );
  //有$_GET[find_nodes]值時
  function showHideNodes( nodesAry ){
    $('circle').css('opacity', '0.3');
    $('line').css('opacity', '0.3');
    $('text').css('opacity', '0.3');
    var firstNodes;

    //將小節點改變成大節點
    var bNodesAry=[];
    for( var key in nodesAry ){
      if( typeof( nodesAry[key] )==='undefined' ) return;
      if( map_sn==3 || map_sn==5 || map_sn==10)
        bNodesAry[key] = nodesAry[key].split('-',3).join('-');
      else if( map_sn==4 )
        bNodesAry[key] = nodesAry[key].split('-',2).join('-');
    }

    for( var key in nodesAry ){
      //if( typeof(nodesAry[key])==='undefined' ) continue;
      if( $('g[id*='+nodesAry[key]+']').length==0 ) continue;
      if( firstNodes==null ) firstNodes = nodesAry[key];

      //不管大小節點，都要亮，所以用大節點的 indicator 去處理
      $('circle[indicator*='+bNodesAry[key]+']').css('opacity', '1')
                                                .nextAll().css('opacity', '1');
      //大節點亮，小節點內部的線都要亮
      $('line[nodes_relation*="'+bNodesAry[key]+'"][class=sNodes]').css('opacity', '1');

      //偵測線的狀態
      $('line[nodes_relation*="'+bNodesAry[key]+'"]').each( function(){
        var nrId = $(this).attr('nodes_relation').split(',');
        //console.log( nrId );
        if( nrId.length>2 )
          return; //console.log( [ $(this).attr('nodes_relation'), $(this).attr('id') ] );
        if( $.inArray( nrId[0], bNodesAry )!=-1 && $.inArray( nrId[1], bNodesAry )!=-1 ){
          //大節點的線
          $('line[nodes_relation="'+nrId.join(',')+'"]').css('opacity', '1');
        }
      } );
    }


    //console.log( typeof(firstNodes) );
    if( typeof(firstNodes)==='undefined' ){
      $('circle').css('opacity', '1');
      $('line').css('opacity', '1');
      $('text').css('opacity', '1');
    }
    searchNodes( firstNodes );
  }

  //延後執行
$(document).ready( function(){
  //有$_GET[grade]值時
  var nearONodes = $('[id^=g_]').first().attr('id').replace('g_','');;
  searchNodes(nearONodes);
  //抓取各能力指標，為了搜尋用
  var allNodes = [];
  $('[id^=g_]').each( function(){
    var searchId = $(this).attr('id').split('_');
    var idName = $(this).children('text').attr('text');
    allNodes.push( '('+searchId[1]+')'+idName );
  } );
  $( "#search.typeahead" ).autocomplete({
    source: allNodes
  });
  $('#go_search').on( 'click', function(e){
    //$('circle').css('opacity', '1');
    //$('line').css('opacity', '1');
    //$('text').css('opacity', '1');
    //節點座標
    if( $('#search').val().length ==0 ) return alert('請輸入名稱');
    var searchId = $('#search').val().replace( '(','' ).split(')');

    searchNodes(searchId[0]);
  } );
} );


  function searchNodes(searchId){
    //console.log( searchId );
    //避免有找不到節點的情況
    if( $('[id*="g_'+searchId+'"]').length==0 ) return console.log( [searchId, 'no nodes.'] );
    //避免id = 3-n-17-S01[3-s-04-S01] 有中括號的情況
    var nodesTransform = $('[id*="g_'+searchId+'"]').attr('transform').replace( 'translate(','' ).split(')');
    var nodesTranslate = nodesTransform[0].split(',');
    //svg座標
    var transAttr = $("svg > g").attr("transform").replace( 'translate(','' ).split(')');
    var translate = transAttr[0].split(',');
    var scale = parseFloat(transAttr[1].replace( 'scale(','' ));

    //數學科─偵測是搜尋大節點或小節點
    //console.log( map_sn );
    if( (map_sn==2 || map_sn==1 || map_sn==3) && searchId.split('-').length==3 ) chaMapL(1);
    if( (map_sn==2 || map_sn==1 || map_sn==3) && searchId.split('-').length==4 ) chaMapL(3);

    //自然科─偵測是搜尋大節點或小節點
    if( map_sn==4 && searchId.split('-').length==2 ) chaMapL(1);
    if( map_sn==4 && searchId.split('-').length==3 ) chaMapL(3);

    //國語科─偵測是搜尋大節點或小節點
    if( (map_sn==5 || map_sn==10) && searchId.split('-').length==3 ) chaMapL(1);
    if( (map_sn==5 || map_sn==10) && searchId.split('-').length==5 ) chaMapL(3);

    //座標換算，(原點-節點translat)*scale  sW,sH,oX,oY再前面有定義
    var chaX = (oX-nodesTranslate[0])*scale+(sW/2);
    var chaY = (oY-nodesTranslate[1])*scale+(sH/2);

    zoom.translate( [ chaX, chaY ] );
    zoom.scale( scale );

    container.attr("transform", "translate(" +chaX+","+chaY+ ") scale(" + scale + ")");

    //如果是大節點就不要顯示選單
    if( searchId.split('-').length==3 && (map_sn==3 || map_sn==5 || map_sn==10) ) return true;
    if( searchId.split('-').length==2 && map_sn==4 ) return true;
    //$('.Menus_group').show();
    showMenusGroup( (110*scale+sW/2), (160*scale+sH/2), searchId );
  }
