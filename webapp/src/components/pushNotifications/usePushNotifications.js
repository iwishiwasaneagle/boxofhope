import { useState, useEffect } from "react";

import API from '../../util/api';
import Storage from '../../util/storage';

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
      const existingSubscriptionId = Storage.getItem("sub_id");
      const existingSubscriptionPush = await getUserSubscription();

      if(existingSubscriptionPush && existingSubscriptionId.length==null){
        unsubscribeUser();
      }

      console.log("Existing subscription: ", existingSubscriptionId, existingSubscriptionPush!=null);
      if(!existingSubscriptionId){
        setUserSubscription("");
      }else{
        setUserSubscription(existingSubscriptionId);
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
        createNotificationSubscription().then(function (subscription) {
            console.debug("Subscription: " + JSON.stringify(subscription));           

            API.subscription.save(subscription).then(res=>{
              Storage.setItem("sub_id", res.id);
              setUserSubscription(res.id);
              setLoading(false);
            })
            .catch(err =>{
               console.error("Couldn't create the notification subscription", err, "name:", err.name, "message:", err.message, "code:", err.code);
              setError(err);
              setLoading(false);
            });           
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

    API.subscription.delete(userSubscription)    
      .catch(err => { 
        setError(err); 
        console.error(err); 
        setLoading(false); 
      })
      .then(res=>{
        console.log("Unsubscribe message: ", res);
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
