<template>
  <div class="l-ball" :style="style"></div>
</template>
<script>
const KEY_CODE = {
  38: "top",
  40: "bottom",
  37: "left",
  39: "right"
};
export default {
  name: "oa-",
  props: {
    isMe: Boolean,
    pLeft: Number,
    pTop: Number,
    account: String
  },
  components: {},
  data() {
    return {
      left: this.pLeft || 0,
      top: this.pTop || 0,
      color: "red",
      leftPress: false,
      rightPress: false,
      topPress: false,
      bottomPress: false,
      timer: "",
      speed: 10,
      webSocket: undefined
    };
  },
  computed: {
    style() {
      return {
        left: this.left + "px",
        top: this.top + "px"
      };
    }
  },
  watch: {
    pLeft(val) {
      this.left = val;
    },
    pTop(val) {
      this.top = val;
    }
  },
  mounted() {
    document.body.addEventListener("keydown", this.handleKeyDown);
    document.body.addEventListener("keyup", this.handleKeyUp);
    this.startTimer();
    this.initWebSocket();
  },
  beforeDestroy() {
    document.body.removeEventListener("keydown", this.handleKeyDown);
    document.body.removeEventListener("keyup", this.handleKeyUp);
    clearInterval(this.timer);
  },

  methods: {
    handleKeyDown(event) {
      const action = KEY_CODE[event.keyCode];
      if (action) {
        this[action + "Press"] = true;
      }
      if (!this.timer) {
        this.startTimer();
      }
    },
    handleKeyUp(event) {
      const action = KEY_CODE[event.keyCode];
      if (action) {
        this[action + "Press"] = false;
      }
      if (
        !this.leftPress &&
        !this.rightPress &&
        !this.topPress &&
        !this.bottomPress
      ) {
        this.stopTimer();
      }
    },
    startTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = "";
      }
      this.handleMove();
      this.timer = setInterval(this.handleMove, 100);
    },
    handleMove() {
      let moved = false;
      if (this.leftPress && !this.rightPress) {
        this.left -= this.speed;
        moved = true;
      } else if (!this.leftPress && this.rightPress) {
        this.left += this.speed;
        moved = true;
      }
      if (this.topPress && !this.bottomPress) {
        this.top -= this.speed;
        moved = true;
      } else if (!this.topPress && this.bottomPress) {
        this.top += this.speed;
        moved = true;
      }
      if (moved) {
        this.sendPosition();
      }
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = "";
    },
    initWebSocket() {
      this.webSocket = new WebSocket("ws://localhost:8081");
      this.webSocket.onopen = () => {
        console.log("connected");
      };
      this.webSocket.onmessage = message => {
        console.log("get message ", message.currentTarget.data);

        //  const data = JSON.parse(message.currentTarget.data);
      };
      this.webSocket.onclose = () => {
        console.log("close");
      };
    },
    sendPosition() {
      this.webSocket.send(
        JSON.stringify({
          event: 1,
          account: "17826859459",
          left: this.left,
          top: this.top
        })
      );
    }
  }
};
</script>
<style lang="scss">
.l-ball {
  display: block;
  width: 30px;
  height: 30px;
  position: absolute;
  transition: all 0.1s linear;
  background-color: lightcoral;
  border-radius: 15px;
  border: 1px solid crimson;
}
</style>
