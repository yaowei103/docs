1, HTTP协议简介（超文本传输协议）
    browser <-> webServer通信的协议就是HTTP协议，是TCP/IP协议的一个子集；
    TCP/IP协议：
      http协议是构建在tcp/ip协议上的，由（应用层http、传输层tcp、网络层ip、链路层）四层协议组成的一个系统；
      应用层：
        应用层一般是我们编写的应用程序，应用层可以通过系统调用与传输层通信；FTP文件传输协议、DNS域名系统、HTTP超文本传输协议；
      传输层：
        传输层是通过系统调用想应用层提供处于网络连接中的两台计算机之前的数据传输功能。在传输层有两个性质不同的协议：TCP传输控制协议、
        UDP用户数据报协议；
      网络层：
        网络层用来处理在网络上流动的数据包，数据包是网络传输的最小数据单位。该层规定了通过怎样的路径到达对方计算机，并把数据包传输给对方；
      链路层：
        链路层用来处理链接网络的硬件部分，包括控制操作系统、硬件设备驱动、网络适配器以及光纤等物理可见部分。链路层的作用范围在硬件；
   
   <img src="https://img-blog.csdn.net/20180717210041222?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2FsaXVqaXVqaWFuZw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70">
   发送数据的时候，数据会从上层网下层一次传递，每经过一层都会添加相应的头信息，接收端接受数据的时候，数据是从下层往上层传递，每经过一层都会删除相应的头信息；
   
   TCP的三次握手：
      第一次握手：客户端发送带有SYN标志的连接请求报文段，然后进入SYN_SEND状态，等待服务端的确认。
      第二次握手：服务端接收到客户端的SYN报文段后，需要发送ACK信息对这个SYN报文段进行确认。同时，还要发送自己的SYN请求信息。
        服务端会将上述的信息放到一个报文段（SYN+ACK报文段）中，一并发送给客户端，此时服务端将会进入SYN_RECV状态。
      第三次握手：客户端接收到服务端的SYN+ACK报文段后，会向服务端发送ACK确认报文段，这个报文段发送完毕后，
        客户端和服务端都进入ESTABLISHED状态，完成TCP三次握手。
   当三次握手完成后，TCP协议会为连接双方维持连接状态。为了保证数据传输成功，接收端在接收到数据包后必须发送ACK报文作为确认。
   如果在指定的时间内（这个时间称为重新发送超时时间），发送端没有接收到接收端的ACK报文，那么就会重发超时的数据。
   
   
   
   路由器，header，攻击
