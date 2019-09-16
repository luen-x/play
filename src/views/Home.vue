<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
export default {
  name: "home",
  components: {},
  mounted() {
    this.$request({
      url: "_HELLO",
      type: "GET",
      param: {},
      loading: false
    })
      .then(res => {
        console.log(res);
      })
      .catch(() => {
        //  this.$Message.error(res.msg);
      });

    //this.$request(");
  }
};
</script>
