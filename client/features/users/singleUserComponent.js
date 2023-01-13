import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectSingleUser, fetchSingleUserAsync } from './singleUserSlice';

const SingleUser = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector(selectSingleUser);

  useEffect(() => {
    dispatch(fetchSingleUserAsync(id));
  }, [id]);

  return (
    <div>
      <div className="bg-white mb-6 rounded-lg shadow-lg" key={user.id}>
        <p>
          Name: {user.firstName} {user.lastName}
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
    </div>
  );
};

export default SingleUser;
