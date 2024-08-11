<script lang="tsx">
import { propTypes } from '@/utils/propTypes'
import { ref, unref, PropType, computed, defineComponent } from 'vue'
import { DescriptionsSchema } from './types'
import { get } from 'lodash-es'


export default defineComponent({
  name: 'description',
  props: {
    title: propTypes.string.def(''),
    message: propTypes.string.def(''),
    border: propTypes.bool.def(true),
    column: propTypes.number.def(1),
    size: propTypes.oneOf(['large', 'default', 'small']).def('default'),
    direction: propTypes.oneOf(['horizontal', 'vertical']).def('horizontal'),
    extra: propTypes.string.def(''),
    schema: {
      type: Array as PropType<DescriptionsSchema[]>,
      default: () => []
    },
    data: {
      type: Object as PropType<any>,
      default: () => ({})
    }
  },
  setup(props, { attrs }) {
    const getBindValue = computed((): any => {
      const delArr: string[] = ['schema', 'data']

      const obj = { ...attrs, ...props }
      for (const key in obj) {
        if (delArr.indexOf(key) !== -1) {
          delete obj[key]
        }
      }
      return obj;
    })
    const getBindItemValue = (item: DescriptionsSchema) => {
      const delArr: string[] = ['field']
      const obj = { ...item }
      for (const key in obj) {
        if (delArr.indexOf(key) !== -1) {
          delete obj[key]
        }
      }
      return obj
    }

    return () => {
      console.log(getBindValue)
      return (
        <el-descriptions
          { ...unref(getBindValue) }
        >
          { props.schema.map((item: DescriptionsSchema) => {
            return (
              <el-descriptions-item
                { ...getBindItemValue(item) }
              >
                { item.slots?.default ? item.slots?.default(props.data) : get(props.data, item.field) || '-' }
              </el-descriptions-item>
            )
          }) }
        </el-descriptions>
      )
    } 
  }
})
</script>
