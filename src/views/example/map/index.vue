<script setup>
import Map from '@/components/Map/index.vue';

const mapRef = ref();
const formData = reactive({
  lat: '',
  lng: ''
});
const markerPosChange = (latLng) => {
  formData.lat = latLng.lat;
  formData.lng = latLng.lng;
}

const setMapMarker = () => {
  mapRef.value?.updateMarker(formData);
}

</script>

<template>
  <div class="page-map">
    <Map ref="mapRef" @markerPosChange="markerPosChange"></Map>
    <ElForm v-model="formData" inline class="m-10">
      <ElFormItem label="lat">
        <ElInput v-model="formData.lat"></ElInput>
      </ElFormItem>
      <ElFormItem label="lng">
        <ElInput v-model="formData.lng"></ElInput>
      </ElFormItem>
      <ElFormItem>
        <ElButton @click="setMapMarker" type="primary">设置marker</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
</style>