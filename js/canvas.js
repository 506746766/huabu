$(function(){
    //创建copy
    var can,cobj,palt;
    var copy=$(".copy");
    $(".new").click(function(){
            
        var w=prompt('请输入画板宽度(像素):');
        var h=prompt('请输入画板高度(像素):');
        /*var w=prompt()*/
        can=$("<canvas id='can' width="+w+" height="+h+"></canvas>")[0];
        $(".palette")[0].innerHTML="";
        copy=$('<div class="copy"></div>');
        $(copy).appendTo(".palette");
        $(can).prependTo(".palette");
        copy.css({width:w,height:h});
        cobj=can.getContext("2d");
        palt=new palette(cobj,can,$(copy)[0]);
        palt.draw();
        draw();
        palt.pencil(); 
        $("nav").animate({"height": "0"}, 1000); 
    })
    function draw(){

        $("#rect").click(function(e){
            e.preventDefault();
            //alert(1);
            palt.type=this.id;
            palt.draw();
        })
        $("#arc").click(function(e){
            e.preventDefault();
            palt.type=this.id;
            palt.draw();
        })
        $("#line").click(function(e){
            e.preventDefault();
            palt.type=this.id;
            palt.draw();
        })
        $("#pencil").click(function(e){
            e.preventDefault();
            palt.type=this.id;
            palt.pencil();
        })
        $("#poly").click(function(e){
            e.preventDefault();
            palt.type='poly';
            palt.polyNum=prompt('请输入多边形边数');
            palt.draw();
        })
        $("#polygon").click(function(e){
            e.preventDefault();
            palt.type='polygon';
            palt.angNum=prompt('请输入多角形角数');
            palt.draw();
        })
        $("#lineWidth").change(function(e){
            palt.lineWidth=this.value;
        })
        $("#strokeStyle").change(function(e){
            palt.strokeStyle=this.value;
        })
        $("#fillStyle").change(function(e){
            palt.fillStyle=this.value;
        })
        $("#fill").click(function(e){
            e.preventDefault();
            palt.style='fill';
        })
        $("#stroke").click(function(e){
            e.preventDefault();
            palt.style='stroke';
        })
        $(".chexiao").click(function(e){
            e.preventDefault();
            palt.history.pop();
            if(palt.history.length>0){
            // cobj.o.putImageData(palt.history[palt.history.length-1],0,0,0,0,palt.width,palt.height);
            palt.o.putImageData(palt.history[palt.history.length-1],0,0,0,0,palt.width,palt.height);
        }else{
            palt.o.clearRect(0,0,palt.width,palt.height);
            alert("画板已清除干净,请重新绘图");
        }   
        })
        $(".save").click(function(e){
            e.preventDefault();
            location.href=can.toDataURL("image/png").replace("image/png","image/octet-stream");
        })
        $("#removeALL").click(function(e){
            e.preventDefault();
            cobj.clearRect(0,0,palt.width,palt.height);
            return;
        })
    }
})
