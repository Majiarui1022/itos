<template>
  <div class="ModuleContent">
    <!--    头部-->
    <div class="Header">
      <div class="SearchBox">
      </div>
      <UserInfo></UserInfo>
    </div>
    <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
    <div class="Menu">
      <div class="ModuleSection">
        <div class="MenuHeader">
          <span>设备管理</span>
          <div class="RightBox">
            <div class="Create" @click="ChangeModoule(1)">
              <img src="../../assets/img/create.png" alt />
              新增设备
            </div>
            <div class="Create" @click="sbDialog = true">
              <img src="../../assets/img/create.png" alt />
              新增类别
            </div>
          </div>
        </div>
        <div class="select-fax">
          <div class="item-select">
            <span class="item-tit">设备类别:</span>
            <el-select @change="SelectList" v-model="ModelDetail " placeholder="请选择">
              <el-option
                v-for="item in ModelList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="item-select">
            <span class="item-tit">状态:</span>
            <el-select @change="SelectList" v-model="valueT" placeholder="请选择">
              <el-option
                v-for="item in StatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="item-select">
            <div class="SearchBox">
              <input
                type="text"
                placeholder="请输入关键字进行搜索"
                v-model="SearchPM"
                @keyup.enter="SelectList"
              />
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
            :header-cell-style="{background:'#E4EAEC'}"
          >
            <el-table-column
              prop="equipment_number"
              :align="'center'"
              label="设备编号"
              column-key="date"
            ></el-table-column>
            <el-table-column prop="name" :align="'center'" label="设备名称"></el-table-column>
            <el-table-column
              prop="status"
              :align="'center'"
              label="状态"
              :filter-multiple="false"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">{{scope.row.status}}</template>
            </el-table-column>
            <el-table-column
              prop="equipment_category"
              :align="'center'"
              label="类别"
              :filter-multiple="false"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">{{scope.row.equipment_category}}</template>
            </el-table-column>
            <el-table-column prop="create_time" :align="'center'" label="创建日期"></el-table-column>
            <el-table-column prop="location" :align="'center'" label="位置"></el-table-column>
            <el-table-column :align="'center'" label="操作">
              <template slot-scope="scope">
                <div>
                  <img src="../../assets/img/cha22.png" alt @click="ChangeModoule(2,scope)" />
                  <span>查看</span>
                </div>
                <div>
                  <img src="../../assets/img/tj.png" alt @click="ChangeModoule(3,scope)" />
                  <span>编辑</span>
                </div>

                <div>
                  <img
                    style="width: .22rem;height: .28rem;"
                    src="../../assets/img/removePro.png"
                    alt
                    @click="removeSheb(scope.row)"
                  />
                  <span>删除</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
          custom-class="setsb"
          :close-on-press-escape="false"
          :close-on-click-modal="false"
          :destroy-on-close="true"
        >
          <el-form ref="form" :model="form">
            <el-form-item
              prop="name"
              :rules="[
                    { required: true, message: ' '},
                    ]"
              label="名称"
            >
              <!-- <div class="Label">名称</div> -->
              <el-input
                type="text"
                v-model="form.name"
                :disabled="ISTRUE"
                placeholder="请输入英文、数字组合的模块名称，最大长度10位"
              ></el-input>
            </el-form-item>

            <el-form-item prop="equipment_number" label="资产编号">
              <!-- <div class="Label">名称</div> -->
              <el-input
                type="text"
                v-model="form.equipment_number"
                :disabled="ISTRUE"
                placeholder="请输入英文、数字组合的模块名称，最大长度10位"
              ></el-input>
            </el-form-item>

            <el-form-item prop="equipment_category" label="类别">
              <el-select v-model="form.equipment_category" placeholder="请填写控制器位置" :disabled="ISTRUE">
                <el-option
                  v-for="item in equipmentCategory"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  :disabled="ISTRUE"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="params" label="设备信息">
              <el-input type="textarea" placeholder="请输入内容" v-model="form.params" show-word-limit></el-input>
            </el-form-item>

            <el-form-item prop="location" label="位置">
              <el-select v-model="form.location" placeholder="请填写控制器位置" :disabled="ISTRUE">
                <el-option
                  v-for="item in locationall"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  :disabled="ISTRUE"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item prop="property" label="设备属性">
              <el-select v-model="form.property" placeholder="请填写控制器位置" :disabled="ISTRUE">
                <el-option
                  v-for="item in sbshuxinglist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                  :disabled="ISTRUE"
                ></el-option>
              </el-select>
             
            </el-form-item>
            <el-form-item prop="modules" label="">
               <div class="search-view">
                <div class="searc-init">
                  <el-input type="text" placeholder="请输入内容" v-model="form.textarea" show-word-limit></el-input>
                  <div class="but">
                    <el-select v-model="form.location" :disabled="ISTRUE">
                      <el-option
                        v-for="item in sbshuxinglist"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        :disabled="ISTRUE"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
                <div class="sb-list-view">
                  <el-checkbox-group v-model="form.modules">
                    <div class="row-checklist" :key="index" v-for="(item,index) in ModulesListAll">
                      <div class="name">{{item.module_number}}</div>
                      <div class="name">{{item.name}}</div>
                      <div class="name">{{item.module_category}}</div>
                      <el-checkbox :label="item.id">&nbsp;</el-checkbox>
                    </div>
                  </el-checkbox-group>
                </div>
              </div>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>

        <el-pagination
          background
          layout=" prev, pager, next, jumper"
          :total="total"
          :page-size="PageSize"
          @current-change="handleCurrentChange"
          :current-page.sync="CurrentChange"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      title="设备类别"
      :close-on-press-escape='false'
      :close-on-click-modal='false'
      :visible.sync="sbDialog"
      custom-class="pro">
      <!-- <div class="Label">项目编号</div>
      <input type="text" placeholder="请输入项目编号" v-model="ProNumber"> -->
      <div class="tit-fat">
        <el-input type="text" v-model="lbneme"></el-input>
        <button @click="createCategort">保存</button>
      </div>
      <div class="scriptlist">
        <div class="row row-header">
            <div class="bh">设备类别</div>
            <div class="name">操作</div>
        </div>
        <div class="row-list">
          <div class="row" v-for="(item,index) in ModelList" :key="index">
            <div class="bh">{{item.name}}</div>
            <div>
              <img src="../../assets/img/bjlb.png" alt="" @click="changesb(item.id,item.name)">
              <img src="../../assets/img/sclb.png" alt="" @click="removesblist(item.id)">
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sbDialog = false">取 消</el-button>
        <el-button type="primary" @click="SendDataSystem()">确 定</el-button>
      </span>

      <el-dialog
        width="30%"
        title="编辑"
        custom-class="neifalt"
        :visible.sync="innerVisible"
        append-to-body>
        <div class="name">类别名称</div>
        <el-input type="text" v-model="lbmcname"></el-input>
        <span slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="changesbname">确 定</el-button>
      </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import { loading } from "element-ui";
import UserInfo from "@/components/UserInfo";
export default {
  name: "equipment",
  components: { UserInfo },
  data() {
    return {
      total: 12, //总条数
      PageSize: this.$store.state.limit, //一页显示多少条
      CurrentChange: 1, //当前页码
      tableData: [],
      SearchModule: "", //搜索设备
      ModelDetail: "", //模块类别
      ModelList: [], //模块类别列表
      valueT: "", //状态选择
      innerVisible : false,
      StatusList: [
        {
          value: "fault",
          label: "故障"
        },
        {
          value: "using",
          label: "任务中"
        },
        {
          value: "free",
          label: "空闲"
        }
      ],
      SearchPM: "",
      dialogVisible: false,
      form: {
        equipment_number: "",
        equipment_category: "",
        location : '',
        asset_number: '',
        name:'',
        checkList : [],
        params : '',
        modules : [],
        property : ''
      },
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
      ],
      ISTRUE : false,
      locationall : [],
      equipmentCategory : [],
      ModulesListAll : [],
      sbDialog : false,
      lbneme : '',
      sbid: '' ,
      lbmcname : ''
    };
  },
  methods: {
    //删除设备
    removeSheb(item){
       this.$http
        .delete(this.$conf.env.sblist + `${item.id}/`)
        .then(res => {
          this.$alert.successTit(this, '删除成功');
          if(this.tableData.length == 1 && this.CurrentChange > 1){
            this.CurrentChange -= 1
          }
          this.getsbtablist();
        })
        .catch(err => {
          this.$alert.errorTit(this, err.response.data.err);
        });
    },
    ChangeModoule(val,info) {
      if(val == 1){
       this.$router.push({
         name : 'addequip',
         query : {
           st : val
         }
       }) 
      }else{
        this.$router.push({
         name : 'addequip',
         query : {
           id : info.row.id,
           st : val
         }
       }) 
      }
    },
    //搜索控制器
    SelectFunction() {},
    SelectList() {
      this.CurrentChange = 1;
      this.getsblistTil();
    },
    handleFilterChange() {},
    handleCurrentChange(val) {
      this.CurrentChange = val;
      this.getsblistTil();
    },

    //创建设备类别
    createCategort(){
      let obj = {
        name : this.lbneme
      }
       this.$http.post(this.$conf.env.allsbleibie,obj).then(res => {
          this.lbneme = ''
          this.$alert.successTit(this,'创建成功');
          this.getsbtablist()
        }).catch(err => {
          this.$alert.errorTit(this, err.response.data.err);
        });
    },
    //删除设备类别
    removesblist(id){
       this.$confirm("是否删除此设备")
        .then(_ => {
          this.$http.delete(this.$conf.env.allsbleibie + `${id}/`).then(res => {
            this.$alert.successTit(this,'删除成功');
            this.getsbtablist()
          }).catch(err => {
            this.$alert.errorTit(this, err.response.data.err);
          });
          })
        .catch(_ => {});
      
    },
    //修改设备类别
    changesbname(){
      if(this.lbmcname == '')return;
      let obj = {
        name : this.lbmcname
      }
      this.$http.put(this.$conf.env.allsbleibie + `${this.sbid}/`,obj).then(res => {
        this.$alert.successTit(this,'修改成功');
        this.lbmcname = '';
        this.innerVisible = false
        this.getsbtablist()
      }).catch(err => {
        this.$alert.errorTit(this, err.response.data.err);
      });
      
    },
    //编辑设备
    changesb(id,name){
      this.lbmcname = name
      this.sbid = id
      this.innerVisible = true
    },
    //获取全部设备列表
    getsblistTil() {
      this.$http
        .get(
          this.$conf.env.sblist +
            `?equipment_category=${this.ModelDetail}&status=${this.valueT}&search=${this.SearchPM}&page=${this.CurrentChange}&page_size=${this.PageSize}`
        )
        .then(res => {
          this.total = res.data.count;
          this.tableData = res.data.results;
        })
        .catch(err => {
          this.$alert.errorTit(this, err.response.data.err);
        });
    },
    //获取全部设备类别
    getsbtablist() {
      this.$http
        .get(this.$conf.env.allsbleibie)
        .then(res => {
          this.ModelList = res.data.message;
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

       this.$http
      .get(this.$conf.env.mkcategory)
      .then(res => {
        this.equipmentCategory = res.data.message;
      })
      .catch(err => {
        this.$alert.errorTit(this, err.response.data.err);
      });


       this.$http
      .get(this.$conf.env.ModuleList + '?page=1&page_size=999')
      .then(res => {
        this.ModulesListAll = res.data.results;
      })
      .catch(err => {
        this.$alert.errorTit(this, err.response.data.err);
      });
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
  mounted() {
    this.getsblistTil();
    this.getsbtablist();
  },
  created() {}
};
</script>


<style lang="scss">
.ModuleContent {
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
    .SearchBox {
      width: 4rem;
      height: 0.45rem;
      border-radius: 23px;
      display: flex;
      input {
        width: 3.28rem;
        height: 100%;
        background: transparent;
        border: 0;
        outline: none;
        border-top-left-radius: 23px;
        border-bottom-left-radius: 23px;
        text-indent: 24px;
      }
      .SearchBut {
        width: 0.72rem;
        height: 100%;
        border-top-right-radius: 23px;
        border-bottom-right-radius: 23px;
        background: url("../../assets/img/search.png") center no-repeat;
        background-size: 0.26rem 0.28rem;
        cursor: pointer;
      }
    }
  }
  .Menu {
    flex: 1;
    box-sizing: border-box;
    background: #f4f4f4;
    padding: 0.1rem 0.12rem;
    overflow: hidden;
    .ModuleSection {
      width: 100%;
      height: 100%;
      background: #fff;
      padding: 0.2rem 0.75rem 0 0.52rem;
      box-sizing: border-box;
      overflow-y: scroll;
      overflow-x: hidden;

      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 2PX; /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 2px;
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #F1F1F1;
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
      .select-fax {
        width: 100%;
        height: 0.5rem;
        display: flex;
        .item-select {
          margin-right: 0.6rem;
          display: flex;
          align-items: center;
          .item-tit {
            font-size: 0.18rem;
            color: #666666;
          }
          /deep/ .el-select {
            width: 2rem;
            height: 0.32rem;
            input {
              height: 0.45rem;
              font-size: 0.16rem;
              color: #333333;
              padding: 0 0.12rem;
            }
            .el-select__caret {
              font-size: 0.16rem;
              width: 0.17rem;
            }
          }
          .SearchBox {
            width: 3rem;
            height: 0.32rem;
            background: rgba(242, 242, 242, 1);
            border-radius: 23px;
            display: flex;
            input {
              width: 3.28rem;
              height: 100%;
              background: transparent;
              border: 0;
              outline: none;
              border-top-left-radius: 23px;
              border-bottom-left-radius: 23px;
              text-indent: 24px;
            }
            .SearchBut {
              width: 0.72rem;
              height: 100%;
              border-top-right-radius: 23px;
              border-bottom-right-radius: 23px;
              background: url("../../assets/img/search.png") center no-repeat;
              background-size: 0.26rem 0.28rem;
              cursor: pointer;
            }
          }
          /deep/ .el-input {
            width: 2rem;
            height: 0.32rem;
            border: 0.01rem solid #c9c9c9;
            border-radius: 0.04rem;
            input {
              width: 2rem;
              height: 100%;
              background: transparent;
              border: 0;
              outline: none;
              border-top-left-radius: 23px;
              border-bottom-left-radius: 23px;
              border-radius: 0.04rem;
              // padding: 0 .4rem;
            }
            i {
              line-height: 0.32rem;
            }
          }
        }
      }
      .ProList {
        width: 100%;
        height: 7.6rem;
        .el-table--striped .el-table__body tr.el-table__row--striped td {
          background: #e4eaec;
        }
        .el-table--enable-row-hover .el-table__body tr:hover > td {
        }
        .el-table td,
        .el-table th {
          padding: 0;
          line-height: 0.5rem;
          height: 0.5rem;
          div {
            overflow: initial;
          }
        }
        .el-table__row {
          td {
            &:last-child {
              .cell {
                &:last-child {
                  display: flex;
                  align-items: center;
                  justify-content: space-around;
                  img {
                    width: 0.26rem;
                    height: 0.28rem;
                    margin: 0.08rem;
                    cursor: pointer;
                    &:hover {
                      + span {
                        opacity: 1;
                        z-index: 3;
                      }
                    }
                  }
                  > div {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    position: relative;
                    span {
                      width: 0.72rem;
                      height: 0.36rem;
                      background: rgba(0, 0, 0, 0.5);
                      box-shadow: 0.02rem 0 0.06rem 0 rgba(32, 121, 232, 0.16);
                      font-size: 0.14rem;
                      text-align: center;
                      color: #ffffff;
                      line-height: 0.36rem;
                      position: absolute;
                      left: -0.68rem;
                      bottom: -0.26rem;
                      border-radius: 0.06rem;
                      opacity: 0;
                      transition: opacity 0.3s;
                      z-index: -1;
                    }
                  }
                }
              }
            }
          }
        }
        .el-table .cell {
          font-size: 0.14rem;
          color: #010101;
          line-height: 0.5rem;
          img {
            width: 0.28rem;
            height: 0.28rem;
            display: inline-block;
            cursor: pointer;
          }
        }
        .el-table th > .cell {
          font-size: 0.14rem;
          font-family: Microsoft YaHei;
          color: #3e3e3e;
          line-height: 0.5rem;
        }
      }
      .setsb {
        width: 6.6rem;
        height: 10rem;
        background: #ffffff;
        margin-top: 0.2rem !important;
        .el-dialog__header {
          padding: 0.32rem 0 0;
          text-align: center;
          font-size: 0.32rem;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #303030;
          line-height: 0.43rem;
        }
        .el-dialog__headerbtn {
          width: 0.38rem;
          height: 0.38rem;
          background: #b2b2b2;
          border-radius: 50%;
          i {
            color: #fff;
          }
        }
        .el-dialog__body {
          padding: 0 0.31rem;
          label {
            font-size: 0.19rem;
            line-height: 0.4rem;
            font-family: Microsoft YaHei;
            color: rgba(44, 43, 43, 1);
            text-align: left;
            width: 100% !important;
            display: block;
          }
          input {
            width: 4rem;
            height: 0.36rem;
            display: block;
            background: transparent;
            outline: none;
            text-indent: 0.27rem;
            line-height: 0.36rem;
            &::placeholder {
              color: #dddddd;
            }
          }
          /deep/ .el-select,
          .el-input {
            width: 4rem;
            height: 0.36rem;
            input {
              padding: 0;
            }
            i {
              line-height: 0.36rem;
              display: block;
            }
          }
          /deep/ .el-form {
            .el-form-item {
              margin: 0;
              .el-form-item__content {
                margin-left: 0 !important;
                .searc-init {
                  display: flex;
                  width: 100%;
                  align-items: center;
                  .el-input {
                    flex: 1;
                    input {
                      width: 100%;
                    }
                  }
                  .but {
                    .el-select {
                      width: 1rem;
                      .el-input {
                        width: 1rem;
                        input {
                          width: 100%;
                          text-indent: 0;
                        }
                      }
                    }
                  }
                }
                .search-view {
                  width: 4rem;
                  .sb-list-view {
                    width: 100%;
                    height: 1.6rem;
                    border: 1px solid #e6e6e6;
                    overflow-x: hidden;
                    overflow-y: scroll;
                    .row-checklist {
                      width: 100%;
                      font-size: 0.14rem;
                      color: #333333;
                      display: flex;
                      justify-content: space-between;
                      align-items: center;
                      height: 0.3rem;
                      .name {
                        &:nth-child(1) {
                          width:1rem;
                        }
                        &:nth-child(2) {
                          width: 1.2rem;
                        }
                        &:nth-child(3) {
                          width: 1rem;
                        }
                      }
                      label{
                        width: auto !important;
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
                      background: #f1f1f1;
                    }
                    &::-webkit-scrollbar-track {
                      /*滚动条里面轨道*/
                      border-radius: 0;
                      background: transparent;
                    }
                  }
                }
              }
            }
          }
          textarea {
            width: 4rem;
            height: 1.5rem;
            border: 1px solid rgba(230, 230, 230, 1);
            resize: none;
          }
        }
        .el-dialog__footer {
          padding: none;
          margin-top: 0.24rem;
          .dialog-footer {
            display: flex;
            justify-content: center;
          }
        }
      }
      
      /*分页*/
      .el-pagination {
        display: flex;
        justify-content: flex-end;
        margin-top: 0.3rem;
      }
      .el-pagination__jump {
        font-size: 0.14rem;
        color: rgba(87, 96, 119, 1);
        line-height: 0.48rem;
      }
      .el-pagination__editor.el-input .el-input__inner {
        height: 0.46rem;
      }
      .el-pagination.is-background .btn-next,
      .el-pagination.is-background .btn-prev,
      .el-pagination.is-background .el-pager li {
        border: 1px solid rgba(194, 202, 216, 1);
        background: #fff;
        width: 0.48rem;
        height: 0.48rem;
        border-right: 0;
        line-height: 0.48rem;
        margin: 0;

        font-size: 0.16rem;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(87, 96, 119, 1);
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background: #c2cad8;
      }
      .el-pagination.is-background .el-pager li:not(.disabled):hover {
        color: #576077;
      }
      .el-pagination .btn-next .el-icon,
      .el-pagination .btn-prev .el-icon {
        color: #c2cad8;
      }
      .btn-next {
        border-right: 1px solid rgba(194, 202, 216, 1) !important;
      }
      .btn-prev,
      .btn-next {
        background: #fff !important;
      }
    }
  }
  .pro{
        width: 5.38rem;
        height: 4rem;
        background: #ffffff;
        border-radius: .06rem;
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
          margin-top: .14rem;
          .tit-fat{
            width: 100%;
            height: .36rem;
            display: flex;
            input{
              width: 4rem;
              height: 100%;
            }
            button{
              width: .8rem;
              height: .36rem;
              background: #393b6a;
              text-align: center;
              font-size: .14rem;
              color: #ffffff;
              line-height: .36rem;
              cursor: pointer;
              &:active{
                opacity: .9;
              }
            }
          }
          .scriptlist{
            width: 4.8rem;
            height: 1.66rem;
            background: #ffffff;
            border: 1px solid #393b6a;
            margin: 0 auto;
            .row{
              width: 100%;
              height: .3rem;
              display: flex;
              justify-content: space-between;
              padding-right: .2rem;
              box-sizing: border-box;
              align-items: center;
              div{
                font-size: .14rem;
                text-align: left;
                color: #3e3e3e;
                line-height: .3rem;
              }
              .bh{
                width: 1.41rem;
                padding-left: .14rem;
                box-sizing: border-box;
              }
              .name{
                width: 2.87rem;
              }
              img{
                width: .16rem;
                height: .16rem;
                cursor: pointer;
              }
            }
            .row-list{
              width: 100%;
              height: calc(100% - .3rem);
              overflow-x: hidden;
              overflow-y: auto;

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
                img{
                  margin: 0 .05rem;
                }
            }
            .row-header{
              background: #e4eaec;
              .name{
                text-align: right;
                padding-right: .1rem;
              }
            }
          }
        }
        .el-dialog__footer{
          padding: 0;
          text-align: center;
          margin-top: .5rem;
          display: none;
        }
      }
  .el-dialog__wrapper {
    position: absolute;
  }
}
.el-message {
  min-width: 2.8rem;
  width: 2.8rem;
  .el-icon-info,
  .el-icon-success {
    font-size: 0.24rem;
  }
}
.el-loading-spinner {
  width: 100%;
  height: 0.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  .el-icon-loading {
    font-size: 0.28rem;
  }
  .el-loading-text {
    font-size: 0.14rem;
  }
}
.neifalt{
  width: 5.38rem !important;
  height: 2.39rem;
  background: #ffffff;
  box-shadow: 3px 3px 6px 0px rgba(2,24,68,0.38), 2px 3px 6px 0px rgba(2,24,68,0.38); 
  .el-dialog__header{
    padding: 0;
    height: .84rem;
    span{
      display: block;
      text-align: center;
      line-height: .84rem;
    }
  }
  .el-dialog__body{
    padding: 0 .3rem;
  }
  .el-dialog__footer{
    padding: 0;
    margin-top: .1rem;
    span{
      display: flex;
      justify-content: center;
    }
  }
}
</style>
