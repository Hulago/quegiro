import iziToast, {
  IziToastSettings,
  IziToastTransitionIn,
  IziToastTransitionOut
} from 'izitoast';
import { reactive } from '@vue/composition-api';
import { throttle } from 'lodash-es';

export interface INotificationMessage {
  title: string;
  message: string;
  icon: string;
  type: string;
  detail?: any;
  createdAt: Date;
  buttons?: INotificationButton[];
}

export interface INotificationButton {
  fn: (...args: unknown[]) => unknown;
  label: string;
}

export interface NotificationState {
  class: string;
  flushTimeout: number;
  historyQueue: Array<INotificationMessage>;
  icon: string;
  queue: Array<INotificationMessage>;
  resetOnHover: boolean;
  timeout: number;
  transitionIn: IziToastTransitionIn;
  transitionOut: IziToastTransitionOut;
}

export enum NOTIFICATION_ICON {
  INFO = 'info',
  SUCCESS = 'check_circle',
  ERROR = 'error',
  WARNING = 'warning',
  DANGER = 'warning',
  DEBUG = 'bug_report'
}

const NOTIFICATION_COLOR = {
  danger: 'var(--pk-color-danger-lite)',
  debug: 'var(--pk-color-secondary2)',
  error: 'var(--pk-color-error-lite)',
  info: 'var(--pk-color-info-lite)',
  success: 'var(--pk-color-success-lite)',
  warning: 'var(--pk-color-warning-lite)'
};

const PROGRESS_BAR_COLOR = {
  danger: 'var(--pk-color-danger)',
  debug: 'var(--pk-color-secondary2)',
  error: 'var(--pk-color-error)',
  info: 'var(--pk-color-info)',
  success: 'var(--pk-color-success)',
  warning: 'var(--pk-color-warning)'
};

const ICON_COLOR = {
  danger: 'var(--pk-color-danger)',
  debug: 'var(--pk-color-secondary2)',
  error: 'var(--pk-color-error)',
  info: 'var(--pk-color-info)',
  success: 'var(--pk-color-success)',
  warning: 'var(--pk-color-warning)'
};

export enum NOTIFICATION_TYPE {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  DANGER = 'danger',
  DEBUG = 'debug'
}

let installed = false;

const state = reactive<NotificationState>({
  class: 'elevation-7',
  flushTimeout: 200,
  historyQueue: [],
  icon: 'material-icons',
  queue: [],
  resetOnHover: false,
  timeout: 7000,
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX'
});

export const useNotification = () => {
  /**
   * Clear history
   */
  const clearHistory = () => {
    state.historyQueue = [];
  };

  /**
   * Show a notification on the screen
   *
   * @param type - { NOTIFICATION_TYPE }
   * @param title - { string }
   * @param message - { string }
   * @param icon - { NOTIFICATION_ICON | string }
   */
  const notify = (
    type: NOTIFICATION_TYPE,
    title: string,
    message: string,
    icon: NOTIFICATION_ICON | string = 'check',
    buttons: INotificationButton[] = []
    // eslint-disable-next-line max-params
  ) => {
    const backgroundColor = NOTIFICATION_COLOR[type] || 'var(--pk-color-grey)';
    const progressBarColor =
      PROGRESS_BAR_COLOR[type] || 'var(--pk-color-grey-darken2)';
    const iconColor = ICON_COLOR[type] || 'var(--pk-color-grey-darken2)';

    const customButtons: any = buttons.map(button => [
      `<button>${button.label}</button>`,
      function (instance: any, toast: any) {
        instance.hide(
          {
            transitionOut: 'fadeOutUp'
          },
          toast
        );
        button.fn();
      }
    ]);

    iziToast.show({
      // theme: 'dark',
      backgroundColor,
      buttons: customButtons,
      class: state.class,
      icon: state.icon,
      iconColor,
      iconText: icon,
      message,
      messageColor: 'var(--pk-color-grey-darken2)',
      progressBarColor,
      resetOnHover: state.resetOnHover,
      timeout: state.timeout,
      title,
      titleColor: 'var(--pk-color-black)',
      transitionIn: state.transitionIn,
      transitionOut: state.transitionOut
    });
  };

  /**
   * Process queue
   */
  const processQueue = () => {
    if (state.queue.length > 0) {
      const [infoMessage = null] = state.queue.filter(
        item => item.type === NOTIFICATION_TYPE.INFO
      );
      const [successMessage = null] = state.queue.filter(
        item => item.type === NOTIFICATION_TYPE.SUCCESS
      );
      const [warningMessage = null] = state.queue.filter(
        item => item.type === NOTIFICATION_TYPE.WARNING
      );
      const [errorMessage = null] = state.queue.filter(
        item => item.type === NOTIFICATION_TYPE.ERROR
      );
      const [dangerMessage = null] = state.queue.filter(
        item => item.type === NOTIFICATION_TYPE.DANGER
      );

      if (errorMessage) {
        notify(
          NOTIFICATION_TYPE.ERROR,
          errorMessage.title,
          errorMessage.message,
          NOTIFICATION_ICON.ERROR,
          errorMessage.buttons
        );
      }

      if (dangerMessage) {
        notify(
          NOTIFICATION_TYPE.DANGER,
          dangerMessage.title,
          dangerMessage.message,
          NOTIFICATION_ICON.DANGER,
          dangerMessage.buttons
        );
      }

      if (warningMessage) {
        notify(
          NOTIFICATION_TYPE.WARNING,
          warningMessage.title,
          warningMessage.message,
          NOTIFICATION_ICON.WARNING,
          warningMessage.buttons
        );
      }

      if (successMessage) {
        notify(
          NOTIFICATION_TYPE.SUCCESS,
          successMessage.title,
          successMessage.message,
          NOTIFICATION_ICON.SUCCESS,
          successMessage.buttons
        );
      }

      if (infoMessage) {
        notify(
          NOTIFICATION_TYPE.INFO,
          infoMessage.title,
          infoMessage.message,
          NOTIFICATION_ICON.INFO,
          infoMessage.buttons
        );
      }

      state.historyQueue = [...state.historyQueue, ...state.queue];
      state.queue = [];
    }
  };

  const process = throttle(processQueue, state.flushTimeout, {
    leading: false
  });

  /**
   * Info notification
   *
   * @param title - { string }
   * @param message - { string }
   * @param module - { string }
   * @param action - { string }
   * @param detail - { any }
   * @param icon - { NOTIFICATION_ICON }
   */
  const info = (
    title: string,
    message: string,
    buttons: INotificationButton[] = [],
    icon: NOTIFICATION_ICON = NOTIFICATION_ICON.INFO
  ) => {
    state.queue.unshift({
      buttons,
      createdAt: new Date(),
      icon,
      message,
      title,
      type: NOTIFICATION_TYPE.INFO
    });
    process();
  };

  const show = (
    title: string,
    message: string,
    settings: IziToastSettings = {
      class: state.class,
      icon: state.icon,
      iconColor: 'var(--pk-color-grey-darken2)',
      messageColor: 'var(--pk-color-grey-darken2)',
      progressBarColor: 'var(--pk-color-grey-darken2)',
      resetOnHover: state.resetOnHover,
      timeout: state.timeout,
      titleColor: 'var(--pk-color-grey-darken2)',
      transitionIn: state.transitionIn,
      transitionOut: state.transitionOut
    }
  ) => {
    iziToast.show({
      message,
      title,
      ...settings
    });
  };

  /**
   * Error notification
   *
   * @param title - { string }
   * @param message - { string }
   * @param module - { string }
   * @param action - { string }
   * @param detail - { any }
   * @param icon - { NOTIFICATION_ICON }
   */
  // eslint-disable-next-line max-params
  const error = (
    title: string,
    message: string,
    buttons?: INotificationButton[],
    icon: NOTIFICATION_ICON = NOTIFICATION_ICON.ERROR
  ) => {
    state.queue.unshift({
      buttons,
      createdAt: new Date(),
      icon,
      message,
      title,
      type: NOTIFICATION_TYPE.ERROR
    });
    process();
  };

  /**
   * Debug notification
   *
   * @param title - { string }
   * @param message - { string }
   * @param module - { string }
   * @param action - { string }
   * @param detail - { any }
   * @param icon - { NOTIFICATION_ICON }
   */
  // eslint-disable-next-line max-params
  const debug = (
    title: string,
    message: string,
    buttons: INotificationButton[] = [],
    icon: NOTIFICATION_ICON = NOTIFICATION_ICON.DEBUG
  ) => {
    state.queue.unshift({
      buttons,
      createdAt: new Date(),
      icon,
      message,
      title,
      type: NOTIFICATION_TYPE.DEBUG
    });
    process();
  };

  /**
   * Success notification
   *
   * @param title - { string }
   * @param message - { string }
   * @param module - { string }
   * @param action - { string }
   * @param detail - { any }
   * @param icon - { NOTIFICATION_ICON }
   */
  const success = (
    title: string,
    message: string,
    buttons: INotificationButton[] = [],
    icon: NOTIFICATION_ICON = NOTIFICATION_ICON.SUCCESS
  ) => {
    state.queue.unshift({
      buttons,
      createdAt: new Date(),
      icon,
      message,
      title,
      type: NOTIFICATION_TYPE.SUCCESS
    });
    process();
  };

  /**
   * Danger notification
   *
   * @param title - { string }
   * @param message - { string }
   * @param module - { string }
   * @param action - { string }
   * @param detail - { any }
   * @param icon - { NOTIFICATION_ICON }
   */
  const danger = (
    title: string,
    message: string,
    buttons: INotificationButton[] = [],
    icon: NOTIFICATION_ICON = NOTIFICATION_ICON.DANGER
  ) => {
    state.queue.unshift({
      buttons,
      createdAt: new Date(),
      icon,
      message,
      title,
      type: NOTIFICATION_TYPE.DANGER
    });
    process();
  };

  /**
   * Warning notification
   *
   * @param title - { string }
   * @param message - { string }
   * @param module - { string }
   * @param action - { string }
   * @param detail - { any }
   * @param icon - { NOTIFICATION_ICON }
   */
  const warning = (
    title: string,
    message: string,
    buttons?: INotificationButton[],
    icon: NOTIFICATION_ICON = NOTIFICATION_ICON.WARNING
    // eslint-disable-next-line max-params
  ) => {
    state.queue.unshift({
      buttons,
      createdAt: new Date(),
      icon,
      message,
      title,
      type: NOTIFICATION_TYPE.WARNING
    });
    process();
  };

  return { warning, danger, debug, info, notify, show };
};

export default {
  install(Vue, options: Partial<NotificationState> = {}) {
    if (!installed) {
      installed = true;

      state.class = options.class || state.class;
      state.timeout = options.timeout || state.timeout;
      state.flushTimeout = options.flushTimeout || state.flushTimeout;
      state.resetOnHover =
        'resetOnHover' in options ? !!options.resetOnHover : state.resetOnHover;
      state.icon = options.icon || state.icon;
      state.transitionIn = options.transitionIn || state.transitionIn;
      state.transitionOut = options.transitionOut || state.transitionOut;
    }
  }
};
