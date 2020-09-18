<template>
  <div class="IndexContent">

<!--    头部-->
    <div class="Header">
      <div class="SearchBox">
        <input type="text" placeholder="请输入项目名称或控制器名称" v-model="ProNameOrSN" @keyup.enter="AllTaskList">
        <div class="SearchBut" @click="AllTaskList"></div>
      </div>
      <user-info></user-info>
    </div>
<!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->

    <div class="Menu">
      <div class="IndexSection">
        <div class="MenuHeader">
          <span>任务管理</span>
          <div class="RightBox">
            <el-select v-model="valueStatus" placeholder="状态审核选择" @change="ChangeStatus">
              <el-option
                v-for="item in optionStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select>
            <el-select v-model="value" placeholder="状态任务选择" @change="ChangeTask">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
               >
              </el-option>
            </el-select>
            <div class="Create"  @click="CreateTask(1)">
              <img src="../../assets/img/create.png" alt="">
              创建
            </div>
          </div>
        </div>
        <div class="ProList">
          <ul>
            <li v-for="(item,index) in List">
              <div class="ListHeader">
                <p>
                  {{item.project}}
                  <span
                    :class="item.status === '未开始' ? 'Nostart' : item.status === '工作中' ? 'working' : 'fault'"
                  >{{item.status === '未开始' ? '未开始' : item.status === '工作中' ? '工作中' : '故障' }}
                  </span>
                  <img class="RemoveTask" src="../../assets/img/close.png" alt="" @click="RemoveTask(item.id,index)">
                </p>
              </div>
              <div class="ListContent">
                <p>控制器：{{item.controller}}</p>
                <p>脚本数量：{{item.scripts}}</p>
                <p>模块数量：{{item.modules}}</p>
                <p>创建人：{{item.user}}</p>
                <el-progress :percentage="item.progress" :color="customColor"></el-progress>
                <div class="BottomButList" v-if="!item.is_task_manager">
                  <div class="but" @click="CreateTask(2,item.id)">编辑任务</div>
                  <div class="but"  @click="ScriptImport(item.id,index)">脚本导入</div>
                  <router-link tag="div" to="/tanguanControl" class="but" >进入控制器</router-link>
                  <div class="but" @click="ScriptAllocation(item.id)">脚本配置</div>
                </div>
                <div class="BottomButListAdmin" v-if="item.is_task_manager">
                  <div style="width: 2.6rem;height: 100%;display: flex;flex-wrap: wrap;">
                    <div class="but" @click="CreateTask(2,item.id)">编辑任务</div>
                    <div class="but"  @click="ScriptImport(item.id,index)">脚本导入</div>
                    <router-link tag="div" to="/tanguanControl" class="but" >进入控制器</router-link>
                    <div class="but" @click="ScriptAllocation(item.id)">脚本配置</div>
                  </div>
                  <div class="auditPro" @click="checktast(item.id,index,item.check_status)">审核</div>
                </div>
                <img src="../../assets/img/notPass.png" alt="" class="weitongguo" v-if="item.check_status === 'not_pass'">
                <img src="../../assets/img/toaudit.png" alt="" class="daishenhe" v-if="item.check_status === 'unchecked'">
              </div>
            </li>
          </ul>
        </div>

        <el-dialog
          :title="TaskName"
          :visible.sync="outerVisible"
          :before-close="beforeCloseDialog">
          <el-dialog
            title="模块信息"
            :visible.sync="innerVisible"
            custom-class="ModuleIntroduce"
            :before-close="ModuleInfoClose"
            append-to-body>
            <p>{{ModuleInfo}}</p>
          </el-dialog>
          <div class="ProductBox">
            <span class="PName">项目名称：</span>
            <el-select v-model="valueT" placeholder="请选择">
              <el-option
                v-for="item in optionsT"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="ShiTime">
            <span>使用时间：</span>
            <input type="text" v-model="TimerShi">
          </div>
          <div class="controllerBox">
            <span class="PName">控制器：</span>
            <div class="controllerList">
              <div class="ControTit">控制器名称</div>
              <div class="ContList">
                <el-radio-group v-model="radio">
                  <el-radio :label="item.id" v-for="(item,index) in radioList" :key="index">{{item.name}}</el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>
          <div class="ModuleBox">
            <span class="PName">模块选择：</span>
            <div class="controllerList">
              <div class="ControTit">
                类别
                <el-select v-model="valueTH" placeholder="请选择" @change="SelectModuleL">
                <el-option
                  v-for="item in optionsTH"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class="SearchWord">
                <input type="text" placeholder="输入关键字查询" v-model="WhiteWither" @keyup.enter="GetModuleSelectList">
                <div class="SearchButS" @click="GetModuleSelectList">
                </div>
              </div>
              </div>
              <div class="ContList">
                <div class="TabTit">
                  <ul>
                    <li>模块编号</li>
                    <li>模块名称</li>
                    <li>模块信息</li>
                  </ul>
                </div>
                <div class="TabCon">
                  <el-checkbox-group v-model="checkList">
                    <ul>
                      <li v-for="(item,index) in ModuleListUn">
                        <div class="ModuleNum">{{item.module_number}}</div>
                        <div class="ModuleName">{{item.name}}</div>
                        <div class="ModuleNews" @click="GetModuleInfo(item.id)">
                          <img src="../../assets/img/menu.png" alt="" style="cursor: pointer">
                        </div>
                        <div class="ModuleCheck">
                          <el-checkbox :label="item.id"></el-checkbox>
                        </div>
                      </li>
                    </ul>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="outerVisible = false">取 消</el-button>
            <el-button class="OKSend" @click="SendData">确 定</el-button>
          </div>
        </el-dialog>




        <el-dialog
          title="脚本导入"
          :visible.sync="outerVisibleTwo"
          custom-class="Script"
          :before-close="ScriptCloseDialong">
          <el-dialog
            title="脚本信息"
            :visible.sync="innerVisibleTwo"
            custom-class="ScriptIntroduce"
            :before-close="ScriptInfoClose"
            append-to-body>
            <p>{{ScripInfo}}</p>
          </el-dialog>
          <div class="ProductBox">
            <span class="PName">项目名称：</span>
            <el-select v-model="valueScript" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in optionsT"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="ModuleBox">
            <span class="PName">脚本选择：</span>
            <div class="controllerList">
              <div class="ControTit">
                <div class="SearchWord">
                  <input type="text" placeholder="输入关键字查询" v-model="ScriptSelect" @keyup.enter="SearchScript">
                  <div class="SearchButS" @click="SearchScript">
                  </div>
                </div>
              </div>
              <div class="ContList">
                <div class="TabTit">
                  <ul>
                    <li>脚本编号</li>
                    <li>脚本名称</li>
                    <li>脚本信息</li>
                  </ul>
                </div>
                <div class="TabCon">
                  <el-checkbox-group v-model="ModuleCheckList">
                    <ul>
                      <li v-for="(item,index) in ScriptUn.script">
                        <div class="ModuleNum">{{item.script_number}}</div>
                        <div class="ModuleName">{{item.name}}</div>
                        <div class="ModuleNews" @click="GetScriptInfo(item.id)">
                          <img src="../../assets/img/menu.png" alt="" style="cursor: pointer">
                        </div>
                        <div class="ModuleCheck">
                          <el-checkbox :label="item.id"></el-checkbox>
                        </div>
                      </li>
                    </ul>
                  </el-checkbox-group>
                </div>
              </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="outerVisibleTwo = false">取 消</el-button>
            <el-button class="OKSend" @click="ChangeScript">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>


  </div>
</template>

<script>
    import UserInfo from "@/components/UserInfo";
    export default {
        name: "index",
      components: {UserInfo},
      data(){
          return{
            TaskName:'创建任务',              //是创建任务还是编辑任务
            TaskSelect:true,                 //true  创建任务  false   编辑任务
            TaskID:'',
            optionStatus:[
              {
              value: 'a',
              label: '全部'
              },
              {
                value: 'unchecked',
                label: '未审核'
              }, {
                value: 'pass',
                label: '已通过'
              }, {
                value: 'not_pass',
                label: '未通过'
              }
            ],
            valueStatus:'',
            options: [
              {
                value: '',
                label: '全部'
              },
              {
              value: 'free',
              label: '未开始'
            }, {
              value: 'using',
              label: '工作中'
            }, {
              value: 'fault',
              label: '故障'
            }
            ],
            value: '',                  //创建按钮旁边选择
            percentage: 30,               //进度条
            customColor: '#6D7CFF',       //进度条颜色
            List:[],



            outerVisible: false,        //创建任务  编辑任务  外层弹窗
            innerVisible: false,        //创建任务  编辑任务  内层弹窗


            outerVisibleTwo: false,        //脚本导入、外层弹窗
            innerVisibleTwo: false,        //脚本导入 内层弹窗


            optionsT: [
              {
              value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶',
              disabled: true
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭a'
            }
            ],
            valueT: '',


            radioList:[],                 //创建任务   控制器单选按钮列表
            radio:'',                     //创建任务  控制器单选按钮选择
            optionsTH: [],
            valueTH: '',


            ModuleListUn:[],                //全部空闲模块
            WhiteWither:'',                 //输入关键字查询
            ModuleInfo:'',                  //模块信息详情

            checkList: [],    //模块多项选择
            ProNameOrSN:'',                   //搜索内容
            TimerShi:'',                    //使用时间


            ModuleCheckList:'',             //脚本导入模块选中列表
            ScriptUn:{},                    //脚本导入全部信息
            valueScript:'',                  //脚本导入选中
            ChangeScriptId:'',               //当前任务对应脚本ID
            ScriptSelect:'',                //脚本搜索内容
            ScripInfo:'',                     //脚本信息详情
          }
      },
      methods:{

          //状态审核选择
        ChangeStatus(val){
          this.valueStatus = val
          if(val === 'a'){
            this.valueStatus = ''
          }
          this.AllTaskList()
        },
        //状态任务选择
        ChangeTask(val){
          this.value = val
          if(val === 'a'){
            this.valueStatus = ''
          }
          this.AllTaskList()
        },


        //模块类别筛选
        SelectModuleL(val){
          this.ModuleListUn = this.checkList = []
          this.$http.get(this.$conf.env.SelectModule + `${this.TaskID}/?status=free&module_category=${this.valueTH}&search=${this.WhiteWither}`).then(res=>{
            this.ModuleListUn = res.data
            for(var i in res.data){
              console.log(res.data[i].is_used == true)
              if(res.data[i].is_used == true){
                this.checkList.push(res.data[i].id)
              }
            }
            console.log(this.checkList)

          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },



        //修改脚本信息详情
        ChangeScript(){
          // this.ScriptList
          let obj = {
            scripts:this.ModuleCheckList
          }
          this.$http.put(this.$conf.env.ScriptList + `${this.ChangeScriptId}/`,obj).then(res=>{
            console.log(res.data)
            this.ScriptCloseDialong()
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },

        //初次全部请求
        GetTaskList(){
          //获取全部空闲的模块
          this.GetModuleSelectList()
          //获取所有任务列表
          this.AllTaskList()

          //获取所有未完成项目
          this.$http.get(this.$conf.env.UnfinishedProjects + 'created').then(res=>{
            this.optionsT = []
            console.log(res.data)
            for(var i in res.data){
              let a ={
                value:res.data[i].id,
                label:res.data[i].name
              }
              this.optionsT.push(a)
            }
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });




            //获取全部控制器
            this.GetControllers()

          //全部模块类别
          this.$http.get(this.$conf.env.Allmodulecategories).then(res=>{
            for(var i in res.data){
              let a ={
                value:res.data[i].id,
                label:res.data[i].name
              }
              this.optionsTH.push(a)
            }
            console.log(res.data)
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });

        },

        //获取全部任务
        AllTaskList(){
          this.$http.get(this.$conf.env.TaskList + `?status=${this.value}&search=${this.ProNameOrSN}&check_status=${this.valueStatus}`).then(res=>{
            console.log(res.data)
            this.List = res.data
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },

        //获取全部控制器
        GetControllers(){
          //获取全部空闲的控制器
          this.$http.get(this.$conf.env.UnfinishedControllers + 'free').then(res=>{
            this.radioList = res.data
            console.log(res.data)
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },

        //获取全部空闲的模块
        GetModuleSelectList(){
          if(this.TaskID !== ''){
            this.SelectModuleL()
            return
          }
          //获取全部空闲模块
          this.$http.get(this.$conf.env.UnfinishedModules + `free&search=${this.WhiteWither}`).then(res=>{
            this.ModuleListUn = res.data
            console.log(res.data)
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },

        //获取对应模块信息
        GetModuleInfo(id){
            this.$http.get(this.$conf.env.ModuleListGetTast + `${id}/`).then(res=>{
              this.innerVisible = true
              this.ModuleInfo = res.data.info
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            })
        },

        SendData(){
          let Obj = {
            "project":this.valueT,
            "estimated_time":this.TimerShi,
            "controller":this.radio,
            "modules":this.checkList
          }
          console.log(Obj)
          if(this.TaskSelect){
            this.$http.post(this.$conf.env.TaskList,Obj).then(res=>{
              this.List.push(res.data)
              this.beforeCloseDialog()
              console.log(res.data)
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });
          }else{
            this.$http.put(this.$conf.env.TaskList + `${this.TaskID}/`,Obj).then(res=>{
              this.beforeCloseDialog()
              console.log(res.data)
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });
          }

        },


        //脚本导入
        ScriptImport(id,index){
          this.ChangeScriptId = id
          this.ModuleCheckList = []
          this.$http.get(this.$conf.env.ScriptList + `${id}/`).then(res=>{
            console.log(res.data)
            for(var i in res.data.script){
              if(res.data.script[i].is_check == true){
                this.ModuleCheckList.push(res.data.script[i].id)
              }
            }
            this.valueScript = res.data.project.id
            this.ScriptUn = res.data
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
              this.outerVisibleTwo = true
        },

        //脚本选择搜索
        SearchScript(){

          this.$http.get(this.$conf.env.ScriptSearch + `?task_id=${this.ChangeScriptId}&search=${this.ScriptSelect}`).then(res=>{
            console.log(res.data)
            console.log(122122)
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });

        },


        //脚本信息详情
        GetScriptInfo(id){
          this.innerVisibleTwo = true;
          this.$http.get(this.$conf.env.ScriptSearch + `${id}/`).then(res=>{
            console.log(res.data)
            this.ScripInfo = res.data.info
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },


        //创建任务    编辑任务
        CreateTask(val,id){
          this.GetControllers()
          this.GetModuleSelectList()
          this.outerVisible = true
          if(val === 1){
            this.TaskName = '创建任务'
            this.TaskSelect = true
          }else if(val === 2){
            this.TaskName = '编辑任务'
            this.TaskSelect = false
            this.TaskID = id
            this.getTaskinfo(id)
          }
        },

        //获取某个任务详情   点击编辑按钮出发
        getTaskinfo(id){
          this.$http.get(this.$conf.env.TaskList + `${id}/`).then(res=>{
            console.log(res.data)
            this.TimerShi = res.data.estimated_time;
            this.valueT = res.data.project.id;
            this.radio = res.data.controller.id;
            for(var i in res.data.modules){
              this.ModuleListUn.push(res.data.modules[i])
              this.checkList.push(res.data.modules[i].id)
            }
            console.log(this.ModuleListUn)
            console.log(this.checkList)
            this.radioList.push(res.data.controller)
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },

        //删除某个任务
        RemoveTask(id,index){

          this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.delete(this.$conf.env.TaskList + `${id}/`).then(res=>{
              this.List.splice(index,1)
              this.$alert.successTit(this,'删除成功')
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });
          }).catch(() => {
            // this.$alert.Tit(this,'已取消删除')
          });
        },
        //弹窗关闭回掉
        beforeCloseDialog(){
          this.valueT = this.TimerShi = this.radio = this.checkList = this.TaskID = this.WhiteWither = this.valueTH = '';
          this.radioList = this.ModuleListUn = this.checkList = []
          this.outerVisible = false

        },

        //脚本导入弹窗关闭
        ScriptCloseDialong(){
          this.ChangeScriptId = this.ModuleCheckList = this.ScriptSelect = this.ScriptUn = this.valueScript = ''
          this.outerVisibleTwo = false
        },

        //模块详情弹窗关闭回掉
        ModuleInfoClose(){
          this.innerVisible = false
          this.ModuleInfo = ''
        },


        //脚本信息弹窗关闭
        ScriptInfoClose(){
          this.innerVisibleTwo = false
          this.ScripInfo = ''
        },


        //脚本配置
        ScriptAllocation(id){
          this.$router.push({
            name:'ScriptConfig',
            query:{
              id:id
            }
          })
        },


        //审核任务
        checktast(id,index){
          console.log(index)
          this.$confirm('是否通过审核此任务, 是否继续?', '提示', {
            confirmButtonText: '通过',
            cancelButtonText: '不通过',
            type: 'warning'
          }).then(() => {
            let Obj = {
              "check_status": "pass"
            }
            this.$http.put(this.$conf.env.checktast + `${id}/`,Obj).then(res=>{
              this.List[index].check_status = res.data.check_status
              this.$alert.successTit(this,'操作已完成')
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });
          }).catch(() => {
            let Obj = {
              "check_status": "not_pass"
            }
            this.$http.put(this.$conf.env.checktast + `${id}/`,Obj).then(res=>{
              this.List[index].check_status = res.data.check_status
              this.$alert.successTit(this,'操作已完成')
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });
          });
        }



        //所有通知消息

      },
      created() {
         this.GetTaskList()
      }
    }
</script>

<style lang="scss">

  .IndexContent{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    .Header{
      width: 100%;
      height:.9rem;
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 5px 0px rgba(2,24,68,0.08);
      padding-left: .58rem;
      padding-right: .87rem;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .SearchBox{
        width:4rem;
        height:.45rem;
        background:rgba(242,242,242,1);
        border-radius:23px;
        display: flex;
        input{
          width: 3.28rem;
          height: 100%;
          background: transparent;
          border: 0;
          outline: none;
          border-top-left-radius: 23px;
          border-bottom-left-radius: 23px;
          text-indent: 24px;
        }
        .SearchBut{
          width: .72rem;
          height: 100%;
          border-top-right-radius: 23px;
          border-bottom-right-radius: 23px;
          background: url("../../assets/img/search.png") center no-repeat;
          background-size: .26rem .28rem;
          cursor: pointer;
        }
      }
    }
    .Menu{
      flex: 1;
      box-sizing: border-box;
      background: #F4F4F4;
      padding:.1rem .12rem;
      overflow: hidden;
      .IndexSection{
        width: 100%;
        height: 100%;
        background: #fff;
        padding: .2rem .75rem 0 .52rem;
        box-sizing: border-box;
        overflow-y: scroll;
        overflow-x: hidden;

        &::-webkit-scrollbar {/*滚动条整体样式*/
          width: .12rem;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 4px;
        }
        &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          border-radius: 5px;
          -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
          background: #e6e6e6;
        }
        &::-webkit-scrollbar-track {/*滚动条里面轨道*/
          /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
          border-radius: 0;
          background: transparent;
        }
        .MenuHeader{
          width: 100%;
          height: .45rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span{
            font-size:.32rem;
            color:rgba(51,51,51,1);
            line-height: .45rem;
          }
          .RightBox{
            display: flex;
            .el-select{
              width:2.1rem;
              height:.42rem;
              background:rgba(253,253,253,1);
              box-shadow:0px 3px 7px 0px rgba(6,33,88,0.3);
              border-radius:21px;
              .el-input{
               height:100%;
              }
              input{
                padding: 0;
                text-indent: .17rem;
                border-radius: 21px;
                width: 100%;
                height: 100%;
              }
              .el-input__icon{
                line-height: .42rem;
                display: block;
              }
            }
            .el-select{
              margin-right: .22rem;
            }
            .Create{
              background:rgba(253,253,253,1);
              box-shadow:0px 3px 7px 0px rgba(6,33,88,0.3);
              border-radius:21px;
              padding-left: .17rem;
              padding-right: .23rem;
              align-items: center;
              display: flex;
              font-size:.2rem;
              font-family:Microsoft YaHei;
              color:rgba(70,74,83,1);
              cursor: pointer;
              img{
                width: .25rem;
                height: .25rem;
                margin-right: .1rem;
              }
            }
          }
        }
        .ProList{
          margin-top: 50px;
          ul{
            overflow: hidden;
            li{
              float: left;
              width: 4.2rem;
              box-sizing: border-box;
              padding: 0 .18rem .17rem .24rem;
              border:1px solid rgba(167,176,253,1);
              box-shadow:0px 2px 9px 1px rgba(2,24,68,0.1);
              border-radius:5px;
              margin-bottom: .32rem;
              .ListHeader{
                width: 100%;
                height:.62rem;
                border-bottom:1px solid #EDEDED;
                p{
                  font-size:.16rem;
                  color:rgba(57,59,106,1);
                  line-height:.62rem;
                  position: relative;
                  .RemoveTask{
                    position: absolute;
                    width: .3rem;
                    height: .3rem;
                    right: 0;
                    top: .18rem;
                    cursor: pointer;
                  }
                  span{
                    display: inline-block;
                    width:1rem;
                    height:.35rem;
                    background:#0A56C5;
                    border-radius:18px;
                    font-size:.16rem;
                    color:rgba(255,255,255,1);
                    line-height:.35rem;
                    text-align: center;
                    margin-left: .1rem;
                    &.Nostart{
                      background:#0A56C5;
                    }
                    &.working{
                      background:#0AC53F;
                    }
                    &.fault{
                      background:#C50A20;
                    }
                  }
                }
              }
              .ListContent{
                position: relative;
                .weitongguo,.daishenhe{
                  position: absolute;
                  width: 1.24rem;
                  height: 1.1rem;
                  right: .35rem;
                  top: .24rem;
                }
                p{
                  font-size:.16rem;
                  font-family:Microsoft YaHei;
                  color:rgba(30,58,126,1);
                  line-height:.38rem;
                }
                .el-progress{
                  width: 100%;
                  height: .2rem;
                  display: flex;
                  margin-top: 2px;
                  .el-progress-bar__outer{
                    height: .2rem !important;
                  }
                }
                .BottomButList{
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                  flex-wrap: wrap;
                  .but{
                    width:48%;
                    margin-right: 2%;
                    height:.38rem;
                    background:rgba(109,124,255,1);
                    border-radius:5px;
                    font-size:.16rem;
                    color:rgba(255,255,255,1);
                    line-height:.38rem;
                    text-align: center;
                    margin-top: .14rem;
                    cursor: pointer;
                    &:nth-child(2n){
                      margin-right: 0;
                    }
                  }
                }
                .BottomButListAdmin{
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                  /*flex-wrap: wrap;*/
                  div{
                    font-size:.16rem;
                    color:rgba(255,255,255,1);
                    text-align: center;
                  }
                  .but{
                    width:1.2rem;
                    border-radius:5px;
                    margin-right:.1rem;
                    height:.38rem;
                    line-height:.38rem;
                    margin-top: .09rem;
                    background:rgba(109,124,255,1);
                    cursor: pointer;
                    &:nth-child(2n){
                      margin-right: 0;
                    }
                  }
                  .auditPro{
                    width:1.2rem;
                    background:rgba(109,124,255,1);
                    height:.85rem;
                    border-radius:5px;
                    margin-top: .09rem;
                    line-height: .85rem;
                    cursor: pointer;
                  }
                }
              }
              &:nth-child(3n-1){
                margin: 0 1rem;
              }
            }
          }
        }



        //弹窗
        .Script{
          width:7.2rem;
          height:6.58rem;
          background:rgba(255,255,255,1);
          border-radius:6px;
          margin-top: 1.73rem !important;
        }
        .el-dialog{
          width: 7.2rem;
          background:rgba(255,255,255,1);
          border-radius:6px;
          margin-top: .8rem !important;
          .el-dialog__header{
            width: 100%;
            padding: 0;
            height: .78rem;
            text-align: center;
            line-height: .78rem;
            font-size:.32rem;
            font-weight:bold;
            color:rgba(48,48,48,1);
          }
          .el-dialog__body{
            padding: 0 .45rem 0 .52rem;
            .ProductBox{
              width: 100%;
              display: flex;
              height: .42rem;
              .PName{
                width:1rem;
                font-size:.2rem;
                font-family:Microsoft YaHei;
                color:rgba(48,48,48,1);
                line-height:.42rem;
                white-space: nowrap;
              }
              .el-select{
                flex: 1;
                height: .4rem;
                input{
                  height: .42rem;
                  display: block;
                }
                i{
                  display: block;
                  line-height: .42rem;
                }
              }
            }
            .ShiTime{
              width: 100%;
              display: flex;
              height: .42rem;
              margin-top:.2rem;
              span{
                width: 1rem;
                font-size: .2rem;
                font-family: Microsoft YaHei;
                color: #303030;
                line-height: .42rem;
                white-space: nowrap;
              }
              input{
                flex: 1;
                height: .4rem;
                border: 1px solid #DCDFE6;
                background: #fff;
                border-radius: 4px;
                margin: 0;
                outline: none;
                text-indent: 15px;
                color: #606266;
              }
            }
            .controllerBox,.ModuleBox{
              display: flex;
              margin-top: .2rem;
              width: 100%;
              .PName{
                width:1rem;
                font-size:.2rem;
                font-family:Microsoft YaHei;
                color:rgba(48,48,48,1);
                line-height:.42rem;
                text-align: right;
                white-space: nowrap;
              }
              .controllerList{
                flex: 1;
                width: calc(100% - 1rem);
                .ControTit{
                  width:100%;
                  height:.42rem;
                  background:rgba(228,234,236,1);
                  border-radius:5px;
                  font-size:.18rem;
                  font-family:Microsoft YaHei;
                  text-indent: .16rem;
                  color:rgba(48,48,48,1);
                  line-height:.42rem;
                }
                .ContList{
                  width: 100%;
                  height: 2rem;
                  background: #5357B8;
                  overflow: hidden;
                  .el-radio-group{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    overflow-x: hidden;
                    overflow-y:scroll;
                    flex-direction: column;
                    &::-webkit-scrollbar {/*滚动条整体样式*/
                      width: .16rem;     /*高宽分别对应横竖滚动条的尺寸*/
                      height: 4px;
                    }
                    &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                      width: .1rem;
                      background:rgba(140,143,213,1);
                      border-radius:3px;
                    }
                    &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                      width:.16rem;
                      background:rgba(83,87,184,1);
                    }

                    label{
                      height: .4rem;
                      line-height: .4rem;
                      margin: 0;
                      padding: 0 .16rem;
                      box-sizing: border-box;
                      .el-radio__label{
                        float: left;
                        padding: 0;
                        color: #fff;
                      }
                      .el-radio__input{
                        float: right;
                        line-height: .4rem;
                      }
                      &:nth-child(2n){
                        background: #C3C5F1;
                      }
                      &:nth-child(2n-1){
                        background:#7578C8;
                      }
                    }
                  }
                }
              }
            }
            .ModuleBox{
              .controllerList{
                .ControTit{
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  .el-select{
                    text-indent: 0;
                    width:1.63rem;
                    height:.32rem;
                    input{
                      height:.3rem;
                      display: block;
                      background: transparent;
                      border:1px solid rgba(117,120,200,1);
                    }
                    i{
                      display: block;
                      line-height: .32rem;
                      color:rgba(117,120,200,1);
                    }
                  }
                  .SearchWord{
                    width:2.81rem;
                    height:.3rem;
                    border:1px solid rgba(117,120,200,1);
                    border-radius:3px;
                    display: flex;
                    input{
                     width: 2.39rem;
                      height: 100%;
                      background: transparent;
                      outline: none;
                      border: 0;
                      font-size:.18rem;
                      color:rgba(153,153,153,1);
                      line-height:.32rem;
                      text-indent: .14rem;
                    }
                    .SearchButS{
                      width: .42rem;
                      height: 100%;
                      background: url("../../assets/img/searchTwo.png") center no-repeat;
                      background-size: .18rem .18rem;
                      cursor: pointer;
                    }
                  }
                }
                .ContList{
                  height: 2.56rem;
                  display: flex;
                  flex-direction: column;
                  .TabTit{
                    width: 100%;
                    height: .4rem;
                    background: #4F53AF;
                    ul{
                      width: 100%;
                      height: 100%;
                      display: flex;
                      box-sizing: border-box;
                      li{
                        width: 40%;
                        font-size:.16rem;
                        color:rgba(255,255,255,1);
                        line-height:.4rem;
                        text-align: center;
                        &:last-child{
                          width: 20%;
                          text-indent: -.8rem;
                        }
                      }
                    }
                  }
                  .TabCon{
                    flex: 1;
                    overflow: hidden;
                    .el-checkbox-group{
                      width: 100%;
                      height: 100%;
                      overflow-x: hidden;
                      overflow-y: scroll;

                      &::-webkit-scrollbar {/*滚动条整体样式*/
                        width: .16rem;     /*高宽分别对应横竖滚动条的尺寸*/
                        height: 4px;
                      }
                      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                        width: .1rem;
                        background:rgba(140,143,213,1);
                        border-radius:3px;
                      }
                      &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                        width:.16rem;
                        background:rgba(83,87,184,1);
                      }
                      ul{
                        width: 100%;
                        height: 100%;
                        li{
                          width: 100%;
                          height: .4rem;
                          line-height: .4rem;
                          display: flex;
                          text-align: center;
                          &:nth-child(2n){
                            background: #C3C5F1;
                          }
                          &:nth-child(2n-1){
                            background: #7578C8;
                          }
                          .el-checkbox__label{
                            display: none;
                          }
                          .ModuleNum,.ModuleName{
                            width: 40%;
                            height: 100%;
                            font-size: .16rem;
                            color: #fff;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                          }
                          .ModuleNews,.ModuleCheck{
                            width: 10%;
                            height: 100%;
                            font-size: .16rem;
                            color: #fff;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            overflow: hidden;
                            img{
                              width:.26rem;
                              height:.26rem;
                              display: block;
                              margin: .07rem auto 0;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          .el-dialog__footer{
            padding: 0;
            .dialog-footer{
              text-align: center;
              .el-button{
                border:1px solid rgba(191,191,191,1);
                border-radius:4px;
                color: #191919;
              }
              .OKSend{
                background:rgba(109,124,255,1);
                color:rgba(255,255,255,1);
              }
            }
          }
        }
      }
    }
    .el-dialog__wrapper{
      position: absolute;
    }
  }



  //弹窗
  .ModuleIntroduce{
    width:6.42rem;
    height:6.27rem;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 9px 1px rgba(2,24,68,0.1);
    border-radius:5px;
    margin-top: 2.38rem !important;
    display: flex;
    flex-direction: column;
    .el-dialog__header{
      padding: 0;
      width:100%;
      font-size:.26rem;
      font-family:Microsoft YaHei;
      color:rgba(48,48,48,1);
      line-height:.72rem;
      text-align: center;
    }
    .el-dialog__body{
      padding: 4px;
      overflow: hidden;
      p{
        overflow-y: scroll;
        overflow-x: hidden;
        padding: 10px;
        font-size: .18rem;
        text-indent: .36rem;
        line-height: .32rem;
        height: 100%;
        &::-webkit-scrollbar {/*滚动条整体样式*/
          width: .04rem;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 4px;
        }
        &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          width: .04rem;
          background:#666;
          border-radius:3px;
        }
        &::-webkit-scrollbar-track {/*滚动条里面轨道*/
          width:.04rem;
          background:#fff;
        }
      }
    }
  }

  //脚本信息
  .ScriptIntroduce{
    width:6.42rem;
    height:6.27rem;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 9px 1px rgba(2,24,68,0.1);
    border-radius:5px;
    margin-top: 1.99rem !important;
    display: flex;
    flex-direction: column;
    .el-dialog__header{
      padding: 0;
      width:100%;
      font-size:.26rem;
      font-family:Microsoft YaHei;
      color:rgba(48,48,48,1);
      line-height:.72rem;
      text-align: center;
    }
    .el-dialog__body{
      padding: 4px;
      overflow: hidden;
      p{
        overflow-y: scroll;
        overflow-x: hidden;
        padding: 10px;
        font-size: .18rem;
        text-indent: .36rem;
        line-height: .32rem;
        height: 100%;
        &::-webkit-scrollbar {/*滚动条整体样式*/
          width: .04rem;     /*高宽分别对应横竖滚动条的尺寸*/
          height: 4px;
        }
        &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
          width: .04rem;
          background:#666;
          border-radius:3px;
        }
        &::-webkit-scrollbar-track {/*滚动条里面轨道*/
          width:.04rem;
          background:#fff;
        }
      }
    }
  }

  .el-message{
    min-width: 2.8rem;
    width: 2.8rem;
    .el-icon-info,.el-icon-success{
      font-size: .24rem;
    }
  }

</style>
