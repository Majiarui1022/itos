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
          <span>{{$route.query.st == 1 ? '创建设备' : $route.query.st == 2 ? '查看设备' : '编辑设备'}}</span>
        </div>

        <div class="task-datail">
          <div class="left">
            <div class="label-tit">
              <span>基础信息</span>
            </div>
            <div class="form-fax">
              <div class="label-form">
                <i>*</i>
                <span>名称</span>
              </div>
              <el-input v-model="name" placeholder="请输入内容"></el-input>
              <div class="label-form">
                <i>*</i>
                <span>资产编号</span>
              </div>
              <el-input v-model="asset_number" placeholder="请输入内容"></el-input>
            </div>
            <div class="form-fax">
              <div class="label-form">
                <i>*</i>
                <span>类别</span>
              </div>
              <el-select v-model="equipment_category" placeholder="请选择">
                <el-option
                  v-for="item in ModelList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <div class="label-form">
                <span>设备信息</span>
              </div>

              <div class="search-mo">
                <el-input type="textarea" v-model="params" placeholder="请按照“key=value“格式使用”，换行使用“，”，例：cmdType=s
end,targetUrl=http://192.168.0.118:5000/v1_0/cmd/,"></el-input>
              </div>
             
            </div>
          </div>

          <div class="right">
            <div class="label-tit" style="background: transparent;">
              <span></span>
            </div>
            <div class="form-fax">
              <div class="label-form">
                <i>*</i>
                <span>位置</span>
              </div>
              <el-select v-model="location" placeholder="请选择">
                <el-option
                  v-for="item in locationall"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
            <div class="form-fax">
              <div class="label-form">
                <span>设备属性</span>
              </div>

            <el-select v-model="property" placeholder="请选择">
                <el-option
                  v-for="item in taskcon"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <div class="show-list">
                <el-checkbox-group v-model="modules">
                  <div
                    class="row-checklist row-checkscript"
                    :key="index"
                    v-for="(item,index) in scriptlist"
                  >
                    <div class="name">{{item.module_number}}</div>
                    <div class="name">{{item.name}}</div>
                    <div class="name">{{item.module_category}}</div>
                    <el-checkbox :label="item.id">&nbsp;</el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
            <el-button v-if="$route.query.st != 2" type="primary" @click="createTask">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserInfo from "@/components/UserInfo";
export default {
  name: "addequip",
  components: { UserInfo },
  data() {
    return {
      SBlist: [], //设备列表
      value: "", //项目选择所选
      
      input: "",
      checkList: [],
      searchmodel: "", //模块搜索
      modelist: [],
      controllers: [], //控制器列表
      controllersval: "",
      taskcon: [
        {
          id : 1,
          name : '固定模块'
        },
        {
          id : 2,
          name : '非固定模块'
        },
        {
          id : 3,
          name : '模块'
        }
      ], //测试类型列表
      taskconval: "", //测试类型选中
      scriptlist: [], //模块列表
      scriptinit: "", //脚本搜索名称
      


      ModelList : [],  //设备类别
      locationall : [],   //位置列表
       sbshuxinglist : [
        {
          id : 1,
          name : '固定模块'
        },
        {
          id : 2,
          name : '非固定模块'
        },
        {
          id : 3,
          name : '模块'
        }
      ],              //设备属性

      name:'',
      asset_number: "",
      equipment_category: "",
      location : '',
      asset_number: '',
      params : '',
      property : '',
      modules: [], //脚本选中列表
    };
  },
  mounted() {
   this.getScriptList();
    this.getsbtablist()
    //获取设备详情
    if(this.$route.query.id){
      this.getdetail()
    }
  },
  methods: {
       //获取全部设备类别
    getsbtablist() {
      this.$http
        .get(this.$conf.env.allsbleibie)
        .then(res => {
          this.ModelList = res.data.message;
          console.log(this.ModelList)
        })
        .catch(err => {
          this.$alert.errorTit(this, err.response.data.err);
        });

      this.$http
      .get(this.$conf.env.allLocation  + '?page=1&page_size=999')
      .then(res => {
        this.locationall = res.data.results;
      })
      .catch(err => {
        this.$alert.errorTit(this, err.response.data.err);
      });

      //  this.$http
      // .get(this.$conf.env.mkcategory)
      // .then(res => {
      //   this.equipmentCategory = res.data.message;
      // })
      // .catch(err => {
      //   this.$alert.errorTit(this, err.response.data.err);
      // });


       this.$http
      .get(this.$conf.env.ModuleList + '?page=1&page_size=999')
      .then(res => {
        this.ModulesListAll = res.data.results;
      })
      .catch(err => {
        this.$alert.errorTit(this, err.response.data.err);
      });
    },
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
      .get(this.$conf.env.selectModuleL)
      .then(res => {
        // this.ModulesListAll = res.data.results;
        console.log(res)
        this.scriptlist = res.data.message;
      })
      .catch(err => {
        this.$alert.errorTit(this, err.response.data.err);
      });

      
      // this.$http
      //   .get(
      //     this.$conf.env.scriptTaskList +
      //       `?script_category=${this.partval}&search=${this.scriptinit}&page=1&page_size=999`
      //   )
      //   .then(res => {
      //     this.scriptlist = res.data.results;
      //     this.scriptChackList = [];
      //   })
      //   .catch(err => {
      //     this.$alert.errorTit(this, err.response.data.err);
      //   });
    },

    //创建任务
    createTask() {
      // this.$router.go(-1)
      let {
        name,
        asset_number,
        equipment_category,
        location,
        params,
        property,
        modules
      } = this;
      var obj = {
        name: name,
        equipment_category : equipment_category,
        asset_number: asset_number,
        location: location,
        params: params,
        property: property,
        modules: property == 2 ? [] :  modules
      };
      console.log(obj)
      if (this.$route.query.id) {
        this.$http
          .put(this.$conf.env.sblist + `${this.$route.query.id}/`, obj)
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
          .post(this.$conf.env.sblist, obj)
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


    getdetail(){
      
      this.$http
      .get(this.$conf.env.sblist + `${this.$route.query.id}/`)
      .then(res => {
        console.log(res)
        var {name , equipment_category ,asset_number ,location , params , property , modules} = res.data.message
        this.name = name;
        this.equipment_category = equipment_category;
        this.asset_number = asset_number;
        this.location = location;
        this.params = params;
        this.property = property;
        this.modules = modules;
      })
      .catch(err => {
        this.$alert.errorTit(this, err.response.data.err);
      });
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
              width: 6rem;
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
            .el-textarea {
              margin: 0;
              width: 100%;
              height: 2rem;
              textarea {
                resize: none;
                padding: 0 15px;
                height: 2rem;
              }
            }
          }

          /deep/ .el-range-editor.el-input__inner {
            width: 6rem;
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
                &:nth-child(1) {
                  width: 0.8rem;
                }
                &:nth-child(2) {
                  width: 0.9rem;
                }
                &:nth-child(3) {
                  width: 0.8rem;
                }
                &:nth-child(3) {
                  width: 0.7rem;
                }
              }
            }
            .row-checkscript {
              .name {
                &:nth-child(1) {
                  width: 0.8rem !important;
                }
                &:nth-child(2) {
                  width: 1.6rem !important;
                }
                &:nth-child(3) {
                  width: 1rem !important;
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
              -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
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