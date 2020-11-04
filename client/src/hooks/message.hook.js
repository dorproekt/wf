import {useCallback} from 'react';

export const useMessage = () => {
  return useCallback(
    (text, classes = 'success') => {
      if(window.M && text){
        window.M.toast({html: text, classes});
      }
    },
    []
  );
}