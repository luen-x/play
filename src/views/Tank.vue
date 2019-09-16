<template>
  <div>
    <l-tank :is-me="true" />
  </div>
</template>
<script>
import tank from "../components/tank/tank";
export default {
  name: "oa-",
  components: {
    "l-tank": tank
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss"></style>
