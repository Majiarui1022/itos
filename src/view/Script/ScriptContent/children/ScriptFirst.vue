<template>
  <div class="scriptmenu">
    <div class="script-select">
      <div class="part">
        <i>*</i>
        <div class="init">
          <span>Part No</span>
          <input class="partinit" type="text" />
        </div>
        <div class="init">
          <span>Part Name</span>
          <input type="text" class="nameinit" />
        </div>
        <div class="init">
          <div class="createinit">创建</div>
        </div>
      </div>
    </div>
    <div class="ScriptIndex">
      <div class="partList listBox">
        <ul>
          <li>
            <span>Part No</span>
            <span>Part Name</span>
          </li>
          <li
            @click="setColor(index)"
            :class="partIndex === index?'active':''"
            v-for="(item, index) in partList"
            :key="item"
          >
            <span>part{{index}}</span>
            <span>{{item.name}}</span>
          </li>
        </ul>
        <footer>
          <el-button>上一页</el-button>
          <el-button>下一页</el-button>
        </footer>
      </div>
      <div class="scriptList listBox">
        <ul>
          <li>
            <span>Step No</span>
            <span>Channel</span>
            <span>Type</span>
            <span>Command</span>
            <span>Timeout(ms)</span>
            <span>接线口</span>
            <span></span>
          </li>
          <li
            v-for="(item, index) in (partList[partIndex] && partList[partIndex].orders)"
            :key="index"
          >
            <span>{{index}}</span>
            <span>
              <el-dropdown trigger="click" @command="handleCommand" v-if="item.channel">
                <span class="el-dropdown-link">
                  {{item.channel}}
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1">CH1</el-dropdown-item>
                  <el-dropdown-item command="2">CH2</el-dropdown-item>
                  <el-dropdown-item command="3">CH3</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
            <span>
              <el-dropdown
                trigger="click"
                @visible-change="seleteCategoryIndex = index"
                @command="handleCommand_category"
                v-if="item.category"
              >
                <span class="el-dropdown-link">
                  {{item.category}}
                  <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    :command="item"
                    :key="item"
                    v-for="item in categoryList"
                  >{{item}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
            <span :title="item.content">
              <i>
                <input type="text" v-model="item.content" />
              </i>
            </span>
            <span>
              <input type="text" :value="item.time_out" />
            </span>
            <span :title="item.wiresockets">
              <i>
                <input type="text" :value="item.wiresockets" />
              </i>
            </span>
            <span class="edit">
              <el-button type="primary" icon="el-icon-plus" circle @click="plusScript(index)"></el-button>
              <el-button type="danger" icon="el-icon-minus" circle @click="minusScript(index)"></el-button>
            </span>
          </li>
        </ul>
        <footer>
          <el-button>上一页</el-button>
          <el-button>下一页</el-button>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      partIndex: 0,
      categoryList: ["init", "send", "receive"],
      seleteCategoryIndex: 0,
      partList: [
        {
          id: 1,
          serial_num: 1,
          name: "part名称",
          orders: [
            {
              step_number: 1,
              channel: "CH1",
              category: "receive",
              content:
                "C3 3C F0 0F 01 01 00 01 01 00 00 00 00 82 02 02 03 04 65 F0 E0 BC",
              time_out: 1000,
              wiresockets: "J1-1,J1-2,",
              id: 1
            },
            {
              step_number: 2,
              channel: "CH1",
              category: "receive",
              content:
                "C3 3C F0 0F 01 01 00 01 01 00 00 00 00 82 02 02 03 04 65 F0 E0 BC",
              time_out: 1000,
              wiresockets: "J1-1,J1-2,",
              id: 2
            }
          ]
        }
      ]
    };
  },
  methods: {
    setColor(index) {
      this.partIndex = index;
    },

    /**@name选择通道 */
    handleCommand(command) {
      this.$message("click on item " + command);
    },
    /**@name 选择脚本指令类型 */

    handleCommand_category(command) {
      console.log(command);
      this.partList[this.partIndex].orders[
        this.seleteCategoryIndex
      ].category = command;
    },

    /**@name 添加脚本 */
    plusScript(Index) {
      let obj = {
        channel: "CH1",
        category: "Receive",
        content: "",
        time_out: "",
        wiresockets: "",
        step_number: ""
      };
      this.partList[this.partIndex].orders.splice(Index + 1, 0, obj);
    },

    /**@name 删除脚本 */
    minusScript(Index) {
      this.partList[this.partIndex].orders.splice(Index, 1);
    }

    /**@name 获取脚本指令类型 */
    // getOrder_category() {
    //     this.$http.get(this.$conf.env.getOrder_category).then(res =>{
    //         this.categoryList = res.data.category
    //     })
    // }
  }
};
</script>
<style lang="scss" scope>
.scriptmenu {
  width: 100%;
  height: calc(100% - 0.4rem);
  .script-select {
    width: 100%;
    height: 0.66rem;
    background: #eeeeee;
    display: flex;
    padding-left: 0.5rem;
    box-sizing: border-box;
    .part {
      width: 100%;
      height: 100%;
      padding: 0.15rem 0;
      box-sizing: border-box;
      display: flex;
      .init {
        display: flex;
        align-items: center;
        margin-right: 0.4rem;
      }
      i {
        font-size: 0.16rem;
        text-align: center;
        color: #ff0101;
      }
      span {
        font-size: 0.16rem;
        text-align: left;
        color: #393b6a;
        line-height: 0.36rem;
      }
      .partinit {
        width: 0.6rem;
        height: 0.36rem;
        margin-left: 0.1rem;
      }
      .nameinit {
        width: 2rem;
        height: 0.36rem;
        background: #ffffff;
        border: 0.01rem solid #393b6a;
        margin-left: 0.1rem;
      }
      .createinit {
        width: 0.8rem;
        height: 0.36rem;
        background: #393b6a;
        border-radius: 0.05rem;
        text-align: center;
        line-height: 0.36rem;
        font-size: 0.16rem;
        color: #ffffff;
        letter-spacing: 0.02rem;
      }
    }
  }
  .ScriptIndex {
    display: flex;
    height: calc(100% - 0.66rem);
    justify-content: space-between;
    .listBox {
      width: 2.96rem;
      height: 100%;
      border: .01rem solid rgba(109, 152, 214, 1);
      background: #eeeeee;
      box-shadow: 0px 0px .1rem 0px rgba(36, 44, 64, 0.4) inset;
      padding: .03rem .02rem;
      ul {
        width: 100%;
        margin-bottom: .1rem;
        height: calc(100% - .5rem);
        li {
          height: .34rem;
          width: 100%;
          margin-bottom: .02rem;
          display: flex;
          cursor: pointer;
          > span {
            font-size: .14rem;
            color: rgba(51, 51, 51, 1);
            line-height: .34rem;
          }
          .edit {
            border: 0;
            background: transparent;
            display: flex;
            justify-content: center;
            padding-left: .11rem;
            align-items: center;
            button {
              width: .18rem;
              height: .18rem;
              padding: 0;
              background: rgba(0, 96, 177, 1);
              line-height: .18rem;
              text-align: center;
              i {
                font-size: .14rem !important;
                color: #fff !important;
                margin: 0 !important;
              }
              &:last-child {
                margin-left: .09rem;
                background: rgba(177, 0, 8, 1);
              }
            }
          }
        }
        > li:first-child {
          background: rgba(2, 44, 80, 1);
          span {
            color: rgba(255, 254, 254, 1);
          }
        }
        li.active {
          background: rgba(0, 96, 177, 1);
          span {
            color: rgba(255, 254, 254, 1);
            i {
              color: rgba(255, 255, 255, 1) !important;
            }
          }
        }
      }
      footer {
        display: flex;
        justify-content: center;
        button {
          width: 1.16rem;
          height: .36rem;
          margin-left: 0;
          font-size: .14rem;
          padding: 0;
          color: rgba(255, 254, 254, 1);
        }
        button:first-child {
          background: rgba(153, 153, 153, 1);
        }
        button:last-child {
          background: rgba(0, 96, 177, 1);
          margin-left: .04rem;
        }
      }
    }
    .scriptList {
        width: 12.72rem;
      ul {
        li {
          &:first-child {
            span {
              border: 0;
              background: transparent;
            }
          }
          > span {
            background: #ffffff;
            border: .01rem solid #045fab;
            margin-right: .02rem;
            text-align: center;
            input {
              text-align: center;
              width: 100%;
              height: 98%;
              &:disabled {
                background: transparent;
                color: rgba(51, 51, 51, 1) !important;
                cursor: pointer;
              }
            }
            &:first-child,
            &:nth-child(2),
            &:nth-child(5) {
              width: .8rem;
              i {
                color: rgba(0, 96, 177, 1);
              }
            }
            &:nth-child(3) {
              width: 1.08rem;
              i {
                color: rgba(0, 96, 177, 1);
              }
            }
            &:nth-child(4) {
              width: 6.79rem;
              padding-left: .06rem;
              overflow-y: scroll;
              -webkit-user-select: text;
              -moz-user-select: text;
              -ms-user-select: text;
              i {
                width: auto;
                display: block;
                white-space: nowrap;
                height: 100%;
              }
              &::-webkit-scrollbar {
                display: none;
              }
            }
            &:nth-child(6) {
              width: 1.6rem;
            }

            &:nth-child(4),
            &:nth-child(6) {
              padding-left: .06rem;
              overflow-y: scroll;
              -webkit-user-select: text;
              -moz-user-select: text;
              -ms-user-select: text;
              i {
                width: auto;
                display: block;
                white-space: nowrap;
                height: 100%;
              }
              &::-webkit-scrollbar {
                display: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>