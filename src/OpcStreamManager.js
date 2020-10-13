const net = require('net');
var createOPCStream = require("opc");

class OpcStreamManager {
    constructor(port, host) {
        this.port = port;
        this.host = host;
        this.socket = null;
        this.stream = null;
    }

    open() {
        if(this.socket == null) {
            this.socket = net.createConnection({ port:this.port, host:this.host });
            this.stream = createOPCStream();
            this.stream.pipe(this.socket);
        }
    }

    close() {
        this.socket.destroy();
        this.socket = null;
        this.stream = null;
    }
}

export {
    OpcStreamManager
}
