import React, { useState } from 'react';
import { TextField, Button, Link, Box, Modal, Backdrop, Fade } from '@material-ui/core';
import Swal from 'sweetalert2'; // Import Swal from sweetalert2
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'; // Import CSS file for modal styling

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // For demonstration purposes, navigate to home page after login
    navigate("/home");
  };

  const handleResetPasswordClick = () => {
    setResetPasswordOpen(true);
  };

  const handleResetPasswordClose = () => {
    setResetPasswordOpen(false);
  };

  const handleResetPassword = () => {
    // Here you would perform the password reset logic
    // For demonstration purposes, we'll just show a success alert
    Swal.fire({
      icon: 'success',
      title: 'Password Reset Successfully',
      showConfirmButton: false,
      timer: 1500 // Close alert after 1.5 seconds
    });
  };

  return (
    <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} className="form">
        <TextField
          className="formInput"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <TextField
          className="formInput"
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary" className="formInput">
          Login
        </Button>

        <Link href="#" variant="body2" className="forgotPasswordLink" onClick={handleResetPasswordClick}>
          Forgot Password?
        </Link>

        <p>Don't have an account? <Link className='anchor_tag' onClick={() => navigate("/signup")}>Sign up</Link></p>
      </form>

      {/* Forgot Password Modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={resetPasswordOpen}
        onClose={handleResetPasswordClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        className="modal" // Add class for custom styling
      >
        <Fade in={resetPasswordOpen}>
          <div className="modal-content">
            <h2 id="transition-modal-title">Reset Password</h2>
            <TextField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              required
            />
            <Button variant="contained" color="primary" onClick={handleResetPassword}>Reset</Button>
          </div>
        </Fade>
      </Modal>
    </Box>
  );
};

export default LoginForm;
