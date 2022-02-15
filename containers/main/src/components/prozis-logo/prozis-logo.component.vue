<template>
  <div class="inmotion-logo">
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
      <symbol id="logo">
        <g
          id="MATRIX-logo-white"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <path
            d="M92,0 L92,45.5809513 L46.145428,45.1054534 L46.145428,358.838941 L92,359.314439 L92,403 L0,403 L0,0 L92,0 Z M804,-3.18323146e-12 L804,403 L712,403 L712,357.419049 L757.854572,357.894547 L757.854572,44.1610593 L712,43.6855614 L712,-3.18323146e-12 L804,-3.18323146e-12 Z M433.26,226.22 L419.1,315.5 L374.58,315.5 L388.74,226.22 L433.26,226.22 Z M613.42,225.72 L627.1,252.24 L648.82,225.72 L700.06,225.72 L663.82,267.84 L689.62,315 L638.02,315 L622.06,287.16 L598.3,315 L544.18,315 L585.22,267.84 L560.38,225.72 L613.42,225.72 Z M222.02,225.22 C239.9,225.22 253.22,230.86 253.22,246.22 C253.22,260.62 240.98,268.3 229.22,270.22 C241.089565,273.424783 248.0281,281.678001 246.319466,293.121586 L246.26,293.5 L244.34,305.5 C243.525455,309.805455 243.952121,312.192672 244.525819,313.646416 L244.58,313.78 L244.46,314.5 L198.5,314.5 C198.274118,313.935294 198.26083,312.945398 198.460138,311.330222 L198.5,311.02 L200.18,300.94 C201.723226,291.561935 197.981956,286.059168 185.819588,285.941913 L185.42,285.94 L160.82,285.94 L156.26,314.5 L111.74,314.5 L125.9,225.22 L222.02,225.22 Z M198.86,249.58 L166.58,249.58 L164.78,260.86 L197.66,260.86 C204.74,260.86 206.3,257.38 206.3,254.5 C206.3,251.62 204.5,249.58 198.86,249.58 Z M440.16,87.22 L470.4,176.5 L420.84,176.5 L417.84,165.82 L374.28,165.82 L368.16,176.5 L323.28,176.5 L377.64,87.22 L440.16,87.22 Z M690.88,86.72 L685.96,117.44 L648.4,117.44 L639.16,176 L594.64,176 L603.88,117.44 L566.32,117.44 L571.24,86.72 L690.88,86.72 Z M170.9,86.72 L185.9,126.44 L212.42,86.72 L269.06,86.72 L254.9,176 L210.62,176 L217.58,131.84 L187.94,176 L166.7,176 L150.02,131.84 L143.06,176 L98.78,176 L112.94,86.72 L170.9,86.72 Z M403.44,114.46 L389.28,139.42 L410.4,139.42 L403.44,114.46 Z"
            style="fill: rgb(51, 51, 51)"
          />
        </g>
      </symbol>
    </svg>
    <svg viewBox="0 0 804 403" width="48" height="48">
      <use xlink:href="#logo" />
    </svg>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'matrix-logo'
})
export default class MatrixLogoComponent extends Vue {
  @Prop() width: number;
  @Prop() height: number;

  constructor() {
    super();
  }

  style() {
    return {
      fill: (this as any).$vuetify.theme.primary
    };
  }

  get size() {
    return {
      width: this.selectedWidth + 'px',
      height: this.selectedHeight + 'px'
    };
  }

  get selectedHeight() {
    return this.height ? this.height : 64;
  }
  get selectedWidth() {
    return this.width ? this.width : 210;
  }
}
</script>
<style lang="scss">
.inmotion-logo {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 48px;
  svg {
    animation: unset !important;
  }
}
</style>
