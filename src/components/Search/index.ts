import { FormSchema, FormSetProps } from '../Form'
import Search from './src/Search.vue'

export type { SearchProps } from './src/types'

export interface SearchExpose {
  setValues: (data: object) => void
  setProps: (props: object) => void
  delSchema: (field: string) => void
  addSchema: (formSchema: FormSchema, index?: number) => void
  setSchema: (schemaProps: FormSetProps[]) => void
  getFormData: <T = object>() => Promise<T>
}

export { Search }
