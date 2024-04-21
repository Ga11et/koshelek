export const baseFetch = (req, opts) => {
  return $fetch(req, {
    ...opts,
    onRequest({ request, options }) {},
    onRequestError({ request, options, error }) {
      console.log("fetch error");
      console.log(error);
      console.log(error.data);
    },
    onResponse({ request, options, response }) {},
    onResponseError({ request, options, response }) {},
  });
};

export const baseFetchRaw = (req, opts) => {
  return $fetch.raw(req, {
    ...opts,
    onRequest({ request, options }) {},
    onRequestError({ request, options, error }) {},
    onResponse({ request, options, response }) {},
    onResponseError({ request, options, response }) {},
  });
};

export const baseFetchNative = (req, opts) => {
  return $fetch.native(req, {
    ...opts,
  });
};
