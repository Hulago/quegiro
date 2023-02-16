import { reactive, toRefs, ref } from 'vue';

import { ElLoading, ElNotification } from 'element-plus';

import type { NotificationParams } from 'element-plus';

const miniSidebar = ref(true);
const size = ref<'small' | 'default' | 'large'>('small');
const breadcrumb = ref([]);
const isLoading = ref(false);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let loading: any;

export function useApplicationContext() {
  const setSize = (s: 'small' | 'default' | 'large') => {
    size.value = s;
  };

  const startLoader = (text = 'Loading') => {
    loading = ElLoading.service({
      lock: true,
      fullscreen: true,
      target: document.body,
      text,
      background: 'rgba(0, 0, 0, 0.7)'
    });

    isLoading.value = true;
  };

  const stopLoader = () => {
    if (loading) {
      loading.close();
    }

    isLoading.value = false;
  };

  const setSidebarMini = (mini: boolean) => {
    miniSidebar.value = mini;
  };

  const toggleSidebar = () => {
    miniSidebar.value = !miniSidebar.value;
  };

  const setApplicationBreadcrumb = (breadcrumb: ApplicationBreadcrumb[]) => {
    breadcrumb.value = breadcrumb;
  };

  const notifySuccess = (title: string, message: string, options = {}) =>
    ElNotification({ title, message, type: 'success', ...options });

  const notifyWarning = (title: string, message: string, options = {}) =>
    ElNotification({ title, message, type: 'warning', ...options });

  const notifyError = (title: string, message: string, options = {}) =>
    ElNotification({ title, message, type: 'error', ...options });

  const notifyInfo = (title: string, message: string, options = {}) =>
    ElNotification({ title, message, type: 'info', ...options });

  const notify = (options: NotificationParams) => ElNotification(options);

  return {
    toggleSidebar,
    setSidebarMini,
    setSize,
    setApplicationBreadcrumb,
    startLoader,
    stopLoader,
    notifySuccess,
    notifyWarning,
    notifyError,
    notifyInfo,
    notify,
    miniSidebar,
    size,
    breadcrumb,
    isLoading
  };
}
