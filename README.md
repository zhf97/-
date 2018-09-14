# 火花花分拣系统
2016级创新实验课 第二组 张翰飞，王佳伟，于子斌   
<table>
    <tr>
        <td>文件夹</td>
        <td>简介</td>
        <td>开发环境</td>
    </tr>
    <tr>
        <td>校外</td>
        <td>校内服务器做反向代理转发外网对模型的请求</td>
        <td>frpc</td>
    </tr>
     <tr>
        <td>校外</td>
        <td>微信小程序后台，提问日志，反向代理，socketIO服务器</td>
        <td>frps,PHP,MySQL,Flask+python3.6+SocketIO</td>
    </tr>
     <tr>
        <td>gpu</td>
        <td>模型的训练与实际预测后台，1个初级分类（模块，传感器），1个颜色分类（模块红黄蓝绿），1个次级分类（模块具体名称） 采用</td>
        <td>InciptionV4+tensorflow+slim+opencv</td>
    </tr>
     <tr>
        <td>arduino</td>
        <td>转盘电机控制模块，校准控制模块，急停控制模块</td>
        <td>Arduino C</td>
    </tr>
    <tr>
        <td>树莓派</td>
        <td>摄像头捕获数据，数据处理，逻辑控制，与arduino，tft屏幕串口通信</td>
        <td>python3.6+opencv+Rpi.GPIO</td>
    </tr>
    <tr>
        <td>HMI</td>
        <td>tft液晶屏程序，实现状态检测与急停功能</td>
        <td>HMI专有协议+Serial</td>
    </tr>    
    <tr>
        <td>小程序</td>
        <td>小程序</td>
        <td>微信小程序</td>
    </tr>    
</table>
