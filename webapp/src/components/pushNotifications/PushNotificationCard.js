import { Button, Card, Spinner } from "react-bootstrap";
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

function NotificationCard() {
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
  const isUserSubscribed = JSON.stringify(userSubscription, null, 0).length > 4 ? "Yes" : "No";
  return (<Card>
    <Card.Title>Notifications </Card.Title>
    <Card.Body>
      <Card.Text>
        Are you subscribed to push notifications? {loading ? 'Loading...' : isUserSubscribed}
      </Card.Text>
      {loading ? (<Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
    Loading...
      </Button>) :
        (!userSubscription ?
          <Button disabled={loading} variant="danger" onClick={onClickAskForPermsAndSusbribeToPushNotification}>Subscribe</Button>
          :
          <Button disabled={loading} variant="success" onClick={onClickUnsubscribeUser}>Unsubscribe</Button>
        )
      }

    </Card.Body>
  </Card>)

}

export default NotificationCard;