<template>
  <div class="ScriptContent">

    <!--    头部-->
    <div class="Header">
      <div class="SearchBox">
      </div>
      <UserInfo></UserInfo>
    </div>
    <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
    <div class="Menu">
      <div class="ScriptSection">
        <div class="MenuHeader">
          <span>脚本管理</span>
          <div class="RightBox">
            <div class="Create"  @click="ProjectChange(1)">
              <img src="../../assets/img/create.png" alt="">
              新增
            </div>
          </div>
        </div>
        <div class="select-fax">
          <div class="item-select">
            <span class="item-tit">脚本类别：</span>
            <el-select @change="SelectList" v-model="valueT" placeholder="请选择">
              <el-option
                v-for="item in scriptsCategory"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="item-select">
            <div class="SearchBox">
              <input type="text" placeholder="请输入关键字进行搜索" v-model="SearchPM" @keyup.enter="SelectList">
              <div @click="SelectList" class="SearchBut"></div>
            </div>
          </div>
        </div>
        <div class="ProList">
          <div class="ProN">
            <div class="ProHeader">
              <div class="ProNum">脚本编号</div>
              <div class="Scriptname">脚本名称</div>
              <div class="ScriptNews">类别</div>
              <div class="CratePer">创建人</div>
              <div class="CrateTimer">创建日期</div>
              <div class="Operation">操作</div>
            </div>
            <div class="proMenu">
              <div class="procant" v-for="(item,index) in ProList" :key="index">
                <div class="ProNum">{{item.script_number}}</div>
                <div class="Scriptname"><span style="cursor: pointer;" @click="GoScript(item)">{{item.name}}</span></div>
                <div class="ScriptNews">{{item.script_category}}</div>
                <div class="CratePer">{{item.user}}</div>
                <div class="CrateTimer">{{item.create_time}}</div>
                <!-- <div class="EndTier">{{item.update_time}}</div> -->
                <div class="Operation">
                  <div>
                    <img src="../../assets/img/cha.png" alt="" @click="ProjectChange(3,item.id)">
                    <span>查看</span>
                  </div>
                  <div>
                    <img src="../../assets/img/change.png" alt="" @click="ProjectChange(2,item.id)">
                    <span>编辑</span>
                  </div>
                  <div>
                    <img src="../../assets/img/setting.png" alt="">
                    <span>配置</span>
                  </div>
                  <div>
                    <img src="../../assets/img/copyScript.png" alt="" @click="ProjectChange(4,item.id)">
                    <span>复制</span>
                  </div>
                  <div>
                    <img src="../../assets/img/removePro.png" alt="" @click="RemoveScript(item.id)">
                    <span>删除</span>
                  </div>
                </div>
              </div>
            </div>
            <el-dialog
              :title="dialogname"
              :visible.sync="dialogVisible"
              :close-on-click-modal='false'
              :close-on-press-escape='false'
              :before-close="beforeCloseDialog">
              <div class="Label">脚本名称</div>
              <input type="text" placeholder="请输入脚本名称" v-model="ProNum" :disabled="WhiteTrueFalse">
              <div class="Label">脚本类别</div>
              <el-select v-model="scriptsCategoryName"  @change="SelectCategoryFor" placeholder="请选择" :disabled="WhiteTrueFalse">
                <el-option
                  v-for="item in scriptsCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <div class="Label" v-if="scriptCategoryForSHORT != ''">运行</div>
              <div v-if="scriptCategoryForSHORT != ''" style="display:flex;" class="teli-lab">
                <div style="width :3.98rem; ">
                  <input type="number" placeholder="请输入1-999之间的数字" v-model="RunNum" :disabled="WhiteTrueFalse">
                </div>
                <div style="width :.76rem; ">
                  <el-select v-model="timerSelectName" placeholder=" " :disabled="WhiteTrueFalse">
                    <el-option
                      v-for="item in timerSelect"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </div>


              <div class="Label" v-if="scriptCategoryForSHORT == 'ZHNY'">间隔运行</div>
               <el-select v-if="scriptCategoryForSHORT == 'ZHNY'" v-model="jaingeName" placeholder=" " :disabled="WhiteTrueFalse">
                <el-option
                  v-for="item in jainge"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div class="Label" v-if="jaingeName">运行时长</div>
              <input type="number" v-if="jaingeName" placeholder="请输入0-999，999，999之间的数字,单位：Min" v-model="RunTimer" :disabled="WhiteTrueFalse">


              <div class="Label" v-if="jaingeName">休息时长</div>
              <input type="number" v-if="jaingeName" placeholder="请输入0-999，999，999之间的数字,单位：Min" v-model="xiuTimer" :disabled="WhiteTrueFalse">

              <div class="Label" v-if="scriptCategoryForSHORT == 'ZHNY'">波特率</div>
               <el-select v-if="scriptCategoryForSHORT == 'ZHNY'" v-model="choicesName" placeholder=" " :disabled="WhiteTrueFalse">
                <el-option
                  v-for="item in choices"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

              <div class="Label">脚本信息</div>
              <el-input
                type="textarea"
                :rows="6"
                maxlength="40"
                :disabled="WhiteTrueFalse"
                placeholder="请输入英文或中文，长度40中文字符"
                v-model="textarea">
              </el-input>

              <span slot="footer" class="dialog-footer" v-if="!WhiteTrueFalse">
                <el-button @click="beforeCloseDialog">取 消</el-button>
                <el-button type="primary" @click="AddScript">确 定</el-button>
              </span>
            </el-dialog>

          </div>
        </div>
        <el-pagination
          background
          layout=" prev, pager, next, jumper"
          :total="total"
          :page-size="PageSize"
          :current-page.sync="CurrentChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
    import UserInfo from "@/components/UserInfo";
    export default {
        name: "Script",
      components: {UserInfo},
      data(){
        return{
          total:12,     //总条数
          PageSize:this.$store.state.limit,      //一页显示多少条
          CurrentChange:1,         //当前页码
          ProList:[],
          IsSelect:1,     //选择新增OR编辑  true  为新增  false  为编辑  查看
          WhiteTrueFalse:false,          //是否禁用所有输入框  false为不禁用


          dialogVisible: false,           //添加项目弹窗
          dialogname:'新增脚本',

          textarea: '',             //脚本信息
          ProNum:'',                //脚本编号
          ScriptName:'',            //脚本名称
          ScriptID:'',               //修改当前脚本的iD
          producename:'',             //搜索脚本
          options: [{
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
          }],
          valueT : '',
          SearchPM : '',
          StatusList : [],
          scriptsCategory : [],
          scriptsCategoryName : '',
          scriptCategoryForSHORT : '',
          RunNum : '',
          timerSelect : [
            {
              value: 'time',
              label: 'Min'
            },
            {
              value: 'sum',
              label: '次'
            }
          ],
          timerSelectName : '',
          jainge : [
             {
              value: true,
              label: 'Y'
            },
            {
              value: false,
              label: 'N'
            }
          ],
          jaingeName : false,
          choices : [
            {
              value: '0',
              label: '无'
            },
            {
              value: '1',
              label: '110'
            },
             {
              value: '2',
              label: '300'
            },
             {
              value: '3',
              label: '600'
            },
             {
              value: '4',
              label: '1200'
            },
             {
              value: '5',
              label: '2400'
            },
             {
              value: '6',
              label: '4800'
            },
             {
              value: '7',
              label: '9600'
            },
             {
              value: '8',
              label: '14400'
            },
             {
              value: '9',
              label: '19200'
            },
             {
              value: '10',
              label: '38400'
            },
            {
              value: '11',
              label: '56000'
            },
            {
              value: '12',
              label: '115200'
            }
          ],
          choicesName : '',
          RunTimer : '',
          xiuTimer : ''
        }
      },
      mounted(){
        this.$http.get(this.$conf.env.GetSystem).then(res=>{
          console.log(res)
          this.scriptsCategory = res.data.message
        }).catch(err=>{
          this.$alert.errorTit(this,err.response.data.err)
        });
        
      },
      methods:{
        handleCurrentChange(val){
          this.CurrentChange = val
          this.GetSystemScrriptList(this.producename)

        },
        //IsSelect   选择新增OR编辑  true  为新增  false  为编辑
        ProjectChange(val,id){
          if(val === 1 ){
            this.IsSelect = 1;
            this.WhiteTrueFalse = false;
            this.dialogname = '新增脚本';
          }else if(val === 2){
            this.IsSelect = 2;
            this.WhiteTrueFalse = false;
            this.ScriptID = id;
            this.dialogname = '编辑脚本';
            this.getScriptPel()
          }else if(val === 3){
            this.IsSelect = 3;
            this.WhiteTrueFalse = true;
            this.dialogname = '查看脚本';
            this.ScriptID = id;
            this.getScriptPel()
          }else if(val === 4){
            this.IsSelect = 4;
            this.WhiteTrueFalse = false;
            this.ScriptID = id;
            this.getScriptPel()
            this.dialogname = '复制脚本';
          }
          this.dialogVisible = true;
        },


        //删除某个脚本
        RemoveScript(id){
          this.$http.delete(this.$conf.env.AddScriptList+ `${id}/`).then(res=>{
            if(this.ProList.length < 2 && this.CurrentChange > 1){
              this.CurrentChange = this.CurrentChange - 1
            }
            this.GetSystemScrriptList(this.producename)
            this.$alert.successTit(this,'删除成功')
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },
        getScriptPel(){
          this.$http.get(this.$conf.env.AddScriptList+ `${this.ScriptID}/`).then(res=>{
            var {baud_rate,id,info,is_interval,name,rest_time,run_time,script_category,script_number,set_time,set_num} = res.data.message
              // this.data
                console.log(res.data.message)
                this.ProNum = name
                this.scriptsCategoryName = script_category
                this.textarea = info
                this.RunNum = set_time == 0 ? set_num : set_time
                this.timerSelectName = set_time == 0? 'sum' : 'time'
                this.jaingeName = is_interval
                this.xiuTimer = rest_time
                this.RunTimer = run_time
                this.choicesName = baud_rate

          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },

        //添加脚本 修改脚本
        AddScript(){
           let Obj = {
              "name": this.ProNum,
              "script_category": this.scriptsCategoryName,
              "info": this.textarea,
              "set_time": this.timerSelectName == 'sum' ? 0 : this.RunNum * 1,
              "set_num": this.timerSelectName == 'sum' ? this.RunNum * 1 : 0,
              "is_interval": this.jaingeName,
              "rest_time":this.jaingeName == true ? this.xiuTimer * 1: null,
              "run_time":this.jaingeName == true ? this.RunTimer  * 1: null,
              "baud_rate": this.choicesName,
            }
          if(this.IsSelect === 1){
            this.$http.post(this.$conf.env.AddScriptList,Obj).then(res=>{
              console.log(res)
              this.$alert.successTit(this,'增加成功')
              this.GetSystemScrriptList(this.producename)
              this.beforeCloseDialog()
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });
          }else if(this.IsSelect === 2){
            // let Obj = {
            //   //  timerSelectName == 0? 'sum' : 'time'
            //    "name": this.ProNum,
            //   "script_category": this.scriptsCategoryName,
            //   "info": this.textarea,
            //   "set_time": this.timerSelectName == 'sum' ? '0' : this.RunNum,
            //   "set_num": this.timerSelectName == 'sum' ? this.RunNum : '0',
            //   "is_interval": this.jaingeName,
            //   "rest_time":this.jaingeName == true ? this.xiuTimer : '',
            //   "run_time":this.jaingeName == true ? this.RunTimer : '',
            //   "baud_rate": this.choicesName
            // }
            this.$http.put(this.$conf.env.AddScriptList + `${this.ScriptID}/`,Obj).then(res=>{
              console.log(res)
              if(res.code == -1) return
              this.$alert.successTit(this,'修改成功')
              this.GetSystemScrriptList(this.producename)
              this.beforeCloseDialog()
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });
          }else if(this.IsSelect === 4){
            let Obj = {
              "copied_script": this.ScriptID,
              "name": this.ProNum,
              "info": this.textarea,
            }
            this.$http.post(this.$conf.env.CopyScript,Obj).then(res=>{
              this.$alert.successTit(this,'复制成功')
              this.GetSystemScrriptList(this.producename)
              this.beforeCloseDialog()
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });
          }
        },

        //筛选脚本列表

        SelectList(){
          this.CurrentChange=1;
          this.GetSystemScrriptList()
        },

        SelectCategoryFor(E){
          for(var i in this.scriptsCategory){
            // if()

          //    timerSelect : [
          //   {
          //     value: 'time',
          //     label: 'Min'
          //   },
          //   {
          //     value: 'sum',
          //     label: '次'
          //   }
          // ],
          // timerSelectName : '',
            if(E == this.scriptsCategory[i].id){
              this.scriptCategoryForSHORT = this.scriptsCategory[i].for_short;
              if(this.scriptsCategory[i].for_short == "BCM"){
                this.timerSelect = [
                  {
                    value : 'time',
                    label : 'Min'
                  }
                ];
                this.timerSelectName = 'time'
              }else{
                 this.timerSelect = [
                  {
                    value : 'time',
                    label : 'Min'
                  },
                  {
                    value : 'sum',
                    label : '次'
                  },
                ]
              }
              return
            }
          }
        },


        GetSystemScrriptList(producename){
          this.$http.get(this.$conf.env.AddScriptList + `?page=${this.CurrentChange}&script_category=${this.valueT}&search=${this.SearchPM}&page_size=${this.PageSize}`).then(res=>{
            console.log(res)
            this.total = res.data.count
            this.ProList = res.data.results
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },

        //搜索列表名称
        getlist(){
          this.CurrentChange = 1;
          this.GetSystemScrriptList(this.producename)
        },


        //点击脚本名称进行跳转
        GoScript(item){
          this.$router.push({
            name:'ConfigurationScript',
            query:{
              id:item.id,
              name:item.name
            }
          })
        },

        //关闭弹窗回掉
        beforeCloseDialog(){
          this.ProNum = this.scriptsCategoryName = this.textarea = this.timerSelectName = 
          this.RunNum = this.xiuTimer = this.RunTimer = this.choicesName ='';
          this.jaingeName = false
          this.dialogVisible = false
        }
      },
      created() {
          this.GetSystemScrriptList(this.producename)
          console.log(this.$route.query.id)
      }
    }
</script>

<style lang="scss">

  .ScriptContent{
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
      .ScriptSection{
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
              margin-left: .22rem;
              cursor: pointer;
              line-height: .42rem;
              img{
                width: .25rem;
                height: .25rem;
                margin-right: .1rem;
              }
            }
          }
        }
        .select-fax{
          width: 100%;
          height: .5rem;
          display: flex;
          .item-select{
            margin-right: .6rem;
            display: flex;
            align-items: center;
            .item-tit{
              font-size: .18rem;
              color: #666666;
            }
            /deep/ .el-select{
              width: 2rem;
              height: .32rem;
              input{
                height: .45rem;
                font-size: .16rem;
                color: #333333;
                padding: 0 .12rem;
              }
              .el-select__caret{
                font-size: .16rem;
                width: .17rem;
              }
            }
             .SearchBox{
              width:3rem;
              height:.32rem;
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
            /deep/ .el-input{
              width: 2rem;
              height: .32rem;
              border: .01rem solid #c9c9c9;
              border-radius: .04rem;
               input{
                width: 2rem;
                height: 100%;
                background: transparent;
                border: 0;
                outline: none;
                border-top-left-radius: 23px;
                border-bottom-left-radius: 23px;
                border-radius: .04rem;
                padding: 0 .4rem;
               }
               i{
                 line-height: .32rem;
               }
            }
          }
        }
        .ProList{
          width: 100%;
          height: 7.5rem;
          font-size:.14rem;
          .ProN{
            border:1px solid #E4EAEC;
            .ProHeader{
              width: 100%;
              height: .5rem;
              background:rgba(228,234,236,1);
              color:rgba(62,62,62,1);
              line-height:.5rem;
              display: flex;
              text-align: center;
              /*ProNum  Scriptname  ProCreatName  CrateTime  Operation*/
              .ScriptNews{
                width: 25%;
                height: .5rem;
              }
              .Scriptname{
                width: 20%;
                height: .5rem;
              }
              .ProNum,.CratePer{
                width: 10%;
                height: .5rem;
              }
              .CrateTimer{
                width: 20%;
                height: .5rem;
              }
              .Operation{
                width: 15%;
                height: .5rem;
              }
            }
            .proMenu{
              width: 100%;
              .procant{
                width: 100%;
                height: .5rem;
                background:rgba(228,234,236,1);
                color:rgba(62,62,62,1);
                line-height:.5rem;
                display: flex;
                text-align: center;
                background: #fff;
                .ScriptNews{
                  width: 25%;
                  height: .5rem;
                }
                .Scriptname{
                  width: 20%;
                  height: .5rem;
                }
                .ProNum,.CratePer{
                  width: 10%;
                  height: .5rem;
                }
                .CrateTimer{
                  width: 20%;
                  height: .5rem;
                }
                .Operation{
                  width: 15%;
                  height: .5rem;
                }
                &:nth-child(2n){
                  background: #E4EAEC;
                }
                .Operation{
                   display: flex;
                  justify-content: center;
                  align-items: center;
                  > div{
                    height: 100%;
                    display: flex;
                    align-items: center;
                    position: relative;
                    span{
                      width: .72rem;
                      height: .36rem;
                      background: rgba(0,0,0,0.5);
                      box-shadow: .02rem 0 .06rem 0 rgba(32,121,232,0.16);
                      font-size: .14rem;
                      text-align: center;
                      color: #ffffff;
                      line-height: .36rem;
                      position: absolute;
                      right: -.68rem;
                      top: -.26rem;
                      border-radius: .06rem;
                      opacity: 0;
                      transition: opacity .3s;
                      z-index: -1;
                    }
                    
                  }
                  img{
                    width: .26rem;
                    height: .28rem;
                    margin: .08rem;
                    cursor: pointer;
                    &:hover{
                      + span{
                        opacity: 1;
                      z-index: 3;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        .el-pagination{
          display: flex;
          justify-content: flex-end;
          margin-top: .3rem;
        }
        .el-pagination__jump{
          font-size:.14rem;
          color:rgba(87,96,119,1);
          line-height:.48rem;
        }
        .el-pagination__editor.el-input .el-input__inner{
          height: .46rem;
        }
        .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
          border:1px solid rgba(194,202,216,1);
          background: #fff;
          width: .48rem;
          height: .48rem;
          border-right: 0;
          line-height: .48rem;
          margin:0;


          font-size:.16rem;
          font-family:Microsoft YaHei;
          font-weight:400;
          color:rgba(87,96,119,1);
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active{
          background: #C2CAD8;
        }
        .el-pagination.is-background .el-pager li:not(.disabled):hover{
          color: #576077;
        }
        .el-pagination .btn-next .el-icon, .el-pagination .btn-prev .el-icon{
          color: #C2CAD8;
        }
        .btn-next{
          border-right:1px solid rgba(194,202,216,1) !important;
        }
        .btn-prev,.btn-next{
          background: #fff !important;
        }
        .el-dialog{
          width:5.38rem;
          // height:6.31rem;
          background:rgba(255,255,255,1);
          border-radius:6px;
          padding-bottom: .24rem;
          margin-top: .4rem !important;
          .el-dialog__header{
            padding: .32rem 0 0;
            text-align: center;
            font-size:.32rem;
            font-family:Microsoft YaHei;
            font-weight:bold;
            color:rgba(48,48,48,1);
            line-height:.43rem;
          }
          .el-dialog__headerbtn{
            width: .38rem;
            height: .38rem;
            background: #B2B2B2;
            border-radius: 50%;
            i{
              color: #fff;
            }
          }
          .el-dialog__body{
            padding: 0 .31rem;
            .Label{
              font-size:.19rem;
              line-height: .5rem;
              font-family:Microsoft YaHei;
              color:rgba(44,43,43,1);
            }
            .teli-lab{
                justify-content: space-between;
              input{
                width: 100%;
              }
              /deep/ .el-select{
                input{
                  padding-left: .1rem;
                }
              }
            }
            /deep/ .el-select{
              width: 100%;
              i{
                line-height: .36rem;
              }
            }
            input{
              width:100%;
              height:.36rem;
              border:1px solid rgba(230,230,230,1);
              display: block;
              background: transparent;
              outline: none;
              padding: 0;
              padding-left: .27rem;
              box-sizing: border-box;
              line-height: .36rem;
              box-sizing: border-box;
            }
            textarea{
              width:100%;
              resize: none;
            }
          }
          .el-dialog__footer{
            padding: 0;
            text-align: center;
            margin-top: .2rem;
          }
        }
      }
    }
    .el-dialog__wrapper{
      position: absolute;
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
