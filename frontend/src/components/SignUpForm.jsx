import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Button,
  Col,
  Container,
  Form as BootstrapForm,
  Row,
  Card,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { signUpSchema } from "../schemas/SignUpSchema";
import { registerCustomer } from "../services/CustomerService";
import { useNavigate } from "react-router";




export function SignUpForm() {
    const navigate = useNavigate();
  const handleSubmit = async (formData, { resetForm }) => {
    try {
      const response = await registerCustomer(formData);
      toast.success(response.data.message || "Registration successful!");
      navigate("/login");
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundImage: `
          url('https://t3.ftcdn.net/jpg/10/68/18/30/360_F_1068183071_pHWzbbyw3zIsDlGmnYqXruisiiMp4j1j.jpg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={5}>
          <Card
            className="shadow-lg border-0 rounded-4"
            style={{
              background: "rgba(0, 0, 0, 0.58)", 
              backdropFilter: "blur(0px)", 
              WebkitBackdropFilter: "blur(12px)", 
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#fff",
            }}
          >
            <Card.Body className="p-4">
              <h2 className="text-center text-warning mb-3 fw-bold">
                🐾 Create Your Account
              </h2>
              <p className="text-center text-light mb-4">
                Join our Pet Store family today!
              </p>

              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  password: "",
                  phone: "",
                  address: "",
                  role: "CUSTOMER",
                }}
                validationSchema={signUpSchema}
                onSubmit={handleSubmit}
              >
                {(formik) => {
                  const { errors, touched, dirty, isValid, handleChange, values } =
                    formik;
                  return (
                    <BootstrapForm as={Form}>
                      <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label className="text-light">
                          Name
                        </BootstrapForm.Label>
                        <BootstrapForm.Control
                          as={Field}
                          type="text"
                          placeholder="Enter your name"
                          name="name"
                          onChange={handleChange}
                          value={values.name}
                          isInvalid={touched.name && errors.name}
                        />
                        <BootstrapForm.Control.Feedback type="invalid">
                          <ErrorMessage name="name" />
                        </BootstrapForm.Control.Feedback>
                      </BootstrapForm.Group>

                      <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label className="text-light">
                          Email
                        </BootstrapForm.Label>
                        <BootstrapForm.Control
                          as={Field}
                          type="email"
                          placeholder="Enter your email"
                          name="email"
                          onChange={handleChange}
                          value={values.email}
                          isInvalid={touched.email && errors.email}
                        />
                        <BootstrapForm.Control.Feedback type="invalid">
                          <ErrorMessage name="email" />
                        </BootstrapForm.Control.Feedback>
                      </BootstrapForm.Group>

                      <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label className="text-light">
                          Password
                        </BootstrapForm.Label>
                        <BootstrapForm.Control
                          as={Field}
                          type="password"
                          placeholder="Enter your password"
                          name="password"
                          onChange={handleChange}
                          value={values.password}
                          isInvalid={touched.password && errors.password}
                        />
                        <BootstrapForm.Control.Feedback type="invalid">
                          <ErrorMessage name="password" />
                        </BootstrapForm.Control.Feedback>
                      </BootstrapForm.Group>

                      <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label className="text-light">
                          Phone
                        </BootstrapForm.Label>
                        <BootstrapForm.Control
                          as={Field}
                          type="text"
                          placeholder="Enter your phone number"
                          name="phone"
                          onChange={handleChange}
                          value={values.phone}
                          isInvalid={touched.phone && errors.phone}
                        />
                        <BootstrapForm.Control.Feedback type="invalid">
                          <ErrorMessage name="phone" />
                        </BootstrapForm.Control.Feedback>
                      </BootstrapForm.Group>

                      <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label className="text-light">
                          Address
                        </BootstrapForm.Label>
                        <BootstrapForm.Control
                          as={Field}
                          type="text"
                          placeholder="Enter your address"
                          name="address"
                          onChange={handleChange}
                          value={values.address}
                          isInvalid={touched.address && errors.address}
                        />
                        <BootstrapForm.Control.Feedback type="invalid">
                          <ErrorMessage name="address" />
                        </BootstrapForm.Control.Feedback>
                      </BootstrapForm.Group>

                      <BootstrapForm.Group className="mb-4">
                        <BootstrapForm.Label className="text-light">
                          Role
                        </BootstrapForm.Label>
                        <BootstrapForm.Select
                          as={Field}
                          name="role"
                          onChange={handleChange}
                          value={values.role}
                          isInvalid={touched.role && errors.role}
                        >
                          <option value="CUSTOMER">Customer</option>
                          <option value="ADMIN">Admin</option>
                        </BootstrapForm.Select>
                        <BootstrapForm.Control.Feedback type="invalid">
                          <ErrorMessage name="role" />
                        </BootstrapForm.Control.Feedback>
                      </BootstrapForm.Group>

                      <div className="d-grid">
                        <Button
                          variant="warning"
                          type="submit"
                          className="fw-semibold text-dark"
                          disabled={!(dirty && isValid)}
                        >
                          Sign Up
                        </Button>
                      </div>
                    </BootstrapForm>
                  );
                }}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
