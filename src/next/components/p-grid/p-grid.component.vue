<template>
  <el-dialog
    v-model="showModal"
    class="p-grid-modal"
    :title="labels.setupTable"
  >
    <div class="flex items-center mb-4">
      <span class="mr-2">{{ labels.columnsAutoFix }}:</span>
      <el-switch v-model="autoFit" class="mr-auto" />
      <el-button type="primary" plain @click="handleResetState">
        {{ labels.reset }}
      </el-button>
    </div>

    <table style="width: 100%">
      <tr class="p-grid-modal__header">
        <th style="text-align: left"></th>
        <th style="text-align: left">{{ labels.column }}</th>
        <th style="text-align: left">{{ labels.showColumn }}</th>
        <template v-if="!autoFit">
          <th style="text-align: left">{{ labels.pinned }}</th>
        </template>
        <!-- <th style="text-align: left">Flex</th>
        <th style="text-align: left">Width</th> -->
      </tr>

      <draggable
        v-model="columnState"
        tag="transition-group"
        handle=".p-grid-modal__handle"
        ghost-class="p-grid-modal__ghost"
        :component-data="{ name: 'fade' }"
      >
        <template #item="{ element }">
          <tr class="p-grid-modal__row">
            <td class="p-grid-modal__handle">
              <el-icon :size="20">
                <MdiDrag />
              </el-icon>
            </td>
            <td>
              {{ getColumnHeaderName(element.colId) }}
            </td>

            <td>
              <el-switch
                v-model="element.hide"
                :active-value="false"
                :inactive-value="true"
              />
            </td>
            <template v-if="!autoFit">
              <td>
                <el-switch v-model="element.pinned" />
              </td>
            </template>
            <!-- <td>
              <el-input v-model="element.flex" type="number"></el-input>
            </td>
            <td>
              <el-input v-model="element.width" type="number"></el-input>
            </td> -->
          </tr>
        </template>
      </draggable>
    </table>
    <template #footer>
      <el-button @click="handleCloseModal">{{ labels.cancel }}</el-button>
      <el-button type="primary" @click="handleChangeColumnState">
        {{ labels.confirm }}
      </el-button>
    </template>
  </el-dialog>

  <ag-grid-vue
    :auto-params-refresh="true"
    :context="context"
    :row-multi-select-with-click="true"
    :class="{ 'ag-theme-alpine': !isDark, 'ag-theme-alpine-dark': isDark }"
    style="width: 100%; height: 100%"
    v-bind="$attrs"
    @grid-ready="onGridReady"
    @grid-size-changed="handleResize"
    v-on="$attrs"
  />
</template>

<script lang="ts" src="./p-grid.component.ts"></script>

<style lang="scss" src="./p-grid.component.scss"></style>
