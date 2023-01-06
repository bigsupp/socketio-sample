const express = require("express");
const router = express.Router();

router.get("/update/:roomId", (req, res) => {
  const io = req.app.get("socketio");
  const json = {
    value: req.query.value,
  };
  const { roomId } = req.params;
  io.to(roomId).emit("formUpdate", json, () => {
    console.log(`server emit to room=${roomId}; json:`, json);
    res.send("sent");
  });
});

module.exports = router;
