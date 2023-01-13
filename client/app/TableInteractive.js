import React from 'react'
import { useTable, usePagination } from 'react-table'


// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)
  const [beenChanged, setBeenChanged] = React.useState(false)
  const onChange = e => {
    setValue(e.target.value)
    setBeenChanged(!(e.target.value === String(initialValue)))
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  
  if (typeof value === 'boolean'){
    if (!value) {
      setValue("false")
    }
  }

  return id === "id" ? <p style={{fontSize: "0.75rem", margin: "0px", padding: "0px"}}>{value}</p> : 
      <input className={beenChanged ? "td-input-changed" : ""} value={value || ""} onChange={onChange} onBlur={onBlur} />
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
}

function AddForm({columns, handleCreate}){
  let [tentativeRecord, setTentativeRecord] = React.useState({})

  function updateWorkingRecord(header){
    return (index, id, value) => setTentativeRecord({...tentativeRecord, [header]: value})
  }
  
  return <div className="add-form-container"><table>
    <thead>
      <tr>
      {columns && columns.length ? columns.map((category, i) => {
        return <th key={i}>{category.Header}</th>
      }) : <th>Loading..</th>}
      </tr>
    </thead>
    <tbody>
      <tr>
      {columns && columns.length ? columns.map((cell, i) => {
        return <td key={i}> 
          {i === 0 ? <p>{i}</p> : 
          <EditableCell value={""} 
                row={1} 
                onBlur={console.log} 
                onChange={console.log} 
                column={i}
                updateMyData={updateWorkingRecord(cell.accessor)}/>
      }
          </td>
      }): <td>Loading...</td>}
      </tr>
    </tbody>
  </table>
  <button className="submit-record" onClick={() => handleCreate(tentativeRecord)}>Submit</button>
  
  </div>
}
// Be sure to pass our updateMyData and the skipPageReset option
function Table({ columns, data, updateMyData, skipPageReset, handleDelete }) {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      // use the skipPageReset option to disable page resetting temporarily
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
      initialState: {pageSize: 50}
    },
    usePagination
  )

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()} className="interactive-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
              <th>Delete</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
                <td className="del-entry" onClick={() => handleDelete(data[i])}>❌</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {'<<'}
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {'<'}
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {'>'}
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {'>>'}
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              gotoPage(page)
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

function TableInteractive({data: ogData, 
          handleSave: handleSaveAction, 
          handleDelete: handleDeleteAction,
          handletitle: titleText,
          handleCreate: handleCreateAction}) {
  const columns = React.useMemo(() => Object.keys(ogData[0]).map(k => {
    return {Header: k[0].toUpperCase() + k.slice(1,), accessor: k}
  }))

  const [data, setData] = React.useState(ogData)
  const [originalData, setOriginalData] = React.useState(data)
  const [skipPageReset, setSkipPageReset] = React.useState(true)
  const changedData = data.filter((entry, i) => JSON.stringify(entry) !== JSON.stringify(originalData[i]))
  const [addMode, setAddMode] = React.useState(false)
  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  // function tableActionsOnSave(ev){
  //     handleSaveAction(changedData)
  //     setOriginalData(data)
  // }

  // function tableActionsOnAddNew(ev){
  //   return ""

  // }
  // After data chagnes, we turn the flag back off
  // so that if data actually changes when we're not
  // editing it, the page is reset
  React.useEffect(() => {
    setSkipPageReset(true)
    setData(ogData)
  }, [ogData, originalData])

  // Let's add a data resetter/randomizer to help
  // illustrate that flow...
  const resetData = () => setData(originalData)

  return (
    <div className='interactive-table-container'>
      <h2>{titleText}</h2>
      <button onClick={resetData}>Reset Data</button>
      { addMode ?
      <AddForm columns={columns} handleCreate={handleCreateAction}/>
      :
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        setPageSize={50}
        handleDelete={handleDeleteAction}
      />
          }
      
      {!addMode ? <button className="save" 
              onClick={() => handleSaveAction(changedData, data)}>
      Save
      </button> : <></>}

      <button className="addNew" onClick={() => setAddMode(!addMode)}>{!addMode ? "Add New" : "Edit Existing"} {titleText}</button>
    </div>
  )
}

export default TableInteractive