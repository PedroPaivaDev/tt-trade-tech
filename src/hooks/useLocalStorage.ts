import React from 'react';

function useLocalStorage<Type>(key:string, initial:Type):
[Type, React.Dispatch<React.SetStateAction<Type>>] {

  const [state, setState] = React.useState<Type>(() => {
    if(typeof window === 'undefined') {
      return initial;
    }
    try {
      const local = window.localStorage.getItem(key);
      return local ? JSON.parse(local) : initial;
    } catch(error) {
      console.log(error);
      return initial;
    }
  });

  const setLocalStorageValue = React.useCallback((value: Type) => {
    try {
      setState(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch(error) {
      console.log(error);
    }
  }, [key]);

  React.useEffect(() => {
    if (state !== undefined) {
      setLocalStorageValue(state);
    }
  }, [state, setLocalStorageValue]);

  return [state, setState];
}

export default useLocalStorage;