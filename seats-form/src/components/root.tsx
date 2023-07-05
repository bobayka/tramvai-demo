import React, {useState, useSyncExternalStore} from 'react';
import {useSelector} from "@tramvai/state";
import {MediaStore} from '@tramvai/module-client-hints';
import {useDi} from "@tramvai/react";
import {PASSENGER_FORM_DATA} from "../../../src/shared/tokens/passengerForm";

export const RootCmp = () => {
  const [count, setCount] = useState(0)
  const media = useSelector(MediaStore, state => state.media);
  // TODO обернуть в хук
  // ------------------------------------------------------------------
  const passengerDataProvider = useDi(PASSENGER_FORM_DATA) as typeof PASSENGER_FORM_DATA;
  const subscriber = passengerDataProvider.getSubscribe();
  const passengerData =  useSyncExternalStore(subscriber.subscribe, subscriber.getSnapshot);
  // ------------------------------------------------------------------

  console.log('storeState', media, passengerData);

  return <div>
    <div>Child App seats-form + {passengerData}</div>
    <div>Media: {media.height}</div>
    <button onClick={()=>setCount((count)=>count+1)}>PushCount:{count}</button>
  </div>;
};
