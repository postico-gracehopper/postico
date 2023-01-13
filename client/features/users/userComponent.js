// When we ge to the point of allowing users to view/edit their personal info I think we can use this component
// and then maybe include a payment info section below as well as a form to change their info.

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
            <Link to={`/users/${user.id}`}>
              <div className="bg-white mb-6 rounded-lg shadow-lg" key={user.id}>
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <p>User Id: {user.id}</p>
                <p>username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Address Line 1: {user.addressLine1}</p>
                <p>Adress Line 2: {user.addressLine2}</p>
                <p>City: {user.city}</p>
                <p>Zip Code: {user.zipCode}</p>
                <p>Admin: {user.adminRights ? 'Yes' : 'No'}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
