import React from 'react';
import WeeklyReport from '../components/specific/WeeklyReport/WeeklyReport';
import TwoWeeksReport from '../components/specific/TwoWeeksReport/TwoWeeksReport';

const Timesheet: React.FC = () => {
  const invoiceData = {
    invoiceNumber: "7",
    date: "23-Dec-2021",
    name: "Alan McAllister",
    address: "2 Woodford Road, WD171PA",
    bankAccount: "13297344",
    sortCode: "08-71-99",
    utrNumber: "22378482781",
    weeks: [
      {
        weekEnding: "20/12/2020",
        jobs: [
          { jobName: "Lazari", amount: 170 },
          { jobName: "Henrietta House", amount: 170 },
          { jobName: "Henrietta House", amount: 170 },
          { jobName: "O2 Arena", amount: 170 },
          { jobName: "Wembley Hospital", amount: 170 }
        ]
      },
      {
        weekEnding: "27/12/2020",
        jobs: [
          { jobName: "Wembley Hospital", amount: 170 },
          { jobName: "Wembley Hospital", amount: 170 },
          { jobName: "Henrietta House", amount: 170 },
          { jobName: "Henrietta House", amount: 170 },
          { jobName: "Henrietta House", amount: 170 },
          { jobName: "Henrietta House", amount: 255 },
          { jobName: "Henrietta House", amount: 255 }
        ]
      }
    ],
    subTotal: 2210,
    tax: 442,
    total: 1768,
  };

  return (
      <main>
        {/* <WeeklyReport /> */}
        <TwoWeeksReport {...invoiceData} />
      </main>
  );
};

export default Timesheet;
