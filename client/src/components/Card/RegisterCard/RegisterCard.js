"use client";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ProgressBar,
  Alert,
  Carousel,
} from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "./RegisterCard.css";

const BusinessRegistrationForm = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    storeName: "",
    businessType: "",
    category: "",
    description: "",
    dateOfEstablishment: "",
    gstNumber: "",
    panNumber: "",
    fssaiNumber: "",
    website: "",
    logo: null,
    productCount: "",
    monthlyOrders: "",
    businessModel: "",
    ownerName: "",
    businessEmail: "",
    mobile: "",
    altContact: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    hasReturnAddress: false,
    returnAddress1: "",
    returnAddress2: "",
    businessHours: "",
    supportContact: "",
    password: "",
    aadhaar: null,
    pancard: null,
    gstCertificate: null,
    registrationCert: null,
    cancelledCheque: null,
    bankName: "",
    accountHolder: "",
    accountNumber: "",
    ifsc: "",
    branchName: "",
    upi: "",
    paymentCycle: "",
    signature: null,
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value)
      );

      const res = await axios.post(
        "https://heycollab.onrender.com/api/sellers/register",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 201 || res.data.success) {
        setMessage(res.data.message || "Registration successful!");
        setError("");
        setStep(1);
        setTimeout(() => (window.location.href = "/seller/dashboard"), 1000);
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Registration failed!");
      setMessage("");
    }
  };

  const animation = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  };

  const progress = (step / 5) * 100;

  return (
    <Container fluid className="py-3 registration-container">
      <Row className="justify-content-center align-items-center">
        {/* LEFT SIDE SLIDER */}
        <Col
          md={6}
          className="d-none d-md-flex align-items-center justify-content-center"
        >
          <div className="form-image w-100 h-50">
            <Carousel
              fade
              controls={false}
              indicators={false}
              interval={1000}
              className="w-100 h-50 rounded-start-4 overflow-hidden"
            >
              <Carousel.Item>
                <img
                  src="/business/four.png"
                  className="d-block w-100 h-50 object-fit-cover"
                  alt="slide1"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  src="/business/portrait-indian-man-selling-fabrics.jpg"
                  className="d-block w-100 h-100 object-fit-cover"
                  alt="slide2"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  src="/business/one.png"
                  className="d-block w-100 h-100 object-fit-cover"
                  alt="slide3"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="/business/two.png"
                  className="d-block w-100 h-100 object-fit-cover"
                  alt="slide3"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="/business/three.png"
                  className="d-block w-100 h-100 object-fit-cover"
                  alt="slide3"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </Col>

        {/* RIGHT SIDE FORM */}
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <div className="w-100 h-100 p-1">
            <h3 className="text-center mb-3">Business Registration</h3>

            <ProgressBar
              now={progress}
              label={`Step ${step} of 5`}
              className="mb-4 custom-progress"
            />

            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <AnimatePresence mode="wait">
              {/* ✅ STEP 1 */}
              {step === 1 && (
                <motion.div key="step1" {...animation} transition={{ duration: 0.4 }}>
                  <h5 className="mb-3">Store / Business Details</h5>
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Store / Brand / Company Name</Form.Label>
                          <Form.Control
                            name="storeName"
                            value={formData.storeName}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Business Type</Form.Label>
                          <Form.Select
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleChange}
                          >
                            <option value="">Select</option>
                            <option>Individual</option>
                            <option>Proprietorship</option>
                            <option>LLP</option>
                            <option>Pvt. Ltd.</option>
                            <option>Public Ltd.</option>
                            <option>Partnership</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Category / Industry</Form.Label>
                          <Form.Select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                          >
                            <option value="">Select Category</option>

<option value="Fashion">Fashion</option>
<option value="Beauty">Beauty</option>
<option value="Skincare">Skincare</option>
<option value="Lifestyle">Lifestyle</option>
<option value="Health/Wellness">Health / Wellness</option>

{/* ✅ Apparel group */}
<optgroup label="Apparel">
  <option value="Sarees">Sarees</option>
  <option value="Kurtas & Kurtis">Kurtas & Kurtis</option>
  <option value="Dress">Dress</option>
  <option value="Choli">Choli</option>
  <option value="Blouse">Blouse</option>
  <option value="Kurta Sets & Salwar Suits">
    Kurta Sets & Salwar Suits
  </option>
  <option value="Gowns">Gowns</option>
  <option value="Dupattas">Dupattas</option>
</optgroup>

<option value="Artificial Jewellery">Artificial Jewellery</option>
<option value="Other">Other</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Date of Establishment</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateOfEstablishment"
                            value={formData.dateOfEstablishment}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Business Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Describe your business"
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                      <Button className="next-btn" onClick={nextStep}>
                        Next →
                      </Button>
                    </div>
                  </Form>
                </motion.div>
              )}

              {/* ✅ STEP 2 */}
              {step === 2 && (
                <motion.div key="step2" {...animation} transition={{ duration: 0.4 }}>
                  <h5 className="mb-3">Legal & Identification</h5>
                  <Form>
                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>GST No (Optional)</Form.Label>
                          <Form.Control
                            name="gstNumber"
                            value={formData.gstNumber}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>PAN No (Optional)</Form.Label>
                          <Form.Control
                            name="panNumber"
                            value={formData.panNumber}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label>FSSAI No (Optional)</Form.Label>
                          <Form.Control
                            name="fssaiNumber"
                            value={formData.fssaiNumber}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Website (Optional)</Form.Label>
                      <Form.Control
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Product Count</Form.Label>
                          <Form.Control
                            type="number"
                            name="productCount"
                            value={formData.productCount}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Avg. Monthly Orders</Form.Label>
                          <Form.Control
                            type="number"
                            name="monthlyOrders"
                            value={formData.monthlyOrders}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Business Model</Form.Label>
                      <br />
                      <Form.Check
                        inline
                        label="B2C"
                        name="businessModel"
                        type="radio"
                        value="B2C"
                        checked={formData.businessModel === "B2C"}
                        onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        label="B2B"
                        name="businessModel"
                        type="radio"
                        value="B2B"
                        checked={formData.businessModel === "B2B"}
                        onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        label="D2C"
                        name="businessModel"
                        type="radio"
                        value="D2C"
                        checked={formData.businessModel === "D2C"}
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                      <Button variant="secondary" onClick={prevStep}>
                        ← Back
                      </Button>
                      <Button className="next-btn" onClick={nextStep}>
                        Next →
                      </Button>
                    </div>
                  </Form>
                </motion.div>
              )}

              {/* ✅ STEP 3 */}
              {step === 3 && (
                <motion.div key="step3" {...animation} transition={{ duration: 0.4 }}>
                  <h5 className="mb-3">Contact & Pickup Address</h5>
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Owner / Seller Name</Form.Label>
                          <Form.Control
                            name="ownerName"
                            value={formData.ownerName}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Business Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="businessEmail"
                            value={formData.businessEmail}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Mobile</Form.Label>
                          <Form.Control
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
  <Col md={6}>
    <Form.Group className="mb-3">
      <Form.Label>Pickup Address</Form.Label>
      <Form.Control
        name="address1"
        value={formData.address1}
        onChange={handleChange}
      />
    </Form.Group>
  </Col>

  <Col md={6}>
    <Form.Group className="mb-3">
      <Form.Label>Address Line 2</Form.Label>
      <Form.Control
        name="address2"
        value={formData.address2}
        onChange={handleChange}
      />
    </Form.Group>
  </Col>
</Row>


                    <Row>
                      <Col md={3}>
                        <Form.Group className="mb-3">
                          <Form.Label>Country</Form.Label>
                          <Form.Control
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={3}>
                        <Form.Group className="mb-3">
                          <Form.Label>State</Form.Label>
                          <Form.Control
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={3}>
                        <Form.Group className="mb-3">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={3}>
                      <Form.Group className="mb-3">
                      <Form.Label>Pincode</Form.Label>
                      <Form.Control
                        type="number"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                      />
                    </Form.Group>
                      </Col>
                    </Row>

                    

                    <div className="d-flex justify-content-between">
                      <Button variant="secondary" onClick={prevStep}>
                        ← Back
                      </Button>
                      <Button className="next-btn" onClick={nextStep}>
                        Next →
                      </Button>
                    </div>
                  </Form>
                </motion.div>
              )}

              {/* ✅ STEP 4 */}
              {step === 4 && (
                <motion.div key="step4" {...animation} transition={{ duration: 0.4 }}>
                  <h5 className="mb-3">Documents Upload</h5>
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Aadhaar</Form.Label>
                          <Form.Control
                            type="file"
                            name="aadhaar"
                            accept=".jpg,.pdf"
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>PAN Card (Optional)</Form.Label>
                          <Form.Control
                            type="file"
                            name="pancard"
                            accept=".jpg,.pdf"
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>GST Certificate</Form.Label>
                          <Form.Control
                            type="file"
                            name="gstCertificate"
                            accept=".jpg,.pdf"
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Business Registration</Form.Label>
                          <Form.Control
                            type="file"
                            name="registrationCert"
                            accept=".jpg,.pdf"
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Cancelled Cheque / Passbook</Form.Label>
                      <Form.Control
                        type="file"
                        name="cancelledCheque"
                        accept=".jpg,.pdf"
                        onChange={handleChange}
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                      <Button variant="secondary" onClick={prevStep}>
                        ← Back
                      </Button>
                      <Button className="next-btn" onClick={nextStep}>
                        Next →
                      </Button>
                    </div>
                  </Form>
                </motion.div>
              )}

              {/* ✅ STEP 5 */}
              {step === 5 && (
                <motion.div key="step5" {...animation} transition={{ duration: 0.4 }}>
                  <h5 className="mb-3">Payment & Signature</h5>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Bank Name</Form.Label>
                          <Form.Control
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Account Holder</Form.Label>
                          <Form.Control
                            name="accountHolder"
                            value={formData.accountHolder}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Account Number</Form.Label>
                          <Form.Control
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>IFSC Code</Form.Label>
                          <Form.Control
                            name="ifsc"
                            value={formData.ifsc}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
  <Col md={6}>
    <Form.Group className="mb-3">
      <Form.Label>Branch Name</Form.Label>
      <Form.Control
        name="branchName"
        value={formData.branchName}
        onChange={handleChange}
      />
    </Form.Group>
  </Col>

  <Col md={6}>
    <Form.Group className="mb-3">
      <Form.Label>UPI ID</Form.Label>
      <Form.Control
        name="upi"
        value={formData.upi}
        onChange={handleChange}
        required
      />
    </Form.Group>
  </Col>
</Row>


<Row>
  <Col md={6}>
    <Form.Group className="mb-3">
      <Form.Label>Preferred Payment Cycle</Form.Label>
      <Form.Select
        name="paymentCycle"
        value={formData.paymentCycle}
        onChange={handleChange}
      >
        <option value="">Select Cycle</option>
        {/* <option>Weekly</option> */}
        {/* <option>Biweekly</option> */}
        <option>Monthly</option>
      </Form.Select>
    </Form.Group>
  </Col>

  <Col md={6}>
    {/* ✅ SIGNATURE */}
    <Form.Group className="mb-3">
      <Form.Label>Signature</Form.Label>

      <Form.Control
        type="file"
        name="signature"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          setFormData({
            ...formData,
            signature: file,
            signaturePreview: URL.createObjectURL(file),
          });
        }}
      />

      {formData.signaturePreview && (
        <img
          src={formData.signaturePreview}
          alt="signature preview"
          style={{
            width: "150px",
            marginTop: "10px",
            borderRadius: "6px",
            border: "1px solid #ddd",
          }}
        />
      )}
    </Form.Group>
  </Col>
</Row>


<div className="d-flex justify-content-between mt-3">
  <Button variant="secondary" onClick={prevStep}>
    ← Back
  </Button>

  <Button type="submit" className="next-btn">
    Submit 
  </Button>
</div>
   </Form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default BusinessRegistrationForm;