import type { Ref } from 'vue';
import { watch } from 'vue';
import { useRouter } from 'vue-router';

/**
 * It takes an object of reactive values and watches them for changes. When a change occurs, it updates
 * the query string with the new value
 * @param {string} namespace - string - This is the namespace of the query.
 * @returns An object with a single method called init.
 */
export const useRouteQuery = (namespace: string) => {
  const initQueryFilters = (obj: Record<string, Ref<any>>) => {
    const { replace, currentRoute } = useRouter();

    const { query } = currentRoute.value || {};

    const queryObj: any = query[namespace]
      ? JSON.parse(decodeURI(query[namespace] as string))
      : {};

    Object.keys(obj).forEach(key => {
      if (queryObj[key]) {
        obj[key].value = queryObj[key];
      }

      watch(obj[key], value => {
        queryObj[key] = value;
        replace({
          query: {
            [namespace]: encodeURI(JSON.stringify(queryObj))
          }
        });
      });
    });
  };

  return {
    initQueryFilters
  };
};
