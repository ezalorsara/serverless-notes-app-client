import React, { useState, FormEvent, FormEventHandler, ComponentType } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { CardElement, injectStripe, ReactStripeElements } from "react-stripe-elements";
import LoaderButton from "./LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { TCREDITCARDINFO } from '../types';
import "./BillingForm.css";


const BillingForm: React.FC<{
  onSubmit: Function,
  isLoading: boolean, stripe: ReactStripeElements.StripeProps | undefined
}> = props => {
  const [fields, handleFieldChange] = useFormFields({
    name: "",
    storage: ""
  });

  const [cardDetail, setCardDetail] = useState<TCREDITCARDINFO>({ brand: "", cardHoldersName: "" });

  const [isProcessing, setIsProcessing] =
    useState(false);
  const [isCardComplete, setIsCardComplete] =
    useState(false);

  function validateForm() {
    return (
      fields.name !== "" &&
      fields.storage !== "" &&
      isCardComplete
    );
  }

  async function handleSubmitClick(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsProcessing(true);
    if (props.stripe != undefined) {
      const { token, error } = await props.stripe.createToken({ name: fields.name });
      setIsProcessing(false);
      fields.cardDetail = cardDetail; // set card detai l
      props.onSubmit(fields, token, error);
    }
  }

  function handleCardChange(
    event: ReactStripeElements.ElementChangeResponse) {

    const { error, complete, brand } = event;

    setCardDetail({ brand: brand, cardHoldersName: fields.name });
    complete ? setIsCardComplete(true) : setIsCardComplete(false);
  };

  return (
    <form className="BillingForm" onSubmit={handleSubmitClick}>
      <FormGroup bsSize="large" controlId="storage">
        <ControlLabel>Storage</ControlLabel>
        <FormControl
          min="0"
          type="number"
          value={fields.storage}
          onChange={handleFieldChange}
          placeholder="Number of notes to store"
        />
      </FormGroup>
      <hr />
      <FormGroup bsSize="large" controlId="name">
        <ControlLabel>Cardholder&apos;s name</ControlLabel>
        <FormControl
          type="text"
          value={fields.name}
          onChange={handleFieldChange}
          placeholder="Name on the card"
        />
      </FormGroup>
      <ControlLabel>Credit Card Info</ControlLabel>
      <CardElement
        className="card-field"
        value={fields.card_details}
        onChange={handleCardChange}
      />
      <LoaderButton
        block
        type="submit"
        bsSize="large"
        isLoading={props.isLoading}
        disabled={!validateForm()}
      >
        Purchase
      </LoaderButton>
    </form>
  );
}

export default injectStripe(BillingForm);
