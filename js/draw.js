function palette(cobj,canvas,copy){
  this.o=cobj;
  this.canvas=canvas;
  this.copy=copy;
  this.width=canvas.width;
  this.height=canvas.height;
  //线条宽度、填充颜色、描边颜色、绘制类型
  this.lineWidth=1;
  this.strokeStyle="#000";
  this.fillStyle="#000";
  this.polyNum=5;
  this.angNum=5;
  this.style='stroke';
  this.type="pencil";
  this.history=[];
}
palette.prototype.reset=function(){
  this.o.fillStyle=this.fillStyle;
  this.o.strokeStyle=this.strokeStyle;
  this.o.lineWidth=this.lineWidth;
}
palette.prototype.draw=function(){
  var that=this;
  this.copy.onmousedown=function(e){
    var dx=e.offsetX;
    var dy=e.offsetY;
    that.copy.onmousemove=function(e){
      var mx=e.offsetX;   that.reset();

      var my=e.offsetY;
      that.o.clearRect(0,0,that.width,that.height);
      if(that.history.length>0){
        that.o.putImageData(that.history[that.history.length-1],0,0,0,0,that.width,that.height);
      }     
      //this.type line 选择执行那个方法 是画线条还是画方
      that[that.type](dx,dy,mx,my);
    }
    document.onmouseup=function(){
      that.copy.onmousemove=null;
      document.onmouseup=null;
      that.history.push(that.o.getImageData(0,0,that.width,that.height));
    }
  }
}
//画直线
palette.prototype.line=function(x1,y1,x2,y2){
  this.o.beginPath();
  this.o.lineTo(x1,y1);
  this.o.lineTo(x2,y2);
  this.o.stroke();
  this.o.closePath();
}
//画方
palette.prototype.rect=function(x1,y1,x2,y2){
  var w=x2-x1;
  var h=y2-y1;
  this.o.beginPath();
  this.o.rect(x1+0.5,y1+0.5,w,h);
  this.o.closePath();
  // this[this.style];
  this.o[this.style](); 
  // this.o.stroke();
  this.o.fill();
  
}
//画圆
palette.prototype.arc=function(x1,y1,x2,y2){
  var r=this._r(x1,y1,x2,y2);
  // var r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
  this.o.beginPath();
  this.o.arc(x1,y1,r,0,2*Math.PI,false);
  this.o.closePath();
  // this.o.stroke();
   this.o[this.style]();  
}
//随便画
palette.prototype.pencil=function(x1,y1,x2,y2){
  var that=this;
  this.copy.onmousedown=function(e){
    var dx=e.offsetX;
    var dy=e.offsetY;
    that.reset();
    that.o.beginPath();
    that.copy.onmousemove=function(e){
      var mx=e.offsetX;
      var my=e.offsetY;
      that.o.lineTo(mx,my);
      that.o.stroke();
    }
    document.onmouseup=function(){
      that.o.closePath();
      that.copy.onmousemove=null;
      document.onmouseup=null;
      that.history.push(that.o.getImageData(0,0,that.width,that.height));
    }
  } 
}
//多边形
palette.prototype.poly=function(x1,y1,x2,y2){
  var r=this._r(x1,y1,x2,y2);
  var len=this.polyNum;
  var ag=360/len;
  this.o.beginPath();
  for(var i=0;i<len;i++){
    this.o.lineTo(x1+Math.cos(i*ag*Math.PI/180)*r,y1+Math.sin(i*ag*Math.PI/180)*r);
  }
  this.o.closePath();
  this.o[this.style](); 
}
//多角形
palette.prototype.polygon=function(x1,y1,x2,y2){
  var r=this._r(x1,y1,x2,y2);
  var r1=r/2.5;
  var len=this.angNum;
  var ag=360/(len*2);
  this.o.beginPath();
  for(var i=0;i<len*2;i++){
    if(i%2==0){
      this.o.lineTo(x1+Math.cos(i*ag*Math.PI/180)*r,y1+Math.sin(i*ag*Math.PI/180)*r);
    }else{
      this.o.lineTo(x1+Math.cos(i*ag*Math.PI/180)*r1,y1+Math.sin(i*ag*Math.PI/180)*r1);
    }
    
  }
  this.o.closePath();
  this.o[this.style]();   
}
palette.prototype._r=function(x1,y1,x2,y2){
  return Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
  // this.o.beginPath();
  // this.o.arc(x1,y1,r,0,2*Math.PI,false);
  // this.o.closePath();
  // this.o.stroke(); 
}