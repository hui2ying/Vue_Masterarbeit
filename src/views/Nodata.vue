<template>
  <div class="nodata">
    <span class="iconfont">&#xe602;</span>
    <span>No data...</span>
  </div>
</template>

<script>
export default {};
</script>

<style>
.nodata {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;

  font-size: 20px;
  color: #fff;
}
.nodata span.iconfont {
  font-size: 200px;
  color: #ffc107;
  margin-bottom: 20px;
}
</style>