import {
  defineComponent,
  ref,
  computed,
  unref,
  onMounted,
  nextTick
} from 'vue';
import type { PropType } from 'vue';

import type { UploadFile, UploadUserFile } from 'element-plus';
import { ElNotification } from 'element-plus';

import Sortable from 'sortablejs';

import MdiUploadOff from '~icons/mdi/upload-off';
import MdiUpload from '~icons/mdi/upload';

import {
  Delete,
  Download,
  Plus,
  ZoomIn,
  Document
} from '@element-plus/icons-vue';
import MdiPanHorizontal from '~icons/mdi/pan-horizontal';
import MdiInformation from '~icons/mdi/information';

type ListType = 'text' | 'picture' | 'picture-card';

interface Asset extends UploadUserFile {
  id?: number;
}

let id = 0;

import { useI18n } from '@/next';

export default defineComponent({
  name: 'PUpload',
  components: {
    Delete,
    Download,
    Document,
    MdiUpload,
    MdiUploadOff,
    ZoomIn,
    MdiInformation,
    MdiPanHorizontal
  },
  inheritAttrs: false,
  props: {
    draggable: {
      default: true,
      type: Boolean
    },
    accept: {
      default: '*',
      type: String
    },
    multiple: {
      default: true,
      type: Boolean
    },
    disabled: {
      default: false,
      type: Boolean
    },
    fileList: {
      default: () => [],
      type: Array as PropType<Asset[]>
    },
    listType: {
      default: 'picture-card',
      type: String as PropType<ListType>
    },
    maxAssets: {
      default: 10,
      type: Number
    },
    maxAssetSize: {
      default: 10 * 1024 * 1024,
      type: Number
    },
    maxImageSize: {
      default: 10 * 1024 * 1024,
      type: Number
    },
    maxVideoSize: {
      default: 150 * 1024 * 1024,
      type: Number
    },
    tip: {
      type: String,
      default: null
    },
    isEditMode: {
      default: false,
      type: Boolean
    }
  },
  emits: ['remove', 'update:fileList', 'sort'],
  setup(props, { emit }) {
    const { t } = useI18n();

    const elementId = `p-upload-${id++}`;

    const notifyError = (title: string, message: string, options = {}) =>
      ElNotification({ title, message, type: 'error', ...options });

    const assets = computed<Asset[]>({
      set(value) {
        emit('update:fileList', value);
      },
      get() {
        return props.fileList;
      }
    });

    const labels = {
      tip: t('UI.P_UPLOAD.TIP'),
      error: {
        assetsSizeExceeded: t('UI.P_UPLOAD.ASSET_SIZE_EXCEEDED', {
          data: { maxAssetSize: props.maxAssetSize }
        }),
        imageSizeExceeded: t('UI.P_UPLOAD.IMAGE_SIZE_EXCEEDED', {
          data: { maxImageSize: props.maxImageSize }
        }),
        videoSizeExceeded: t('UI.P_UPLOAD.VIDEO_SIZE_EXCEEDED', {
          data: { maxVideoSize: props.maxVideoSize }
        }),
        uploadedAssetsExceed: t('UI.P_UPLOAD.UPLOADED_ASSETS_EXCEED', {
          data: { maxAssets: props.maxAssets }
        }),
        uploadedAssetsExceedMsg: t('UI.P_UPLOAD.UPLOADED_ASSETS_EXCEED_MSG', {
          data: { maxAssets: props.maxAssets }
        })
      }
    };

    const dialogUrl = ref('');
    const dialogUrlIsImage = ref(false);
    const dialogUrlIsVideo = ref(false);
    const isDialogVisible = ref(false);

    const isVideo = (file: UploadFile) => {
      const { raw = null } = unref(file) || {};

      let isVideo = false;

      if (raw !== null) {
        const { name } = raw || {};
        const fileExtension = name.split('.').at(-1)?.toLowerCase();
        isVideo = ['mp4'].includes(fileExtension || '');
      } else {
        const { name = '' } = file || {};
        const fileExtension = name.split('.').at(-1)?.toLowerCase();
        isVideo = ['mp4'].includes(fileExtension || '');
      }

      return isVideo;
    };

    const isImage = (file: UploadFile) => {
      const { raw = null } = unref(file) || {};

      let isImage = false;

      if (raw !== null) {
        const { name } = raw || {};
        const fileExtension = name.split('.').at(-1)?.toLowerCase();
        isImage = ['jpg', 'webp', 'jpeg'].includes(fileExtension || '');
      } else {
        const { name = '' } = file || {};
        const fileExtension = name.split('.').at(-1)?.toLowerCase();
        isImage = ['jpg', 'webp', 'jpeg'].includes(fileExtension || '');
      }

      return isImage;
    };

    const handlePictureCardPreview = (file: UploadFile) => {
      dialogUrlIsImage.value = isImage(file);
      dialogUrlIsVideo.value = isVideo(file);
      dialogUrl.value = file.url!;
      isDialogVisible.value = true;
    };

    const handleDownload = (file: UploadFile) => {
      const { url = null } = file || {};

      if (url) {
        window.open(url, '_blank', 'noopener');
      }
    };

    const handleRemove = (file: UploadFile) => {
      const fileToBeRemoved = assets.value.find(item => item.uid === file.uid);

      if (!fileToBeRemoved?.raw && fileToBeRemoved?.uid) {
        emit('remove', fileToBeRemoved.uid);
      }

      assets.value = assets.value.filter(item => item.uid !== file.uid);
    };

    const handleBeforeUpload = (file: UploadFile) => {
      const { size = null, name } = file || {};

      if (size && size > props.maxImageSize && isImage(file)) {
        notifyError(
          labels.error.assetsSizeExceeded,
          labels.error.imageSizeExceeded
        );

        assets.value = assets.value.filter(item => item.uid !== file.uid);
      }

      if (size && size > props.maxVideoSize && isVideo(file)) {
        notifyError(
          labels.error.assetsSizeExceeded,
          labels.error.videoSizeExceeded
        );

        assets.value = assets.value.filter(item => item.uid !== file.uid);
      }
    };

    const handleOnExceed = (assets: UploadFile[]) => {
      notifyError(
        labels.error.uploadedAssetsExceed,
        labels.error.uploadedAssetsExceedMsg
      );
    };

    // sortable

    function onDragEnd(element?: HTMLElement) {
      return () => {
        const items = element?.getElementsByClassName('p-upload__item');

        const assetNamesOrder = (Array.from(items as any) as HTMLElement[]).map(
          (item: HTMLElement) => {
            return Number(item.dataset.uuid) || null;
          }
        );

        emit('sort', assetNamesOrder);
      };
    }

    function initSortable() {
      const el = document.getElementById(elementId);

      if (el) {
        const upload = el?.children.item(0);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const sortable = Sortable.create(upload as HTMLElement, {
          draggable: '.el-upload-list__item',
          handle: '.p-upload__item-drag',
          sort: true,
          onEnd: onDragEnd(upload as HTMLElement)
        });

        onDragEnd(upload as HTMLElement)();
      }
    }

    onMounted(() => {
      nextTick(() => {
        initSortable();
      });
    });

    const sizeInKB = (file: UploadFile) => {
      const { size = null } = file || {};
      return size !== null ? `${Math.round((size / 1024) * 100) / 100}KB` : '';
    };

    return {
      elementId,
      assets,
      labels,
      handleOnExceed,
      handleBeforeUpload,
      handleRemove,
      handleDownload,
      handlePictureCardPreview,
      dialogUrl,
      dialogUrlIsImage,
      dialogUrlIsVideo,
      isDialogVisible,
      isImage,
      isVideo,
      sizeInKB
    };
  }
});
