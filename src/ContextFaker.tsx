

 import React, {createContext, useContext} from 'react';
const DataContext = createContext(null);
require('isomorphic-fetch');
 
 export function DataProvider({children, data}) {
   return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
 }
 

 const myData = [
   "Wait, it doesn't wait for React to load?",
 ];
 
 export function useData() {
   const ctx = useContext(DataContext);
   if (ctx !== null) {
     let data = ctx.read();
     if(data){
       return data;
     }
   }
   return 'no data';
 }
 

 export const getData = () => {
    let done = false;
    let promise = null;
    return {
      read: () => {
        if (done) {
          return done;
        }
        if (promise) {
          throw promise;
        }
        promise = fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then((x) => x.json())
        .then((x) => (done = x.title));
        
        throw promise;
      },
    }
  };