export interface StringRendererProps {
  value?: string | number | null;
  ellipsis?: boolean;
  lines?: number;
  fontSize?: number;
  injectClass?: string;
}

export interface PStringRendererProps {
  field: string;
  ellipsis?: boolean;
  lines?: number;
  fontSize?: number;
  injectClass?: string;
}

export interface PTranslateRendererProps {
  namespace?: string;
  field: string;
  ellipsis?: boolean;
  lines?: number;
  fontSize?: number;
  injectClass?: string;
}

export interface NumberRendererProps {
  value?: string | number | null;
  formated?: boolean;
  fontSize?: number;
  locale?: string;
  monoFont?: boolean;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
  injectClass?: string;
  style?: string;
}

export interface PNumberRendererProps {
  field: string;
  formated?: boolean;
  fontSize?: number;
  locale?: string;
  monoFont?: boolean;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
  injectClass?: string;
  style?: string;
}

export interface CurrencyRendererProps {
  value?: string | number | null;
  currency?: string;
  fontSize?: number;
  monoFont?: boolean;
  locale?: string;
  injectClass?: string;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
}

export interface PCurrencyRendererProps {
  field: string;
  currency?: string;
  fontSize?: number;
  monoFont?: boolean;
  locale?: string;
  injectClass?: string;
  maximumFractionDigits?: number;
  minimumFractionDigits?: number;
}

export interface DateRendererProps {
  value?: Date | string | number | null;
  dateFormat?: string;
  fontSize?: number;
  monoFont?: boolean;
  injectClass?: string;
}

export interface PDateRendererProps {
  field: string;
  dateFormat?: string;
  fontSize?: number;
  injectClass?: string;
}

export interface ParamsRendererProp {
  data: {
    [key: string]: string | number;
  };
  value?: string | number;
}
