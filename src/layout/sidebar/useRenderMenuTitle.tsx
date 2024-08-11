import { Icon } from '@/components/Icon';
import { RouteMeta } from 'vue-router';

export const  useRenderMenuTitle = () => {
  const renderMenuTitle = (meta: RouteMeta) => {
    const { title = 'please set title', icon } = meta;
    return (
      <>
        {icon && <Icon style="margin-right: 10px" icon={icon} />}
        <span>{title}</span>
      </>
    )
  }

  return {
    renderMenuTitle
  }
}