import React, { useState, useEffect } from "react";
import axios from "axios";

const AssessmentAndActionTaken = ({ currentFmId }) => {
  const [formData, setFormData] = useState({
    major_ncd_detected: "",
    any_other_disease_detected: "",
    known_case_dm_htn: "",
    teleconsultation: "",
    prescription_given: "",
    other_advices: "",
    remarks: "",
  });

  useEffect(() => {
    const fetchAssessmentData = async () => {
      if (!currentFmId) return;

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}api/assessment-and-action-taken/${currentFmId}`
        );
        if (response.data.success) {
          setFormData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching assessment and action taken:", error);
      }
    };

    fetchAssessmentData();
  }, [currentFmId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}api/assessment-and-action-taken`,
        {
          fm_id: currentFmId,
          ...formData,
        }
      );
      if (response.data.success) {
        alert("Assessment and action taken saved successfully!");
      }
    } catch (error) {
      console.error("Error saving assessment and action taken:", error);
      alert("Failed to save assessment and action taken. Please try again.");
    }
  };

  const styles = {
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
    textarea: {
      padding: "8px",
      width: "100%",
      boxSizing: "border-box",
      fontSize: "14px",
      resize: "vertical",
    },
    label: {
      marginBottom: "5px",
      fontWeight: "bold",
    },
    button: {
      padding: "10px 20px",
      fontSize: "14px",
      cursor: "pointer",
      backgroundColor: "#8BC34A",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      marginTop: "20px",
      width: "98%",
    },
  };

  return (
    <div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Major NCD Detected</label>
        <input
          type="text"
          name="major_ncd_detected"
          value={formData.major_ncd_detected || ""}
          onChange={handleInputChange}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Any Other Disease Detected</label>
        <textarea
          name="any_other_disease_detected"
          value={formData.any_other_disease_detected || ""}
          onChange={handleInputChange}
          rows="2"
          style={styles.textarea}
        ></textarea>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Known Case of DM with HTN</label>
        <input
          type="text"
          name="known_case_dm_htn"
          value={formData.known_case_dm_htn || ""}
          onChange={handleInputChange}
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Teleconsultation</label>
        <select
          name="teleconsultation"
          value={formData.teleconsultation || ""}
          onChange={handleInputChange}
          style={styles.input}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Prescription Given</label>
        <select
          name="prescription_given"
          value={formData.prescription_given || ""}
          onChange={handleInputChange}
          style={styles.input}
        >
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Other Advices</label>
        <textarea
          name="other_advices"
          value={formData.other_advices || ""}
          onChange={handleInputChange}
          rows="3"
          style={styles.textarea}
        ></textarea>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Remarks</label>
        <textarea
          name="remarks"
          value={formData.remarks || ""}
          onChange={handleInputChange}
          rows="3"
          style={styles.textarea}
        ></textarea>
      </div>

      <button type="button" style={styles.button} onClick={handleSave}>
        Save Draft
      </button>
    </div>
  );
};

export default AssessmentAndActionTaken;
