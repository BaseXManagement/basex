interface TableRowProps {
    day: string;
    jobName: string;
    timeIn: string;
    timeOut: string;
    hours: number;
    overtimeHrs: number | null;
    totalHours: number;
    amount: string;
    typeA: string | null;
    typeB: string | null;
    totalAmount: string;
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
    totalAmount
  }) => {
    return (
      <tr>
        <td>{day}</td>
        <td className="job-name">{jobName}</td>
        <td className="time-in">{timeIn}</td>
        <td className="time-out">{timeOut}</td>
        <td>{hours}</td>
        <td>{overtimeHrs || ''}</td>
        <td className="total-hours">{totalHours}</td>
        <td>{amount}</td>
        <td>{typeA || ''}</td>
        <td>{typeB || ''}</td>
        <td className="total-amount">{totalAmount}</td>
      </tr>
    );
  };

  export default TableRow;