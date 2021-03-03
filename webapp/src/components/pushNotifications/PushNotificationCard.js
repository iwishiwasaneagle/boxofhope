import { Button, Card } from "react-bootstrap";
import usePushNotifications from "./usePushNotifications";

const Loading = ({ loading }) => (loading ? <div className="app-loader">Please wait, we are loading something...</div> : null);
const Error = ({ error }) =>
  error ? (
    <section className="app-error">
      <h2>{error.name}</h2>
      <p>Error message : {error.message}</p>
      <p>Error code : {error.code}</p>
    </section>
  ) : null;

function NotificationCard(){
  const {
    userConsent,
    pushNotificationSupported,
    userSubscription,
    onClickAskForPermsAndSusbribeToPushNotification,
    onClickUnsubscribeUser,
    error,
    loading
  } = usePushNotifications();

    const isConsentGranted = userConsent === "granted";
    const isUserSubscribed = JSON.stringify(userSubscription, null,0).length>4;
    return (<Card>
        <Card.Title>Notifications </Card.Title>
        <Card.Body>
            <Card.Text>
            Are you subscribed to push notifications? {userSubscription ? "Yes" : "No"}
            </Card.Text>
            {!userSubscription ? 
                <Button onClick={onClickAskForPermsAndSusbribeToPushNotification}>Subscribe</Button>
                :
                <Button onClick={onClickUnsubscribeUser}>Unsubscribe</Button>
            }
        </Card.Body>
    </Card>)

}

export default NotificationCard;