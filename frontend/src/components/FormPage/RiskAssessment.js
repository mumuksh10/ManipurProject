import React, { useState, useEffect } from "react";
import axios from "axios";

const RiskAssessment = ({ currentFmId }) => {
  const [formData, setFormData] = useState({
    age: "",
    tobacco_use: "",
    alcohol_use: "",
    waist_female: "",
    waist_male: "",
    physical_activity: "",
    family_diabetes_history: "",
    risk_score: 0,
  });

  const mapValueToScore = (field, value) => {
    const mappings = {
      age: {
        "30-39 years": 0,
        "40-49 years": 1,
        "50-59 years": 2,
        "60 years or above": 3,
      },
      tobacco_use: {
        Never: 0,
        "Used to consume in the past/ Sometimes now": 1,
        Daily: 2,
      },
      alcohol_use: { No: 0, Yes: 1 },
      waist_female: { "80 cm or less": 0, "81-90 cm": 1, "More than 90 cm": 2 },
      waist_male: { "90 cm or less": 0, "91-100 cm": 1, "More than 100 cm": 2 },
      physical_activity: {
        "At least 150 minutes in a week": 0,
        "Less than 150 minutes in a week": 1,
      },
      family_diabetes_history: { No: 0, Yes: 1 },
    };
    return mappings[field][value] !== undefined ? mappings[field][value] : 0;
  };

  const calculateRiskScore = (newFormData) => {
    const fields = [
      "age",
      "tobacco_use",
      "alcohol_use",
      "waist_female",
      "waist_male",
      "physical_activity",
      "family_diabetes_history",
    ];
    return fields.reduce((score, field) => {
      return score + mapValueToScore(field, newFormData[field]);
    }, 0);
  };

  useEffect(() => {
    const fetchRiskData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/risk-assessment/${currentFmId}`
        );
        if (response.data.success) {
          const data = response.data.data;
          setFormData({
            age: data.age,
            tobacco_use: data.tobacco_use,
            alcohol_use: data.alcohol_use,
            waist_female: data.waist_female,
            waist_male: data.waist_male,
            physical_activity: data.physical_activity,
            family_diabetes_history: data.family_diabetes_history,
            risk_score: parseInt(data.risk_score),
          });
        }
      } catch (error) {
        console.error("Error fetching risk assessment:", error);
      }
    };

    if (currentFmId) {
      fetchRiskData();
    }
  }, [currentFmId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };

    const newRiskScore = calculateRiskScore(newFormData);

    setFormData({
      ...newFormData,
      risk_score: isNaN(newRiskScore) ? 0 : newRiskScore,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/risk-assessment",
        {
          fm_id: currentFmId,
          ...formData,
        }
      );
      if (response.data.success) {
        alert("Risk assessment saved successfully!");
      }
    } catch (error) {
      console.error("Error saving risk assessment:", error);
      alert("Failed to save risk assessment. Please try again.");
    }
  };

  const styles = {
    formSection: {
      marginBottom: "20px",
    },
    formGroup: {
      marginBottom: "15px",
      display: "flex",
      flexDirection: "column",
    },
    input: {
      padding: "8px",
      width: "100%",
      boxSizing: "border-box",
      fontSize: "14px",
    },
    label: {
      marginBottom: "5px",
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.formSection}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Age *</label>
        <select
          id="age"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
          required
          style={styles.input}
        >
          <option value="">Select</option>
          <option value="30-39 years">30-39 years</option>
          <option value="40-49 years">40-49 years</option>
          <option value="50-59 years">50-59 years</option>
          <option value="60 years or above">60 years or above</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Tobacco Use *</label>
        <select
          id="tobacco_use"
          name="tobacco_use"
          value={formData.tobacco_use}
          onChange={handleInputChange}
          required
          style={styles.input}
        >
          <option value="">Select</option>
          <option value="Never">Never</option>
          <option value="Used to consume in the past/ Sometimes now">
            Used to consume in the past/ Sometimes now
          </option>
          <option value="Daily">Daily</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Alcohol Consumption *</label>
        <select
          id="alcohol_use"
          name="alcohol_use"
          value={formData.alcohol_use}
          onChange={handleInputChange}
          required
          style={styles.input}
        >
          <option value="">Select</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Waist Circumference (Female) *</label>
        <select
          id="waist_female"
          name="waist_female"
          value={formData.waist_female}
          onChange={handleInputChange}
          required
          style={styles.input}
        >
          <option value="">Select</option>
          <option value="80 cm or less">80 cm or less</option>
          <option value="81-90 cm">81-90 cm</option>
          <option value="More than 90 cm">More than 90 cm</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Waist Circumference (Male) *</label>
        <select
          id="waist_male"
          name="waist_male"
          value={formData.waist_male}
          onChange={handleInputChange}
          required
          style={styles.input}
        >
          <option value="">Select</option>
          <option value="90 cm or less">90 cm or less</option>
          <option value="91-100 cm">91-100 cm</option>
          <option value="More than 100 cm">More than 100 cm</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Physical Activity *</label>
        <select
          id="physical_activity"
          name="physical_activity"
          value={formData.physical_activity}
          onChange={handleInputChange}
          required
          style={styles.input}
        >
          <option value="">Select</option>
          <option value="At least 150 minutes in a week">
            At least 150 minutes in a week
          </option>
          <option value="Less than 150 minutes in a week">
            Less than 150 minutes in a week
          </option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Family History of Diabetes *</label>
        <select
          id="family_diabetes_history"
          name="family_diabetes_history"
          value={formData.family_diabetes_history}
          onChange={handleInputChange}
          required
          style={styles.input}
        >
          <option value="">Select</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Risk Score *</label>
        <input
          type="text"
          id="risk_score"
          name="risk_score"
          value={formData.risk_score}
          style={styles.input}
          readOnly
        />
      </div>
      <button type="button" onClick={handleSave}>
        Save Risk Assessment
      </button>
    </div>
  );
};

export default RiskAssessment;