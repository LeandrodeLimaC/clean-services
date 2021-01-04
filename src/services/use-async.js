import { ref, reactive, watch,unref } from "@vue/composition-api";

export default function useAsync(promiseFnc, params) {
  const wrapPromiseFn = ref(promiseFnc);
  const wrapParams = ref(params);

  const state = reactive({
    isLoading: false,
    error: null,
    result: null,
    retry_attempts: 0,
    retry: () => {
      state.retry_attempts++;
      const origPromiseFn = unref(wrapPromiseFn);
      wrapPromiseFn.value = async (params) => origPromiseFn(params);
    },
  });

  const watched = [wrapPromiseFn, wrapParams];

  watch(
    watched,
    async ([promiseFnc, wrapParams]) => {
      state.isLoading = true;
      state.error = null;

      try {
        console.log(wrapParams)
        const data = await promiseFnc(wrapParams);
        state.result = data;
      } catch (error) {
        console.log(error)
        state.error = error;
      } finally {
        state.isLoading = false;
      }
    },
    { immediate: true }
  );

  return state;
}
