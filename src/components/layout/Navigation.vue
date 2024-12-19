<template>
  <nav class="navigation" :class="{ 'menu-open': isMenuOpen }">
    <div class="nav-content">
      <div class="nav-brand">
        Piano Learning
      </div>
      
      <button class="burger-menu" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="nav-links" :class="{ 'show': isMenuOpen }">
        <router-link to="/library" @click="closeMenu">Library</router-link>
        <router-link to="/config" @click="closeMenu">Configuration</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<style scoped>
.navigation {
  background: white;
  box-shadow: var(--shadow-sm);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.nav-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: var(--spacing-md) var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary);
}

.nav-links {
  display: flex;
  gap: var(--spacing-lg);
}

.nav-links a {
  text-decoration: none;
  color: var(--text);
  font-weight: 500;
  transition: color var(--transition-normal);
}

.nav-links a:hover {
  color: var(--primary);
}

.nav-links a.router-link-active {
  color: var(--primary);
}

.burger-menu {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-sm);
}

.burger-menu span {
  display: block;
  width: 24px;
  height: 2px;
  background-color: var(--text);
  transition: var(--transition-normal);
}

@media (max-width: 800px) {
  .burger-menu {
    display: flex;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    padding: var(--spacing-md);
    flex-direction: column;
    box-shadow: var(--shadow-md);
  }

  .nav-links.show {
    display: flex;
  }

  .menu-open .burger-menu span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .menu-open .burger-menu span:nth-child(2) {
    opacity: 0;
  }

  .menu-open .burger-menu span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
}
</style>