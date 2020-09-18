3+<template>
  <div class="PMContent">

    <!--    头部-->
    <div class="Header">
      <div class="SearchBox"></div>
      <UserInfo></UserInfo>
    </div>
    <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
    <div class="Menu">
      <div class="PMSection">
        <div class="MenuHeader">
          <span>控制器管理</span>
          <div class="RightBox">
            <!-- <el-select v-model="valueone" placeholder="状态请选择" @change="ChangeSelectBut">
              <el-option
                v-for="item in optionsone"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                >
              </el-option>
            </el-select> -->
            <div class="Create" @click="getkzqdetail(1)">
              <img src="../../assets/img/create.png" alt="">
              创建
            </div>
          </div>
        </div>
        <div class="select-fax">
          <div class="item-select">
            <span class="item-tit">状态:</span>
            <el-select @change="SelectList" v-model="valueT" placeholder="请选择">
              <el-option
                v-for="item in StatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
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
              <div class="ProNum">编号</div>
              <div class="ProName">控制器名称</div>
              <div class="ProCreatName">状态</div>
              <div class="Controst">创建日期</div>
              <div class="CrateTime">位置</div>
              <div class="Operation">操作</div>
            </div>
            <div class="proMenu">
              <div class="procant" v-for="(item,index) in ProList" :key="index">
                <div class="ProNum">{{item.con_number}}</div>
                <div class="ProName">{{item.name}}</div>
                <div class="ProCreatName">{{item.status}}</div>
                <div class="Controst">
                  {{item.create_time}}
                  <!-- <span :key="inx" v-for="(a,inx) in item.con_subsets" :class="a.is_alive == true ? 'GreenSpan' : 'RedSpan'"></span> -->
                </div>
                <div class="CrateTime">{{item.location}}</div>
                <div class="Operation">
                   <div>
                    <img src="../../assets/img/cha22.png" alt="" @click="getkzqdetail(2,item.id)">
                    <span>查看</span>
                  </div>
                  <div>
                    <img src="../../assets/img/tj.png" alt="" @click="getkzqdetail(3,item.id)">
                    <span>编辑</span>
                  </div>
                  <div v-if="item.status == '维护'">
                    <img src="../../assets/img/hfii.png" alt="" @click="whkzq(item.id,item.status)">
                    <span>恢复</span>
                  </div>
                  <div v-else>
                    <img src="../../assets/img/set.png" alt="" @click="whkzq(item.id,item.status)">
                    <span>维护</span>
                  </div>
                  <div>
                    <img src="../../assets/img/removePro.png" alt="" @click="removekzq(item.id)">
                    <span>删除</span>
                  </div>
                  <!-- <img src="../../assets/img/setting.png" alt="" @click="SetControllerChil(item.id)">
                  <img @click="Sendstatus(item.maintain_status,item.id,index)" v-if="item.maintain_status === 1" src="../../assets/img/maintain.png" alt="">
                  <img @click="Sendstatus(item.maintain_status,item.id,index)" v-else src="../../assets/img/recover.png" alt=""> -->
                </div>
              </div>
            </div>
            <el-dialog
              :title="dialogname"
              :visible.sync="dialogVisible"
              custom-class="AddController"
              :close-on-press-escape='false'
              :close-on-click-modal	='false'
              :destroy-on-close='true'
              :before-close="beforeCloseS">
              <el-form ref="form" :model="form">

                 <el-form-item 
                  prop="name" 
                 :rules="[
                    { required: true, message: ' '},
                  ]"
                  label="名称">
                  <!-- <div class="Label">名称</div> -->
                  <el-input v-model="form.name" placeholder="请输入控制器名称"></el-input>
                </el-form-item>

                <el-form-item 
                  label="资产编号"
                  prop="asset_number">
                  <el-input v-model="form.asset_number" :maxlength="10" placeholder="英文、数字组合的10位控制器名称"></el-input>
                </el-form-item>

                 <el-form-item 
                  label="内网地址"
                  :rules="[
                    { required: true, message: ' '},
                  ]"
                  prop="inner_host">
                  <el-input v-model="form.inner_host" placeholder="例：192.168.0.118或者controller.com"></el-input>
                </el-form-item>

                <el-form-item
                  label="内网端口"
                  prop="inner_port"
                  :rules="[
                    { required: true, message: ' '},
                  ]">
                  <el-input v-model="form.inner_port" type="number" placeholder="请输入内网端口号"></el-input>
                </el-form-item>

                <el-form-item
                  label="外网地址"
                  prop="outer_host">
                  <el-input v-model="form.outer_host" placeholder="例：192.168.0.118或者controller.com"></el-input>
                </el-form-item>

                <el-form-item
                  label="外网端口"
                  prop="outer_port">
                  <el-input v-model="form.outer_port"  type="number" placeholder="请输入外网端口号"></el-input>
                </el-form-item>

                <el-form-item
                  label="tsServer"
                  prop="tsServer">
                  <el-input v-model="form.tsServer" placeholder="例：http://或https://192.168.0.118或controller.com"></el-input>
                </el-form-item>

                 <el-form-item
                  label="位置"
                  prop="location">
                   <el-select v-model="form.location" placeholder="控制器位置">
                    <el-option
                      v-for="item in LocationList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>

              <span v-if="dialogname !== '查看控制器'" slot="footer" class="dialog-footer">
                <el-button @click="clearFormTal">取 消</el-button>
                <el-button type="primary" @click="CreateController('form')">确 定</el-button>
              </span>
            </el-dialog>


            <el-dialog
              title="设备管理"
              :visible.sync="SheBManage"
              custom-class="SheBManage"
              :before-close="ChildrenbeforeClose">
              <el-dialog
                :title="SheBeiName"
                :visible.sync="ChangeSheB"
                custom-class="SheBManageTao"
                append-to-body
                :before-close="ChangeChildrenContoller">
                <div class="ChangeShe">
                  <div class="Cal">
                    <label for="">设备编号：</label>
                    <input type="text" v-model="equipment">
                  </div>
                  <div class="Cal">
                    <label for="">内网IP地址：</label>
                    <input type="text" v-model="facilityIP">
                  </div>
                  <div class="Cal">
                    <label for="">内网端口：</label>
                    <input type="text" v-model="facilityPort">
                  </div>
                  <div class="Cal">
                    <label for="">外网IP地址：</label>
                    <input type="text" v-model="facilityIPWai">
                  </div>
                  <div class="Cal">
                    <label for="">外网端口：</label>
                    <input type="text" v-model="facilityPortWai">
                  </div>
                </div>
                <div class="BUT">
                  <div @click="ChangeChildrenContoller">取消</div>
                  <div @click="ChangeFacility">完成</div>
                </div>
              </el-dialog>
              <img src="../../assets/img/ADDSHEB.png" alt="" class="Adds" @click="ChangeSheBStatus(1)">
              <div class="BodyBox">
                <div class="list">
                  <div class="BodyTit">
                    <div class="Num">序号</div>
                    <div class="Bian">设备编号</div>
                    <div class="IPConfig">IP地址</div>
                    <div class="port">端口</div>
                    <div class="status">状态</div>
                    <div class="caozuo">操作</div>
                  </div>
                  <div class="BodyCont" :key="index" v-for="(item,index) in ControllerChildren">
                    <div class="Num">{{index}}</div>
                    <div class="Bian">{{item.subset_number}}</div>
                    <div class="IPConfig">{{item.outer_net_host}}</div>
                    <div class="port">{{item.port}}</div>
                    <div class="status">{{item.is_alive}}</div>
                    <div class="caozuo"><span @click="ChangeSheBStatus(2,item.id)">编辑</span><span @click="removeSheb(item.id)">删除</span></div>
                  </div>
                </div>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="SheBManage = false">取 消</el-button>
                <el-button type="primary" @click="SheBManage = false">确定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
        <el-pagination
          background
          layout=" prev, pager, next, jumper"
          :total="total"
          :page-size="PageSize"
          @current-change="handleCurrentChange"
          :current-page.sync="CurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
    import UserInfo from "@/components/UserInfo";
    export default {
        name: "ControllerManage",
      components: {UserInfo},
      data(){
        return{
          total:14,     //总条数
          PageSize:this.$store.state.limit,      //一页显示多少条
          CurrentChange:1,
          ProList:[],
          ControllerMangeName:'',   //搜索名称
          optionsone: [
            {
              value: '',
              label: '全部'
            },
            {
            value: 'fault',
            label: '故障'
          }, {
            value: 'using',
            label: '使用中'
          }, {
            value: 'free',
            label: '空闲'
          }, {
            value: 'maintain',
            label: '维护'
          }
          ],
          valueone: '',                  //创建按钮旁边的选择

          ControllerNumber:'',            //控制器编号
          ControllerName:'',              //控制器名称

          IsSelect:true,     //选择新增OR编辑  true  为新增  false  为编辑


          dialogVisible: false,           //添加项目弹窗
          dialogname:'新增控制器',

          SheBManage:false,                //设备管理弹窗
          ChangeSheB:false,               //编辑设备   添加设备
          SelectChildren:false,            //为false时编辑   true新增
          SheBeiName:'新增设备',



          equipment:'',                     //设备编号
          facilityIP:'',                    //内网IP地址
          facilityPort:'',                  //内网端口
          facilityIPWai:'',                 //外网IP地址
          facilityPortWai:'',               //内网端口


          ControllerChildren:[],          //某个设备的子设备李彪
          ControllerID:'',                 //某个控制器ID
          ChildrenConllerMID:'',            //某个控制的子设备的ID

          valueT :'',
          StatusList :[
            {
              value : 'fault',
              label : '故障'
            },
            {
              value : 'using',
              label : '任务中'
            },
            {
              value : 'free',
              label : '空闲'
            },
            {
              value : 'maintain',
              label : '维护'
            }
          ],
          SearchPM : '',
          form : {
            name : '',
            asset_number : '',
            inner_host : '',
            inner_port : '',
            outer_host : '',
            outer_port : null,
            tsServer : '',
            location : null,
          },
          LocationList : [],
          
          kzqid : ''

        }
      },
      methods:{

        //删除控制器
        removekzq(id){
            this.$http.delete(this.$conf.env.ChangeController + `${id}/`).then(res=>{
              console.log(res)
              if(res.code == -1)return
              this.$alert.successTit(this,'删除成功');
              this.GetControllerList()
            }).catch(err=>{
              console.log(err)
              // this.$alert.errorTit(this,err.response.data.err)
            });
        },
        //控制器维护
        whkzq(id,status){
          var obj = {
            maintain_status : ''
          }
          if(status == '维护'){
            obj.maintain_status = 2
          }else{
            obj.maintain_status = 1
          }
          this.$http.put(this.$conf.env.kzqwhhf + `${id}/`,obj).then(res=>{
              if(res.code == -1)return
              this.GetControllerList()
            }).catch(err=>{
              console.log(err)
              // this.$alert.errorTit(this,err.response.data.err)
            });

        },
        getkzqdetail(val,id){
          if(val == 1){
            this.dialogname = '创建控制器'
            this.dialogVisible = true;
          }else if(val == 2){
            this.dialogname = '查看控制器'
            this.kzqid = id
            this.gettail(id);
          }else if(val == 3){
            this.dialogname = '编辑控制器'
            this.kzqid = id
            this.gettail(id);
          }
        },

        gettail(id){
           this.$http.get(this.$conf.env.ChangeController + `${id}/`).then(res=>{
              if(res.code == -1)return
              var obj = res.data.message
              var that = this
              this.dialogVisible = true;
              Object.keys(this.form).forEach(key=>{this.form[key]=res.data.message[key]})
              console.log(this.form)
            }).catch(err=>{
              console.log(err)
              // this.$alert.errorTit(this,err.response.data.err)
            });
        },

        SelectList(){
          this.CurrentChange = 1
          this.GetControllerList()
        },

        handleCurrentChange(val){
          this.CurrentChange = val
          // if(this.valueone !== ''){
          //   this.ChangeSelect()
          //   return
          // }
          this.GetControllerList()
        },

        ChangeSheBStatus(val,id){
          console.log(val)
          if(val === 1 ){
            this.ChangeSheB = true
            this.SelectChildren = true
            this.SheBeiName = '新增设备'
          }else{
            this.ChangeSheB = true
            this.SelectChildren = false
            this.SheBeiName = '编辑设备'
            this.getChildrenContorller(id)
          }
        },

        removeSheb(id){
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.delete(this.$conf.env.ChangeController + `${id}/`).then(res=>{
              console.log(res)
              this.$alert.successTit(this,'删除成功!')
              this.SetControllerChil(this.ControllerID)
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });
          }).catch(() => {
          });
        },

        //状态选择
        ChangeSelect(){
          this.$http.get(this.$conf.env.GetControllerList + `${this.CurrentChange}&status=${this.valueone}`).then(res=>{
            console.log(res)
            this.total = res.data.count;
            this.ProList = res.data.results
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },

        ChangeSelectBut(){
          this.CurrentChange = 1
          this.$http.get(this.$conf.env.GetControllerList + `1&status=${this.valueone}&search=${this.ControllerMangeName}`).then(res=>{
            console.log(res)
            this.total = res.data.count;
            this.ProList = res.data.results
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },

        //创建控制器
        CreateController(formName){
            this.$refs[formName].validate((valid) => {
              if (valid) {
                if(this.dialogname == '创建控制器'){
                  this.$http.post(this.$conf.env.ChangeController,this.form).then(res=>{
                    if(res.code == -1)return
                    this.clearFormTal()
                    this.$alert.successTit(this,'创建成功');
                    this.GetControllerList()
                  }).catch(err=>{
                    this.$alert.errorTit(this,err.response.data.err)
                  });
        
                }else{
                  this.$http.put(this.$conf.env.ChangeController + `${this.kzqid}/`,this.form).then(res=>{
                    if(res.code == -1)return
                    this.$alert.successTit(this,'修改成功');
                    this.clearFormTal()
                    this.GetControllerList()
                  }).catch(err=>{
                    this.$alert.errorTit(this,err.response.data.err)
                  });
                }
                
              } else {
                    console.log('错误')
                return false;
              }
            });
        },

        //点击某个控制器获取其子设备
        SetControllerChil(id){
          this.ControllerID = id
          this.$http.get(this.$conf.env.SubsetsController + `${id}`).then(res=>{
            console.log(res.data)
            this.ControllerChildren = res.data
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
          this.SheBManage = true
        },

        //创建  编辑子设备
        //equipment  facilityIP  facilityPort  facilityIPWai  facilityPortWai

        ChangeFacility(){

          let Obj={
            name:this.name,
            asset_number:this.asset_number,
            inner_host:this.inner_host,
            inner_port:this.inner_port,
            outer_host:this.outer_host,
            tsServer:this.tsServer,
            location:this.location
          }
          if(this.SelectChildren){
            this.$http.post(this.$conf.env.ChangeController,Obj).then(res=>{
              // this.ControllerChildren.push(res.data)
              console.log(res)
              // this.ChangeChildrenContoller()
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });
          }else{
            this.$http.put(this.$conf.env.ChangeController + `${this.ChildrenConllerMID}/`,Obj).then(res=>{
              console.log(res)
              this.ChangeChildrenContoller()
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });
          }
        },

        //需要修改某个子设备  获取子设备详情
        getChildrenContorller(id){
          this.ChildrenConllerMID = id
          this.$http.get(this.$conf.env.ChangeController + `${id}`).then(res=>{
            this.equipment = res.data.subset_number
            this.facilityIP = res.data.host
            this.facilityPort = res.data.port
            this.facilityIPWai = res.data.outer_net_host
            this.facilityPortWai = res.data.outer_net_port
            console.log(res)
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },
        //获取控制器列表
        GetControllerList(){
          // SearchPM  valueT
          this.$http.get(this.$conf.env.GetControllerList + `?page=${this.CurrentChange}&page_size=${this.PageSize}&status=${this.valueT}&search=${this.SearchPM}`).then(res=>{
            console.log(res)
            this.total = res.data.count;
            this.ProList = res.data.results
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },

        //创建  编辑控制弹窗关闭  清空数值
        beforeCloseS(done){
          if(this.dialogname == '查看控制器'){
              done();
              this.clearFormTal()
              return
          }
           this.$confirm('您暂未提交数据，确认关闭吗？')
            .then(_ => {
              done();
              this.clearFormTal()
          })
          .catch(e => {
          });
          // alert('关闭')
          // return
          // this.ControllerNumber = this.ControllerName = '';
        },
        //设备管理弹窗关闭
        ChildrenbeforeClose(){
          this.ControllerChildren = []
          this.SheBManage = false
        },
        //创建  修改子设备弹窗关闭
        ChangeChildrenContoller(){
          this.equipment = this.facilityIP = this.facilityPort =  this.ChildrenConllerMID = this.facilityIPWai = this.facilityPortWai = '';
          this.ChangeSheB = false;
        },
        //改变设备当前状态
        Sendstatus(status,id,index){
          let Obj = {
            maintain_status:status
          }
          this.$http.put(this.$conf.env.NewsController + `${id}/`,Obj).then(res=>{
            this.ProList[index].maintain_status = res.data.status[0]
            this.ProList[index].status = res.data.status[1]
            console.log(this.ProList[index])
            this.$alert.successTit(this,'修改成功')
            console.log(res.data)
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },

        //清空表单数据
        clearFormTal(){
          this.dialogVisible = false;
          Object.keys(this.form).forEach(key=>{this.form[key]=''})
        }
      },
      mounted(){
        this.$http.get(this.$conf.env.allLocation + '?page=1&page_size=999').then(res=>{
          console.log(res)
          if(res.code === -1)return;
          this.LocationList = res.data.results
        }).catch(err=>{
          this.$alert.errorTit(this,err.response.data.err)
        });
          
      },
      created() {
          this.GetControllerList()
      }
    }
</script>


<style lang="scss">

  .PMContent{
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
      justify-content: flex-end;
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
      .PMSection{
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
              height:.42rem;
              cursor: pointer;
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
              /*ProNum  ProName  ProCreatName  Controst  CrateTime  Operation*/
              .CrateTime{
                width: 40%;
                height: .5rem;
              }
              .ProNum,.ProName,.ProCreatName,.Controst,.Operation{
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
                .CrateTime{
                  width: 40%;
                  height: .5rem;
                }
                .ProNum,.ProName,.ProCreatName,.Controst,.Operation{
                  width: 15%;
                  height: .5rem;

                }
                .Controst{
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  span{
                    display: inline-block;
                    width: .16rem;
                    height: .16rem;
                    border-radius: 50%;
                    margin:0 .05rem;
                    &.GreenSpan{
                      background: #3CFF00;
                    }
                    &.RedSpan{
                      background: #FF0000;
                    }
                  }
                }
                &:nth-child(2n){
                  background: #E4EAEC;
                }
                .Operation{
                  display: flex;
                  justify-content: center;
                  align-items: center;
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



        .AddController{
          width:6.3rem;
          height:8.68rem;
          background:rgba(255,255,255,1);
          border-radius:6px;
          margin-top: .65rem !important;
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
            label{
              font-size:.19rem;
              line-height: .4rem;
              font-family:Microsoft YaHei;
              color:rgba(44,43,43,1);
              text-align: left;
              width: 100% !important;
              display: block;
            }
            input{
              width:5.4rem;
              height:.36rem;
              display: block;
              background: transparent;
              outline: none;
              text-indent: .27rem;
              line-height: .36rem;
               &::placeholder{
                  color: #dddddd;
                }
            }
            /deep/ .el-select,.el-input{
              width:5.4rem;
              height:.36rem;
              input{
                padding: 0;
                
              }
              i{
                line-height: .36rem;
              }
            }
            /deep/ .el-form{
              .el-form-item{
                margin: 0;
                .el-form-item__content{
                  margin-left: 0 !important;
                }
              }
            }
          }
          .el-dialog__footer{
            padding: 0;
            text-align: center;
            margin-top: .27rem;
            button{
              padding: .1rem .4rem;
            }
          }
        }
        /*设备管理*/
        .SheBManage{
          width:9.42rem;
          height:5.7rem;
          background:rgba(255,255,255,1);
          border-radius:6px;
          overflow: hidden;
          margin-top: 2.55rem !important;
          .el-dialog__header{
            padding: 0;
            height: .64rem;
             span{
               height: .64rem;
               font-size:.32rem;
               font-family:Microsoft YaHei;
               font-weight:bold;
               color:rgba(48,48,48,1);
               line-height:.64rem;
               text-align: center;
               display: block;
             }
            .el-dialog__headerbtn{
              width: .38rem;
              height: .38rem;
              background: #B2B2B2;
              border-radius: 50%;
              right: .29rem;
              top: .16rem;
              i{
                color: #fff;
                line-height: .38rem;
              }
            }
          }
          .el-dialog__body{
            padding: 0;
            position: relative;
            height: 4rem;
            .Adds{
              position: absolute;
              right: .9rem;
              top: -.48rem;
              cursor: pointer;
            }
            .BodyBox{
              width: 100%;
              height: 4rem;
              overflow: hidden;
              .list{
                width: 100%;
                height: 100%;
                .BodyTit,.BodyCont{
                  width: 100%;
                  height: .5rem;
                  display: flex;
                  font-size: 14px;
                  text-align: center;
                  background: #E4EAEC;
                  line-height: .5rem;
                  .Num,.port,.status{
                    width: 15%;
                    height: 100%;
                  }
                  .Bian{
                    width: 15%;
                    height: 100%;
                  }
                  .IPConfig,.caozuo{
                    width: 20%;
                    height: 100%;
                  }
                  /*Num  Bian  IPConfig  port  status  caozuo*/
                }
                .BodyCont{
                  background: #fff;
                  .caozuo{
                    span{
                      text-decoration:underline;
                      color:rgba(57,59,106,1);
                      margin: .05rem;
                      cursor: pointer;
                    }
                  }
                }
              }
            }
          }
          .dialog-footer{
            text-align: center;
            .el-button--primary{
              background: #6D7CFF;
              color: #fff;
              border-color: #6D7CFF;
            }
          }
        }
      }
    }
    .el-dialog__wrapper{
      position: absolute;
    }
  }
  .SheBManageTao{
    width:3.95rem !important;
    height:4rem !important;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 12px 1px rgba(2,24,68,0.14);
    border-radius:5px;
    margin-top: 3.18rem !important;
    .el-dialog__header{
      padding: 0;
      height: .53rem;
      line-height: .53rem;
      font-size:.24rem;
      font-family:Microsoft YaHei;
      color:rgba(48,48,48,1);
      text-align: center;
    }
    .el-dialog__body{
      padding: 0 .21rem 0 .25rem;
      .ChangeShe{
        .Cal{
          display: flex;
          margin-bottom: .12rem;
          label{
            width: 1.2rem;
            display: inline-block;
            font-size:.2rem;
            font-family:Microsoft YaHei;
            color:rgba(48,48,48,1);
            line-height:.42rem;
            text-align: right;
          }
          input{
            flex: 1;
            background:rgba(228,234,236,1);
            border-radius:5px;
            border: 0;
            outline: none;
            text-indent: .1rem;
          }
        }
      }
      .BUT{
        width: 100%;
        height: .4rem;
        display: flex;
        justify-content: center;
        div{
          width: 1rem;
          height: .4rem;
          margin:0 .06rem;
          text-align: center;
          cursor: pointer;
          font-size:.2rem;
          font-family:Microsoft YaHei;
          color: #303030;
          line-height:.4rem;
          &:first-child{
            border:1px solid rgba(191,191,191,1);
            border-radius:5px;
          }
          &:last-child{
            background:rgba(109,124,255,1);
            border-radius:5px;
            color:rgba(255,255,255,1);
          }
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
