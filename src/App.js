import React from 'react';
import RaportModal from './modal/RaportModal';
import { postEcho } from './utils/fetcher';

export default function App() {
  return (<RaportModal callback={e => postEcho(e).then(data => {
    if (data){
      console.log(data);
      alert('request succesfull');
    }
  })}/>);
}
