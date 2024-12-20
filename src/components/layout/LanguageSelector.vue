<template>
  <div ref="dropdownRef" class="language-selector">
    <button
      class="selected-language"
      :title="SUPPORTED_LOCALES[currentLocale].name"
      @click="toggleDropdown"
    >
      <span class="flag">{{ SUPPORTED_LOCALES[currentLocale].flag }}</span>
      <span class="chevron" :class="{ open: isOpen }">▼</span>
    </button>

    <div v-if="isOpen" class="language-dropdown">
      <button
        v-for="(locale, code) in sortedLocales"
        v-show="code !== currentLocale"
        :key="code"
        class="language-option"
        :class="{ active: currentLocale === code }"
        @click="changeLocale(code)"
      >
        <span class="flag">{{ locale.flag }}</span>
        <span class="name">{{ locale.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import {type LocaleCode, SUPPORTED_LOCALES} from '../../i18n/constants';

const { locale } = useI18n();
const currentLocale = ref(locale.value as LocaleCode);
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const sortedLocales = computed(() => {
  const entries = Object.entries(SUPPORTED_LOCALES).sort(([, a], [, b]) =>
    a.name.localeCompare(b.name),
  );
  return Object.fromEntries(entries);
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const changeLocale = (code: LocaleCode) => {
  locale.value = code;
  currentLocale.value = code;
  localStorage.setItem('userLocale', code);
  isOpen.value = false;
};

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.language-selector {
  position: relative;
  display: inline-block;
}

.selected-language {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  background: none;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  padding: var(--spacing-xs) var(--spacing-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.selected-language:hover {
  background: var(--light);
}

.chevron {
  font-size: 0.8rem;
  transition: transform var(--transition-normal);
}

.chevron.open {
  transform: rotate(180deg);
}

.language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: var(--spacing-xs);
  background: white;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  min-width: 150px;
  z-index: 1000;
}

.language-option {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  width: 100%;
  padding: var(--spacing-sm);
  border: none;
  background: none;
  cursor: pointer;
  transition: background var(--transition-normal);
  text-align: left;
  color: black;
}

.language-option:hover {
  background: var(--light);
}

.flag {
  font-size: 1.2rem;
}

.name {
  font-size: 0.9rem;
}

@media (max-width: 800px) {
  .language-dropdown {
    right: auto;
    left: 0;
  }
}
</style>
