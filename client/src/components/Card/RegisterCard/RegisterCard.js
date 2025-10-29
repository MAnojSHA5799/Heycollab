"use client";
import React, { useState } from "react";
import { Container, Row, Col, Form, Button, ProgressBar, Alert, Carousel } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import "./RegisterCard.css"; // 👈 optional CSS for custom styling

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
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));

      const res = await axios.post("http://localhost:8000/api/sellers/register", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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

  const progress = (step / 3) * 100;

  return (
    <Container fluid className="py-3registration-container">
      <Row className="justify-content-center align-items-center">
        {/* LEFT SIDE IMAGE SLIDER */}
        <Col md={6} className="d-none d-md-flex align-items-center justify-content-center">
          <div className="form-image w-100 h-100">
            <Carousel fade controls={false} indicators={false} interval={2500} className="w-100 h-100 rounded-start-4 overflow-hidden">
              <Carousel.Item>
                <img
                  src="/business/formal-man-using-tablet-office.jpg"
                  className="d-block w-100 h-100 object-fit-cover"
                  alt="Business slide 1"
                />
              </Carousel.Item>
              {/* <Carousel.Item>
                <img
                  src="/business/laptop-notepads-yellow-background-flat-lay.jpg"
                  className="d-block w-100 h-100 object-fit-cover"
                  alt="Business slide 2"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="/business/side-view-young-businessman-using-digital-tablet-standing-against-wall.jpg"
                  className="d-block w-100 h-100 object-fit-cover"
                  alt="Business slide 3"
                />
              </Carousel.Item> */}
             
            </Carousel>
          </div>
        </Col>

        {/* RIGHT SIDE FORM */}
        {/* RIGHT FORM SECTION */}
        <Col md={6} className="d-flex align-items-center justify-content-center">
        <div className="w-100 p-1">
          <h3 className="text-center mb-3">Business Registration</h3>
          <ProgressBar now={progress} label={`Step ${step} of 3`} className="mb-4 custom-progress" />
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <AnimatePresence mode="wait">
            {/* STEP 1 */}
            {step === 1 && (
              <motion.div key="step1" {...animation} transition={{ duration: 0.4 }}>
                <h5 className="mb-3">Business & Store Details</h5>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Store / Brand Name</Form.Label>
                        <Form.Control name="storeName" value={formData.storeName} onChange={handleChange} required />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Business Type</Form.Label>
                        <Form.Select name="businessType" value={formData.businessType} onChange={handleChange}>
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
                        <Form.Select name="category" value={formData.category} onChange={handleChange}>
                          <option value="">Select Category</option>
                          <option>Fashion</option>
                          <option>Electronics</option>
                          <option>Grocery</option>
                          <option>Beauty</option>
                          <option>Home Decor</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Date of Establishment</Form.Label>
                        <Form.Control type="date" name="dateOfEstablishment" value={formData.dateOfEstablishment} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>GST Number</Form.Label>
                        <Form.Control name="gstNumber" value={formData.gstNumber} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>PAN Number</Form.Label>
                        <Form.Control name="panNumber" value={formData.panNumber} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3">
                        <Form.Label>FSSAI Number</Form.Label>
                        <Form.Control name="fssaiNumber" value={formData.fssaiNumber} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Website / Store URL</Form.Label>
                    <Form.Control name="website" value={formData.website} onChange={handleChange} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Business Description</Form.Label>
                    <Form.Control as="textarea" rows={2} name="description" value={formData.description} onChange={handleChange} />
                  </Form.Group>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Business Logo</Form.Label>
                        <Form.Control type="file" name="logo" onChange={handleChange} accept=".jpg,.png" />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Product Count</Form.Label>
                        <Form.Control type="number" name="productCount" value={formData.productCount} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Avg. Monthly Orders</Form.Label>
                        <Form.Control type="number" name="monthlyOrders" value={formData.monthlyOrders} onChange={handleChange} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Business Model</Form.Label><br />
                    <Form.Check inline label="B2C" name="businessModel" value="B2C" type="radio" checked={formData.businessModel === "B2C"} onChange={handleChange} />
                    <Form.Check inline label="B2B" name="businessModel" value="B2B" type="radio" checked={formData.businessModel === "B2B"} onChange={handleChange} />
                    <Form.Check inline label="D2C" name="businessModel" value="D2C" type="radio" checked={formData.businessModel === "D2C"} onChange={handleChange} />
                  </Form.Group>

                  <div className="d-flex justify-content-end">
                    <Button className="next-btn" onClick={nextStep}>Next →</Button>
                  </div>
                </Form>
              </motion.div>
            )}

            {/* Step 2 + Step 3 remain same (as in your current code) */}
            {/* STEP 2 */}
        {step === 2 && (
          <motion.div key="step2" {...animation} transition={{ duration: 0.4 }}>
            <h5 className="mb-3 text-center">Contact & Pickup Address</h5>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Owner / Seller Name</Form.Label>
                    <Form.Control name="ownerName" value={formData.ownerName} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Business Email</Form.Label>
                    <Form.Control type="email" name="businessEmail" value={formData.businessEmail} onChange={handleChange} required />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Alternate Contact</Form.Label>
                    <Form.Control type="text" name="altContact" value={formData.altContact} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Pickup Address Line 1</Form.Label>
                <Form.Control name="address1" value={formData.address1} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Pickup Address Line 2</Form.Label>
                <Form.Control name="address2" value={formData.address2} onChange={handleChange} />
              </Form.Group>

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Country</Form.Label>
                    <Form.Control name="country" value={formData.country} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control name="state" value={formData.state} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control name="city" value={formData.city} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Pincode</Form.Label>
                <Form.Control type="number" name="pincode" value={formData.pincode} onChange={handleChange} />
              </Form.Group>

              <Form.Check
                type="checkbox"
                label="Return Address different?"
                name="hasReturnAddress"
                checked={formData.hasReturnAddress}
                onChange={handleChange}
              />

              {formData.hasReturnAddress && (
                <>
                  <Form.Group className="mt-2">
                    <Form.Label>Return Address Line 1</Form.Label>
                    <Form.Control name="returnAddress1" value={formData.returnAddress1} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mt-2 mb-3">
                    <Form.Label>Return Address Line 2</Form.Label>
                    <Form.Control name="returnAddress2" value={formData.returnAddress2} onChange={handleChange} />
                  </Form.Group>
                </>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Business Hours</Form.Label>
                <Form.Control name="businessHours" value={formData.businessHours} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Support Email / WhatsApp</Form.Label>
                <Form.Control name="supportContact" value={formData.supportContact} onChange={handleChange} />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={prevStep}>← Back</Button>
                <Button className="next-btn" onClick={nextStep}>Next →</Button>
              </div>
            </Form>
          </motion.div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <motion.div key="step3" {...animation} transition={{ duration: 0.4 }}>
            <h5 className="mb-3 text-center">Documents & Payment Info</h5>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Aadhaar Card</Form.Label>
                    <Form.Control type="file" name="aadhaar" onChange={handleChange} accept=".jpg,.pdf" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>PAN Card</Form.Label>
                    <Form.Control type="file" name="pancard" onChange={handleChange} accept=".jpg,.pdf" />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>GST Certificate</Form.Label>
                    <Form.Control type="file" name="gstCertificate" onChange={handleChange} accept=".jpg,.pdf" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Business Registration Certificate</Form.Label>
                    <Form.Control type="file" name="registrationCert" onChange={handleChange} accept=".jpg,.pdf" />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Cancelled Cheque / Passbook Copy</Form.Label>
                <Form.Control type="file" name="cancelledCheque" onChange={handleChange} accept=".jpg,.pdf" />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Bank Name</Form.Label>
                    <Form.Control name="bankName" value={formData.bankName} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Account Holder Name</Form.Label>
                    <Form.Control name="accountHolder" value={formData.accountHolder} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Account Number</Form.Label>
                    <Form.Control name="accountNumber" value={formData.accountNumber} onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>IFSC Code</Form.Label>
                    <Form.Control name="ifsc" value={formData.ifsc} onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Branch Name</Form.Label>
                <Form.Control name="branchName" value={formData.branchName} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>UPI ID (Optional)</Form.Label>
                <Form.Control name="upi" value={formData.upi} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Preferred Payment Cycle</Form.Label>
                <Form.Select name="paymentCycle" value={formData.paymentCycle} onChange={handleChange}>
                  <option value="">Select Cycle</option>
                  <option>Weekly</option>
                  <option>Biweekly</option>
                  <option>Monthly</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Signature / Seal</Form.Label>
                <Form.Control type="file" name="signature" onChange={handleChange} accept=".png,.jpg" />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button variant="secondary" onClick={prevStep}>← Back</Button>
                <Button type="submit" className="next-btn">Submit</Button>
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
