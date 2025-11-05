import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Button,
  Col,
  Container,
  Form as BootstrapForm,
  Row,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../services/AuthService";
import * as Yup from "yup";

export function LoginPage() {
  const navigate = useNavigate();

  const loginSchema = Yup.object({
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^[0-9]{10}$/, "Enter valid 10-digit phone"),
    password: Yup.string().required("Password is required"),
    role: Yup.string().required("Select a role"),
  });

  const handleSubmit = async (formData, { resetForm }) => {
  try {
    const res = await loginUser(formData);
    const { token, user } = res.data;  

    
    localStorage.setItem("authToken", token);
    localStorage.setItem("userRole", user.role);
    localStorage.setItem("userId", user.id);  
    localStorage.setItem("customerId", user.id);  

    toast.success("Login successful!");
    resetForm();

    if (user.role === "ADMIN") navigate("/admin-dashboard");
    else navigate("/");
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Login failed!");
  }
};


  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBldCUyMHNob3B8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={8} lg={4}>
          <Card
            className="shadow-lg border-0 rounded-4"
            style={{
              background: "rgba(1, 0, 0, 0.56)", 
              backdropFilter: "blur(0px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              color: "#fff",
            }}
          >
            <Card.Body className="p-4">
              <h3 className="text-center text-warning fw-bold mb-3">
                🐾 Welcome Back!
              </h3>
              <p className="text-center text-light mb-4">
                Login to your Pet Store account
              </p>

              <Formik
                initialValues={{ phone: "", password: "", role: "" }}
                validationSchema={loginSchema}
                onSubmit={handleSubmit}
              >
                {(formik) => {
                  const { errors, touched, dirty, isValid, handleChange, values } =
                    formik;
                  return (
                    <BootstrapForm as={Form}>
                      <BootstrapForm.Group className="mb-3">
                        <BootstrapForm.Label className="text-light">
                          Phone
                        </BootstrapForm.Label>
                        <BootstrapForm.Control
                          as={Field}
                          type="text"
                          name="phone"
                          placeholder="Enter phone"
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
                          Password
                        </BootstrapForm.Label>
                        <BootstrapForm.Control
                          as={Field}
                          type="password"
                          name="password"
                          placeholder="Enter password"
                          onChange={handleChange}
                          value={values.password}
                          isInvalid={touched.password && errors.password}
                        />
                        <BootstrapForm.Control.Feedback type="invalid">
                          <ErrorMessage name="password" />
                        </BootstrapForm.Control.Feedback>
                      </BootstrapForm.Group>

                      <BootstrapForm.Group className="mb-4">
                        <BootstrapForm.Label className="text-light">
                          Role
                        </BootstrapForm.Label>
                        <div className="d-flex gap-4">
                          <BootstrapForm.Check
                            type="radio"
                            label="Customer"
                            name="role"
                            value="CUSTOMER"
                            onChange={handleChange}
                            checked={values.role === "CUSTOMER"}
                            id="role-customer"
                            className="text-light"
                          />
                          <BootstrapForm.Check
                            type="radio"
                            label="Admin"
                            name="role"
                            value="ADMIN"
                            onChange={handleChange}
                            checked={values.role === "ADMIN"}
                            id="role-admin"
                            className="text-light"
                          />
                        </div>
                        {touched.role && errors.role && (
                          <div className="text-danger small mt-1">
                            {errors.role}
                          </div>
                        )}
                      </BootstrapForm.Group>

                      <div className="d-grid">
                        <Button
                          type="submit"
                          variant="warning"
                          disabled={!(dirty && isValid)}
                          className="fw-semibold text-dark"
                        >
                          Login
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
