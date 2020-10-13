var net = require("net");

import { OpcStreamManager } from "../OpcStreamManager.js"

it('should not open a socket until asked' , () => {
    var objectUnderTest = new OpcStreamManager(7890, 'raspberrypi.local');

    expect(objectUnderTest.socket).toBeNull();
});


it('should open a socket when asked' , () => {
    const sockets = new Set();
    var server = net.createServer(function(socket) {
        sockets.add(socket);
        server.once('close', () => {
            sockets.delete(socket);
        });
    });
    server.listen(7890);
    const close = (callback) => {
        for (const socket of sockets) {
            socket.destroy();
            sockets.delete(socket);
        }
        server.close(callback);
    };

    var objectUnderTest = new OpcStreamManager(7890, 'localhost');

    objectUnderTest.open();

    expect(objectUnderTest.socket).not.toBeNull();

    objectUnderTest.close();

    close();
});


it('should close its socket when asked' , () => {
    const sockets = new Set();
    var server = net.createServer(function(socket) {
        sockets.add(socket);
        server.once('close', () => {
            sockets.delete(socket);
        });
    });
    server.listen(7890);
    const close = (callback) => {
        for (const socket of sockets) {
            socket.destroy();
            sockets.delete(socket);
        }
        server.close(callback);
    };

    var objectUnderTest = new OpcStreamManager(7890, 'localhost');

    objectUnderTest.open();
    objectUnderTest.close();

    expect(objectUnderTest.socket).toBeNull();

    close();
});
