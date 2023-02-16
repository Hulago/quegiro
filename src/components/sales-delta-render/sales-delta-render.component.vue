<template>
  <div class="flex items-center justify-center grow">
    <p-currency-render
      :value="delta"
      :currency="currency"
      mono-font
      :font-size="10"
    ></p-currency-render>
  </div>
</template>

<script ts src="./sales-delta-render.component.ts"></script>
