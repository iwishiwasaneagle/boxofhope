import { useState, useEffect } from "react";

import {
  isPushNotificationSupported,
  askUserPermission,
  registerServiceWorker,
  createNotificationSubscription,
  getUserSubscription,
  unsubscribeUser
} from "./push-notifications";

import hash from 'object-hash';

const pushNotificationSupported = isPushNotificationSupported();

export default function usePushNotifications() {
  const [userConsent, setUserConsent] = useState(Notification.permission);
  //to manage the user consent: Notification.permission is a JavaScript native function that return the current state of the permission
  //We initialize the userConsent with that value
  const [userSubscription, setUserSubscription] = useState("");

  //to manage the push server subscription
  const [error, setError] = useState(null);
  //to manage errors
  const [loading, setLoading] = useState(true);
  //to manage async actions

  useEffect(() => {
    if (pushNotificationSupported) {
      setLoading(true);
      setError(false);
      registerServiceWorker().then(() => {
        setLoading(false);
      });
    }
  }, []);
  //if the push notifications are supported, registers the service worker
  //this effect runs only the first render

  useEffect(() => {
    setLoading(true);
    setError(false);
    const getExistingSubscription = async () => {
      const existingSubscription = await getUserSubscription();
      if(!existingSubscription){
        console.log("fuck me");
        setUserSubscription("");
      }else{
        console.log("useEffect ",hash(existingSubscription.endpoint));
        setUserSubscription(hash(existingSubscription.endpoint));
      }
      setLoading(false);
    };
    getExistingSubscription();
  }, []);
  //Retrieve if there is any push notification subscription for the registered service worker
  // this use effect runs only in the first render

  /**
   * define a click handler that creates a push notification subscription.
   * Once the subscription is created, it uses the setUserSubscription hook
   */
  const onClickAskForPermsAndSusbribeToPushNotification = () => {
    setLoading(true);
    setError(false);
    askUserPermission().then(consent => {
      setUserConsent(consent);
      console.debug("Notification access: " + consent);
      if (consent !== "granted") {
        setError({
          name: "Consent denied",
          message: "You denied the consent to receive notifications",
          code: 0
        });
      }
      setLoading(false);
    })
      .then(() => {
        console.debug("Subscribing to notifications");
        createNotificationSubscription()
          .then(function (subscription) {
            console.debug("Subscription: " + JSON.stringify(subscription));
            //setUserSubscription(subscription);

            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(subscription)
            }

            fetch('http://jheraspi.local:3000/notification/register-new', requestOptions)
              .then(response => response.json()).then(response => { 
                console.log("Response body: ",response.id); 
                setLoading(false); 
                setUserSubscription(response.id); 
              })
              .catch(err => { setError(err); console.error(err); setLoading(false); })
          })
          .catch(err => {
            console.error("Couldn't create the notification subscription", err, "name:", err.name, "message:", err.message, "code:", err.code);
            setError(err);
            setLoading(false);
          });
      }).catch(err => {
        console.error("Unexpected error", err, "name:", err.name, "message:", err.message, "code:", err.code);
        setError(err);
        setLoading(false);
      });
  };

  const onClickUnsubscribeUser = () => {
    setLoading(true);
    setError(false);

    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }

    console.log("Unsubscribing id: ",userSubscription);
    fetch('http://jheraspi.local:3000/notification/id/'+userSubscription, requestOptions)
      .catch(err => { setError(err); console.error(err); setLoading(false); })
      .then(response => response.json())
      .then(res=>{
        console.log("Unsubscribe message: ", res.message);
      })
      .then(() => {
        unsubscribeUser().then(() => {
          setUserSubscription("");
          setLoading(false);
        })
        .catch(err => {
          console.error("Unexpected error", err, "name:", err.name, "message:", err.message, "code:", err.code);
          setError(err);
          setLoading(false);
        })
      })
  };

  /**
   * returns all the stuff needed by a Component
   */
  return {
    onClickAskForPermsAndSusbribeToPushNotification,
    onClickUnsubscribeUser,
    userConsent,
    pushNotificationSupported,
    userSubscription,
    error,
    loading
  };
}
