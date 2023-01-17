const initState = [];

const advertiseReducer = (state = initState, action) => {
  switch (action.type) {
    case "advertise:add":
      return action.data;
    case "advertise:remove":
      return [];
    default:
      return state;
  }
};

export default advertiseReducer;
