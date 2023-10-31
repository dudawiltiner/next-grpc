var grpc = require("grpc");
var pingPongProto = grpc.load("./src/proto/pingpong.proto");
let server = new grpc.Server();

server.addService(pingPongProto.pingpong.PingPongService.service, {
  pingPong: function (call, callback) {
    console.log("Request");
    return callback(null, { pong: "Pong" });
  },
});

server.bind("localhost:9090", grpc.ServerCredentials.createInsecure());
server.start();
