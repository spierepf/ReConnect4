const net = require('net');
var createOPCStream = require("opc");

class OpcStreamManager {
    constructor(port, host) {
        this.port = port;
        this.host = host;
        this.socket = null;
    }

    open() {
        if(this.socket == null) {
            this.socket = net.createConnection({ port:this.port, host:this.host });
        }
    }

    close() {
        this.socket.destroy();
        this.socket = null;
    }
}

export {
    OpcStreamManager
}
