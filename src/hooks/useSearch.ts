import { ref, unref, nextTick } from 'vue'
import { FormSchema, FormSetProps } from '@/components/Form'
import { SearchExpose, SearchProps } from '@/components/Search'

export const useSearch = () => {
  // Search实例
  const searchRef = ref<SearchExpose>()

  /**
   * @param ref Search实例
   * @param elRef ElForm实例
   */
  const register = (ref: SearchExpose) => {
    searchRef.value = ref
  }

  const getSearch = async () => {
    await nextTick()
    const search = unref(searchRef)
    if (!search) {
      console.error('The Search is not registered. Please use the register method to register')
    }
    return search
  }

  // 一些内置的方法
  const methods = {
    /**
     * @description 设置search组件的props
     * @param field FormItem的field
     */
    setProps: async (props: SearchProps = {}) => {
      const search = await getSearch()
      search?.setProps(props)
      if (props.model) {
        search?.setValues(props.model)
      }
    },

    /**
     * @description 设置form的值
     * @param data 需要设置的数据
     */
    setValues: async (data: object) => {
      const search = await getSearch()
      search?.setValues(data)
    },

    /**
     * @description 获取表单数据
     * @returns form data
     */
    getFormData: async () => {
      const search = await getSearch()
      return search?.getFormData()
    }
  }

  return {
    searchRegister: register,
    searchMethods: methods
  }
}
