const socketService = {
  socket: undefined,
  eventStore: {},
  initWebSocket() {
    this.webSocket = new WebSocket("ws://localhost:8081");
    this.webSocket.onopen = () => {
      console.log("connected");
    };
    this.webSocket.onmessage = message => {
      console.log("get message ", message.currentTarget.data);

      const data = JSON.parse(message.currentTarget.data);
    };
    this.webSocket.onclose = () => {
      console.log("close");
    };
  },
  on(event, handler) {
    if (!this.eventStore[event]) {
      this.eventStore[event] = [];
    }
    this.eventStore[event].push(handler);
  }
};
