<template>
  <el-upload
    :id="elementId"
    v-model:file-list="assets"
    class="p-upload"
    action="#"
    drag
    :accept="accept"
    :limit="maxAssets"
    :multiple="multiple"
    :list-type="listType"
    :auto-upload="false"
    :on-exceed="handleOnExceed"
    :on-change="handleBeforeUpload"
    :disabled="!isEditMode"
    v-bind="$attrs"
    :class="{ 'p-upload--disabled': !isEditMode }"
    v-on="$attrs"
  >
    <el-icon>
      <MdiUpload v-if="isEditMode" />
      <MdiUploadOff v-else />
    </el-icon>

    <template #file="{ file }">
      <div class="p-upload__item" :data-name="file.name" :data-uuid="file.uid">
        <img
          v-if="isImage(file)"
          class="p-upload__item-image"
          :src="file.url"
          alt=""
        />

        <video
          v-else-if="isVideo(file)"
          class="p-upload__item-video"
          :src="file.url"
          style="width: 146px; height: 146px"
        />

        <div v-else class="p-upload__item-document">
          <el-icon :size="24">
            <Document />
          </el-icon>
          <div class="p-ellipsis text-xs text-gray">{{ file.name }}</div>
          <div class="p-ellipsis text-xs text-gray">
            {{ sizeInKB(file) }}
          </div>
        </div>

        <span class="el-upload-list__item-actions">
          <span v-if="draggable && isEditMode" class="p-upload__item-drag">
            <el-icon><MdiPanHorizontal /></el-icon>
          </span>

          <span
            v-if="isImage(file) || isVideo(file)"
            class="p-upload__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><ZoomIn /></el-icon>
          </span>
          <span class="p-upload__item-preview" @click="handleDownload(file)">
            <el-icon><Download /></el-icon>
          </span>
          <span
            v-if="!disabled && isEditMode"
            class="p-upload__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>

    <template #tip>
      <div class="p-upload__tip text-gray-5 mt-2">
        <el-icon :size="16" class="mr-1">
          <MdiInformation />
        </el-icon>
        <span class="text-3">
          {{ tip ? tip : labels.tip }}
        </span>
      </div>
    </template>
  </el-upload>

  <el-dialog v-model="isDialogVisible" class="p-upload-modal">
    <img
      v-if="dialogUrlIsImage"
      :src="dialogUrl"
      alt="Preview Image"
      class="lead-form-image-modal__item-thumbnail"
    />

    <video
      v-if="dialogUrlIsVideo"
      :src="dialogUrl"
      alt="Preview Image"
      class="lead-form-image-modal__item-thumbnail"
      controls
    />
  </el-dialog>
</template>

<script ts src="./p-upload.component.ts"></script>

<style lang="scss" src="./p-upload.component.scss" />
