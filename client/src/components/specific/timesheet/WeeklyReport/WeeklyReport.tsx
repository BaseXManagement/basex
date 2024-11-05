import React from 'react';
import TableRow from './TableRow';
import './weekly-report.css';
import { useOutletContext } from 'react-router-dom';

interface WeeklyReportContext {
  weeklyData: Array<iWeeklyDataReport>;
  userInfo: {
    weekEnding: string;
    belongTo: string;
    notes?: string;
  };
}
export interface iWeeklyDataReport {
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
  totalAmount: number;
}

const WeeklyReport: React.FC = () => {
  const context = useOutletContext<WeeklyReportContext | undefined>();
  if (!context) {
    return <div>Error: Weekly data is unavailable.</div>;
  }

  const { weeklyData, userInfo } = context;

  const totalHours = weeklyData.reduce((acc, curr) => acc + curr.totalHours, 0);
  const totalAmount = weeklyData.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);

  return (
    <div className="container">
      <div className="header">
        <p><strong>Name:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b> {userInfo.belongTo} </b></p>
        <p><strong>Address:</strong>&nbsp;&nbsp;&nbsp; 101 Main Street, Camden Town, London, N48NF</p>
        <p><strong>Email:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; mike.brown@gmail.com</p>
      </div>

      <div className="week-ending">
        <p><strong>Week Ending Date:</strong> {userInfo.weekEnding}</p>
      </div>

      <table>
        <thead>
          <tr>
            <th>DAY</th>
            <th>Job Name</th>
            <th>Time in</th>
            <th>Time out</th>
            <th>Hours</th>
            <th>Overtime hrs</th>
            <th>Total Hours</th>
            <th>Amount</th>
            <th colSpan={2}>Expense Type (A or B)</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
        {weeklyData.map((e: iWeeklyDataReport, index: number) => (
          <TableRow 
            key={index} 
            day={e.day} 
            jobName={e.jobName} 
            timeIn={e.timeIn} 
            timeOut={e.timeOut} 
            hours={e.hours} 
            overtimeHrs={e.overtimeHrs} 
            totalHours={e.totalHours} 
            amount={e.amount} 
            typeA={e.typeA} 
            typeB={e.typeB} 
            totalAmount={e.totalAmount} 
          />
        ))}
          </tbody>
      </table>

      <div className="totals-section">
        <div className="notes-section">
          <label htmlFor="user-notes">Notes:</label>
          <textarea id="user-notes" placeholder={userInfo.notes || "Write any notes here..."} />
        </div>

        <div className="totals">
          <div className="hrs">
            <div className="label">GRAND TOTAL hrs:</div>
            <div className="value">{totalHours}</div>
          </div>
          <div className="income">
            <div className="label">GRAND TOTAL:</div>
            <div className="value">£{totalAmount}</div>
          </div>
        </div>
      </div>

      <div className="notes">
        <p>Overtime hours are calculated @ total O/T hrs x 1.5.</p>
        <p>Weekends and bank holidays - 8-1.30 = 9hrs, 8-5 = 13.5hrs</p>
        <p>Expenses: A = Fuel, B = Lodging</p>
        <p>IF BOOKING TO MORE THAN ONE JOB IN A SINGLE DAY, PLEASE ALLOCATE HOURS BOOKED TO EACH JOB ON EACH DAY IN THE NOTES SECTION</p>
      </div>
    </div>
  );
};

export default WeeklyReport;