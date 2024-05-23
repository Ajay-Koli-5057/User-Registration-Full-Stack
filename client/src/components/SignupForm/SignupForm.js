import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Box, Checkbox, FormGroup, FormControlLabel, FormLabel } from '@material-ui/core';
import styles from './SignupForm.css'; 
import { useNavigate } from 'react-router-dom';

const SignupForm = ({ userData }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    country: '',
    state: '',
    city: '',
    zip: '',
    interests: [],
    profilePicture: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      setFormData({ ...userData });
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let updatedInterests = [...formData.interests];
    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests = updatedInterests.filter((interest) => interest !== name);
    }
    setFormData({ ...formData, interests: updatedInterests });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = "First Name is required";
    if (!formData.lastName) tempErrors.lastName = "Last Name is required";
    if (!formData.gender) tempErrors.gender = "Gender is required";
    if (!formData.dob) tempErrors.dob = "Date of Birth is required";
    if (!formData.country) tempErrors.country = "Country is required";
    if (!formData.state) tempErrors.state = "State is required";
    if (!formData.city) tempErrors.city = "City is required";
    if (!formData.zip) tempErrors.zip = "Zip code is required";
    if (!formData.password) tempErrors.password = "Password is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission here
      console.log(formData);
      if (userData) {
        // Handle edit logic
        console.log('Editing user data:', formData);
      } else {
        // Handle add logic
        console.log('Adding new user:', formData);
      }
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} className={`${styles['signup-form']} form`}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              className={styles.formInput}
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              className={styles.formInput}
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required error={!!errors.gender}>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
              {errors.gender && <p className="error-text">{errors.gender}</p>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={styles.formInput}
              type="date"
              label="Date of Birth"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              fullWidth
              required
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.dob}
              helperText={errors.dob}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={styles.formInput}
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.country}
              helperText={errors.country}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={styles.formInput}
              label="State"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.state}
              helperText={errors.state}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={styles.formInput}
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.city}
              helperText={errors.city}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={styles.formInput}
              label="Zip"
              name="zip"
              value={formData.zip}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.zip}
              helperText={errors.zip}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset" error={!!errors.interests}>
              <FormLabel component="legend">Area of Interest</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={formData.interests.includes('reading')} />}
                  label="Reading"
                  name="reading"
                  onChange={handleCheckboxChange}
                />
                <FormControlLabel
                  control={<Checkbox checked={formData.interests.includes('writing')} />}
                  label="Writing"
                  name="writing"
                  onChange={handleCheckboxChange}
                />
                <FormControlLabel
                  control={<Checkbox checked={formData.interests.includes('traveling')} />}
                  label="Traveling"
                  name="traveling"
                  onChange={handleCheckboxChange}
                />
                <FormControlLabel
                  control={<Checkbox checked={formData.interests.includes('playing')} />}
                  label="Playing"
                  name="playing"
                  onChange={handleCheckboxChange}
                />
              </FormGroup>
              {errors.interests && <p className="error-text">{errors.interests}</p>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={styles.formInput}
              type="file"
              label="Profile Picture"
              name="profilePicture"
              onChange={handleInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={styles.formInput}
              type="password"
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth className={styles['submit-button']}>
              {userData ? 'Update' : 'Register'}
            </Button>
          </Grid>
        </Grid>
        <p>Don't have an account? <a className='anchor_tag' onClick={() => navigate("/login")}>Login</a></p>
      </form>
    </Box>
  );
};

export default SignupForm;
