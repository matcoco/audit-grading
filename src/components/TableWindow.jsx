// components/TableWindow.js
import React from 'react';

const TableWindow = ({ data }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>Anglais</th>
          <th>Français</th>
          <th>Grade</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.English}</td>
            <td>{item.French}</td>
            <td>{item.GRADE.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableWindow;
