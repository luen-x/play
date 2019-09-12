<template>
  <div id="app">
    <div class="g-tc">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>|
      <router-link to="/code-mirror">CodeMirror</router-link>|
      <router-link to="/ball">Ball</router-link>
    </div>
    <router-view />
  </div>
</template>
<style lang="scss">
.g-m-l-5 {
  margin-left: 5px;
}
.g-m-l-10 {
  margin-left: 10px;
}
.g-m-l-15 {
  margin-left: 15px;
}
.g-m-l-20 {
  margin-left: 20px;
}
.g-m-r-5 {
  margin-right: 5px;
}
.g-m-r-10 {
  margin-right: 10px;
}
.g-m-r-15 {
  margin-right: 15px;
}
.g-m-r-20 {
  margin-right: 20px;
}
.g-relative {
  position: relative;
}
.g-flex {
  display: flex;
}
.g-c-red-mid {
  color: #e84c57;
}
.g-bg-red-mid {
  background-color: #e84c57;
}
.g-tc {
  text-align: center;
}
.g-mask {
  position: fixed;
  height: 100%;
  width: 100%;
  pointer-events: none;
  top: 0;
}
.g-pointer {
  cursor: pointer;
}
.g-blue {
  color: dodgerblue !important;
}
.g-operation {
  cursor: pointer;
  color: dodgerblue;
}
.g-fs-12 {
  font-size: 12px;
}
.g-fs-14 {
  font-size: 14px;
}
.g-fs-16 {
  font-size: 16px;
}
.g-fs-18 {
  font-size: 18px;
}
.g-rotate-180 {
  transform: rotate(180deg);
}
.g-transition {
  transition: all 0.2s ease-in-out;
}
.transition-drop-enter,
.transition-drop-leave-to {
  opacity: 0;
  transform: scaleY(0.8);
}
.transition-drop-enter-active,
.transition-drop-leave-active {
  transition: all 0.5s;
  transform-origin: center top;
}
.transition-drop-enter-to,
.transition-drop-leave {
  opacity: 1;
  transform: scaleY(1);
}
</style>
