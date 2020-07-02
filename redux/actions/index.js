export const ADD_USER = "ADD_USER";
export const ADD_PHOTO = "ADD_PHOTO";

export const addUser = user => {
    return({
    type: ADD_USER,
    payload: { ...user } 
  });
}

export const addPhoto = photo => {
    return({
    type: ADD_PHOTO,
    payload: photo 
  });
}
  