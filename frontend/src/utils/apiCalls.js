import {API_URL} from "@env";

// todas las rutas aqui utilizan token
const apiCalls =  {
    getApiCall: async(url, token) => {
        console.log(API_URL + url);
        return fetch(API_URL + url,{
            method: 'GET',
            headers:{
              'Content-Type':'application/json',
              'authorization': token
            },
          }).then( response => {
            if (response.ok) {
              return response.json();              
            } else {
              return null;
            }
          }).then( json => {
            return json;
          })
    },
    postApiCall: async(url, body, token) => {
          console.log(API_URL + url);
          return fetch(API_URL + url,{
            method: 'POST',
            headers:{
              'Content-Type':'application/json',
              'authorization': token
            },
            body: JSON.stringify(body)
          }).then( response => {
            if (response.ok) {
              return response.json();              
            } else {
              return null;
            }
          }).then( json => {
            return json;
          })
    },
    putApiCall: async(url, body) => {
          console.log(API_URL + url);
          return fetch(API_URL + url,{
            method: 'PUT',
            headers:{
              'Content-Type':'application/json',
              'authorization': token
            },
            body:JSON.stringify(body)
          }).then( response => {
            if (response.ok) {
              return response.json();              
            } else {
              return null;
            }
          }).then( json => {
            return json;
          })
    },
    deleteApiCall: async(url, token) => {
        console.log(API_URL + url);
        return fetch(API_URL + url,{
            method: 'DELETE',
            headers:{
              'Content-Type':'application/json',
              'authorization': token
            },
          }).then( response => {
            if (response.ok) {
              return response.json();              
            } else {
              return null;
            }
          }).then( json => {
            return json;
          })
    },
    
}

export default apiCalls;