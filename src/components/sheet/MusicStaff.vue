<template>
  <div class="music-staff">
    <div class="staff-lines">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <div class="notes-container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.music-staff {
  position: relative;
  width: 100%;
  height: 120px;
  margin: 20px 0;
  display: flex;
}

.staff-lines {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;
}

.line {
  height: 1px;
  background-color: #ccc;
  width: 100%;
}

.notes-container {
  position: relative;
  flex-grow: 1;
  padding: 0 20px;
}
</style>
