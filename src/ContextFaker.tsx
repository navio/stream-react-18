

 import React, {createContext, useContext} from 'react';

 const DataContext = createContext(null);
 
 export function DataProvider({children, data}) {
   return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
 }
 

 const myData = [
   "Wait, it doesn't wait for React to load?",
 ];
 
 export function useData() {
   const ctx = useContext(DataContext);
   if (ctx !== null) {
     ctx.read();
   }
   return myData;
 }
 

 export const getData = () => {
    let done = false;
    let promise = null;
    return {
      read: () => {
        if (done) {
          return;
        }
        if (promise) {
          throw promise;
        }
        promise = new Promise((resolve) => {
          setTimeout(() => {
            done = true;
            promise = null;
            resolve('');
          }, 1000);
        });
        throw promise;
      },
    }
  };