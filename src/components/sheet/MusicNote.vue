<template>
  <div
    class="music-note"
    :style="{
      bottom: `${calculatePosition()}px`,
      left: `${index * 40}px`,
    }"
  >
    <div
      class="note-circle"
      :style="{
        backgroundColor: getNoteColor(pitch),
      }"
    >
      <span class="note-label">{{ pitch }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const { getNoteColor } = useNoteVisualizer();

const props = defineProps<{
  pitch: string;
  octave: number;
  index: number;
}>();

const notePositions: Record<string, number> = {
  C: 0,
  D: 4,
  E: 8,
  F: 12,
  G: 16,
  A: 20,
  H: 24,
};

const calculatePosition = () => {
  const basePosition = notePositions[props.pitch] || 0;
  const octaveOffset = (props.octave - 4) * 28; // 28px per octave
  return basePosition + octaveOffset;
};
</script>

<style scoped>
.music-note {
  position: absolute;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.note-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.note-label {
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
}
</style>
