<template>
  <div class="vue">
    <div class="codemirror">
      <!-- codemirror -->
      <codemirror
        ref="mirror"
        v-model="code"
        :options="cmOption"
        @cursorActivity="onCmCursorActivity"
        @ready="onCmReady"
        @focus="onCmFocus"
        @blur="onCmBlur"
      >
      </codemirror>
    </div>
    <el-button @click="handleRun" type="primary">run</el-button>
    <div class="g-flex">
      <pre class="pre">{{ code }}</pre>
      <div ref="renderPanel" :class="appClassName">
        <span :id="appId" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-useless-escape */
import "codemirror/lib/codemirror.css";
// language
import "codemirror/mode/vue/vue.js";

// theme css
import "codemirror/theme/base16-light.css";

// active-line.js
import "codemirror/addon/selection/active-line.js";

// styleSelectedText
import "codemirror/addon/selection/mark-selection.js";
import "codemirror/addon/search/searchcursor.js";

// highlightSelectionMatches
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/match-highlighter.js";

// keyMap
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/keymap/sublime.js";

// foldGutter
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";
import Vue from "vue/dist/vue.esm.browser.min.js";
import { codemirror } from "vue-codemirror";
import { parseComponent } from "vue-template-compiler";
import ElementUI from "element-ui";
import { uid } from "../../../src/util/index";

Vue.use(ElementUI);

export default {
  name: "mirror",
  components: {
    codemirror: codemirror
  },
  data() {
    const code = `<template>
  <div>
  Hello World Lawrence !
  <el-button @click="tip" type="primary">tip</el-button>
  <el-input v-model="input" />
  
  </div>

</template>

<script>
  export default {
    data() {
      return {
        input:''
        
        
      }
    },
    methods:{
      tip(){
      this.$message('这是一条消息提示');
    }

    }
    
  }
<\/script>

<style lang="scss">
  
</style>`;
    const _uid = uid();
    return {
      code,
      uid: _uid,
      appId: "app" + _uid,
      appClassName: "render-content-" + _uid,
      cmOption: {
        tabSize: 4,
        foldGutter: true,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        keyMap: "sublime",
        mode: "text/x-vue",
        theme: "base16-light",
        extraKeys: {
          F11(cm) {
            cm.setOption("fullScreen", !cm.getOption("fullScreen"));
          },
          Esc(cm) {
            if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
          }
        }
      }
    };
  },
  mounted() {
    this.mountCom(this.appId);
  },
  methods: {
    onCmCursorActivity(codemirror) {
      console.log("onCmCursorActivity", codemirror);
    },
    onCmReady(codemirror) {
      console.log("onCmReady", codemirror);
    },
    onCmFocus(codemirror) {
      console.log("onCmFocus", codemirror);
    },
    onCmBlur(codemirror) {
      console.log("onCmBlur", codemirror);
    },
    mountCom(id) {
      const sfc = parseComponent(this.code);
      console.log(sfc);
      let modal;
      eval("modal=" + sfc.script.content.replace("export default", "").trim());
      console.log(modal);
      this.com = new Vue({
        template: sfc.template.content.trim(),
        ...modal,
        renderError(h, err) {
          return h("pre", { style: { color: "red" } }, err.stack);
        }
      });
      this.com.$mount("#" + id);
    },
    handleRun() {
      if (this.com) {
        this.com.$destroy();
      }
      setTimeout(() => {
        this.$refs.renderPanel.innerHTML = '<span id="app' + this.uid + '"/>';
        setTimeout(() => {
          this.mountCom(this.appId);
        }, 10);
      }, 10);
    }
  }
};
</script>
<style lang="scss">
.CodeMirror {
  height: auto;
  max-height: 1000px;
}
</style>
