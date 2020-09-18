<template>
  <div class="PMContent">
    <!--    头部-->
    <div class="Header">
      <UserInfo></UserInfo>
    </div>
    <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
    <div class="Menu">
      <div class="PMSection">
        <div class="MenuHeader">
          <span>{{this.$route.query.sta == 1 ?'创建' : this.$route.query.sta == 2 ? '编辑' : this.$route.query.sta == 3 ? '审核' : ''}}任务</span>
        </div>

        <div class="task-datail">
          <div class="left">
            <div class="label-tit">
              <span>基础信息</span>
            </div>
            <div class="form-fax">
              <div class="label-form">
                <i>*</i>
                <span>项目选择</span>
              </div>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>

              <div class="label-form">
                <i>*</i>
                <span>任务名称</span>
              </div>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div class="label-tit">
              <span>硬件信息</span>
            </div>
            <div class="form-fax">
              <div class="label-form">
                <i>*</i>
                <span>设备选择</span>
              </div>
              <el-select
                collapse-tags
                v-model="sbval"
                popper-class="list-row"
                multiple
                placeholder="请选择"
                @change="getmodelist"
              >
                <el-option-group>
                  <span style="color: #8492a6; font-size: 13px">设备编号</span>
                  <span style="color: #8492a6; font-size: 13px">设备名称</span>
                  <span style="color: #8492a6; font-size: 13px">位置</span>
                </el-option-group>
                <el-option
                  v-for="item in SBlist"
                  :key="item.id"
                  :label="item.equipment_number"
                  :value="item.id"
                >
                  <span>{{ item.equipment_number }}</span>
                  <span>{{ item.name }}</span>
                  <span>{{ item.location }}</span>
                </el-option>
              </el-select>
              <div class="label-form">
                <span>模块选择</span>
              </div>

              <div class="search-mo">
                <el-input v-model="searchmodel" placeholder="请输入内容" @input="getmodelist"></el-input>
                <el-select v-model="mkval" placeholder="请选择" @change="getmodelist">
                  <el-option
                    v-for="item in mklist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
              <div class="show-list">
                <el-checkbox-group v-model="checkList">
                  <div class="row-checklist" :key="index" v-for="(item,index) in modelist">
                    <div class="name">{{item.module_number}}</div>
                    <div class="name">{{item.name}}</div>
                    <div class="name">{{item.location}}</div>
                    <div class="name">{{item.module_category}}</div>
                    <el-checkbox :disabled="item.is_select" :label="item.id">&nbsp;</el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
              <div class="label-form">
                <i>*</i>
                <span>控制器</span>
              </div>
              <el-select v-model="controllersval" popper-class="list-row" placeholder="请选择">
                <el-option-group>
                  <span style="color: #8492a6; font-size: 13px">设备编号</span>
                  <span style="color: #8492a6; font-size: 13px">位置</span>
                </el-option-group>
                <el-option
                  v-for="item in controllers"
                  :key="item.id"
                  :label="item.con_number"
                  :value="item.id"
                >
                  <span>{{ item.con_number }}</span>
                  <span>{{ item.location }}</span>
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="right">
            <div class="label-tit" style="background: transparent;">
              <span></span>
            </div>
            <div class="form-fax">
              <div class="label-form">
                <i>*</i>
                <span>测试类型</span>
              </div>
              <el-select v-model="taskconval" placeholder="请选择">
                <el-option
                  v-for="item in taskcon"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>

              <div class="label-form">
                <i>*</i>
                <span>任务时间</span>
              </div>
              <el-date-picker
                v-model="value1"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
            <div class="label-tit">
              <span>脚本信息</span>
            </div>
            <div class="form-fax">
              <div class="label-form">
                <span>脚本选择</span>
              </div>

              <div class="search-mo">
                <el-input v-model="scriptinit" placeholder="请输入内容" @input="getScriptList"></el-input>
                <el-select v-model="partval" placeholder="请选择" @change="getScriptList">
                  <el-option
                    v-for="item in partlist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
              <div class="show-list">
                <el-checkbox-group v-model="scriptChackList">
                  <div
                    class="row-checklist row-checkscript"
                    :key="index"
                    v-for="(item,index) in scriptlist"
                  >
                    <div class="name">{{item.script_number}}</div>
                    <div class="name">{{item.name}}</div>
                    <div class="name">{{item.script_category}}</div>
                    <el-checkbox :label="item.id">&nbsp;</el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
            <div v-if="this.$route.query.status == 1" style="display:flex">
              <el-button type="primary" @click="openclose">退回</el-button>
              <el-button type="primary" @click="shrenwu('pass')">通过</el-button>
            </div>
            <div v-else-if="this.$route.query.status == 2" style="display:flex">
            <el-button type="primary" @click="openclose">撤销审核</el-button>
            </div>
            <el-button v-else type="primary" @click="createTask">保存</el-button>
          </div>

           <el-dialog 
            :title="falname" 
            :visible.sync="dialogFormVisible" 
            :close-on-press-escape='false'
            :close-on-click-modal	='false'
            :destroy-on-close='true'
            :before-close="beforeCloseS"
            custom-class="createzu">
            <el-form ref="form" :model="form">
              <el-form-item 
              label=""
              prop="name" 
              :rules="[
                { required: true, message: ' '},
              ]"
              >
                <el-input v-model="form.name" placeholder="" autocomplete="off" maxlength="15"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="clearFormTal">取 消</el-button>
              <el-button type="primary" @click="createZuname('form')">确 定</el-button>
            </div>
          </el-dialog>





        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo";
export default {
  name: "task",
  components: { UserInfo },
  data() {
    return {
      falname : '退回原因',
      options: [],
      SBlist: [], //设备列表
      mklist: [],
      partlist: [], //脚本列表
      value: "", //项目选择所选
      sbval: [], //设备选择所选
      mkval: "", //模块选择所选
      partval: "", //脚本选择所选
      input: "",
      value1: "",
      checkList: [],
      searchmodel: "", //模块搜索
      modelist: [],
      controllers: [], //控制器列表
      controllersval: "",
      taskcon: [
        {
          value: "V",
          label: "认证测试"
        },
        {
          value: "D",
          label: "开发测试"
        }
      ], //测试类型列表
      taskconval: "", //测试类型选中
      scriptlist: [], //脚本列表
      scriptChackList: [], //脚本选中列表
      scriptinit: "", //脚本搜索名称
      form : {
        name : ''
      },
      dialogFormVisible : false
    };
  },
  mounted() {
    this.$http
      .get(this.$conf.env.GetProList + `?page=1&status=created&page_size=999`)
      .then(res => {
        this.options = res.data.results;
      })
      .catch(err => {
        // this.$alert.errorTit(this,err.response.data.err)
      });

    this.$http
      .get(this.$conf.env.sblistConfir + `?page=1&page_size=999`)
      .then(res => {
        this.SBlist = res.data.results;
      })
      .catch(err => {
        // this.$alert.errorTit(this,err.response.data.err)
      });

    this.$http
      .get(this.$conf.env.mkcategory)
      .then(res => {
        var arr = [
          {
            id: "",
            name: "全部"
          }
        ];
        this.mklist = arr.concat(res.data.message);
      })
      .catch(err => {
        this.$alert.errorTit(this, err.response.data.err);
      });

    this.$http
      .get(this.$conf.env.GetSystem)
      .then(res => {
        var arr = [
          {
            id: "",
            name: "全部"
          }
        ];
        this.partlist = arr.concat(res.data.message);
      })
      .catch(err => {
        // this.$alert.errorTit(this,err.response.data.err)
      });

    this.$http
      .get(this.$conf.env.controllersList + "?page=1&page_size=999")
      .then(res => {
        this.controllers = res.data.results;
      })
      .catch(err => {
        // this.$alert.errorTit(this,err.response.data.err)
      });

    this.getScriptList();
    //获取任务详情
    if (this.$route.query.id) {
      this.getTaskDetail();
    }
  },
  methods: {
    //任务详情
    getTaskDetail() {
      this.$http
        .get(this.$conf.env.TaskList + `${this.$route.query.id}/`)
        .then(res => {
          console.log(res);
          if (res.code !== -1) {
            this.sbval = res.data.message.equipments;
            this.value = res.data.message.project;
            this.input = res.data.message.name;
            this.value1 = [
              res.data.message.estimated_start_time,
              res.data.message.estimated_end_time
            ];
            this.checkList = this.checkList.concat(res.data.message.modules);
            this.taskconval = res.data.message.test_category;
            this.controllersval = res.data.message.controller;
            this.scriptChackList = res.data.message.scripts;
            // test_category : taskconval,
            // controller : controllersval,
            // scripts : scriptChackList
            this.getmodelist();
          }
        })
        .catch(err => {
          // this.$alert.errorTit(this,err.response.data.err)
        });
    },

    //多选框修改
    chackboxselect(val) {
      console.log(val);
    },
    getmodelist() {
      if (this.sbval.length < 1) {
        this.$alert.errorTit(this, "请先选设备");
        return;
      }
      this.checkList = [];
      var str = "";
      for (var i in this.sbval) {
        if (i == this.sbval.length - 1) {
          str += this.sbval[i];
        } else {
          str += this.sbval[i] + "_";
        }
      }
      this.$http
        .get(
          this.$conf.env.modulesTaskList +
            `?equipments=${str}&search=${this.searchmodel}&module_category=${this.mkval}`
        )
        .then(res => {
          if (res.data.error == 0) {
            this.modelist = res.data.message;
            for (var i in res.data.message) {
              if (res.data.message[i].is_select) {
                this.checkList.push(res.data.message[i].id);
              }
            }
          } else {
            this.$alert.errorTit(this, res.data.message);
          }
        })
        .catch(err => {
          this.$alert.errorTit(this, err.response.data.err);
        });
    },

    //获取脚本列表
    getScriptList() {
      this.$http
        .get(
          this.$conf.env.scriptTaskList +
            `?script_category=${this.partval}&search=${this.scriptinit}&page=1&page_size=999`
        )
        .then(res => {
          this.scriptlist = res.data.results;
          this.scriptChackList = [];
        })
        .catch(err => {
          this.$alert.errorTit(this, err.response.data.err);
        });
    },

    //创建任务
    createTask() {
      // this.$router.go(-1)
      let {
        value,
        input,
        sbval,
        value1,
        taskconval,
        checkList,
        scriptChackList,
        controllersval
      } = this;
      var obj = {
        project: value,
        name: input,
        equipments: sbval,
        estimated_start_time: value1[0],
        estimated_end_time: value1[1],
        modules: checkList,
        test_category: taskconval,
        controller: controllersval,
        scripts: scriptChackList
      };
      if (this.$route.query.id) {
        this.$http
          .put(this.$conf.env.TaskList + `${this.$route.query.id}/`, obj)
          .then(res => {
            if (res.code !== -1) {
              this.$alert.successTit(this, "修改成功");
              this.$router.go(-1);
            }
          })
          .catch(err => {
            // this.$alert.errorTit(this,err.response.data.err)
          });
      } else {
        this.$http
          .post(this.$conf.env.TaskList, obj)
          .then(res => {
            if (res.code !== -1) {
              this.$alert.successTit(this, "添加成功");
              this.$router.go(-1);
            }
          })
          .catch(err => {
            // this.$alert.errorTit(this,err.response.data.err)
          });
      }
    },
    
    //审核任务
    shrenwu(val){
      var obj = {
        check_status : val,
        reason : this.form.name
      }
       this.$http
          .put(this.$conf.env.shtask + `${this.$route.query.id}/`, obj)
          .then(res => {
            if (res.code !== -1) {
              this.$alert.successTit(this, val == "pass" ? '已通过' : '已拒绝');
              this.$router.go(-1);
            }
          })
          .catch(err => {
            // this.$alert.errorTit(this,err.response.data.err)
          });
    },
    //项目退回弹出框
    openclose(){
      if(this.$route.query.status == 1){
        this.falname = '退回原因'
      }else{
        this.falname = '撤销原因'
      }
      this.dialogFormVisible = true
    },
        //创建组名
    createZuname(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
           if(this.$route.query.status == 1){
              this.shrenwu('not_pass')
            }else{
               this.$http
                .put(this.$conf.env.closetaskL + `${this.$route.query.id}/`, {reason : this.form.name})
                .then(res => {
                  if (res.code !== -1) {
                    this.$alert.successTit(this, '任务已撤销审核');
                    this.$router.go(-1);
                  }
                })
                .catch(err => {
                  // this.$alert.errorTit(this,err.response.data.err)
                });
              
            }
        } else {
          return false;
        }
      });
    },
    //关闭前确认
    beforeCloseS(done){
      this.$confirm('您暂未提交数据，确认关闭吗？')
        .then(_ => {
          done();
          this.clearFormTal()
      })
      .catch(e => {
      });
    },

     //清空表单
    clearFormTal(){
      this.dialogFormVisible = false;
      Object.keys(this.form).forEach(key=>{this.form[key]=''});
    }
  },
  created() {}
};
</script>

<style lang="scss" scope>
.PMContent {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .Header {
    width: 100%;
    height: 0.9rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 5px 0px rgba(2, 24, 68, 0.08);
    padding-left: 0.58rem;
    padding-right: 0.87rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .Menu {
    flex: 1;
    box-sizing: border-box;
    background: #f4f4f4;
    padding: 0.1rem 0.12rem;
    overflow: hidden;
    .PMSection {
      width: 100%;
      height: 100%;
      background: #fff;
      padding: 0.2rem 0.75rem 0 0.52rem;
      box-sizing: border-box;
      overflow-y: scroll;
      overflow-x: hidden;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 0.12rem; /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px #f1f1f1;
        background: #f1f1f1;
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
        border-radius: 0;
        background: transparent;
      }
      .MenuHeader {
        width: 100%;
        height: 0.45rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 0.32rem;
          color: rgba(51, 51, 51, 1);
          line-height: 0.45rem;
        }
        .RightBox {
          display: flex;
          .el-select {
            width: 2.1rem;
            height: 0.42rem;
            background: rgba(253, 253, 253, 1);
            box-shadow: 0px 3px 7px 0px rgba(6, 33, 88, 0.3);
            border-radius: 21px;
            .el-input {
              height: 100%;
            }
            input {
              padding: 0;
              text-indent: 0.17rem;
              border-radius: 21px;
              width: 100%;
              height: 100%;
            }
            .el-input__icon {
              line-height: 0.42rem;
              display: block;
            }
          }
          .Create {
            background: rgba(253, 253, 253, 1);
            box-shadow: 0px 3px 7px 0px rgba(6, 33, 88, 0.3);
            border-radius: 21px;
            padding-left: 0.17rem;
            padding-right: 0.23rem;
            align-items: center;
            display: flex;
            font-size: 0.2rem;
            font-family: Microsoft YaHei;
            color: rgba(70, 74, 83, 1);
            margin-left: 0.22rem;
            cursor: pointer;
            line-height: 0.42rem;
            img {
              width: 0.25rem;
              height: 0.25rem;
              margin-right: 0.1rem;
            }
          }
        }
      }
      .task-datail {
        width: 100%;
        display: flex;
        margin-top: 0.32rem;
        .label-tit {
          width: 1rem;
          height: 0.36rem;
          background: #393b6a;
          border-radius: 0.04rem;
          text-align: center;
          line-height: 0.36rem;
          span {
            font-size: 0.16rem;
            color: #dedee5;
            display: block;
          }
        }
        .form-fax {
          margin-top: 0.3rem;
          .label-form {
            display: flex;
            i {
              font-size: 0.16rem;
              color: #ff0101;
            }
            span {
              font-size: 0.16rem;
              color: #2c2b2b;
              line-height: 0.24rem;
            }
          }
          /deep/ .el-select {
            width: 6rem;
            height: 0.36rem;
            background: #e6e6e6;
            display: block;
            margin-top: 0.16rem;
            margin-bottom: 0.2rem;
            .el-input {
              width:6rem;
              height: 0.36rem;
            }
            input {
              width: 100%;
              height: 100% !important;
            }
            i {
              line-height: 0.36rem;
            }
          }
          /deep/ .el-input {
            width: 6rem;
            height: 0.36rem;
            display: block;
            margin-top: 0.16rem;
            margin-bottom: 0.2rem;
            input {
              width: 100%;
              height: 100%;
            }
          }
          /deep/ .search-mo {
            width: 6rem;
            height: 0.36rem;
            display: flex;
            margin-top: 0.16rem;
            .el-input {
              margin: 0;
              width: 4.75rem;
            }
            .el-select {
              margin: 0;
              width: 1.24rem;
              .el-input {
                width: 1.24rem;
                input {
                  padding: 0 0.03rem;
                }
              }
            }
          }

          /deep/ .el-range-editor.el-input__inner {
            width:6rem;
            height: 0.36rem;
            padding: 0.03rem 0.1rem;
            display: flex;
            margin-top: 0.16rem;
            margin-bottom: 0.2rem;
            i {
              line-height: 0.36rem;
            }
            span {
              line-height: 0.36rem;
            }
          }
          .show-list {
            width: 6rem;
            height: 2.4rem;
            border: 1px solid #e6e6e6;
            overflow-x: hidden;
            overflow-y: scroll;
            .row-checklist {
              width: 100%;
              font-size: 0.14rem;
              color: #333333;
              display: flex;
              justify-content: space-around;
              align-items: center;
              height: 0.3rem;
              .name {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &:nth-child(1) {
                  width: 1rem;
                }
                &:nth-child(2) {
                  width: 1.8rem;
                }
                &:nth-child(3) {
                  width: 1rem;
                }
                &:nth-child(4) {
                  width: 1.2rem;
                }
              }
            }
            .row-checkscript {
              .name {
                &:nth-child(1) {
                  width: 1.4rem !important;
                }
                &:nth-child(2) {
                  width: 2.4rem !important;
                }
                &:nth-child(3) {
                  width: 1.2rem !important;
                }
              }
            }
            &::-webkit-scrollbar {
              /*滚动条整体样式*/
              width: 2px; /*高宽分别对应横竖滚动条的尺寸*/
              height: 4px;
            }
            &::-webkit-scrollbar-thumb {
              /*滚动条里面小方块*/
              border-radius: 5px;
              background: #F1F1F1;
            }
            &::-webkit-scrollbar-track {
              /*滚动条里面轨道*/
              border-radius: 0;
              background: transparent;
            }
          }
        }

        .right {
          margin-left: 1.5rem;
          .show-lis {
            height: 4.12rem;
          }
          button {
            display: block;
          }
        }
      }
    }
     /deep/ .createzu{
    width: 5.38rem;
    height: 2.44rem;
    background: #ffffff;
    border-radius: .06rem;
    .el-dialog__header{
      padding: 0;
      height: .8rem;
      span{
        display: block;
        line-height: .8rem;
        text-align: center;
        font-size: .20rem;
        font-weight: bold;
        color: #303030;
      }
    }
    .el-dialog__body{
      padding: 0 .4rem;
      margin-bottom: .1rem;
      .el-form{
        .el-form-item{
          margin: 0;
          label{
            font-size: .16rem;
            text-align: center;
            color: #2c2b2b;
          }
        }
      }
    }
    .el-dialog__footer{
      padding: 0 .4rem;
      .dialog-footer{
        display: flex;
        justify-content: center;
      }
    }
  }
  }
}
.list-row {
  .el-select-group {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    span {
      display: block;
      width: 33.33%;
      text-align: center;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    span {
      display: block;
      width: 33.33%;
      text-align: center;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
