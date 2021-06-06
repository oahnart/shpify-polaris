import {
  Button,
  Card,
  Form,
  FormLayout,
  Page,
  TextField,
} from "@shopify/polaris";
import React, { useCallback, useState } from "react";
import { postLogin } from "../../action";
import ReCaptchaComp from "./ReCaptchaComp";

export default function Register() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const handleSubmit = async (_event) => {
    try {
      if (
        !recaptchaToken ||
        fullName === "" ||
        address === "" ||
        phoneNumber === "" ||
        email === ""
      ) {
        alert("bạn vui lòng nhập đầy đủ các thông tin");
      } else {
        var number = Math.random();
        number.toString(36);
        var id = number.toString(36).substr(2, 9);
        const dataForm = {
          id: id,
          email: email,
          name: fullName,
          address: address,
          phone: phoneNumber,
        };
        await postLogin(dataForm);
        setEmail("");
        setFullName("");
        setAddress("");
        setPhoneNumber("");

        window.location.href = "#/list-user";
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleEmailChange = useCallback((value) => setEmail(value), []);
  const handleNameChange = useCallback((value) => setFullName(value), []);
  const handleAddressChange = useCallback((value) => setAddress(value), []);
  const handlePhoneChange = useCallback((value) => {
    setPhoneNumber(value);
  }, []);

  return (
    <Page>
      <Card title="Đăng ký User" sectioned>
        <Form onSubmit={handleSubmit} method="post">
          <FormLayout>
            <TextField
              value={fullName}
              onChange={handleNameChange}
              label="Họ tên"
              type="text"
              placeholder="Vui lòng nhập họ tên"
            />
            <TextField
              value={address}
              onChange={handleAddressChange}
              label="Địa chỉ"
              type="text"
              placeholder="Vui lòng nhập địa chỉ"
            />
            <TextField
              value={phoneNumber}
              onChange={handlePhoneChange}
              label="Số điện thoại"
              type="number"
              inputMode={"numeric"}
              min={1}
              placeholder="Vui lòng nhập số điện thoại"
              formatter={(value) => {
                if (value && isNaN(value) === false) {
                  let tmp = parseInt(value);
                  return tmp.toString();
                }
                return "";
              }}
            />
            <TextField
              value={email}
              onChange={handleEmailChange}
              label="Email"
              type="email"
              placeholder="Vui lòng nhập email"
            />
            <ReCaptchaComp setRecaptchaToken={setRecaptchaToken} />
            <Button submit primary={true}>
              Submit
            </Button>
          </FormLayout>
        </Form>
      </Card>
    </Page>
  );
}
