<template>
    <div>
      <el-dialog
        title="间隔设置"
        :visible.sync="dialogVisible"
        custom-class="TimeSetting"
        width="30%"
        :before-close="handleClose">
        <div class="Row">
          <span>休息时间</span>
          <div class="InitNum"><input type="text"></div>
          <span>M</span>
        </div>
        <div class="Row">
          <span>休息时间</span>
          <div class="InitNum"><input type="text" placeholder="最小输入运行时间180M"></div>
          <span>M</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Settingdialog",
      data() {
        return {
          dialogVisible: false
        };
      },
      methods: {
        handleClose(done) {
          this.$confirm('您暂未提交数据，确定要关闭吗？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        }
      }
    }
</script>

<style lang="scss">
  .TimeSetting{
    width:6rem !important;
    height:3.24rem;
    background:rgba(4,24,39,1);
    box-shadow:0 0 18px 2px rgba(5,21,34,0.3);
    border-radius:.08rem;
    margin-top: 3.83rem !important;
    .el-dialog__header{
      width: 100%;
      height: .82rem;
      padding: 0;
      span{
        display: block;
        font-size:.3rem;
        font-family:Source Han Sans CN;
        color:rgba(2,246,255,1);
        text-align: center;
        line-height: .82rem;
      }
      button{
        width: .24rem;
        height: .24rem;
        background: #0AD2DA;
        border-radius: 50%;
        i{
          font-size: .24rem;
          display: none;
        }
        &:hover{
          i{
            display: block;
            color: #fff;
          }
        }
      }
    }
    .el-dialog__body {
      padding: 0 1rem;
      .Row{
        width: 100%;
        height: .4rem;
        display: flex;
        align-items: center;
        margin-bottom: .3rem;
        span{
          font-size:.24rem;
          font-family:Source Han Sans CN;
          color:rgba(2,246,255,1);
        }
        .InitNum{
          width: 2rem;
          height: .4rem;
          background:rgba(18,49,75,1);
          margin: 0 .16rem;
          flex: 1;
          input{
            display: block;
            width: 100%;
            height: 100%;
            border:1px solid rgba(2,246,255,1);
            background: transparent;
            font-size:.18rem;
            color:rgba(10,210,218,1);
            padding: 0 .1rem;
            box-sizing: border-box;
            &:focus{
              border:1px solid #3BEDF4;
            }
            &::placeholder{
              color:#085368;
            }
          }
        }
      }
    }
    .el-dialog__footer{
      width: 100%;
      height: .4rem;
      padding: 0;
      span{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        button{
          margin: 0 .25rem;
          background:rgba(10,210,218,1);
          border: 0;
          color: #fff;
          width: 1.2rem;
          height: .4rem;
          font-size:.2rem;
          font-family:Source Han Sans CN;
          color:rgba(255,255,255,1);
          &:hover{
            background: #3BEDF4;
          }
        }
      }
    }
  }
</style>





































