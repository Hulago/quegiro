import { AgGridVue } from 'ag-grid-vue3';

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
// Core grid CSS, always needed

export const agGrid = (app: any) => {
  app.component('AgGridVue', AgGridVue);
};
