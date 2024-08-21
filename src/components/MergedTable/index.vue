<template>
  <div>
    <div class="com-merged-table">
      <table class="merged-table">
        <thead>
          <tr>
            <th v-for="column in tableColumns" :key="column.prop">
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody v-if="!tableData.length">
          <tr>
            <td :colspan="tableColumns.length">
              <NoData style="min-height: 400px"></NoData>
            </td>
          </tr>
        </tbody>
        <tbody class="tbody-section" v-for="data in tableData" :key="data.id">
          <!-- 信息说明行（总） -->
          <tr class="summary-tr">
            <td
              v-for="summary in summaryColumn"
              :key="summary.prop"
              :colspan="summary.colspan"
            >
              <slot name="summary" :summary="summary" :data="data">
                <p>
                  <span class="label">{{ summary.label }}</span
                  >{{ data[summary.prop] }}
                </p>
              </slot>
            </td>
          </tr>
          <!-- 主要内容部分（子） -->
          <template v-if="data && data.children">
            <tr
              v-for="(child, idx) in data.children"
              :key="idx"
              class="child-tr"
            >
              <!-- 第0项做合并单元格处理，其他项隐藏被合并的单元格 -->
              <td
                class="child-td"
                v-for="column in tableColumns"
                :key="column.prop"
                :rowspan="!idx && column.merge && data.children.length"
                :class="{
                  hide: idx && column.merge,
                  merge: !idx && column.merge && data.children.length > 1,
                }"
              >
                <slot
                  name="content"
                  :column="column"
                  :childData="child"
                  :data="data"
                >
                  <p>{{ child[column.prop] }}</p>
                </slot>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr class="child-tr">
              <td
                class="child-td"
                v-for="column in tableColumns"
                :key="column.prop"
                :rowspan="column.merge"
                :class="{ hide: column.merge }"
              >
                <slot
                  name="content"
                  :column="column"
                  :childData="child"
                  :data="data"
                >
                  <p>{{ child[column.prop] }}</p>
                </slot>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
  <script>
import NoData from "@/components/NoData/index.vue";
export default {
  name: "MergedTable",
  data() {
    return {};
  },
  props: {
    // 信息行配置(label, prop, colspan横向合并单元格数量)
    summaryColumn: {
      type: Array,
      default: () => [],
    },
    // 表格配置(label, prop, merge是否需要纵向合并)
    tableColumns: {
      type: Array,
      default: () => [],
    },
    // 表单数据
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    NoData,
  },
};
</script>
  
<style lang="scss" scoped>
.com-merged-table {
  width: 100%;
//   overflow: auto; 设置overflow sticky不会生效
  table {
    width: 100%;
    color: #1d2129;
    font-size: 12px;
    border-collapse: separate;
    border-spacing: 0;
    text-align: left;
    .tbody-section {
      &:hover {
        // @include bg-color-secondary();
        tr {
          &.summary-tr {
            // background-color: transparent;
          }
        }
      }
    }
    .hide {
      display: none;
    }
    .merge {
      border-bottom: 14px solid #fff;
    }
    thead {
      position: sticky;
      top: 0;
      z-index: 5;
      text-align: left;
      background: #f2f3f8;
      box-shadow: 0px 1px 0px 0px #e5e6ea;
      tr {
        th {
          padding: 15px 10px;
          font-weight: 500;
          font-size: 12px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #1d2129;
          line-height: 17px;
          border-top: 1px solid #e5e8ef;
          &:first-child {
            padding-left: 32px;
          }
        }
      }
    }
    tbody {
      tr {
        &.summary-tr {
          background: #fafafa;
          td {
            padding: 12px 10px 12px;
            line-height: 12px;
            .label {
              color: #86909c;
            }
          }
        }
        &.child-tr:last-child {
          position: relative;
          td {
            border-bottom: 14px solid #fff;
          }
          &::after {
            position: absolute;
            content: "";
            display: block;
            left: 0;
            bottom: 14px;
            width: 100%;
            height: 1px;
            background-color: #e5e8ef;
          }
        }
        td {
          border-top: 1px solid #e5e8ef;
          padding: 10px;
          min-width: 80px;
          line-height: 20px;
          &:first-child {
            padding-left: 32px;
            min-width: 100px;
          }
        }
      }
    }
  }
}
</style>
  