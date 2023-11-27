import 'dart:async';
import 'dart:isolate';
import 'package:flutter_project/utils/isolateRequest.dart';
import 'package:modbus_action_power/modbus_action_power.dart';
import 'Global.dart';

class IsolateCommunication {
  late Isolate _isolate;
  late ReceivePort _receivePort;
  late SendPort _sendPort;

  Map<int, Completer<ReturnEntity>> _completers = {}; // 用于存储每个请求的Completer
  int _currentId = 0; // 用于生成唯一的请求ID

  IsolateCommunication() {
    _initIsolate();
  }

  void _initIsolate() async {
    _receivePort = ReceivePort();
    _isolate = await Isolate.spawn(_subIsolate, _receivePort.sendPort); // 子isolate
    _receivePort.listen(_handleMessage); // 接收子isolate发送来的消息
    // _sendPort = await _receivePort.first;
  }

  void _handleMessage(dynamic message) {
    if (message is SendPort) {
      _sendPort = message;
    }
    if (message is Map && message.containsKey('id') && message.containsKey('result')) {
      int id = message['id'];
      if (_completers.containsKey(id)) {
        _completers[id]!.complete(ReturnEntity.fromJson(message['result']));
        _completers.remove(id);
      }
    }
  }

  Future<ReturnEntity> communicateWithIsolate(Request request) {
    int id = _currentId++;
    Completer<ReturnEntity> completer = Completer();
    _completers[id] = completer;

    _sendPort?.send({'id': id, 'request': request.toJson()});

    return completer.future;
  }

  @pragma('vm:entry-point')
  static void _subIsolate(SendPort sendPort) async {
    ReceivePort receivePort = ReceivePort();
    sendPort.send(receivePort.sendPort);

    String filePath = 'assets/modbus/ppmDCModbus.xlsx';
    String filePath485 = 'assets/modbus/DisplayControl.xlsx';
    var modbusPlugin = ModbusActionPower(filePath: filePath, filePath485: filePath485);
    await modbusPlugin.initDone();

    receivePort.listen((message) async {
      if (message is Map && message.containsKey('id') && message.containsKey('request')) {
        int id = message['id'];
        Request request = Request.fromJson(message['request']);
        late ReturnEntity result;
        var stopWatch = Stopwatch()..start();
        if (request.path == '/setregister') {
          result = await modbusPlugin.setData(
            startRegAddr: request.body['StartRegAddrOrName'],
            serializableDat: request.body['SerializableDat'],
            customTimeout: request.customTimeout,
          );
        } else if (request.path == '/getregister') {
          result = await modbusPlugin.getData(
            startRegAddr: request.body['StartRegAddrOrName'],
            dataCount: request.body['DataCount'],
            customTimeout: request.customTimeout,
          );
        } else if (request.path == '/get485register') {
          result = await modbusPlugin.getData485(
            startRegAddr: request.body['StartRegAddrOrName'],
            dataCount: request.body['DataCount'],
          );
        } else if (request.path == '/set485register') {
          result = await modbusPlugin.setData485(
            startRegAddr: request.body['StartRegAddrOrName'],
            serializableDat: request.body['SerializableDat'],
          );
        } else if (request.path == '/get2bData') {
          result = await modbusPlugin.get2bData(
            objectName: request.body['StartRegAddrOrName'],
          );
        }
        print('-----请求耗时：${stopWatch
          ..stop()
          ..elapsedMilliseconds}');
        sendPort.send({'id': id, 'result': result.toJson()});
      }
    });
  }

  void dispose() {
    if (_isolate != null) {
      _isolate.kill(priority: Isolate.immediate);
      // _isolate = null;
    }
    _receivePort?.close();
  }
}
