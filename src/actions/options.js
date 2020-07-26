import database from "../firebase/firebase";

//SET_OPTIONS

export const setOptions = (options) => ({
    type: "SET_OPTIONS",
    options
});

export const startSetOptions = () => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
      return database.ref(`users/${uid}/options`).once('value')
        .then((snapshot) => {
          const options = [];

          snapshot.forEach((childSnapshot) => {
            options.push({
              id: childSnapshot.key,
              value: childSnapshot.val()
            });
          });
          
          dispatch(setOptions(options));
      });
    }
  };


//ADD_OPTION

export const addOption = (option) => ({
    type: "ADD_OPTION",
    option
});

export const startAddOption = (option) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        
        return database.ref(`users/${uid}/options`).push(option)
            .then((ref) => {
                dispatch(addOption({
                  id: ref.key,
                  value: option}));
            });
    };
};


//REMOVE_OPTION

export const removeOption = ({id}) => ({
    type: "REMOVE_OPTION",
    id
});

export const startRemoveOption = ({id}) => {
    return (dispatch, getState) => {
      const uid = getState().auth.uid;
  
      return database.ref(`users/${uid}/options/${id}`).remove()
        .then(() => {
          dispatch(removeOption({id}))
        });
      };
  };

//RESET_OPTION

export const resetOption = () => ({
    type: "RESET_OPTION"
});

export const startResetOption = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;

        return database.ref(`users/${uid}/options`).remove()
            .then(() => {
                dispatch(resetOption());
            });
    };
};
