import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, fetchUsersAsync } from './usersSlice';
import { Link } from 'react-router-dom';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  return (
    <div>
      <div>
        {users.map((user) => {
          return (
            <div className="bg-white mb-6 rounded-lg shadow-lg" key={user.id}>
              <h2>
                {user.firstName} {user.lastName}
              </h2>
              <p>User Id: {user.id}</p>
              <p>username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Address Line 1: {user.addressLine1}</p>
              <p>Adress Line 2: {user.addressLine2}</p>
              <p>City: {user.city}</p>
              <p>Zip Code: {user.zipCode}</p>
              <p>Admin: {user.adminRights ? 'Yes' : 'No'}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
