export const types = {
  GET_DATA: "GET_DATA",
};

export const getData = (data) => ({
  type: types.GET_DATA,
  data
});