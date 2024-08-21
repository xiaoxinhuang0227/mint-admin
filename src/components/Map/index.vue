<script setup>

onMounted(() => {
  initMap()
})

const markerLayerScenery = ref();
const updateMarker = ref();
const searchPosition = ref();
const keyword = ref();

const $emit = defineEmits(['markerPosChange']);

const initMap = () => {
  const center = new TMap.LatLng(39.984120, 116.307484)
  const oMapEl = document.getElementById('scenery_location');
  // 初始化地图
  const map = new TMap.Map(oMapEl, {
    center,
    zoom: 15,
    minZoom: 10,
    viewMode: '2D',
  });
  // 初始化marker图层
  const markerLayer = markerLayerScenery.value = new TMap.MultiMarker({
    map,
    id: 'marker-layer',
    styles: {
      'markerStyle': new TMap.MarkerStyle({
        width: 26,
        height: 36,
        anchor: { x: 13, y: 35 }
      })
    },
  })
  // 点击设置marker
  map.on('click', (e) => {
    markerLayer.setGeometries([]);
    markerLayer.add({
      id: 'marker',
      styleId: 'markerStyle',
      position: e.latLng
    })
    $emit('markerPosChange', e.latLng);
  })
  // 更新marker位置
  updateMarker.value = (position) => {
    const latLng = new TMap.LatLng(position.lat, position.lng);
    markerLayer.updateGeometries([{
      id: 'marker',
      styleId: 'markerStyle',
      position: latLng
    }])
    map.setCenter(latLng);
  }

  let suggest = new TMap.service.Suggestion({
    pageSize: 10, // 返回结果每页条目数
  });

  searchPosition.value = async (keyword, cb) => {
    try {
      const res = await suggest.getSuggestions({ keyword, location: center });
      if (res?.data?.length) {
        cb(res.data);
      }
    } catch (e) {
      ElMessage.error(e.message)
    }
  }
}

const selectAddress = (v) => {
  updateMarker.value(v.location);
  $emit('markerPosChange', v.location);
}

defineExpose({
  updateMarker,
  searchPosition
})
</script>

<template>
  <div class="component-map">
    <div
      id="scenery_location"
      style="height: 600px; cursor: pointer;"
    />
    <div class="search-wrap">
      <ElAutocomplete
        v-model="keyword"
        :fetch-suggestions="searchPosition"
        placeholder="请输入搜索地址"
        style="width: 300px;"
        value-key="title"
        @select="selectAddress"
      >
        <template #default="{ item }">
          <div>{{ item.title }}</div>
          <div class="tip">{{ item.address }}</div>
        </template>
      </ElAutocomplete>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.component-map {
  position: relative;
  .search-wrap {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 10001;
    
  }
}
.tip {
      font-size: 12px;
      color: #999;
    }
</style>