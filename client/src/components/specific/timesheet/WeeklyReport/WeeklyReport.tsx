import React, { useState, useMemo } from 'react';
import TableRow from './TableRow';
import './weekly-report.css';
import { useOutletContext } from 'react-router-dom';
import { useAuthStore } from '../../../../stores/authStore';
import { useProfile } from '../../../../hooks/useProfile';
import { JwtPayload } from '../../Profile/ProfileDetails';
import { jwtDecode } from 'jwt-decode';
import { useTimesheet } from '../../../../hooks/useTimesheet';

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
  const { timesheetData, saveTimesheetData } = useTimesheet();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(timesheetData?.weeklyData || []);

  const context = useOutletContext<WeeklyReportContext | undefined>();
  const token = useAuthStore((state) => state.token);
  let userId: string | null = null;

  if (token) {
    const decodedToken = jwtDecode<JwtPayload>(token);
    userId = decodedToken.user_id;
  }
  const { profile } = useProfile(userId || '');
  const HOURLY_RATE = profile?.rate ? profile?.rate / 8 : 0;

  const calculateTotalHours = (overtimeHrs: number | null) => {
    return parseFloat((Number(8) + (1.5 * Number(overtimeHrs || 0))).toFixed(2));
  };

  const calculateTotalAmount = (totalHours: number) => {
    return parseFloat((totalHours * HOURLY_RATE).toFixed(2));
  };

  const { totalHours, totalAmount } = useMemo(() => {
    const grandTotalHours = editedData.reduce((acc, row) => acc + row.totalHours, 0);
    const grandTotalAmount = editedData.reduce((acc, row) => acc + row.totalAmount, 0);
    return { totalHours: grandTotalHours, totalAmount: grandTotalAmount };
  }, [editedData]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing && timesheetData) {
      setEditedData(timesheetData.weeklyData);
    }
  };

  const handleFieldChange = (index: number, field: keyof iWeeklyDataReport, value: string | number | null) => {
    const updatedData = editedData.map((item, idx) => {
      if (idx === index) {
        const updatedItem = { ...item, [field]: value };

        if (field === 'overtimeHrs') {
          updatedItem.totalHours = calculateTotalHours(updatedItem.overtimeHrs);
          updatedItem.totalAmount = calculateTotalAmount(updatedItem.totalHours);
        }
        return updatedItem;
      }
      return item;
    });

    setEditedData(updatedData);
  };

  const saveChanges = async () => {
    await saveTimesheetData(editedData);
    setIsEditing(false);
  };

  if (!timesheetData) {
    return <div>Error: Weekly data is unavailable.</div>;
  }

  const { userInfo } = timesheetData;

  return (
    <div className="container">
      <div className="header">
        <p><strong>Name:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>{profile?.firstName} {profile?.lastName}</b></p>
        <p><strong>Address:</strong>&nbsp;&nbsp;&nbsp;{profile?.address}</p>
        <p><strong>Email:</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{profile?.email}</p>
      </div>

      <div className="edit-button-container">
        <button onClick={isEditing ? saveChanges : handleEditToggle} className="edit-button">
          {isEditing ? 'Save' : 'Edit'}
        </button>
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
          {editedData.map((e: iWeeklyDataReport, index: number) => (
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
              isEditing={isEditing}
              onFieldChange={(field, value) => handleFieldChange(index, field, value)}
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
            <div className="value">{totalHours.toFixed(2)}</div>
          </div>
          <div className="income">
            <div className="label">GRAND TOTAL:</div>
            <div className="value">£{totalAmount.toFixed(2)}</div>
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
