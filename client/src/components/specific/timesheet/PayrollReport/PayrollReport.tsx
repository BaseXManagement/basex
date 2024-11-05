import React from 'react';
import './payroll-report.css';
import { useOutletContext } from 'react-router-dom';

interface PayrollReportContext {
  payrollData: {
    invoiceNumber: string;
    date: string;
    name: string;
    address: string;
    bankAccount: string;
    sortCode: string;
    utrNumber: string;
    weeks: Array<{
      weekEnding: string;
      jobs: Array<{ jobName: string; amount: number }>;
    }>;
    subTotal: number;
    tax: number;
    total: number;
  };
}
interface JobItem {
  jobName: string;
  amount: number;
}
interface WeekData {
  weekEnding: string;
  jobs: JobItem[];
}

const PayrollReport: React.FC = () => {
  const context = useOutletContext<PayrollReportContext | undefined>();

  if (!context || !context.payrollData) {
    return <div>Error: Payroll data is unavailable.</div>;
  }

  const { payrollData } = context;

  return (
    <div className="invoice-container">
      <div className="top-section">
        <p><strong>INVOICE TO:</strong></p>
        <h2>DBD Services (UK) Ltd</h2>
      </div>
      <div className="yellow-banner">INVOICE</div>
      <div className="header-section">
        <div className="left-section">
          <div className="invoice-client-details">
            <p><strong>Name:</strong> <span style={{ paddingLeft: "25px" }}>{payrollData?.name}</span></p>
            <p><strong>Address:</strong> {payrollData?.address}</p>
            <p style={{ marginLeft: "145px" }}>{payrollData?.address.match(/[A-Z]/g)}</p>
          </div>
        </div>
        <div className="right-section">
          <table className="invoice-meta">
            <thead>
              <tr style={{ backgroundColor: "darkgray" }}>
                <th style={{ textAlign: "left", padding: "2px 5px" }}><strong>INVOICE No: </strong></th>
                <th>&nbsp; {payrollData.invoiceNumber} &nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr className="header-date">
                <td>
                  <strong>Date:</strong> {payrollData.date}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {payrollData.weeks.map((week: WeekData, index: number) => (
        <div key={index} className="week-section">
          <div className="week-content">
            <div style={{ width: "400px" }}>
              <div className="week-header">
                <p style={{ backgroundColor: "darkgray" }}><strong>W/Ending:</strong></p>
                <p style={{ backgroundColor: "yellow" }}>{week.weekEnding}</p>
              </div>
              <table className="job-table-one">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>Job Name</th>
                  </tr>
                </thead>
                <tbody>
                  {week.jobs.map((job, idx) => (
                    <tr key={idx}>
                      <td style={{ textAlign: "center", backgroundColor: "darkgray" }}>{job.jobName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <table className="job-table-two">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Total for each job</th>
                </tr>
              </thead>
              <tbody>
                {week.jobs.map((job, idx) => (
                  <tr key={idx}>
                    <td style={{ textAlign: "end", backgroundColor: "darkgray" }}>£{job.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <table className="footer-table">
          <tbody className="bank-details-table">
            <tr style={{ width: "400px", backgroundColor: "darkgray" }}>
              <td style={{ width: "30%" }}><strong>Bank Account No:</strong></td>
              <td style={{ backgroundColor: "white", textAlign: "center" }}>{payrollData.bankAccount}</td>
            </tr>
            <tr>
              <td style={{ width: "30%", backgroundColor: "darkgray" }}><strong>Sort code:</strong></td>
              <td style={{ backgroundColor: "white", textAlign: "center" }}>{payrollData.sortCode}</td>
            </tr>
          </tbody>
        </table>
        <table className="footer-table">
          <tbody className="totals-table">
            <tr>
              <td style={{ width: "40%", backgroundColor: "white" }}><strong>SUB TOTAL</strong>:</td>
              <td style={{ textAlign: "end", backgroundColor: "darkgray" }}>£{payrollData.subTotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td style={{ width: "40%", backgroundColor: "white" }}><strong>Less -20% Tax</strong>:</td>
              <td style={{ textAlign: "end", backgroundColor: "darkgray" }}>£{payrollData.tax.toFixed(2)}</td>
            </tr>
            <tr>
              <td style={{ width: "40%", backgroundColor: "white" }}><strong>TOTAL</strong>:</td>
              <td style={{ textAlign: "end", backgroundColor: "darkgray" }}>£{payrollData.total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <table className="footer-table">
        <tbody>
          <tr style={{ width: "400px" }}>
            <td style={{ width: "30%", backgroundColor: "darkgray" }}><strong>UTR No:</strong></td>
            <td style={{ backgroundColor: "white", textAlign: "center" }}>{payrollData.utrNumber}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PayrollReport;
