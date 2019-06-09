事件流：
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

应用：
    阻止事件传播：event.stopPropagation();
    阻止默认事件：event.preventDefault();
<!DOCTYPE html>
<html>
    <head>
        <title>event</title>
        <meta charset="utf-8">
    </head>
    <body>
        <div id="div" style="width:200px;height:200px;background:#ff0000;">
            <a href="http://www.baidu.com" id="btn">Button</a>
        </div>
    </body>
    <script>
        var divEle = document.getElementById('div');
        var btnEle = document.getElementById('btn');
        btnEle.addEventListener('click',function(e){
            e.preventDefault();
            e.stopPropagation();
            alert('this is btn')
        },false);
        divEle.addEventListener('click',function(){
            alert('this is div1')
        },false);
        divEle.addEventListener('click',function(){
            alert('this is div2')
        },true);
    </script>
</html>

事件循环：
    事件循环处理过程：
        从macrotask队列中(task queue)取一个宏任务执行, 执行完后, 取出所有的microtask执行
        重复回合
    macrotask(宏任务): script（整体代码）, setTimeout, setInterval, setImmediate, I/O, UI rendering等
    microtask(微任务): process.nextTick, Promises, Object.observe, MutationObserver等
const interval = setInterval(() => {
  console.log('setInterval')
}, 0)

setTimeout(() => {  
  console.log('setTimeout 1')
  Promise.resolve().then(() => {
    console.log('promise 3')
  }).then(() => {
    console.log('promise 4')
  }).then(() => {
    setTimeout(() => {
      console.log('setTimeout 2')
      Promise.resolve().then(() => {
        console.log('promise 5')
      }).then(() => {
        console.log('promise 6')
      }).then(() => {
          clearInterval(interval)
      })
    }, 0)
  })
}, 0)

Promise.resolve().then(() => {
  console.log('promise 1')
}).then(() => {
  console.log('promise 2')
})
  
  
  
  
  
  
  
  
  
  
  
