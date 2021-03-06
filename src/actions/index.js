import streams from '../apis/streams';
import {SIGN_IN,
        SIGN_OUT,
        CREATE_STREAM,
        FETCH_STREAMS, 
        FETCH_SINGLE_STREAM,
        DELETE_STREAM,
        EDIT_STREAM
       } from './types';

export const signIn = (userId) =>{
    return{
        type:SIGN_IN,
        payload:userId
    }
}
export const signOut = () =>{
    return{
        type:SIGN_OUT
    }
}

export const createStream = formValues => async dispatch =>{
  const response = await streams.post('/streams',formValues);
  dispatch({
      type:CREATE_STREAM,
      payload:response.data
  })
}

export const fetchStreams = () => async dispatch =>{
    const response = await streams.get('/streams');
    dispatch({
        type:FETCH_STREAMS,
        payload:response.data
    })
}

export const fetchSingleStream = (streamId) => async dispatch =>{
    const response = await streams.get(`/streams/${streamId}`);
    dispatch({
        type:FETCH_SINGLE_STREAM,
        payload:response.data
    })
}

export const editStream = (streamId, updatedValues) => async dispatch =>{
    const response = await streams.put(`/streams/${streamId}`,updatedValues);
    dispatch({
        type:EDIT_STREAM,
        payload:response.data
    })
}
export const deleteStream = (streamId) => async dispatch =>{
    await streams.delete(`/streams/${streamId}`);
    dispatch({
        type:DELETE_STREAM,
        payload:streamId
    })
}