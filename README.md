# Sample Socket.IO with Express
- Demonstrate [socket.io](https://socket.io/) with [express](https://expressjs.com/)
- Only Broadcast and Room features as example

## Client page
- Open browser with `http://localhost:3000`
- Enter `roomId` and click Join room button to join the specific socket.io room (default input as `room1`)

## Emit from server
- Broadcast message to all clients
```
curl -v 'http://localhost:3000/hello'
```
- Broadcast message to all clients in the specific room e.g. `room1`
```
curl -v 'http://localhost:3000/form/update/room1?value=1234'
```

## Notes
- Use `app.set` to enable socketio reference to modules:
```
// server.js
app.set("socketio", io);

// modules file e.g. express.router
const io = req.app.get("socketio");
```
- Use `jQuery` from CDN for easier debugging
