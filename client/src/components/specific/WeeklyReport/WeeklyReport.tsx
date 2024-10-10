import React from 'react';
import TableRow from './TableRow';
import './weekly-report.css';

const WeeklyReport: React.FC = () => {
  return (
    <div className="container">
      <div className="header">
        <p><strong>Name:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b> Mike Brown</b></p>
        <p><strong>Address:</strong>&nbsp;&nbsp;&nbsp; 101 Main Street, Camden Town, London, N48NF</p>
        <p><strong>Email:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; mike.brown@gmail.com</p>
      </div>

      <div className="week-ending">
        <p><strong>Week Ending Date:</strong> 28-Jul-24</p>
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
            <th colSpan={2}>Type (A or B)</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          <TableRow day="Monday" jobName="Alvarez & Marshal" timeIn="8:00" timeOut="16:00" hours={8} overtimeHrs={null} totalHours={8} amount="" typeA="" typeB="" totalAmount="£200" />
          <TableRow day="Tuesday" jobName="Alvarez & Marshal" timeIn="8:00" timeOut="16:00" hours={8} overtimeHrs={null} totalHours={8} amount="" typeA="" typeB="" totalAmount="£200" />
          <TableRow day="Wednesday" jobName="Alvarez & Marshal" timeIn="8:00" timeOut="16:00" hours={8} overtimeHrs={null} totalHours={8} amount="" typeA="" typeB="" totalAmount="£200" />
          <TableRow day="Thursday" jobName="Alvarez & Marshal" timeIn="8:00" timeOut="16:00" hours={8} overtimeHrs={null} totalHours={8} amount="" typeA="" typeB="" totalAmount="£200" />
          <TableRow day="Friday" jobName="Alvarez & Marshal" timeIn="8:00" timeOut="16:00" hours={8} overtimeHrs={null} totalHours={8} amount="" typeA="" typeB="" totalAmount="£200" />
          <TableRow day="Saturday" jobName="Alvarez & Marshal" timeIn="8:00" timeOut="16:00" hours={8} overtimeHrs={3} totalHours={12.5} amount="" typeA="" typeB="" totalAmount="£300" />
          <TableRow day="Sunday" jobName="Alvarez & Marshal" timeIn="8:00" timeOut="16:00" hours={8} overtimeHrs={3} totalHours={12.5} amount="" typeA="" typeB="" totalAmount="£300" />
        </tbody>
      </table>

      <div className="totals-section">
        <div className="notes-section">
          <label htmlFor="user-notes">Notes:</label>
          <textarea id="user-notes" placeholder="Write any notes here..." />
        </div>

        <div className="totals">
          <div className="hrs">
            <div className="label">GRAND TOTAL hrs:</div>
            <div className="value">65</div>
          </div>
          <div className="income">
            <div className="label">GRAND TOTAL:</div>
            <div className="value">£1600.00</div>
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
