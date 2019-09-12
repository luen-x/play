<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button>button</el-button>
    <el-input v-model="input" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: ""
    };
  }
};
</script>
