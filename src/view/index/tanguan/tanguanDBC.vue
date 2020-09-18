<template>

  <div class="DBCAnalysisBox">
    <div class="DBCTit">
      <div>
        <el-upload
          class="upload-demo"
          action="http://10.102.100.28:8003/carbon_tank/scripts/ctt_data/"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          auto-upload
          :show-file-list="false">
          <el-button size="small" type="primary">导入原始报文</el-button>
        </el-upload>
      </div>
      <div><input type="file" title="点击选择文件">导入DBC文件</div>
      <div @click="ExportDBC">导出协议</div>
    </div>
    <div class="TabBox">
      <el-table
        :data="cttDataList"
        border
        @row-click="handleRowClick"
        highlight-current-row
        height="4.43rem"
        style="width: 100%">
        <el-table-column
          prop="content.part_no"
          label="Part.NO">
        </el-table-column>
        <el-table-column
          prop="content.type"
          label="Type">
        </el-table-column>

        <el-table-column
          prop="content.timeout"
          label="Timeout(ms)">
        </el-table-column>

        <el-table-column
          prop="content.can_send_id"
          label="Can_Send_ID">
        </el-table-column>

        <el-table-column
          prop="content.length_send"
          label="Length_Send">
        </el-table-column>

        <el-table-column
          prop="content.message_send"
          label="Mwssage_Send">
        </el-table-column>

        <el-table-column
          prop="content.can_rev_id"
          label="Can_Rev_ID">
        </el-table-column>
        <el-table-column
          prop="content.length_rev"
          label="Length_Rev">
        </el-table-column>
        <el-table-column
          prop="content.message_rev"
          label="Message_Rev">
        </el-table-column>
      </el-table>
    </div>
    <div class="PartNoBox">
      <div class="PartNo">Part.NO.2</div>
      <div class="MessageRev">
        <table>
          <tr>
            <td>Message_REV：</td>
            <td>0F</td>
            <td>01</td>
            <td>5F</td>
            <td>02</td>
            <td>00</td>
            <td>11</td>
            <td>F5</td>
            <td>F1</td>
          </tr>
          <tr>
            <td>二进制数：</td>
            <td><span>0000</span><span>1111</span></td>
            <td><span>1001</span><span>0101</span></td>
            <td><span>0001</span><span>0010</span></td>
            <td><span>1110</span><span>1111</span></td>
            <td><span>1010</span><span>0000</span></td>
            <td><span>0100</span><span>0000</span></td>
            <td><span>0000</span><span>1101</span></td>
            <td><span>0101</span><span>1010</span></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="SignelBox">
      <div class="Left">
        <el-table
          :data="andruleList"
          border
          height="2.5rem"
          style="width: 100%">
          <el-table-column
            min-width="18%"
            label="Signel.Name"
            :render-header="renderHeaderOne">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.signal_name">
            </template>
          </el-table-column>

          <el-table-column
            min-width="8%"
            label="起始位">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.start_bit">
            </template>
          </el-table-column>

          <el-table-column
            min-width="10%"
            label="信号长度">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.signal_size">
            </template>
          </el-table-column>

          <el-table-column
            min-width="10%"
            label="大小头">
            <template slot-scope="scope">
              <el-select v-model="scope.row.byte_order" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column
            min-width="10%"
            label="有无符号">
            <template slot-scope="scope">
              <el-select v-model="scope.row.value_type" placeholder="请选择">
                <el-option
                  v-for="item in optionsTwo"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>

          <el-table-column
            min-width="6%"
            label="单位">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.unit">
            </template>
          </el-table-column>

          <el-table-column
            min-width="10%"
            label="比例因子">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.factor">
            </template>
          </el-table-column>
          <el-table-column
            min-width="7%"
            label="偏移量">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.offset">
            </template>
          </el-table-column>
          <el-table-column
            min-width="6%"
            label="Max">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.max">
            </template>
          </el-table-column>
          <el-table-column
            min-width="6%"
            label="Min">
            <template slot-scope="scope">
              <input type="text" v-model="scope.row.min">
            </template>
          </el-table-column>

          <el-table-column
            min-width="6%"
            :render-header="renderHeader">
            <template slot-scope="scope">
              <img src="../../../assets/img/removeP.png" alt="" style="cursor: pointer" @click="Removeandrule(scope)">
            </template>
          </el-table-column>


        </el-table>
      </div>
      <div class="Right">
        <el-table
          :data="ListAA"
          border
          height="2.5rem"
          style="width: 100%">
          <el-table-column
            prop="name"
            min-width="40%"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="num"
            min-width="20%"
            label="数值">
          </el-table-column>

          <el-table-column
            prop="unit"
            min-width="20%"
            label="单位">
          </el-table-column>

          <el-table-column
            min-width="20%"
            label="状态">
            <template slot-scope="scope">
              <span class="circle" :class="scope.row.status === 1 ? 'green': scope.row.status === 0 ? 'none':scope.row.status === 2 ? 'red':''"></span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "tanguanDBC",
      data() {
        return {
          fileList: [
            {
              name: 'food.jpeg',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            },
            {name: 'food2.jpeg',
              url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }
          ],
          cttDataList:[],
          tableData: [
            {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            },
          ],
          andruleList:[],
          SaveImg:require("../../../assets/img/saveP.png"),
          AddImg:require("../../../assets/img/ADDPart.png"),
          options: [
            {
              value: 'Montorola',
              label: 'Montorola'
            }, {
              value: 'Inter',
              label: 'Inter'
            },
          ],
          value: '',
          optionsTwo: [
            {
              value: '+',
              label: '+'
            }, {
              value: '-',
              label: '-'
            },
          ],
          valueTwo: '',

          ListAA:[],

          ShiLiuJin:[],
          Num:1,      //分页  页码
          aabb:true,
          NextUrl:true
        }
      },
      methods:{
        getCTTdata(){
          this.$http.get(this.$conf.env.DBCAnalysis + `?page=${this.Num}`).then(res=>{
            this.cttDataList = res.data.results
            this.NextUrl = res.data.next
            console.log(res.data.results)
          }).catch(err=>{
            console.log(err)
            this.$alert.errorTit(this,err.response.data.err)
          });


          this.$http.get(this.$conf.env.SeeAllAnarule).then(res=>{
            this.andruleList = res.data
          }).catch(err=>{
            console.log(err)
            this.$alert.errorTit(this,err.response.data.err)
          });

        },


        //自定义表头
        renderHeader(h, {column, $index}){
          return h ('img',{
            domProps:{
              src:this.SaveImg
            },
            on:{
              click:()=>{
                this.$http.post(this.$conf.env.SeeAllAnarule,this.andruleList).then(res=>{
                  console.log(res.data)
                  this.$alert.successTit(this,'保存成功')
                }).catch(err=>{
                  console.log(err)
                  this.$alert.errorTit(this,err.response.data.err)
                });

              }
            },
            style:{
              cursor:'pointer'
            }
          })
        },
        renderHeaderOne(h, {column, $index}){
          console.log(h)
          return h ('div',[
            h('span', column.label),
            h('img',{
              domProps:{
                src:this.AddImg
              },
              style:{
                cursor:'pointer'
              },
              on:{
                click:()=>{
                  this.AddAndrule()
                }
              },
            })
          ])
        },


        //添加解析规则
        AddAndrule(){
          this.andruleList.push({
            "signal_name": "",
            "start_bit": "",
            "signal_size": "",
            "byte_order": "Inter",
            "value_type": "+",
            "factor": "",
            "offset": "",
            "max": "",
            "min": "",
            "unit": ""
          })
          this.$nextTick(()=>{
            var div =document.getElementsByClassName('el-table__body-wrapper')[1];
            div.scrollTop = div.scrollHeight;
          })
        },


        handleRowClick(row){
          this.ListAA = []
          this.$http.get(this.$conf.env.ParseResult + `${row.id}/`).then(res=>{
            this.ListAA = res.data
            var div =document.getElementsByClassName('el-table__body-wrapper')[2];
            div.scrollTop = 0;
          }).catch(err=>{
            console.log(err)
            this.$alert.errorTit(this,err.response.data.err)
          });

          this.$http.get(this.$conf.env.DBCAnalysis + `${row.id}/`).then(res=>{
            console.log(res.data)
          }).catch(err=>{
            console.log(err)
            this.$alert.errorTit(this,err.response.data.err)
          });
        },


        //删除解析规则
        Removeandrule(val){
          if(!val.row.id){
            this.andruleList.splice(val.$index,1)
            return
          }
          this.$http.delete(this.$conf.env.SeeAllAnarule + `${val.row.id}/`).then(res=>{
            this.andruleList.splice(val.$index,1)
            this.$alert.successTit(this,'删除成功')
          }).catch(err=>{
            console.log(err)
            this.$alert.errorTit(this,err.response.data.err)
          });
        },

        handleAvatarSuccess(res, file) {
          console.log(file);
          console.log(file.raw);
        },
        beforeAvatarUpload(file) {
          console.log(file);
          let formData = new FormData();
          formData.append('file',file)
          this.$http.post(this.$conf.env.DBCAnalysis,formData,true).then(res=>{
            console.log(res.data)
            this.cttDataList = res.data
          }).catch(err=>{
            console.log(err)
            this.$alert.errorTit(this,err.response.data.err)
          });
        },


        //导出DBC协议
        ExportDBC(){

          this.$http.get(this.$conf.env.ExportDbcFile).then(res=>{
            console.log(res.data)
            window.open(res.data.message,"_blank")
          }).catch(err=>{
            console.log(err)
            this.$alert.errorTit(this,err.response.data.err)
          });

        },
        handleScroll(){
          var div =document.getElementsByClassName('el-table__body-wrapper')[0];
          if(div.scrollHeight - div.scrollTop - div.clientHeight <= 100){
            if(this.aabb && this.NextUrl){
              this.aabb = false
              this.Num++
              this.$http.get(this.$conf.env.DBCAnalysis + `?page=${this.Num}`).then(res=>{
                this.cttDataList = this.cttDataList.concat(res.data.results)
                this.aabb = true
                this.NextUrl = res.data.next
              }).catch(err=>{
                console.log(err)
                this.$alert.errorTit(this,err.response.data.err)
              })
            }
          }



        }
      },
      mounted() {
        this.getCTTdata()
        document.getElementsByClassName('el-table__body-wrapper')[0].addEventListener('scroll', this.handleScroll)
      }
    }
</script>

<style lang="scss">

  .DBCAnalysisBox{
    width: 100%;
    height: 100%;
    .el-table--scrollable-y .el-table__body-wrapper{
      background: #8082B8;
    }
    .el-table--scrollable-y .el-table__body-wrapper{
      &::-webkit-scrollbar {/*滚动条整体样式*/
        width: .12rem;     /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
      }
      &::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #393B6A;
      }
      &::-webkit-scrollbar-track {/*滚动条里面轨道*/
        /*-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);*/
        border-radius: 0;
        background: #8082B8;
      }
    }
    .DBCTit{
      width:100%;
      height:.8rem;
      background:rgba(45,46,93,1);
      display: flex;
      padding: 0 .57rem;
      box-sizing: border-box;
      align-items: center;
      justify-content: flex-end;
      >div{
        font-size:.16rem;
        font-family:Microsoft YaHei;
        color:rgba(255,255,255,1);
        line-height:.36rem;
        margin-left: .17rem;
        border-radius:5px;
        padding:0 .08rem;
        cursor: pointer;
        position: relative;
        .el-button--primary{
          background: #0863C9;
          border: 0;
        }
        input{
          display: block;
          width: 100%;
          height: 100%;
          opacity: 0;
          position: absolute;
          left: 0;
          top: 0;
          z-index: 10;
          cursor: pointer;
        }
        &:first-child{
          background: #0863C9;
        }
        &:nth-child(2){
          background: #C90848;
        }
        &:last-child{
          background: #08C2C9;
        }
      }
    }
    .TabBox{
      width: 100%;
      height: 5.6rem;
      background: #8082B8;
      .el-table__body tr.current-row>td{
        background: #2D2E5D !important;
        color: #7073B1;
      }
      .el-table{
        width: 100%;
        &::before{
          width: 0;
        }
      }
      .el-table--border::after, .el-table--group::after{
        width: 0;
      }
      .el-table--border, .el-table--group{
        border-color: #62649A;
        background: #2D2E5D;
      }
      .el-table th, .el-table tr{
        background: #62649A;
      }
      .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
        border-color: #2D2E5D;
        color:rgba(45,46,93,1);
        border-right: 0;
      }
      .el-table--enable-row-hover .el-table__body tr:hover>td{
        background: #2D2E5D;
        color: #7073B1;
      }
    }
    .PartNoBox{
      width: 100%;
      height: .7rem;
      background: #62649A;
      .PartNo{
        width:1.3rem;
        height:.3rem;
        background:rgba(45,46,93,1);
        float: left;
        font-size:.16rem;
        font-family:Microsoft YaHei;
        color:rgba(255,255,255,1);
        line-height:.3rem;
        text-align: center;
      }
      .MessageRev{
        float: left;
        width: calc(100% - 2rem);
        margin-left: .2rem;
        height: 100%;
        table{
          tr{
            td{
              font-size:.16rem;
              font-family:Microsoft YaHei;
              color:rgba(45,46,93,1);
              line-height:.35rem;
              text-align: center;
              padding: 0 .1rem;
              span{
                margin: .05rem;
              }
              &:first-child{
                text-align: right;
              }
            }
          }
        }
      }
    }
    .SignelBox{
      width: 100%;
      height: 3rem;
      background: #62649A;
      .Left {
        width: 67%;
        height: 100%;
        float: left;
        .el-table th>.cell{
          text-align: center;
          >div{
            display: flex;
            align-items: center;
            justify-content: center;
            span{
              margin-right: .1rem;
            }
          }
        }
        .el-table td>.cell input{
          display: block;
          width: 100%;
          height: 100%;
          background: transparent;
          outline: none;
          border: 0;
          text-align: center;
          color: #2d2e5d;
          font-size: .16rem;
        }
        .el-table td>.cell{
          text-align: center;
          .el-select{
            input{
              padding: 0;
              padding-right: .3rem;
            }
            .el-input__icon{
              line-height: 100%;
              color: #2D2E5D;
            }
          }
        }
        .el-table__body-wrapper, .el-table__footer-wrapper, .el-table__header-wrapper {
          background: #2D2E5D;
        }

        .el-table {
          width: 100%;
        }

        .el-table--border::after, .el-table--group::after {
          width: 0;
        }

        .el-table--border, .el-table--group {
          border-color: #62649A;
        }

        .el-table th, .el-table tr {
          background: #62649A;
          border-top: 1px solid #62649A;
        }

        .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed {
          border-color: #2D2E5D;
          color: rgba(45, 46, 93, 1);
          border-right: 0;
          border-right: 0;
          padding: 0;
          height: .4rem;
          line-height: .4rem;
        }

        .el-table--enable-row-hover .el-table__body tr:hover > td {
          background: #62649A;
        }
        .el-table__body-wrapper{
          background: #8082B8;
        }
      }
      .Right{
        width: 33%;
        height: 100%;;
        float: left;


        .el-table td>.cell{
          .circle{
            width:.16rem;
            height:.16rem;
            border-radius:50%;
            margin: 0 auto;
            display: block;
            &.red{
              background:rgba(255,3,9,1);
            }
            &.green{
              background:rgba(3,255,33,1);
            }
            &.none{
              display: none;
            }
          }
        }
        .el-table{
          width: 100%;
        }
        .el-table th, .el-table tr{
          background: #62649A;
          border-top: 1px solid #62649A;
        }
        .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
          border-color: #2D2E5D;
          color:rgba(45,46,93,1);
        }
        .el-table--enable-row-hover .el-table__body tr:hover>td{
          background: #62649A;
        }
        .el-table__body-wrapper{
          background: #62649A;
        }
        .el-table--border::after, .el-table--group::after{
          width: 0;
        }
        .el-table--border, .el-table--group{
          border-color: #62649A;
        }
      }
    }
  }
  .el-select-dropdown__item{
    font-size: .16rem;
    line-height: .32rem;
    height: .32rem;
  }
</style>
