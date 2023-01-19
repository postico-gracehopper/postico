import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CRUDTable from './CRUDTable';

const AdminTablePage = ({ apiEndpoint, fields, title, linkLoc, validation }) => {
  let [entries, setEntries] = useState([]);
  let [renderTrigger, setRenderTrigger] = useState(Date.now())
  
  const authHeader = {
    headers: { authorization: window.localStorage.token || 0 },
  };
  function createEntry(entryData) {
    axios
      .post(apiEndpoint, entryData, authHeader)
      .then(getReq)
      .then(() => {
        alert('Successfully created ' + title + ':' + JSON.stringify(entryData));
      })
      .then(setRenderTrigger(Date.now()))
      .catch((err) => console.log(err.message));
  }
  function updateEntry(changedData) {
    axios
      .put(apiEndpoint, validation ? validation(changedData) : changedData, authHeader)
      .then(getReq)
      .then(() => {
        alert('Successfully updated ' + changedData.length + ' ' + title);
      })
      .catch((err) => console.log(err.message));
  }
  function deleteEntry(entry) {
    axios
      .delete(`${apiEndpoint}/${entry.id}`, authHeader)
      .then(getReq)
      .then(() => {
        alert(`Successfully deleted ${title} ${entry.id}`);
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

  async function getReq() {
    axios.get(apiEndpoint, authHeader).then((response) => {
      setEntries(narrowFieldsEntries(response.data));
    }).then(() =>{
      setRenderTrigger(Date.now())
    })
  }

  useEffect(() => {
    if (entries && !entries.length) {
      getReq()
    } 
  }, [entries, renderTrigger]);

  return (
    <div>
      <h2 className={`admin-view-subtitle banner-${title}`}>{title}</h2>
      {entries && entries.length ? (
        <CRUDTable
          key={renderTrigger}
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
