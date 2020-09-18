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
          <span>位置管理</span>
          <div class="RightBox">
            <div class="Create" @click="showZuDia(1)">
              <img src="../../assets/img/create.png" alt />
              新增
            </div>
          </div>
        </div>
        <div class="select-fax">
        </div>
        <div class="ProList">
          <el-table
            :data="tableData"
            style="width: 100%"
            stripe
            height="7.6rem"
            :header-cell-style="{background:'#E4EAEC'}"
          >
            <el-table-column prop="id" label="编号" :align="'center'" column-key="date"></el-table-column>
            <el-table-column prop="name" :align="'center'" label="位置名称"></el-table-column>
            <el-table-column :align="'center'" label="操作" width="100px">
              <template slot-scope="scope">
                <div>
                  <img
                    src="../../assets/img/createPro.png"
                    alt
                    @click="showZuDia(2,scope.row.id)"
                  />
                  <span>编辑</span>
                </div>
                <div>
                  <img
                    style="width: .22rem;height: .28rem;"
                    src="../../assets/img/removePro.png"
                    alt
                    @click="RemovePero(scope.row.id,scope.row.name)"
                  />
                  <span>删除</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-pagination
          background
          layout=" prev, pager, next, jumper"
          :total="total"
          :page-size="PageSize"
          :current-page.sync="CurrentChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>

    <el-dialog 
      :title="titleName" 
      :visible.sync="dialogFormVisible" 
      :close-on-press-escape='false'
      :close-on-click-modal	='false'
      :destroy-on-close='true'
      :before-close="beforeCloseS"
      custom-class="createzu">
      <el-form ref="form" :model="form">
        <el-form-item 
        label="位置名称"
        prop="name" 
        :rules="[
          { required: true, message: ' '},
        ]"
        > 
          <el-input v-model="form.name" maxlength="5" autocomplete="off" placeholder="请输入5位英文、中文或数字"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createZuname('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UserInfo from "@/components/UserInfo";
export default {
  name: "locationSet",
  components: { UserInfo },
  data() {
    return {
      SearchName: "",
      SearchPM: "",
      tableData: [],
      dialogFormVisible: false,
      total:12,     //总条数
      PageSize:this.$store.state.limit,      //一页显示多少条
      CurrentChange : 1,
      form : {
        name : ''
      },
      titleName : '新增',
      zuID : ''
    };
  },
  methods: {
    showZuDia(val,id){
      if(val === 1){
        this.titleName = '新增';
      }else{
        this.titleName = '编辑';
        this.zuID = id;
        this.getlocationdetail()
      }
      this.dialogFormVisible = true;
    },
    searchperson() {},
    handleCurrentChange(val){
      this.CurrentChange = val;
      this.getqxlist()
    },
    //获取权限组列表
    getqxlist(){
      this.$http.get(this.$conf.env.locationset + `?page=${this.CurrentChange}&page_size=${this.PageSize}`).then(res=>{
        console.log(res)
        this.total = res.data.count
        this.tableData = res.data.results
      }).catch(err=>{
        this.$alert.errorTit(this,err.response.data.err)
      });
    },
    //创建组名
    createZuname(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.titleName == '新增'){
             this.$http.post(this.$conf.env.locationset,this.form).then(res=>{
              console.log(res)
              if(res.code == -1)return
              this.$alert.successTit(this,'添加成功');
              this.clearFormTal()
              this.getqxlist()
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });
          }else{
            this.$http.put(this.$conf.env.locationset + `${this.zuID}/`,this.form).then(res=>{
              console.log(res)
              if(res.code == -1)return
              this.$alert.successTit(this,'修改成功')
              this.clearFormTal()
              this.getqxlist()
            }).catch(err=>{
              this.$alert.errorTit(this,err.response.data.err)
            });
          }
        } else {
          return false;
        }
      });
    },

    //获取位置详情
    getlocationdetail(){
      this.$http.get(this.$conf.env.locationset + `${this.zuID}/`,this.form).then(res=>{
        console.log(res)
        this.form.name = res.data.message.name;
      }).catch(err=>{
        this.$alert.errorTit(this,err.response.data.err)
      });
    },

       //删除某权限
        RemovePero(id,name){
          this.$confirm(`此操作将永久删除位置 ${name}, 是否继续?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.$http.delete(this.$conf.env.locationset + `${id}/`).then(res=>{
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
              this.getqxlist()
            }).catch({

            })


            })
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
  mounted(){
    this.getqxlist()
  }
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
    .PerSonneSection {
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
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #e6e6e6;
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
        height: 7.5rem;
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
  .el-dialog__wrapper {
    position: absolute;
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
      margin-bottom: .2rem;
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
      padding: 0 .3rem;
      .dialog-footer{
        display: flex;
      }
    }
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

</style>
