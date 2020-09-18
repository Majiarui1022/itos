<template>
    <div>
      <el-dialog
        title="导出"
        custom-class="ExportDialong"
        :visible.sync="dialogVisible"
        width="30%"
        append-to-body
        :before-close="handleClose">
        <div class="Row" v-if="ShowSelect">
          <span class="LabelName">选择数据</span>
          <div class="Select">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="Row">
          <span class="LabelName">选择日期</span>
          <div class="SelectTime">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </div>
          <div class="SelectBut">查询</div>
        </div>
        <div class="Row" style="height: 6.05rem;">
          <span class="LabelName">导出文档</span>
          <div class="ShowTxt">
            <div class="TextList">
              <ul>
                <li><el-radio v-model="radio" label="1">碳罐测试能力-2019-08-09-10：22：33</el-radio></li>
                <li><el-radio v-model="radio" label="2">碳罐测试能力-2019-08-09-10：22：33</el-radio></li>
              </ul>
            </div>
            <div class="InitBox">
              <div class="cal"><input type="text" placeholder="请输入起始数"></div>
              <div class="cal"><input type="text" placeholder="请输入导出条数"></div>
              <div class="cal"><input type="text" placeholder="请输入间隔条数"></div>
              <div class="cal"><div class="ExportBut">导出</div></div>
            </div>
          </div>
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
        name: "eldialogControl",
      data(){
          return{
            options: [
              {
                value: '选项1',
                label: '黄金糕'
              }, {
                value: '选项2',
                label: '双皮奶'
              }, {
                value: '选项3',
                label: '蚵仔煎'
              }, {
                value: '选项4',
                label: '龙须面'
              }, {
                value: '选项5',
                label: '北京烤鸭'
              }
            ],
            dialogVisible: false,
            radio:'',
            value1:'',
            value:'',
            ShowSelect:false
          }
      },
      methods:{
        handleClose(done) {
          this.$confirm('您暂未提交确定要关闭吗？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        abab(val){
          this.ShowSelect = val
          console.log(this.ShowSelect)
          this.dialogVisible = true
        }
      }
    }
</script>

<style  lang="scss">

  .ExportDialong{
    width:9rem !important;
    height:8.5rem;
    background:rgba(4,24,39,1);
    box-shadow:0px 0px 18px 2px rgba(5,21,34,0.3);
    border-radius:8px;
    margin-top: 1.15rem !important;
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
    .el-dialog__body{
      padding: 0 .94rem;
      .Row{
        overflow: hidden;
        width: 100%;
        height: .44rem;
        margin-bottom: .2rem;
        .LabelName{
          float: left;
          font-size:.24rem;
          font-family:Source Han Sans CN;
          color:rgba(2,246,255,1);
          line-height: .4rem;
          margin-right: .14rem;
        }
        .Select{
          float: left;
          width:6rem;
          height:.4rem;
          border-radius:.08rem;
          background:rgba(18,49,75,1);
          border:1px solid rgba(10,210,218,1);
          .el-select{
            width: 100%;
            height: 100%;
            .el-input,input{
              display: block;
              width: 100%;
              height: 100%;
              border: 0;
              background: transparent;
              font-size:.18rem;
              color:rgba(10,210,218,1);
              &::placeholder{
                color:#085368;
              }
            }
            .el-input__icon{
              color: #02F6FF;
              font-size: .24rem;
              line-height: .4rem;
            }
          }
        }
        .SelectTime{
          width:3.6rem;
          height:.4rem;
          background:rgba(18,49,75,1);
          border:1px solid rgba(10,210,218,1);
          border-radius:.08rem;
          float: left;
          .el-range-editor.el-input__inner{
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            background: transparent;
            border: 0;
            padding-left: .16rem;
            i{
              color: rgba(10,210,218,1);
              font-size: .2rem;
              line-height: .4rem;
            }
            input{
              background: transparent;
              color: rgba(10,210,218,1);
              font-size: .18rem;
              line-height: .4rem;
            }
            span{
              color: rgba(10,210,218,1);
              font-size: .2rem;
              line-height: .4rem;
            }
          }
        }
        .SelectBut{
          width:1.2rem;
          height:.4rem;
          background:rgba(10,210,218,1);
          border-radius:.08rem;
          text-align: center;
          line-height: .4rem;
          font-size:.2rem;
          color:rgba(255,255,255,1);
          float: left;
          margin-left: .16rem;
          cursor: pointer;
          &:hover{
            background: #3BEDF4;
          }
        }
        .ShowTxt{
          width: 6rem;
          height: 6rem;
          background:rgba(18,49,75,1);
          border:1px solid rgba(10,210,218,1);
          border-radius:.08rem;
          float: left;
          .TextList{
            width: 100%;
            height: calc(100% - .6rem);
            padding-top: .08rem;
            padding-left: .16rem;
            box-sizing: border-box;
            ul{
              width: 100%;
              height: 100%;
              overflow-y: scroll;
              overflow-x: hidden;
              li{
                height: .32rem;
                width: 100%;
                label{
                  display: flex;
                  align-items: center;
                  width: 100%;
                  height: .32rem;
                  .el-radio__label{
                    font-size:.16rem;
                    font-family:Source Han Sans CN;
                    color:rgba(10,210,218,1);
                    padding-left: .16rem;
                  }
                  .el-radio__inner{
                    width:.2rem;
                    height:.2rem;
                    background:transparent;
                    border:1px solid rgba(10,210,218,1);
                    border-radius:50%;
                    &::after{
                      width: 100%;
                      height:100%;
                      background:rgba(10,210,218,1);
                      background: url("../../../assets/img/OK.png") center center no-repeat;
                      background-size: 100% 100%;
                    }
                  }
                  .is-checked{
                    span{
                      border:1px solid transparent;
                    }
                  }
                }
              }
              &::-webkit-scrollbar {/*滚动条整体样式*/
                width: 20px;     /*高宽分别对应横竖滚动条的尺寸*/
                height: 4px;
              }
              &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                border-radius: 5px;
                -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
                background: #06A9AF;
              }
              &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                border-radius: 0;
                background: transparent;
              }
            }
          }
          .InitBox{
            width: 100%;
            height: .6rem;
            overflow: hidden;
            border-top: 1px solid #02D3DB;
            .cal{
              width: 25%;
              height: 100%;
              float: left;
              border-right:1px solid #02D3DB;
              box-sizing: border-box;
              input{
                width: 100%;
                height: 100%;
                font-size:.16rem;
                font-family:Source Han Sans CN;
                display: block;
                line-height: .6rem;
                background: transparent;
                outline: none;
                border: 0;
                color: #02D3DB;
                padding: 0 .12rem;
                box-sizing: border-box;
                &::placeholder {
                  color:#085368;
                }
              }
              .ExportBut{
                width:1.2rem;
                height:.4rem;
                background:rgba(10,210,218,1);
                border-radius:.08rem;
                margin: .1rem auto 0;
                font-size:.2rem;
                font-family:Source Han Sans CN;
                color:rgba(255,255,255,1);
                text-align: center;
                line-height: .4rem;
                cursor: pointer;
                &:hover{
                  background: #3BEDF4;
                }
              }
              &:last-child{
                border: 0 ;
              }
            }
          }
        }
      }
    }
    .el-dialog__footer{
      display: none;
    }
  }
</style>
