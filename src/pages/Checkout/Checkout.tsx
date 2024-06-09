import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Define the validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  streetAddress: Yup.string().required("Street Address is required"),
  city: Yup.string().required("City is required"),
  zipCode: Yup.string().required("Zip Code is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
});

const Checkout: React.FC = () => {
  const context = useContext(ShopContext);
  const navigate = useNavigate();

  if (!context) {
    return <div>Loading...</div>;
  }

  const {
    getTotalCartAmount,
    cartItems,
    productData,
    getDefaultCart,
    setCartItems,
  } = context;

  const cartProducts =
    productData?.filter((product) => cartItems[product.id] > 0) || [];

  const initialValues = {
    firstName: "",
    lastName: "",
    companyName: "",
    streetAddress: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
    additionalInfo: "",
  };

  const handlePlaceOrder = () => {
    if (cartProducts.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    notify();
    setCartItems(getDefaultCart()); // Clear the cart
    navigate("/"); // Redirect to the homepage
  };

  const notify = () => toast.success("Order Placed Successfully");

  return (
    <>
      <h1 className="billDetails">Billing Details</h1>
      <div className="">
        <div className="billingPage">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handlePlaceOrder}
          >
            {({ isSubmitting }) => (
              <>
                <Form className="billingForm">
                  <div className="billingFormFlex">
                    <div className="names">
                      <label htmlFor="firstName" className="labels">
                        First Name
                      </label>
                      <Field
                        type="text"
                        name="firstName"
                        className="inputs nameInput"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="error"
                      />
                    </div>
                    <div className="names">
                      <label htmlFor="lastName" className="labels">
                        Last Name
                      </label>
                      <Field
                        type="text"
                        name="lastName"
                        className="inputs nameInput"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="error"
                      />
                    </div>
                  </div>
                  <label htmlFor="companyName" className="labels">
                    Company Name (Optional)
                  </label>
                  <Field type="text" name="companyName" className="inputs" />
                  <label htmlFor="streetAddress" className="labels">
                    Street Address
                  </label>
                  <Field type="text" name="streetAddress" className="inputs" />
                  <ErrorMessage
                    name="streetAddress"
                    component="div"
                    className="error"
                  />
                  <label htmlFor="city" className="labels">
                    Town / City
                  </label>
                  <Field type="text" name="city" className="inputs" />
                  <ErrorMessage name="city" component="div" className="error" />
                  <label htmlFor="zipCode" className="labels">
                    Zip Code
                  </label>
                  <Field type="text" name="zipCode" className="inputs" />
                  <ErrorMessage
                    name="zipCode"
                    component="div"
                    className="error"
                  />
                  <label htmlFor="phone" className="labels">
                    Phone
                  </label>
                  <Field type="tel" name="phone" className="inputs" />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error"
                  />
                  <label htmlFor="email" className="labels">
                    Email address
                  </label>
                  <Field type="email" name="email" className="inputs" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                  <Field
                    className="inputs"
                    type="text"
                    name="additionalInfo"
                    id="info"
                    placeholder="Additional Information"
                  />
                </Form>
                <Form>
                  <div className="checkoutTotalDiv">
                    <div className="checkoutTotal">
                      <div>
                        <h3>Product</h3>
                        {cartProducts.map((product) => (
                          <div key={product.id}>
                            <p>{product.title}</p>
                            <p>Price: Rs {product.price.toFixed(2)}</p>
                            <p>Quantity: {cartItems[product.id]}</p>
                            <p>
                              Subtotal: Rs{" "}
                              {(product.price * cartItems[product.id]).toFixed(
                                2
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div>
                        <h3>Subtotal</h3>
                        <p>Rs {getTotalCartAmount().toFixed(2)}</p>
                        <h3>Total</h3>
                        <p>Rs {getTotalCartAmount().toFixed(2)}</p>
                      </div>
                    </div>
                    <h5>Direct Bank Transfer</h5>
                    <p>
                      Make your payment directly into our bank account. Please
                      use your order ID as the payment reference. Your order
                      will not be shipped until the funds have cleared in our
                      account.
                    </p>
                    <div>
                      <input
                        type="radio"
                        name="paymentMethod"
                        id="directBankTransfer"
                        value="Direct Bank Transfer"
                      />
                      <label htmlFor="directBankTransfer">
                        Direct Bank Transfer
                      </label>
                      <br />
                      <input
                        type="radio"
                        name="paymentMethod"
                        id="cashOnDelivery"
                        value="Cash On Delivery"
                      />
                      <label htmlFor="cashOnDelivery">Cash On Delivery</label>
                      <p>
                        Your personal data will be used to support your
                        experience throughout this website, to manage access to
                        your account, and for other purposes described in our
                        privacy policy.
                      </p>
                      <button
                        className="orderBtn"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Checkout;
