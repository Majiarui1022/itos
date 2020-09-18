  import Vue from 'vue'

  import {message} from 'element-ui';
  Vue.prototype.$message = message
var MessageS = {
  Tit(that,massge) {
    that.$message({
      message:`${massge}`,
      duration:2000,
    });
  },
  successTit(that,massge) {
    that.$message({
      message: `${massge}`,
      duration:2000,
      type: 'success'
    });
  },

  warningTit(that,massge) {
    that.$message({
      message: `${massge}`,
      duration:2000,
      type: 'warning'
    });
  },

  errorTit(that,massge) {
    that.$message.error({
      message:`${massge}`,
      duration:2000,
    });
  }
}
export default MessageS
