<!DOCTYPE HTML>
<html>
    <body>
        <div>
            <button id="btn">click</button>
        </div>
    </body>
</html>

事件触发分为以下三个阶段：
1：事件捕获
  document -> body -> div -> button
2：目标阶段
3：事件冒泡
  botton -> div -> body -> document

eg.
  const btn = document.getElementById('btn');//document.querySelector('#btn') || document.querySelectorAll('button')[0];
  btn.addEventListener('click',function(){},true);//par1:event type; par2:event listener; par3:是否在捕获阶段执行listener

一般事件的执行顺序： 事件的捕获阶段====>处于目标阶段====>事件的冒泡阶段====>事件的默认行为  （>=IE9,IE8事件触发只有目标阶段和事件冒泡）

DOM事件：
  DOM0级事件:eventType = fun();
    var btn = document.getElementById('btn');
    btn.onclick = function () {
      alert('click');
    }
  DOM2级事件注册：addEventListener/attachEvent(<=IE8)
    var btn = document.querySelector('#btn');
    btn.addEventListener('click',function(){},false);
    btn.attachEvent('onclick',function(){});
    
事件对象：
  触发DOM上的某个事件就会产生一个事件对象，event包含所有需要的参数，如鼠标点击的坐标，键盘按键的编码等
  
自定义事件：
  自定义鼠标事件
  自定义键盘事件
  自定义DOM事件
    var input=document.getElementById("inputText");
        EventUtil.addEventListener(input,"myevent",function(event){
            event=EventUtil.getEvent(event);
            alert(event.detail.message);   //访问detail中的信息
        });//注册时事件

        var  button=document.getElementById("button");
        button.onclick=function(){
            if(document.implementation.hasFeature("CustomEvents","3.0")){
                var event=document.createEvent("CustomEvent");//键盘事件：document.createEvent("KeyboardEvent");鼠标事件：document.createEvent("MouseEvent");
                event.initCustomEvent("myevent",true,false,{message:"helloworld"});//initKeyboardEvent || initMouseEvent
                input.dispatchEvent(event);
            } //通过button按钮触发事件
     }


  
  
  
  
  
  
  
  
  
  
  
