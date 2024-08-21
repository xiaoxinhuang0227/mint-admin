<template>
  <div class="container">
    <merged-table
      :summaryColumn="summaryColumn"
      :tableColumns="tableColumns"
      :tableData="tableData"
    >
      <template v-slot:content="{ column, data, childData }">
        <ElButton v-if="column.prop === 'operate'" type="primary" plain @click="getData({ column, data, childData })">点击</ElButton>
      </template>
  </merged-table>
  </div>
</template>

<script>
import MergedTable from '@/components/MergedTable/index.vue';
export default {
  name: 'HelloWord',
  data() {
    return {
      summaryColumn: [
        {
          label: "合作单ID：",
          colspan: 2,
          prop: "order_sn",
        },
        {
          label: "创建时间：",
          colspan: 1,
          prop: "created_at",
        },
        {
          label: "约定交付时间：",
          colspan: 3,
          prop: "deliver_time",
        },
      ],
      tableColumns: [
        {
          label: "作者",
          prop: "author",
          merge: true,
        },
        {
          label: "媒介",
          prop: "owner_name",
          merge: true,
        },
        {
          label: "数量",
          prop: "product_count",
        },
        {
          label: "状态",
          prop: "deliver_status",
        },
        {
          label: "销售量",
          prop: "sale",
        },
        {
          label: "操作",
          prop: "operate",
        },
      ],
      tableData: [
        {
          order_sn: '349875984375',
          created_at: '2023-4-4',
          deliver_time: '2034-2-2',
          children: [
            {
              author: 'xiaoxin',
              owner_name: 'juli',
              product_count: 56,
              deliver_status: 1,
              sale: 35874
            },
            {
              author: 'xiaoxin',
              owner_name: 'juli',
              product_count: 56,
              deliver_status: 1,
              sale: 35874
            }
          ]
        },
        {
          order_sn: '3498759484375',
          created_at: '2023-4-4',
          deliver_time: '2034-2-2',
          children: [
            {
              author: 'xiaoxin',
              owner_name: 'juli',
              product_count: 56,
              deliver_status: 1,
              sale: 35874
            },
            {
              author: 'xiaoxin',
              owner_name: 'juli',
              product_count: 56,
              deliver_status: 1,
              sale: 35874
            }
          ]
        },
        {
          order_sn: '349875984375',
          created_at: '2023-4-4',
          deliver_time: '2034-2-2',
          children: [
            {
              author: 'xiaoxin',
              owner_name: 'juli',
              product_count: 56,
              deliver_status: 1,
              sale: 35874
            },
            {
              author: 'xiaoxin',
              owner_name: 'juli',
              product_count: 56,
              deliver_status: 1,
              sale: 35874
            }
          ]
        },
        {
          order_sn: '349875984375',
          created_at: '2023-4-4',
          deliver_time: '2034-2-2',
          children: [
            {
              author: 'xiaoxin',
              owner_name: 'juli',
              product_count: 56,
              deliver_status: 1,
              sale: 35874
            },
            {
              author: 'xiaoxin',
              owner_name: 'juli',
              product_count: 56,
              deliver_status: 1,
              sale: 35874
            }
          ]
        },
        {
          order_sn: '349875984375',
          created_at: '2023-4-4',
          deliver_time: '2034-2-2',
          children: [
            {
              author: 'xiaoxin',
              owner_name: 'juli',
              product_count: 56,
              deliver_status: 1,
              sale: 35874
            },
            {
              author: 'xiaoxin',
              owner_name: 'juli',
              product_count: 56,
              deliver_status: 1,
              sale: 35874
            }
          ]
        }
      ]
    }
  },
  components: {
    MergedTable
  },
  methods: {
    getData(val) {
      console.log(val)
    }
  }
}
</script>
