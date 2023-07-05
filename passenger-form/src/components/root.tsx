import React, {useEffect} from 'react';
import {useStore} from "@tramvai/state";
import {PassengerStore, setAnotherValue} from "../stores/PassengerStore/passengerStore";
import {useDi} from "@tramvai/react";
import {STORE_TOKEN} from "@tramvai/module-common";
import {PASSENGER_FORM_DATA, Sample} from "../../../src/shared/tokens/passengerForm";

export const RootCmp = () => {
  const passengerStoreValue = useStore(PassengerStore);
  const passengerDataProvider = useDi( PASSENGER_FORM_DATA) as typeof PASSENGER_FORM_DATA;
  const store = useDi(STORE_TOKEN) as typeof STORE_TOKEN ;
  useEffect(()=>{
    passengerDataProvider.setSubscribe([PassengerStore], store,(state)=>state.passenger)
  }, [])

  console.log('passengerStore', store.getState());
  const onClickHandler = ()=>{
    store.dispatch(setAnotherValue())
  }

  return <div>
    <button onClick={onClickHandler}>Hello</button>
    Child App passenger-form + {passengerStoreValue}
  </div>;
};


