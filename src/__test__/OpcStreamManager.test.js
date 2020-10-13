var net = require("net");

import { OpcStreamManager } from "../OpcStreamManager.js"

function createCloseableMockServer() {
    var server = net.createServer(function(socket) {
        this.sockets.add(socket);
        server.once('close', () => {
            this.sockets.delete(socket);
        });
    });
    server.sockets = new Set();

    server.listen(7890);

    const close = (callback) => {
        for (const socket of server.sockets) {
            socket.destroy();
            server.sockets.delete(socket);
        }
        server.close(callback);
    };

    return close;
}


it('should not open a socket or stream until asked', () => {
    var objectUnderTest = new OpcStreamManager(7890, 'localhost');

    expect(objectUnderTest.socket).toBeNull();
    expect(objectUnderTest.stream).toBeNull();
});


it('should open a socket and stream when asked', () => {
    var closeServer = createCloseableMockServer();

    var objectUnderTest = new OpcStreamManager(7890, 'localhost');

    objectUnderTest.open();

    expect(objectUnderTest.socket).not.toBeNull();
    expect(objectUnderTest.stream).not.toBeNull();

    objectUnderTest.close();

    closeServer();
});


it('should close its socket and stream when asked', () => {
    var closeServer = createCloseableMockServer();

    var objectUnderTest = new OpcStreamManager(7890, 'localhost');

    objectUnderTest.open();
    objectUnderTest.close();

    expect(objectUnderTest.socket).toBeNull();
    expect(objectUnderTest.stream).toBeNull();

    closeServer();
});
