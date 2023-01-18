import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CRUDTable from './CRUDTable';

const AdminTablePage = ({ apiEndpoint, fields, title, linkLoc }) => {
  let [entries, setEntries] = useState([]);
  const authHeader = {
    headers: { authorization: window.localStorage.token || 0 },
  };
  function createEntry(userData) {
    axios
      .post(apiEndpoint, userData, authHeader)
      .then(() => {
        alert('Successfully created ' + title + ':' + JSON.stringify(userData));
      })
      .catch((err) => console.log(err.message));
  }
  function updateEntry(changedData) {
    axios
      .put(apiEndpoint, changedData, authHeader)
      .then(() => {
        alert('Successfully updated ' + changedData.length + ' ' + title);
      })
      .catch((err) => console.log(err.message));
  }
  function deleteEntry(user) {
    axios
      .delete(`${apiEndpoint}${user.id}`, authHeader)
      .then(() => {
        alert('Successfully deleted user ' + user.id);
      })
      .catch((err) => console.log(err.message));
  }

  function narrowFieldsEntries(userArray) {
    if (!Array.isArray(userArray)) return [];
    return userArray
      .map((o) => {
        return Object.keys(o).reduce(
          (acc, k) =>
            fields.includes(k) ? Object.assign(acc, { [k]: o[k] }) : acc,
          {}
        );
      })
      .sort((a, b) => a.id - b.id);
  }

  useEffect(() => {
    if (entries && !entries.length) {
      axios.get(apiEndpoint, authHeader).then((response) => {
        setEntries(narrowFieldsEntries(response.data));
      });
    }
  }, [entries]);

  return (
    <div>
      {entries && entries.length ? (
        <CRUDTable
          title={title}
          data={entries}
          handleSave={updateEntry}
          handleDelete={deleteEntry}
          handleCreate={createEntry}
          singlePageEndpoint={linkLoc}
        />
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default AdminTablePage;
