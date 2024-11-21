import React from 'react';
import { iWeeklyDataReport } from './WeeklyReport';
import './weekly-report.css';

interface TableRowProps extends iWeeklyDataReport {
  isEditing: boolean;
  onFieldChange: (field: keyof iWeeklyDataReport, value: string | number | null) => void;
}

const TableRow: React.FC<TableRowProps> = ({
  day,
  jobName,
  timeIn,
  timeOut,
  hours,
  overtimeHrs,
  totalHours,
  amount,
  typeA,
  typeB,
  totalAmount,
  isEditing,
  onFieldChange
}) => {
  const handleChange = (field: keyof iWeeklyDataReport, value: string | number | null) => {
    onFieldChange(field, value);
  };

  return (
    <tr>
      <td>{day}</td>
      <td className="dark-gray-bg">
        {isEditing ? (
          <input
            className="dark-gray-bg input-width-job-name"
            value={jobName || ""}
            onChange={(ev) => handleChange("jobName", ev.target.value)}
          />
        ) : (
          jobName
        )}
      </td>
      <td className="dark-gray-bg input-width">
        {isEditing ? (
          <input
            className="dark-gray-bg input-width-input"
            value={timeIn || ""}
            onChange={(ev) => handleChange("timeIn", ev.target.value)}
          />
        ) : (
          timeIn
        )}
      </td>
      <td className="dark-gray-bg input-width">
        {isEditing ? (
          <input
            className="dark-gray-bg input-width-input"
            value={timeOut || ""}
            onChange={(ev) => handleChange("timeOut", ev.target.value)}
          />
        ) : (
          timeOut
        )}
      </td>
      <td >
        {isEditing ? (
          <input
            className="input-width-input"
            value={hours || ""}
            onChange={(ev) => handleChange("hours", Number(ev.target.value))}
          />
        ) : (
          hours
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            className="input-width-input"
            value={overtimeHrs || ""}
            onChange={(ev) => handleChange("overtimeHrs", Number(ev.target.value))}
          />
        ) : (
          overtimeHrs
        )}
      </td>
      <td className="dark-gray-bg">{totalHours}</td>
      <td>{amount}</td>
      <td>{typeA}</td>
      <td>{typeB}</td>
      <td className="dark-gray-bg">£{totalAmount.toFixed(2)}</td>
    </tr>
  );
};

export default TableRow;
