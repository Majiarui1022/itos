
<template>
  <div class="PMContent">

    <!--    头部-->
    <div class="Header">
      <div class="SearchBox"></div>
      <UserInfo></UserInfo>
    </div>
    <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
    <div class="Menu">
      <div class="PerSonneSection">
        <div class="MenuHeader">
          <span>人员管理</span>
          <div class="RightBox">
              <el-upload
                class="upload-demo"
                action=''
                :http-request="importPerson"
                :show-file-list="false"
                accept=".xlsx">
                <div class="Create">
                  <img src="../../assets/img/erportper.png" alt="">
                      导入
                </div>
              </el-upload>
             <div class="Create"  @click="exportpersons(1)">
              <img src="../../assets/img/importper.png" alt="">
              导出
            </div>
            <div class="Create"  @click="ProjectChange(1)">
              <img src="../../assets/img/create.png" alt="">
              新增
            </div>
          </div>
        </div>
         <div class="select-fax">
          <div class="item-select">
            <span class="item-tit">是否在职:</span>
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
          <!-- <div class="ProN">
            <div class="ProHeader">
              <div class="ProNum">工号</div>
              <div class="ProName">姓名</div>
              <div class="position">职位</div>
              <div class="academic">学历</div>
              <div class="phone">电话</div>
              <div class="age">年龄</div>
              <div class="gender">性别</div>
              <div class="CreateTime">入职日期</div>
              <div class="EndTime">离职日期</div>
              <div class="Operation">操作</div>
            </div>
            <div class="proMenu">
              <div class="procant" v-for="(item,index) in ProList" :key="index">
                <div class="ProNum">{{item.job_number}}</div>
                <div class="ProName">{{item.name}}</div>
                <div class="position">{{item.position}}</div>
                <div class="academic">{{item.edu_background}}</div>
                <div class="phone">{{item.mobile}}</div>
                <div class="age">{{item.birthday}}</div>
                <div class="gender">{{item.sex}}</div>
                <div class="CreateTime">{{item.entry_time}}</div>
                <div class="EndTime">{{item.departure_time}}</div>
                <div class="Operation">
                  <img src="../../assets/img/cha.png" alt=""@click="ProjectChange(3,item.id)">
                  <img src="../../assets/img/change.png" alt="" @click="ProjectChange(2,item.id)">
                  <img src="../../assets/img/quan.png" alt="" @click="ChangeQuan(index,item.id)">
                  <img src="../../assets/img/removePro.png" @click="RemovePero(item.id,item.name)" alt="" >
                </div>
              </div>
            </div>
            
            
          </div> -->
          <el-table
            :data="tableData"
            style="width: 100%"
            stripe
            height="7.6rem"
            :header-cell-style="{background:'#E4EAEC'}">
            <el-table-column
              prop="username"
              label="工号"
              :align="'center'"
              column-key="date"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              :align="'center'"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="department"
              :align="'center'"
              label="部门"
              :filter-multiple="false"
              filter-placement="bottom-end"
              >
              <template slot-scope="scope">
                {{scope.row.department}}
              </template>
            </el-table-column>
             <el-table-column
              prop="position"
              label="职位"
              :align="'center'"
              :filter-multiple="false"
              filter-placement="bottom-end">
              <template slot-scope="scope">
                {{scope.row.position}}
              </template>
            </el-table-column>

            <el-table-column
              prop="mobile"
              :align="'center'"
              label="电话">
            </el-table-column>

            <el-table-column
              prop="location"
              :align="'center'"
              label="状态">
               <template slot-scope="scope">
                {{scope.row.is_active == true ? '在职' : '离职'}}
              </template>
              
            </el-table-column>
        
           
            <el-table-column
              :align="'center'"
              label="操作">
              <template slot-scope="scope">
                 <div>
                    <img src="../../assets/img/createPro.png" alt="" @click="ProjectChange(2,scope.row.id)">
                    <span>编辑</span>
                  </div>
                  <div>
                    <img src="../../assets/img/qx.png" alt="" @click="changequanxian(scope.row.id)">
                    <span>权限</span>
                  </div>
                  <div>
                    <img src="../../assets/img/suo.png" alt="" @click="ChangePass(scope.row)">
                    <span>改密</span>
                  </div>
                  <div>
                    <img style="width: .22rem;height: .28rem;" src="../../assets/img/removePro.png" alt="" @click="RemovePero(scope.row.id,scope.row.name)">
                    <span>删除</span>
                  </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-dialog
          :title="dialogname"
          :visible.sync="dialogVisible"
          custom-class="people"
          :close-on-press-escape='false'
          :close-on-click-modal	='false'
          :destroy-on-close='true'
          :before-close="beforeCloseS">
          <div class="DialogLeft">
            <el-form ref="form" :model="form">
              <el-form-item 
                prop="username" 
                :rules="[
                  { required: true, message: ' '},
                ]"
                label="工号">
                  <el-input type="text" maxlength="10" v-model="form.username" placeholder="请输入英文、数字组合，最大长度：10个字符"></el-input>
              </el-form-item>
              <el-form-item 
                prop="department" 
                :rules="[
                  { required: true, message: ' '},
                ]"
                label="部门">
                  <el-input type="text" maxlength="10" v-model="form.department" placeholder="请输入英文、中文，最大长度：10个中文符"></el-input>
              </el-form-item>
              <el-form-item 
                prop="position" 
                :rules="[
                  { required: true, message: ' '},
                ]"
                label="职位">
                  <el-input type="text" maxlength="10" v-model="form.position" placeholder="请输入英文、中文，最大长度：10个中文符"></el-input>
              </el-form-item>
              <el-form-item 
                prop="name" 
                :rules="[
                  { required: true, message: ' '},
                ]"
                label="姓名">
                  <el-input type="text" maxlength="10" v-model="form.name" placeholder="请输入英文、中文，最大长度：10个中文符"></el-input>
              </el-form-item>
              <el-form-item 
                prop="mobile" 
                :rules="[
                  { required: true, message: ' '},
                ]"
                label="电话">
                  <el-input type="number" maxlength="11" v-model="form.mobile" placeholder="请输入联系电话"></el-input>
              </el-form-item>
              <el-form-item 
                prop="head_img" 
                label="头像">
                  <div class="DialogRight">
                    <el-upload
                      class="avatar-uploader"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :http-request="uploadFile"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                      accept="image/png,image/jpg"
                      :disabled="disabled">
                      <img v-if="form.head_img" :src="form.head_img" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </div>

                </el-form-item>

             </el-form>
            <!-- <div>
              <label for="">工号:</label>
              <input type="text" :disabled="disabled" v-model="job_number">
            </div>
            <div>
              <label for="">部门:</label>
              <input type="text" :disabled="disabled" v-model="department">
            </div>
            <div>
              <label for="">职位:</label>
              <input type="text" :disabled="disabled" v-model="positionS">
            </div>
            <div>
              <label for="">姓名:</label>
              <input type="text" :disabled="disabled" v-model="name">
            </div>
            <div>
              <label for="">性别:</label>
              <input type="text" :disabled="disabled" v-model="sex">
            </div>
            <div>
              <label for="">出生日期:</label>
              <input type="text" :disabled="disabled" v-model="birthday" placeholder="生日格式为yyyy-mm-dd">
            </div>
            <div>
              <label for="">联系电话:</label>
              <input type="text" :disabled="disabled" v-model="mobile">
            </div>
            <div>
              <label for="">户籍:</label>
              <input type="text" :disabled="disabled" v-model="domicile">
            </div>
            <div>
              <label for="">暂居地:</label>
              <input type="text" :disabled="disabled" v-model="address">
            </div>
            <div>
              <label for="">学历:</label>
              <input type="text" :disabled="disabled" v-model="edu_background">
            </div>
            <div>
              <label for="">学校:</label>
              <input type="text" :disabled="disabled" v-model="school">
            </div>
            <div>
              <label for="">入职时间:</label>
              <input type="text" :disabled="disabled" v-model="entry_time">
            </div>
            <div>
              <label for="">离职时间:</label>
              <input type="text" :disabled="disabled" v-model="departure_time">
            </div> -->
          </div>
         
          <span slot="footer" class="dialog-footer">
            <el-button v-if="!this.disabled" @click="clearFormTal">取 消</el-button>
            <el-button v-if="!this.disabled" type="primary" @click="PostData('form')">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog
          title="权限配置"
          :visible.sync="dialogQuanxian"
          custom-class="quanxian"
          :close-on-press-escape='false'
          :close-on-click-modal	='false'
          :destroy-on-close='true'
          :before-close="beforeCloseS"
          >
          <div class="qx">
            <div class="qx-tit">权限组</div>
            <div class="qx-list">
              <el-checkbox-group v-model="checkedCities">
                <div class="row" :key="index" v-for="(item,index) in allzulist">
                  <div class="name">{{item.name}}</div>
                  <el-checkbox  :label="item.id" >{{ }}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="clearFormTal">取 消</el-button>
            <el-button type="primary" @click="changeqx">确 定</el-button>
          </span>
        </el-dialog>


        <el-dialog
          title="修改密码"
          :visible.sync="changepassword"
          custom-class="setpass"
          :close-on-press-escape='false'
          :close-on-click-modal	='false'
          :destroy-on-close='true'
          :before-close="beforeCloseS"
          >
          <div class="set">
            <el-input minlength="6" maxlength="16" type="password" placeholder="请输入英文、数字组合，长度6-16位" v-model="passinfo"></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="clearFormTal">取 消</el-button>
            <el-button type="primary" @click="setpass">确 定</el-button>
          </span>
        </el-dialog>


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
        name: "personnelManage",
      components: {UserInfo},
      data(){
        return{
          total:12,     //总条数
          PageSize:this.$store.state.limit,      //一页显示多少条
          CurrentChange:1,         //当前页码
          ProList:[],
          SearchName:'',        //搜索用户信息


          IsSelect:true,     //选择新增OR编辑  true  为新增  false  为编辑


          dialogVisible: false,           //添加项目弹窗
          dialogname:'新增人员',

          dialogQuanxian:false,
          changepassword : false,
          passid : '',
          passinfo : '',
          value: '',

          disabled:false,                //当为查看时   禁用

          imageUrl: '',                 //图片地址

          Grouping:[],            //分组
          checkList:[],   //权限多选框  左侧组
          QuanList:[],                   //权限列表
          QuanxianList:[],        //权限多选框  右侧组



          //新增人员参数
          job_number:'',
          department:'',
          positionS:'',
          name:'',
          sex:'',
          birthday:'',
          mobile:'',
          domicile:'',
          address:'',
          edu_background:'',
          school:'',
          entry_time:'',
          departure_time:'',
          fileS:'',

          aaaa:{},

          PerpleID:'',

          Perplename:'',


          zurenID:'',                     //点开权限  编辑这个人的ID
          GroupName:'',                   //要搜索组名的关键字
          QuanxianName:'',                //要搜索权限的关键字

          tableData : [],
          valueT : '',
          SearchPM : '',
          StatusList : [
            {
              value : '',
              label : '全部'
            },
            {
              value : 'true',
              label : '在职'
            },
            {
              value : 'false',
              label : '离职'
            }
          ],
          form : {
            username : '',
            department : '',
            position : '',
            name : '',
            mobile : '',
            head_img : ''
          },
          checkedCities : [],
          allzulist : [],
          qxid : ''
          
        }
      },
      methods:{
        //导入人员
        importPerson(file){
            console.log(file)
            let formData = new FormData();
            formData.append('file',file.file);
            this.$http.post(this.$conf.env.importperson,formData,true).then(res=>{
              this.$alert.successTit(this,'添加成功')
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });
        },
        //导出人员
        exportpersons(){
          window.open(this.$conf.env.erportperson + `?token=${sessionStorage.getItem('T_ok')}`)
          // this.$http.get(this.$conf.env.erportperson).then(res=>{
          //   console.log(res, '')
          // }).catch(err=>{
          //   this.$alert.errorTit(this,err.response.data.err)
          // });
        },
        SelectList(){
          this.CurrentChange = 1
          this.getUserList()
        },
        handleCurrentChange(val){
          this.CurrentChange = val
          this.getUserList()
        },

        //打开配置权限弹窗
        changequanxian(id){
          this.dialogQuanxian = true;
          this.qxid = id;
          this.$http.get(this.$conf.env.selectyh + `${id}/`).then(res=>{
            this.checkedCities = res.data.message
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },
        //修改密码弹窗
        ChangePass(scope){
          this.changepassword = true;
          this.passid = scope.id;

        },
        //IsSelect   选择新增OR编辑  true  为新增  false  为编辑  false  需要请求数据
        ProjectChange(val,id){
          if(val === 1 ){
            this.IsSelect = true
            this.disabled = false
            this.dialogname = '新增人员'
          }else if(val === 2){
            this.IsSelect = false
            this.disabled = false
            this.dialogname = '编辑人员'
            this.PerpleID = id                 //当前编辑人员ID
            this.getUserInfo(id)
          }else if(val === 3){
            this.IsSelect = false
            this.dialogname = '查看人员'
            this.PerpleID = id                  //当前查看人员ID
            this.disabled = true
            this.getUserInfo(id)
          }
          this.dialogVisible = true;
        },
        uploadFile(file){
          console.log(file)
          const isJPG = file.file.type === 'image/jpeg' || file.file.type === 'image/png';
          const isLt2M = file.file.size / 1024 / 1024 < 2;
           if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
            return;
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
            return;
          }
          this.form.head_img = URL.createObjectURL(file.file)
        },
        handleAvatarSuccess(res, file) {
          console.log(URL)
          this.form.head_img = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          console.log(123)
          this.fileS = file
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          // if (!isJPG) {
          //   this.$message.error('上传头像图片只能是 JPG 格式!');
          // }
          // if (!isLt2M) {
          //   this.$message.error('上传头像图片大小不能超过 2MB!');
          // }
          // return isJPG && isLt2M;
        },

        //当弹窗关闭时清空数据
        beforeCloseS(done){
           this.$confirm('您暂未提交数据，确认关闭吗？')
            .then(_ => {
              done();
              this.clearFormTal()
          })
          .catch(e => {
          });
        },

        //新增人员    修改
        PostData(formName){
          this.$refs[formName].validate((valid) => {
              if (valid) {
                 let formData = new FormData();
                formData.append('username',this.form.username);
                formData.append('department',this.form.department);
                formData.append('position',this.form.position);
                formData.append('name',this.form.name);
                formData.append('mobile',this.form.mobile);
                 //为true为新增人员  false为修改
                if(this.IsSelect){
                  formData.append('head_img',this.fileS);
                  this.$http.post(this.$conf.env.AddUser,formData,true).then(res=>{
                    this.$alert.successTit(this,'添加成功')
                    this.getUserList()
                    this.clearFormTal()
                  }).catch(err=>{
                    this.$alert.errorTit(this,err.response.data.err)
                  });
                }else{
                  //是否有新增头像  无则用后台传值  或者为空
                  if(this.fileS !== ''){
                    formData.append('head_img',this.fileS);
                  }else{
                    formData.append('head_img',this.form.imageUrl);
                  }
                  this.$http.put(this.$conf.env.UserList  + `${this.PerpleID}/`,formData,true).then(res=>{
                    this.$alert.successTit(this,'修改成功')
                    this.getUserList()
                    this.clearFormTal()
                  }).catch(err=>{
                    this.$alert.errorTit(this,err.response.data.err)
                  });
                }
                
              } else {
                return false;
              }
            });
        },

        //获取人员列表
        getUserList(){
          this.$http.get(this.$conf.env.UserList + `?page=${this.CurrentChange}&page_size=${this.PageSize}&is_active=${this.valueT}&search=${this.SearchPM}`).then(res=>{
            console.log(res)
            this.total = res.data.count
            this.tableData = res.data.results
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });

        },

        //搜索用户信息
        searchperson(){
          this.CurrentChange = 1
          this.$http.get(this.$conf.env.UserInfo + `?page=${this.CurrentChange}&search=${this.SearchName}`).then(res=>{
            this.ProList = res.data.results
            this.total = res.data.count
            console.log(res)
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },

        //获取某个人员信息
        getUserInfo(id){
          this.$http.get(this.$conf.env.UserList + `${id}/`).then(res=>{
            console.log(res)
              Object.keys(this.form).forEach(key=>{this.form[key]=res.data.message[key]})
            this.department = res.data.department
            this.positionS = res.data.position
            this.name = res.data.name
            this.job_number = res.data.job_number
            this.birthday = res.data.birthday
            this.sex = res.data.sex
            this.mobile = res.data.mobile
            this.domicile = res.data.domicile
            this.address = res.data.address
            this.edu_background = res.data.edu_background
            this.school = res.data.school
            this.entry_time = res.data.entry_time
            this.departure_time = res.data.departure_time
            this.imageUrl = res.data.head_img
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });

          console.log(id)
        },

        //获取四合一？？？？？？？？
        ChangeQuan(index,id){
          this.Perplename = this.ProList[index].name
          this.dialogQuanxian = true
          this.zurenID = id
          this.$http.get(this.$conf.env.UserQuan).then(res=>{
            this.Grouping = res.data
            console.log(res)
            this.$http.get(this.$conf.env.UserSelectQ + `${id}/`).then(res=>{
              this.checkList = res.data
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });

          this.$http.get(this.$conf.env.AllQuan).then(res=>{
            this.QuanList = res.data
            this.$http.get(this.$conf.env.UserQuanxian + `${id}/`).then(res=>{
              this.QuanxianList = res.data
              console.log(res.data)
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });


        },

        //搜索分组名称
        SearchGroup(){
          this.$http.get(this.$conf.env.UserQuan + `?search=${this.GroupName}&search=${this.SearchName}`).then(res=>{
            this.Grouping = res.data
            console.log(res)
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },


        SearchQuanxian(){
          this.$http.get(this.$conf.env.AllQuan + `?search=${this.QuanxianName}`).then(res=>{
            this.QuanList = res.data
            console.log(res)
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });

        },

        //发送选择组
        SendZuList(){
          let obj = {
            "user": this.zurenID,
            "groups": this.checkList
          }
          this.$http.post(this.$conf.env.UserSelectQ,obj).then(res=>{
            console.log(res)
            this.$alert.successTit(this,'修改成功')
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },

        //发送选择权限
        SendQuanList(){
          let obj = {
            "user": this.zurenID,
            "permissions": this.QuanxianList
          }
          this.$http.post(this.$conf.env.UserQuanxian,obj).then(res=>{
            console.log(res)
            this.$alert.successTit(this,'修改成功')
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },
        //删除某个人
        RemovePero(id,name){
          this.$confirm(`此操作将永久删除${name}, 是否继续?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {

            this.$http.delete(this.$conf.env.UserList + `${id}/`).then(res=>{
              this.$message({
                type: 'success',
                duration:1000,
                message: '删除成功!'
              });
              if(this.tableData.length  == 1){
                if(this.CurrentChange > 1){
                  this.CurrentChange--
                }
              }
              this.getUserList()
            }).catch({

            })


            })
        },


        //获取某一页数据
        getNumPas(){
          this.$http.get(this.$conf.env.UserInfo + `?page=${this.CurrentChange}&search=${this.SearchName}`).then(res=>{
            this.ProList = res.data.results
            this.total = res.data.count
            console.log(res)
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });

        },

         //清空表单数据
        clearFormTal(){
          this.dialogVisible = false;
          Object.keys(this.form).forEach(key=>{this.form[key]=''});
          this.fileS = ''

          this.changepassword = false;
          this.passinfo = ''

          this.dialogQuanxian = false;
          this.checkedCities = []
        },
        //修改密码
        setpass(){
          this.$http.put(this.$conf.env.setPassReq + `${this.passid}/`,{'password':this.passinfo}).then(res=>{
            this.$alert.successTit(this,'修改成功')
            this.clearFormTal()
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },
        //权限配置
        changeqx(){
          let obj = {
            user : this.qxid,
            groups : this.checkedCities
          }
           this.$http.post(this.$conf.env.selectyh,obj).then(res=>{
            this.$alert.successTit(this,res.data.message)
            this.clearFormTal()
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
        },
        beforeCloseS(done){
           this.$confirm('您暂未提交数据，确认关闭吗？')
            .then(_ => {
              done();
              this.clearFormTal()
          })
          .catch(e => {
          });
        }
      },
      mounted(){
        this.getUserList();
        this.$http.get(this.$conf.env.qxsuc + `?page=1&page_size=999`).then(res=>{
            console.log(res)
            this.allzulist = res.data.results
          }).catch(err=>{
            this.$alert.errorTit(this,err.response.data.err)
          });
      },
      created() {
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
      justify-content:flex-end;
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
      .PerSonneSection{
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
            align-items: center;
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
            .upload-demo{
              display: block;
              /deep/ .el-upload {
                display: block;
              }
            }
            .Create{
              height: .42rem;
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
          height: 7.5rem;
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
          // .ProN{
          //   border:1px solid #E4EAEC;
          //   .ProHeader{
          //     width: 100%;
          //     height: .5rem;
          //     background:rgba(228,234,236,1);
          //     color:rgba(62,62,62,1);
          //     line-height:.5rem;
          //     display: flex;
          //     text-align: center;
          //     /*ProNum     ProName  position  academic  phone  age  gender  CreateTime  EndTime  Operation*/
          //     .Operation{
          //       width: 18%;
          //       height: .5rem;
          //     }
          //       .EndTime,.CreateTime,.phone,.position,.ProName{
          //         width: 10%;
          //         height: .5rem;
          //       }
          //     .gender,.age,.academic,.ProNum{
          //       width: 8%;
          //       height: .5rem;
          //     }
          //   }
          //   .proMenu{
          //     width: 100%;
          //     .procant{
          //       width: 100%;
          //       height: .5rem;
          //       background:rgba(228,234,236,1);
          //       color:rgba(62,62,62,1);
          //       line-height:.5rem;
          //       display: flex;
          //       text-align: center;
          //       background: #fff;
          //       .Operation{
          //         width: 18%;
          //         height: .5rem;
          //       }
          //       .EndTime,.CreateTime,.phone,.position,.ProName{
          //         width: 10%;
          //         height: .5rem;
          //       }
          //       .gender,.age,.academic,.ProNum{
          //         width: 8%;
          //         height: .5rem;
          //       }
          //       &:nth-child(2n){
          //         background: #E4EAEC;
          //       }
          //       .Operation{
          //         display: flex;
          //         justify-content: center;
          //         align-items: center;
          //         img{
          //           width: .26rem;
          //           height: .28rem;
          //           margin: .08rem;
          //           cursor: pointer;
          //         }
          //       }
          //     }
          //   }
          // }
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
        .people{
          width:5.38rem;
          height:7.5rem;
          background:rgba(255,255,255,1);
          border-radius:6px;
          .el-dialog__header{
            padding: 0 0 .12rem 0;
            text-align: center;
            font-size:.32rem;
            font-family:Microsoft YaHei;
            font-weight:bold;
            color:rgba(48,48,48,1);
            line-height:.53rem;
            position: relative;
          }
          .el-dialog__headerbtn{
            width: .22rem;
            height: .22rem;
            background: #B2B2B2;
            border-radius: 50%;
            margin-top: -.11rem;
            top: 50%;
            i{
              color: #fff;
            }
          }
          .el-dialog__body{
            padding: 0 .33rem 0 .41rem;
            box-sizing: border-box;
            display: flex;
            .el-form-item{
              margin: 0;
            }
            .DialogLeft{
              width: calc(100% - 1.84rem);
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              div{
                // margin-bottom: .2rem;
                label{
                  font-size:.19rem;
                  line-height: .4rem;
                  font-family:Microsoft YaHei;
                  color:rgba(44,43,43,1);
                  text-align: left;
                  width: 100% !important;
                  display: block;
                }
                .el-input{
                  input{
                    width:4.8rem;
                    height:.36rem;
                    display: block;
                    background: transparent;
                    outline: none;
                    line-height: .36rem;
                    &::placeholder{
                      color: #dddddd;
                    }
                  }
                }
              }
            }
            .DialogRight{
              width: 1.84rem;
              box-sizing: border-box;
              .avatar-uploader .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
              }
              .avatar-uploader .el-upload:hover {
                border-color: #409EFF;
              }
              .avatar-uploader-icon {
                font-size: .28rem;
                color: #8c939d;
                width: .88rem;
                height: .88rem;
                line-height: .88rem;
                text-align: center;
              }
              .avatar {
                width: .88rem;
                height: .88rem;
                display: block;
              }
            }
          }
          .el-dialog__footer{
            padding: 0;
            text-align: center;
            margin-top: .1rem;
            span{
              display: flex;
              justify-content: center;
            }
          }
        }
        .setpass{
          width: 5.38rem;
          height: 2.6rem;
          border-radius: .06rem;
          .el-dialog__header{
            padding:0;
            text-align: center;
            height: .68rem;
            span{
              display: block;
              line-height: .68rem;
              font-size: .2rem;
              font-weight: bold;
              color: #303030;
            }
          }
          .el-dialog__body{
            width: 100%;
            display: flex;
            padding: 0;
            .set{
              margin: 0 auto;
              /deep/ .el-input{
                display: block;
                width: 4.8rem;
                height: .8rem;
                background: #f4f4f4;
                input{
                  width: 100%;
                  height: 100%;
                  display: block;
                  background: #F4F4F4;
                  border: 0;
                }
              }
            }
          }
          .el-dialog__footer{
            padding: 0;
            margin-top: .34rem;
            span{
              display:flex;
              justify-content: center;
              button{
                width: 1.2rem;
                height: .36rem;
                padding:0;
                line-height: .36rem;
              }
            }
          }
        }
        .quanxian{
          width: 5.38rem;
          height: 4rem;
          background: #ffffff;
          border-radius: .06rem;
          .el-dialog__header{
            padding:0;
            text-align: center;
            height: .68rem;
            span{
              display: block;
              line-height: .68rem;
            }
          }
          .el-dialog__body{
            width: 100%;
            display: flex;
            padding: 0;
            .qx{
              width: 100%;
              padding: 0 .28rem;
              box-sizing: border-box;
              .qx-tit{
                font-size: .16rem;
                color: #2c2b2b;
                line-height: .32rem;
              }
              .qx-list{
                width: 4.8rem;
                height: 2.2rem;
                border: 1px solid #e6e6e6;
                margin: 0 auto;
                overflow-x: hidden;
                overflow-y: auto;
                .row{
                  width: 100%;
                  height: .4rem;
                  display: flex;
                  padding: 0 .18rem;
                  justify-content: space-between;
                  box-sizing: border-box;
                  align-items: center;
                  .name{
                    flex: 1;
                    font-size: .14rem;
                    color: #333333;
                  }
                }
                &::-webkit-scrollbar {/*滚动条整体样式*/
                  width: 2px;     /*高宽分别对应横竖滚动条的尺寸*/
                  height: 4px;
                }
                &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
                  border-radius: 5px;
                  background: #F1F1F1;
                }
                &::-webkit-scrollbar-track {/*滚动条里面轨道*/
                  border-radius: 0;
                  background: transparent;
                }



              }
            }
          }
          .el-dialog__footer{
            padding: 0;
            margin-top: .17rem;
            span{
              display:flex;
              justify-content: center;
            }
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
