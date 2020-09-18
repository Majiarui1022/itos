<template>
  <div class="ModuleContent">

    <!--    头部-->
    <div class="Header">
      <UserInfo></UserInfo>
    </div>
    <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
    <div class="Menu">
      <div class="ModuleSection">
        <div class="MenuHeader">
          <span>模块管理</span>
          <div class="RightBox">
            <div class="Create" @click="ChangeModoule(1)">
              <img src="../../assets/img/create.png" alt="">
              新增模块
            </div>
            <div class="Create" @click="outerVisible = true">
              <img src="../../assets/img/create.png" alt="">
              新增模块类别
            </div>
          </div>
        </div>
        <div class="select-fax">
          <div class="item-select">
            <span class="item-tit">模块类别:</span>
            <el-select @change="SelectList" v-model="ModelDetail " placeholder="请选择">
              <el-option
                v-for="item in ModelList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select> 
          </div>
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
          <el-table
            :data="tableData"
            style="width: 100%"
            stripe
            height="7.6rem"
            @filter-change="handleFilterChange"
            :header-cell-style="{background:'#E4EAEC'}">
            <el-table-column
              prop="module_number"
              label="模块编号"
              :align="'center'"
              column-key="date"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              :align="'center'"
              label="模块名称">
            </el-table-column>
            <el-table-column
              prop="module_category"
              :align="'center'"
              label="类别"
              :filters="ModuleCategoryList"
              :filter-multiple="false"
              filter-placement="bottom-end"
              >
              <template slot-scope="scope">
                {{scope.row.module_category}}
              </template>
            </el-table-column>
             <el-table-column
              prop="status"
              label="状态"
              :align="'center'"
              :filter-multiple="false"
              filter-placement="bottom-end">
              <template slot-scope="scope">
                {{scope.row.status}}
              </template>
            </el-table-column>

            <el-table-column
              prop="create_time"
              :align="'center'"
              label="创建日期">
            </el-table-column>

            <el-table-column
              prop="user"
              :align="'center'"
              label="创建人">
            </el-table-column>

            <el-table-column
              prop="location"
              :align="'center'"
              label="位置">
            </el-table-column>
        
           
            <el-table-column
              :align="'center'"
              label="操作">
              <template slot-scope="scope">
                 <div>
                    <img src="../../assets/img/cha22.png" alt="" @click="ChangeModoule(2,scope)">
                    <span>查看</span>
                  </div>
                  <div>
                    <img src="../../assets/img/tj.png" alt="" @click="ChangeModoule(3,scope)">
                    <span>编辑</span>
                  </div>
                  
                  <div>
                    <img style="width: .22rem;height: .28rem;" src="../../assets/img/removePro.png" alt="" @click="removeSheb(scope.row)">
                    <span>删除</span>
                  </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-dialog
          title="模块类别"
          :visible.sync="outerVisible"
          :close-on-press-escape='false'
          :close-on-click-modal='false'
          custom-class="AddModelFoget">
          <el-dialog
            title="编辑"
            :visible.sync="innerVisible"
            append-to-body
            :close-on-press-escape='false'
            :close-on-click-modal='false'
            :before-close="CloseModuleLei"
            custom-class="AddModelIn">
            <div class="InputBox">
              <label for="">模块类别：&nbsp;</label>
              <input type="text" v-model="CategoriesName" @keyup.enter="AddModuleCaready">
            </div>
            <div class="But">
              <span @click="innerVisible = false">取消</span>
              <span @click="AddModuleCaready">完成</span>
            </div>
          </el-dialog>
          <div class="ModuleList">
            <div class="title">类别</div>
            <div class="init">
              <el-input type="text" v-model="categoryinfo"></el-input>
              <el-button type="primary" @click="createCategory">保存</el-button>
            </div>

            <div class="list">
              <div class="list-header row">
                <div class="name">设备类别</div>
                <div class="set">操作</div>
              </div>
              <div class="menu">
                <div class="row" v-for="(item,index) in ModelList" :key="index">
                  <div class="name">{{item.name}}</div>
                  <div class="set">
                    <img src="../../assets/img/bjlb.png" alt="" @click="changeModuleCategory(item)">
                    <img src="../../assets/img/sclb.png" alt="" @click="removeModuleCateger(item)">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
          </div>
        </el-dialog>

        <el-dialog
          :title="dialogname"
          :visible.sync="AddModuleSta"
          custom-class="AddModule"
          :before-close="beforeCloseS"
          :close-on-press-escape='false'
          :close-on-click-modal	='false'
          :destroy-on-close='true'>

          <el-form ref="form" :model="form">

              <el-form-item 
                prop="name" 
                :rules="[
                  { required: true, message: ' '},
                ]"
                label="名称">
                <!-- <div class="Label">名称</div> -->
                  <el-input type="text" v-model="form.name"  :disabled="ISTRUE" placeholder="请输入英文、数字组合的模块名称，最大长度10位"></el-input>
              </el-form-item>

              <el-form-item 
                prop="asset_number" 
                label="资产编号">
                <!-- <div class="Label">名称</div> -->
                <el-input type="text" placeholder="请输入英文、数字组合的资产编号" :disabled="ISTRUE" v-model="form.asset_number"></el-input>
              </el-form-item>

               <el-form-item 
                prop="inner_host" 
                :rules="[
                  { required: true, message: ' '},
                ]"
                label="模块IP">
                <!-- <div class="Label">名称</div> -->
                <el-input type="text" placeholder="请输入网址 例：127.0.0.1" :disabled="ISTRUE" v-model="form.inner_host"></el-input>
              </el-form-item>

              <el-form-item 
                prop="inner_port" 
                :rules="[
                  { required: true, message: ' '},
                ]"
                label="端口">
                <!-- <div class="Label">名称</div> -->
                <el-input type="text" placeholder="请输入端口号" :disabled="ISTRUE" v-model="form.inner_port"></el-input>
              </el-form-item>

              <el-form-item 
                prop="location" 
                label="位置">
                <!-- <div class="Label">名称</div> -->
                  <el-select v-model="form.location" placeholder="请填写控制器位置" :disabled="ISTRUE">
                    <el-option
                      v-for="item in locationList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                      :disabled="ISTRUE">
                    </el-option>
                  </el-select>
              </el-form-item>

              <el-form-item 
                prop="module_category" 
                :rules="[
                  { required: true, message: ' '},
                ]"
                label="模块类别">
                <!-- <div class="Label">名称</div> -->
                <el-select v-model="form.module_category" placeholder="请选择模块类别" :disabled="ISTRUE">
                  <el-option
                    v-for="item in ModelList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    :disabled="ISTRUE">
                  </el-option>
                </el-select>
              </el-form-item>

               <el-form-item 
                prop="equipment" 
                label="关联设备">
                <!-- <div class="Label">名称</div> -->
                 <el-select v-model="form.equipment" placeholder="请选择关联的设备 " :disabled="ISTRUE">
                  <el-option
                    v-for="item in equipmentList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                    :disabled="ISTRUE">
                  </el-option>
                </el-select>
              </el-form-item>
              
              
          </el-form>






          <!-- <div class="Label">名称</div>
          <input type="text" placeholder="请输入模块编号" :disabled="ISTRUE" v-model="ModuleNumber">

          <div class="Label">资产编号</div>
          <input type="text" placeholder="请输入模块名称" :disabled="ISTRUE" v-model="ModuleName"> -->

          <!-- <div class="Label">模块IP</div>
          <input type="text" placeholder="" :disabled="ISTRUE" v-model="ModuleAddress"> -->
          <!-- <div class="Label">端口</div>
          <input type="text" placeholder="请输入端口号" :disabled="ISTRUE" v-model="ModuleAddress">
          <div class="Label">位置</div>
          <input type="text" placeholder="请输入端口号" :disabled="ISTRUE" v-model="ModuleAddress">
          <div class="Label">模块类别</div>
          <el-select v-model="value" placeholder="请选择" :disabled="ISTRUE">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="ISTRUE">
            </el-option>
          </el-select>
          <div class="Label">关联设备</div>
          <el-select v-model="value" placeholder="请选择" :disabled="ISTRUE">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="ISTRUE">
            </el-option>
          </el-select> -->
          <span slot="footer" class="dialog-footer" v-if="!ISTRUE">
                <el-button @click="clearFormTal">取 消</el-button>
                <el-button type="primary" @click="SendModule('form')">确 定</el-button>
              </span>
        </el-dialog>

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
    import { loading  } from 'element-ui';
    import UserInfo from "@/components/UserInfo";
    export default {
      name: "ModuleManage",
      components: {UserInfo},
      data(){
        return{
          total:12,     //总条数
          PageSize:this.$store.state.limit,      //一页显示多少条
          CurrentChange:1,         //当前页码
          tableData: [],

          // ModuleNumber  ModuleName  ModuleAddress
          ModuleNumber:'',          //模块编号
          ModuleName:'',             //模块名称
          ModuleAddress:'',         //模块地址
          textarea: '',             //脚本信息
          options: [],
          value: '',
          ModuleChangeID:'',              //模块ID

          outerVisible: false,
          innerVisible: false,

          AddModuleSta:false,
          dialogname:'新增模块',
          ISTRUE:false,           //模块查看的时候为true 其他全为false
          IsTrueModule:true,      //模块添加为true  其余全为false
          Number:0,

          ModuleCategoryList:[],                    //模块类别列表

          CategoriesName:'',                //新增模块类别
          ModuleCreaName:'新增',            //编辑创建模块类别名称
          ModuleCreaID:'',                  //需要修改的模块类别
          ModuleCreaIndex:'',               //需要修改的模块下标

          ModuleCodor:'',                 //模块类别筛选   当前选择ID
          StatusSelectID:'',                //状态筛选  当前ID

          SearchModule:'',                    //搜索内容
          fullscreenLoading:false,          //loading
          loading:{
            lock: true,
            text: '检测中请稍后',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          },
          ModelDetail: '',
          ModelList : [],
          valueT: '',
          SearchPM : '',   
          StatusList : [
            {
              value : '',
              label : '全部'
            },
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
            }
          ],
          form : {
            "module_number": "",
            "module_category": "",
            "asset_number": "",
            "name": "",
            "inner_host": "",
            "inner_port": "",
            "location": "",
            "equipment": ""
          },
          locationList : [],
          equipmentList : [],
          categoryinfo: ''
        }
      },
      methods:{

        SelectList(){
          this.CurrentChange = 1;
          this.GetModuleList()
        },
        handleCurrentChange(val){
          this.CurrentChange = val
          this.GetModuleList()
        },

        //   AddModuleCrea
        AddModuleCrea(val,id,index){
          this.innerVisible = true
          if(val === 1){
            this.ModuleCreaName = '新增'
          }else{
            this.ModuleCreaID = id
            this.ModuleCreaIndex = index
            this.ModuleCreaName = '编辑'
            this.$http.get(this.$conf.env.Allmodulecategories + `${this.ModuleCreaID}/`).then(res=>{
              this.CategoriesName = res.data.name
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });
          }
        },

        ChangeModuleAN(){
          let Obj = {
            name:this.CategoriesName
          }
          this.$http.put(this.$conf.env.Allmodulecategories + `${this.ModuleCreaID}/`,Obj).then(res=>{
            this.ModuleCategoryList[this.ModuleCreaIndex].text = res.data.name
            this.CloseModuleLei()
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },



        //新增模块   编辑模块
        SendModule(formName){
          //为true是新增    false是查看和编辑
          this.$refs[formName].validate((valid) => {
              if (valid) {
                if(this.IsTrueModule){
                  //添加模块  再次调用模块列表
                  this.$http.post(this.$conf.env.ModuleInfo,this.form).then(res=>{
                    this.GetModuleList()
                    this.clearFormTal()
                    this.$alert.successTit(this,'新增成功')
                  }).catch(err=>{
                    this.$alert.errorTit(this,err.response.data.err)
                  });
                }else{
                  this.$http.put(this.$conf.env.ModuleInfo + `${this.ModuleChangeID}/`,this.form).then(res=>{
                    this.GetModuleList()
                    this.clearFormTal()
                    this.$alert.successTit(this,'修改成功')
                    // this.beforeCloseS()
                    // this.SelectAllTiao()
                  }).catch(err=>{
                    this.$alert.errorTit(this,err.response.data.err)
                  });
                }
              } else {
                return false;
              }
            });
          
        },


        //新增模块类别
        AddModuleCaready(){
            let obj = {
              name:this.CategoriesName
            }
            this.$http.put(this.$conf.env.mkcategory + `${this.CatetoryisID}`,obj).then(res=>{
              this.CategoriesName = '';
              this.innerVisible = false;
              this.$alert.successTit(this,'修改成功')
              this.getModuleCategoryList()
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });
        },




        //模块筛选
        handleFilterChange(filters){
          for(var i in filters){
            console.log(i)
            if(i === 'el-table_1_column_3'){
              if(filters[i][0] !== undefined){
                this.CurrentChange = 1;
                this.ModuleCodor = filters[i][0]
              }else{
                this.ModuleCodor = ''
              }

              this.SelectFunction()
            }else{
              if(filters[i][0] !== undefined){
                this.CurrentChange = 1;
                this.StatusSelectID = filters[i][0]
              }else{
                this.StatusSelectID = ''
              }
              this.SelectFunction()
            }

          }
        },

        //通过筛选搜索  来选择需要执行那个函数
        SelectFunction(){
          console.log('我执行了')
          this.CurrentChange = 1
          this.SelectAllTiao()
          // SearchModule  ModuleCodor  StatusSelectID
          // if(this.SearchModule === '' && this.ModuleCodor === '' && this.StatusSelectID !==''){
          //   //第一种情况  只筛选状态
          //   this.SelectStatue(this.StatusSelectID)
          // }else if(this.SearchModule === '' && this.ModuleCodor !== '' && this.StatusSelectID ===''){
          //   //第二种情况  只筛选模块
          //   this.getModuleK(this.ModuleCodor)
          // }else if(this.SearchModule !== '' && this.ModuleCodor === '' && this.StatusSelectID ===''){
          //   //第三种  只筛选搜索内容
          //   this.SearchModuleList()
          // }else if(this.SearchModule !== '' && this.ModuleCodor !== '' && this.StatusSelectID ===''){
          //   //第四种  搜索内容和模块类别不为空
          //     this.SelectModuleCoder()
          // }else if(this.SearchModule !== '' && this.ModuleCodor === '' && this.StatusSelectID !==''){
          //   //第五种   搜索内容和状态不为空
          //   this.SearchModuleStatus()
          // }else if(this.SearchModule === '' && this.ModuleCodor !== '' && this.StatusSelectID !==''){
          //   //第六种   模块类别和状态不为空
          //   this.GetModuleStatusList()
          // }else if(this.SearchModule !== '' && this.ModuleCodor !== '' && this.StatusSelectID !==''){
          //   //第七种   搜索内容、模块类别和状态都不为空
          //   this.SelectAllTiao()
          // }else if(this.SearchModule === '' && this.ModuleCodor === '' && this.StatusSelectID ===''){
          //   //第八种   三者均为空
          //   this.GetModuleList()
          // }
        },


        // //三者均不等于空
        // SelectAllTiao(){
        //   this.$http.get(this.$conf.env.ModuleList + `${this.CurrentChange}&search=${this.SearchModule}&status=${this.StatusSelectID}&module_category=${this.ModuleCodor}`).then(res=>{
        //     console.log(res.data.results)
        //     this.total = res.data.count
        //     this.tableData = res.data.results
        //   }).catch(err=>{
        //     this.$alert.errorTit(this,err.response.data.err)
        //   });
        // },

        // //搜索内容和状态同时筛选
        // SearchModuleStatus(){
        //   this.CurrentChange = 1
        //   this.$http.get(this.$conf.env.ModuleList + `${this.CurrentChange}&search=${this.SearchModule}&status=${this.StatusSelectID}`).then(res=>{
        //     console.log(res.data.results)
        //     this.total = res.data.count
        //     this.tableData = res.data.results
        //   }).catch(err=>{
        //     this.$alert.errorTit(this,err.response.data.err)
        //   });
        // },


        // //搜索内容和模块类别同时筛选
        // SelectModuleCoder(){
        //   this.CurrentChange = 1
        //   this.$http.get(this.$conf.env.ModuleList + `${this.CurrentChange}&search=${this.SearchModule}&module_category=${this.ModuleCodor}`).then(res=>{
        //     console.log(res.data.results)
        //     this.total = res.data.count
        //     this.tableData = res.data.results
        //   }).catch(err=>{
        //     this.$alert.errorTit(this,err.response.data.err)
        //   });
        // },

        // //模块类别和状态同时筛选
        // GetModuleStatusList(){
        //   this.CurrentChange = 1
        //   this.$http.get(this.$conf.env.ModuleList + `${this.CurrentChange}&module_category=${this.ModuleCodor}&status=${this.StatusSelectID}`).then(res=>{
        //     console.log(res.data.results)
        //     this.total = res.data.count
        //     this.tableData = res.data.results
        //   }).catch(err=>{
        //     this.$alert.errorTit(this,err.response.data.err)
        //   });
        // },

        // //只筛选搜索内容
        // SearchModuleList(){
        //   this.CurrentChange = 1
        //   this.$http.get(this.$conf.env.ModuleList + `${this.CurrentChange}&search=${this.SearchModule}`).then(res=>{
        //     console.log(res.data.results)
        //     this.total = res.data.count
        //     this.tableData = res.data.results
        //   }).catch(err=>{
        //     this.$alert.errorTit(this,err.response.data.err)
        //   });
        // },


        // //只筛选状态
        // SelectStatue(id){
        //   this.CurrentChange = 1
        //   this.$http.get(this.$conf.env.ModuleList + `${this.CurrentChange}&status=${id}`).then(res=>{
        //     console.log(res.data.results)
        //     this.total = res.data.count
        //     this.tableData = res.data.results
        //   }).catch(err=>{
        //     this.$alert.errorTit(this,err.response.data.err)
        //   });
        // },


        // //只筛选模块
        // getModuleK(id){
        //   this.CurrentChange = 1
        //   this.$http.get(this.$conf.env.ModuleList + `${this.CurrentChange}&module_category=${id}`).then(res=>{
        //     console.log(res.data.results)
        //     this.total = res.data.count
        //     this.tableData = res.data.results
        //   }).catch(err=>{
        //     this.$alert.errorTit(this,err.response.data.err)
        //   });

        // },


        //
        removeSheb(row){
          this.$confirm('此操作将永久删除该模块, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.delete(this.$conf.env.ModuleInfo + `${row.id}/`).then(res=>{
              if(this.tableData.length < 2 && this.CurrentChange > 1){
                this.CurrentChange = this.CurrentChange - 1
              }
              this.GetModuleList()
              this.removeSuccess()
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });

          }).catch(() => {
            this.$message({
              type: 'info',
              duration:10000,
              message: '已取消删除'
            });
          });
        },

        //删除模块类别
        RemoveModuleCre(id,index){
          this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.delete(this.$conf.env.Allmodulecategories + `${id}/`).then(res=>{
              this.ModuleCategoryList.splice(index,1)
              this.removeSuccess()
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },

        GetModuleList(){
          this.options = this.ModuleCategoryList = []  
          //请求所有模块列表  valueT  
          this.$http.get(this.$conf.env.ModuleList + `?page=${this.CurrentChange}&page_size=${this.PageSize}&module_category=${this.ModelDetail}&status=${this.valueT}&search=${this.SearchPM}`).then(res=>{
            console.log(res.data.results)
            this.total = res.data.count
            this.tableData = res.data.results
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
          //请求所有模块类别
          // this.$http.get(this.$conf.env.Allmodulecategories).then(res=>{
          //   // console.log(res.data)
          //   var Arr = []
          //   var ArrTwo = []
          //   for(var i in res.data){
          //     let a = {
          //       value:res.data[i].id,
          //       text:res.data[i].name
          //     }
          //     let b = {
          //       value:res.data[i].id,
          //       label:res.data[i].name
          //     }
          //     Arr.push(b)
          //     ArrTwo.push(a)
          //   }
          //   this.options = Arr
          //   this.ModuleCategoryList = ArrTwo
          // }).catch(err=>{
          //   this.$alert.errorTit(this,err.response.data.err)
          // });

        },


        //获取单个模块详情
        GetModuleInfo(id){
          this.$http.get(this.$conf.env.ModuleInfo + `${id}/`).then(res=>{
            console.log(res.data)
            Object.keys(this.form).forEach(key=>{this.form[key]=res.data.message[key]})
            // this.ModuleNumber = res.data.module_number;
            // this.ModuleName = res.data.name;
            // this.ModuleAddress = res.data.interface_address;
            // this.textarea = res.data.info;
            // this.value = res.data.module_category.id;
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
          // ModuleInfo
        },
        //新增、修改、查看模块
        ChangeModoule(val,scope){
          if(val === 1){
            this.AddModuleSta = this.IsTrueModule = true
            this.dialogname = '新增模块'
            this.ISTRUE = false
          }else if(val === 2){
            this.AddModuleSta = true
            this.dialogname = '查看模块'
            this.ISTRUE = true
            this.IsTrueModule = false
            this.ModuleChangeID = scope.row.id
            this.GetModuleInfo(scope.row.id)
            console.log(scope.row.id)
          }else if(val === 3){
            this.AddModuleSta = true
            this.dialogname = '编辑模块'
            this.ISTRUE = this.IsTrueModule = false
            this.ModuleChangeID = scope.row.id
            this.GetModuleInfo(scope.row.id)
            console.log(scope.row.id)
          }
        },


        //检测当前模块
        changestatue(e){
          const loading = this.$loading(this.loading)
          this.$http.put(this.$conf.env.testModule + `${e.row.id}/`).then(res=>{
            loading.close()
            this.tableData[e.$index].status = res.data.status
          }).catch(err=>{
            loading.close()
            this.$alert.errorTit(this,err.response.data.err)
          });
        },


        //弹窗关闭
        beforeCloseS(done){
          if(this.dialogname == '查看模块'){
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
          // this.AddModuleSta = false
        },

        //创建模块类别
        createCategory(){
          if(this.categoryinfo == ''){
            this.$alert.errorTit(this,'类别不能为空')
            return
          }
           this.$http.post(this.$conf.env.mkcategory,{name:this.categoryinfo}).then(res=>{
              this.$alert.successTit(this,'添加成功')
              this.categoryinfo = ''
              this.getModuleCategoryList()
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });
        },
        

        //删除模块类别
        removeModuleCateger(item){
          this.$confirm(`模块类别${item.name}将被删除`)
            .then(_ => {
               this.$http.delete(this.$conf.env.mkcategory + `${item.id}/`).then(res=>{
                this.$alert.successTit(this,'删除成功')
                this.getModuleCategoryList()
              }).catch(err=>{
                this.$alert.errorTit(this,err.response.data.err)
              });
          })
          .catch(e => {
          });
        },

        changeModuleCategory(item){
          this.innerVisible = true;
          this.CategoriesName = item.name;
          this.CatetoryisID = item.id;
        },

        //删除成功提示
        removeSuccess(){
          this.$message({
            type: 'success',
            duration:1000,
            message: '删除成功!'
          });
        },


        //新增模块内部小弹窗关系
        CloseModuleLei(){
          this.innerVisible = false;
          this.CategoriesName = this.ModuleCreaID = this.ModuleCreaIndex = '';
        },


        //清除form数据
        clearFormTal(){
          this.AddModuleSta = false;
          Object.keys(this.form).forEach(key=>{this.form[key]=''})
        },

        getModuleCategoryList(){
           this.$http.get(this.$conf.env.mkcategory).then(res=>{
            this.ModelList = res.data.message;
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        }

      },
      mounted(){
        this.GetModuleList()
       //获取模块类别
        this.getModuleCategoryList()

        this.$http.get(this.$conf.env.allLocation).then(res=>{
          this.locationList = res.data.results;
        }).catch(err=>{
          this.$alert.errorTit(this,err.response.data.err)
        });

        this.$http.get(this.$conf.env.sblist + `?equipment_category=&status=&search=&page=1&page_size=999`).then(res=>{
          this.equipmentList = res.data.results;
        }).catch(err=>{
          this.$alert.errorTit(this,err.response.data.err)
        });

        
          
          
      },
      created() {
      }
    }
</script>


<style lang="scss">

  .ModuleContent{
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
      .ModuleSection{
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
                // padding: 0 .4rem;
               }
               i{
                 line-height: .32rem;
               }
            }
          }
        }
        .ProList{
          width: 100%;
          height: 7.6rem;
          .el-table--striped .el-table__body tr.el-table__row--striped td{
            background: #E4EAEC;
          }
          .el-table--enable-row-hover .el-table__body tr:hover>td{
          }
          .el-table td, .el-table th{
            padding: 0;
            line-height: .5rem;
            height: .5rem;
            div{
              overflow: initial;
            }
          }
          .el-table__row{
            td{
              &:last-child{
                .cell{
                  &:last-child{
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
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
                      left: -.68rem;
                      bottom: -.26rem;
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
          .el-table .cell{
            font-size:.14rem;
            color:#010101;
            line-height:.5rem;
            img{
              width: .28rem;
              height: .28rem;
              display: inline-block;
              cursor: pointer;
            }
          }
          .el-table th>.cell{
            font-size:.14rem;
            font-family:Microsoft YaHei;
            color:#3E3E3E;
            line-height:.5rem;
          }
        }

        /*添加模块分类*/

        .AddModelFoget{
          width: 5.38rem;
          height: 3.46rem;
          background: #ffffff;
          border-radius: .06rem;
          margin-top: 2.3rem !important;
          .el-dialog__header{
            padding: 0;
            height: .9rem;
            font-size:.32rem;
            font-weight:bold;
            text-align: center;
            font-size: .2rem;
            color: #303030;
            line-height: .8rem;
          }
          .el-dialog__body{
            padding:0 .3rem;
            position: relative;
            .ModuleList{
             .title{
              font-size: .16rem;
              text-align: left;
              color: #2c2b2b;
              line-height: .32rem;
             }
             .init{
               display: flex;
                /deep/ .el-input{
                width: 4rem;
                height: .36rem;
                input{
                  width: 100%;
                  height: 100%;
                  display: block;
                }
              }
              button{
                width: .8rem;
                height: .36rem;
                background: #393b6a;
                font-size: .14rem;
                text-align: center;
                color: #ffffff;
                line-height: .36rem;
                padding: 0;
              }
             }
             .list{
                width: 4.8rem;
                height: 1.66rem;
                background: #ffffff;
                border: 1px solid #393b6a;
                .row{
                  width: 100%;
                  height: .3rem;
                  display: flex;
                  justify-content: space-between;
                  div{
                    font-size: .14rem;
                    color: #333333;
                    line-height: .3rem;
                    box-sizing: border-box;
                    &:first-child{
                      padding-left: .12rem;
                    }
                    &:last-child{
                      padding-right: .42rem;
                    }
                  }
                }
                .list-header{
                  color: #393b6a;
                  background: #e4eaec;
                }
             }
             .menu{
               height: calc(100% - .3rem);
               overflow-y: auto;
               .set{
                 display: flex;
                 align-items: center;
                 img{
                    width: .18rem;
                    height: .18rem;
                    margin-right:-.14rem;
                    margin-left: .3rem;
                    cursor: pointer;
                 }
               }
                &::-webkit-scrollbar {/*滚动条整体样式*/
                  width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
                  height: 4px;
                }
                &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                  border-radius: 5px;
                  background: #F1F1F1;
                }
                &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                  border-radius: 0;
                }
             }
            }
          }

          .el-dialog__footer{
            display: none;
          }
        }



        /*新增模块*/

        .AddModule{
          width:6.3rem;
          height:8rem;
          background:rgba(255,255,255,1);
          border-radius:6px;
          margin-top: 7vh !important;
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
            textarea{
              width:5.41rem;
              height:1.5rem;
              border:1px solid rgba(230,230,230,1);
              resize: none;
            }
          }
          .el-dialog__footer{
            padding: 0;
            text-align: center;
            margin-top: .18rem;
            height: .7rem;
            span{
              display: flex;
              text-align: center;
              align-items: center;
              justify-content:center;
              .el-button--primary{
                background: #6D7CFF;
                border-color: #6D7CFF;
              }
            }
          }
        }

        /*分页*/
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
  .AddModelIn{
    width:4.08rem !important;
    height:1.94rem !important;
    background:rgba(255,255,255,1);
    box-shadow:0px 5px 7px 2px rgba(31,31,31,0.16);
    border-radius:5px;
    margin-top: 4.15rem !important;
    .el-dialog__header{
      padding: 0;
      font-size:.28rem;
      font-family:Microsoft YaHei;
      color:rgba(51,51,51,1);
      line-height:.6rem;
      text-align: center;
      margin-bottom: .13rem;
    }
    .el-dialog__body{
      padding: 0;
      .InputBox{
        display: flex;
        padding-left:.27rem;
        padding-right: .4rem;
        margin-bottom: .28rem;
        label{
          font-size:.2rem;
          font-family:Microsoft YaHei;
          color:rgba(48,48,48,1);
          line-height:.42rem;
          white-space: nowrap;
        }
        input{
          flex: 1;
          height:.42rem;
          background:rgba(228,234,236,1);
          border-radius:5px;
          border: 0;
          outline: none;
          text-indent: .1rem;
        }
      }
      .But{
        width: 100%;
        height: .4rem;
        text-align: center;
        span{
          display: inline-block;
          width: 1rem;
          height: .4rem;
          text-align: center;
          line-height: .4rem;
          border:1px solid rgba(191,191,191,1);
          color: #303030;
          border-radius:5px;
          cursor: pointer;
          &:last-child{
            margin-left: .18rem;
            border-color: #6D7CFF;
            color: #fff;
            background: #6D7CFF;
          }
        }
      }
    }
  }
  .el-loading-spinner{
    width: 100%;
    height: .5rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .el-icon-loading{
      font-size: .28rem;
    }
    .el-loading-text{
      font-size: .14rem;
    }
  }
</style>
