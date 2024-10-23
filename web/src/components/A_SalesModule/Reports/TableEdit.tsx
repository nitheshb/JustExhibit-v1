import React, { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

interface TableRow {
  chargesFor: string;
  units: string;
  charges: number;
  gst: number;
  description: string;
}

const initialRows: TableRow[] = [
  { chargesFor: 'Product A', units: '1', charges: 100, gst: 18, description: 'Description for Product A' },
  { chargesFor: 'Product B', units: '2', charges: 150, gst: 22, description: 'Description for Product B' },
  { chargesFor: 'Product C', units: '1', charges: 200, gst: 30, description: 'Description for Product C' },
];

const TableEdit  = ({data}) => {
  const [rows, setRows] = useState<TableRow[]>(initialRows);
  useEffect(() => {


    console.log(data)


  }, [])


  const addRow = () => {
    const newRow: TableRow = {
      chargesFor: '',
      units: '',
      charges: 0,
      gst: 0,
      description: ''
    };
    setRows([...rows, newRow]);
  };

  const deleteRow = (index: number) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  const editRow = (index: number) => {
    const updatedRows = [...rows];
    const rowToEdit = updatedRows[index];


    if (rowToEdit.chargesFor.trim() === '' || rowToEdit.units.trim() === '' || rowToEdit.charges === 0 || rowToEdit.gst === 0 || rowToEdit.description.trim() === '') {
      console.log("Validation failed. Please fill in all fields.");
      return;
    }


    console.log("Editing row at index:", index);
    setRows(updatedRows);
  };

  return (
    <div className="container mx-auto p-4">
      <table className="table-fixed border-collapse border-none">
        <thead>
          <tr>
            <th className="border-t border-r border-b border-gray-300 px-4 py-2  text-gray-400 text-left text-sm">Charges For*</th>
            <th className="border border-gray-300 px-4 py-2  text-gray-400 text-left text-sm">Stalls*</th>
            <th className="border border-gray-300 px-4 py-2  text-gray-400 text-left text-sm">Charges*</th>
            <th className="border border-gray-300 px-4 py-2  text-gray-400 text-left text-sm">GST*</th>
            <th className="border border-gray-300 px-4 py-2  text-gray-400 text-left text-sm">Description*</th>
            <th className="border-t border-l border-b border-gray-300 px-4 py-2  text-gray-400 text-left text-sm">Actions*</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border-t border-r border-b border-gray-300 px-4 py-2">
                <input
                  type="text"
                  value={row.chargesFor}
                  onChange={(e) => {
                    const updatedRows = [...rows];
                    updatedRows[index].chargesFor = e.target.value;
                    setRows(updatedRows);
                  }}
                  className="w-full border rounded-md focus:outline-none border-none"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  value={row.units}
                  onChange={(e) => {
                    const updatedRows = [...rows];
                    updatedRows[index].units = e.target.value;
                    setRows(updatedRows);
                  }}
                  className="w-full border rounded-md focus:outline-none border-none"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={row.charges}
                  onChange={(e) => {
                    const updatedRows = [...rows];
                    updatedRows[index].charges = parseInt(e.target.value, 10);
                    setRows(updatedRows);
                  }}
                  className="w-full rounded-md focus:outline-none border-none"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="number"
                  value={row.gst}
                  onChange={(e) => {
                    const updatedRows = [...rows];
                    updatedRows[index].gst = parseInt(e.target.value, 10);
                    setRows(updatedRows);
                  }}
                  className="w-full rounded-md focus:outline-none border-none"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  value={row.description}
                  onChange={(e) => {
                    const updatedRows = [...rows];
                    updatedRows[index].description = e.target.value;
                    setRows(updatedRows);
                  }}
                  className="w-full border rounded-md focus:outline-none border-none"
                />
              </td>
              <td className="border-t border-l border-b border-gray-300 px-4 py-2">
                <button onClick={() => deleteRow(index)} className="mr-2 text-gray-600 hover:text-gray-800">
                  <DeleteIcon />
                </button>
                <button onClick={() => editRow(index)} className="text-gray-600 hover:text-gray-800">
                  <EditIcon />
                </button>
              </td>
            </tr>
          ))}


          <tr>
            <td className="border-t  border-b border-gray-300 px-4 py-2" colSpan={6}>
              <div onClick={addRow} className="w-full  text-gray-800 rounded cursor-pointer">
                <AddIcon className="mr-1" /> Add Row
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableEdit;
