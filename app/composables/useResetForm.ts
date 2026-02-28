export function useMyResetForm<T extends Record<string, any>>(state: T) {
  const initialState = structuredClone(toRaw(state));

  const reset = () => {
    Object.assign(state, structuredClone(initialState));
  };

  return { reset };
}
