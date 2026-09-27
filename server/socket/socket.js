let io;

const initializeSocket =
(server)=>{

  const socketIo =
  require("socket.io");

  io = socketIo(server,{
    cors:{
      origin:"*"
    }
  });

  io.on(
    "connection",
    (socket)=>{
      console.log(
       "User Connected"
      );
    }
  );

  return io;
};

const getIO = ()=>io;

module.exports = {
  initializeSocket,
  getIO
};