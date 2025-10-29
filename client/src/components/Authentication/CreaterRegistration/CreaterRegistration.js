import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 import this at top
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
  ProgressBar,
} from "react-bootstrap";
import axios from "axios";
import "./CreatorRegistrationForm.css";
import { Carousel } from "react-bootstrap";

const CreatorRegistrationForm = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate(); // 👈 initialize

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    instagramLink: "",
    youtubeLink: "",
    facebookLink: "",
    telegramLink: "",
    followers: "",
    whatsapp: "",
    gender: "",
    age: "",
    nicheCategory: "",
    state: "",
    city: "",
    pincode: "",
    followerCount: "",
    followedLinks: [],
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      let updatedLinks = [...formData.followedLinks];
      if (checked) {
        updatedLinks.push(value);
      } else {
        updatedLinks = updatedLinks.filter((link) => link !== value);
      }
      setFormData({ ...formData, followedLinks: updatedLinks });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/creators/register",
        formData
      );

      setMessage(res.data.message);
      setError("");

      // ✅ Clear form
      setFormData({
        name: "",
        email: "",
        instagramLink: "",
        youtubeLink: "",
        facebookLink: "",
        telegramLink: "",
        followers: "",
        whatsapp: "",
        gender: "",
        age: "",
        nicheCategory: "",
        state: "",
        city: "",
        pincode: "",
        followerCount: "",
        followedLinks: [],
      });

      // ✅ Redirect after success (2-second delay optional)
      setTimeout(() => {
        navigate("/creator-dashboard");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setMessage("");
    }
  };

  // Navigation between steps
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <Container fluid className="py-3 creator-registration">
      <Row className="justify-content-center align-items-center">
        {/* Left Side Image */}
        <Col
          md={6}
          className="d-none d-md-flex align-items-center justify-content-center"
        >
          <div className="form-image w-100 h-100">
            <Carousel
              fade
              controls={false}
              indicators={false}
              interval={1000}
              className="w-100 h-100 rounded-start-4 overflow-hidden"
            >
              <Carousel.Item>
                <img
                  src="/img/tech-vlogger.jpg"
                  className="d-block w-100 h-100 object-fit-cover"
                  alt="Creator 1"
                />
              </Carousel.Item>
              {/* <Carousel.Item>
        <img
          src="/img/beautiful-woman-happy-record-video.jpg"
          className="d-block w-100 h-100 object-fit-cover"
          alt="Creator 2"
        />
      </Carousel.Item> */}
              <Carousel.Item>
                <img
                  src="/img/front-view-man-recording-himself.jpg"
                  className="d-block w-100 h-100 object-fit-cover"
                  alt="Creator 3"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="/img/female-model-applying-daily-lip-gloss-while-looking-mirror.jpg"
                  className="d-block w-100 h-100 object-fit-cover"
                  alt="Creator 4"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </Col>

        {/* Right Side Form */}
        <Col
          md={6}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="w-100 p-1">
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body className="p-4">
                <h3 className="text-center mb-4  text-black">
                  Creator Registration
                </h3>

                <ProgressBar
                  now={(step / 3) * 100}
                  className="mb-4 custom-progress"
                />

                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit}>
                  {/* STEP 1 - Basic Info */}
                  {step === 1 && (
                    <>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Name *</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Enter your full name"
                              required
                            />
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email *</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="Enter your email"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>WhatsApp Number *</Form.Label>
                        <Form.Control
                          type="text"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleChange}
                          placeholder="e.g. +91XXXXXXXXXX"
                          required
                        />
                      </Form.Group>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Gender *</Form.Label>
                            <Form.Select
                              name="gender"
                              value={formData.gender}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>

                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Age *</Form.Label>
                            <Form.Control
                              type="number"
                              name="age"
                              value={formData.age}
                              onChange={handleChange}
                              placeholder="Enter your age"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <div className="d-flex justify-content-end">
                        <Button className="next-btn" onClick={nextStep}>
                          Next →
                        </Button>
                      </div>
                    </>
                  )}

                  {/* STEP 2 - Social Links */}
                  {step === 2 && (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label>Instagram Profile Link *</Form.Label>
                        <Form.Control
                          type="text"
                          name="instagramLink"
                          value={formData.instagramLink}
                          onChange={handleChange}
                          placeholder="https://www.instagram.com/yourprofile"
                          required
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>YouTube Channel Link</Form.Label>
                        <Form.Control
                          type="text"
                          name="youtubeLink"
                          value={formData.youtubeLink || ""}
                          onChange={handleChange}
                          placeholder="https://www.youtube.com/yourchannel"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Facebook Profile/Page Link</Form.Label>
                        <Form.Control
                          type="text"
                          name="facebookLink"
                          value={formData.facebookLink || ""}
                          onChange={handleChange}
                          placeholder="https://www.facebook.com/yourprofile"
                        />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Telegram Channel/Username</Form.Label>
                        <Form.Control
                          type="text"
                          name="telegramLink"
                          value={formData.telegramLink || ""}
                          onChange={handleChange}
                          placeholder="https://t.me/yourusername"
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
                    </>
                  )}

                  {/* STEP 3 - Category & Location */}
                  {step === 3 && (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label>NICHE CATEGORY *</Form.Label>
                        <Form.Select
                          name="nicheCategory"
                          value={formData.nicheCategory}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Category</option>
                          <option value="Fashion">Fashion</option>
                          <option value="Beauty">Beauty</option>
                          <option value="Skincare">Skincare</option>
                          <option value="Lifestyle">Lifestyle</option>
                          <option value="Health/Wellness">
                            Health / Wellness
                          </option>
                          <option value="Other">Other</option>
                        </Form.Select>
                      </Form.Group>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>State *</Form.Label>
                            <Form.Control
                              type="text"
                              name="state"
                              value={formData.state}
                              onChange={handleChange}
                              placeholder="Enter your state"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>City *</Form.Label>
                            <Form.Control
                              type="text"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              placeholder="Enter your city"
                              required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label>Pincode *</Form.Label>
                        <Form.Control
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          placeholder="Enter your pincode"
                          required
                        />
                      </Form.Group>

                      <div className="d-flex justify-content-between">
                        <Button variant="secondary" onClick={prevStep}>
                          ← Back
                        </Button>
                        <Button
                          className="next-btn"
                          type="submit"
                          variant="success"
                        >
                          Submit
                        </Button>
                      </div>
                    </>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatorRegistrationForm;
