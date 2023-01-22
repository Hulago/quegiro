<template>
  <div class="p-fieldset" :style="style">
    <fieldset v-loading="isLoading">
      <legend>
        <slot name="title">
          {{ title }}
        </slot>
      </legend>
      <div v-if="showToolbar || showToolbar === ''" class="p-fieldset__toolbar">
        <slot name="toolbar" />
      </div>
      <slot />
    </fieldset>
  </div>
</template>

<script ts src="./p-fieldset.component.ts"></script>

<style lang="scss" src="./p-fieldset.component.scss" />
