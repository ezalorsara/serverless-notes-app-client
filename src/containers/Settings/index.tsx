import React, { useRef, useState, FormEvent } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import BillingForm from "../../components/BillingForm";
import config from "../../config";
import { API } from "aws-amplify";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { ReactStripeElements } from "react-stripe-elements";
import { TOKEN_TYPE } from '../../types';

import "./Settings.css";

const Settings: React.FC<ReactStripeElements.InjectedStripeProps> = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  function billUser(details: any) {
    return API.post("notes", "/billing", {
      body: details
    });
  }

  async function handleFormSubmit(fields: any, token: TOKEN_TYPE, error: any) {
    if (error) {
      alert(error);
      return;
    }

    setIsLoading(true);
    try {
      await billUser({
        storage: fields.storage,
        source: token.id,
        cardDetail: fields.cardDetail
      });
      alert("Your card has been charged successfully!");
      setIsLoading(false);
      dispatch(push('/'));
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }

  }



  return (
    <div className="Settings">
      <StripeProvider apiKey={config.STRIPE_KEY} >
        <Elements>
          <BillingForm
            onSubmit={handleFormSubmit}
            isLoading={isLoading}
            stripe={props.stripe} />
        </Elements>
      </StripeProvider>
    </div>
  );
};

export default Settings;
