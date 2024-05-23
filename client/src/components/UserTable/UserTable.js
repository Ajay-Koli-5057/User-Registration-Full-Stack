import React, { useState, useEffect } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton, Box, Modal, Button, Typography, TextField, TablePagination } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SignupForm from '../SignupForm/SignupForm';
import './UserTable.css';

const UserTable = ({ users, onDelete, onResetPassword }) => {
    console.log("users", users);
  const [editUserData, setEditUserData] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleEdit = (userId) => {
    const user = users.find(user => user.id === userId);
    if (user) {
      setEditUserData(user);
      setIsEditModalOpen(true);
    }
  };

  const handleCloseEditModal = () => {
    setEditUserData(null);
    setIsEditModalOpen(false);
  };

  const handleOpenDeleteModal = (userId) => {
    setUserToDelete(userId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setUserToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(userToDelete);
    setIsDeleteModalOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>DOB</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>State</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Zip</TableCell>
            <TableCell>Interests</TableCell>
            <TableCell>Profile Picture</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>{user.dob}</TableCell>
              <TableCell>{user.country}</TableCell>
              <TableCell>{user.state}</TableCell>
              <TableCell>{user.city}</TableCell>
              <TableCell>{user.zip}</TableCell>
              <TableCell>{user.interests}</TableCell>
              <TableCell>{user.profilePicture}</TableCell>
              <TableCell>
                <Box className='icons-div'>
                  <IconButton onClick={() => handleEdit(user.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDeleteModal(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => onResetPassword(user.id)}>
                    <LockOpenIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Modal className='edit-modal' open={isEditModalOpen} onClose={handleCloseEditModal}>
        <div className="edit-modal-content">
          <SignupForm userData={editUserData} onClose={handleCloseEditModal} />
        </div>
      </Modal>

      <Modal className='edit-modal' open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
        <div className="edit-modal-content">
          <Typography variant="h6">Are you sure you want to delete this user?</Typography>
          <Box mt={2}>
            <Button variant="contained" color="secondary" onClick={handleConfirmDelete}>Delete</Button>
            <Button variant="contained" onClick={handleCloseDeleteModal} style={{ marginLeft: '10px' }}>Cancel</Button>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default UserTable;
