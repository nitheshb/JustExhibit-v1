import React, { useEffect, useState } from 'react';

import { X, Add, Remove } from '@mui/icons-material';

import { gretProjectionSum } from 'src/context/dbQueryFirebase';
import { useAuth } from 'src/context/firebase-auth-context';
import SkeletonLoaderPage from 'src/pages/SkeletonLoader/skeletonLoaderPage';
import TableSkeleton from './_mock/comps/table/table-skeleton';

const capitalizeFirstLetter = (str) => {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
};

const getDateForWeek = (weekNumber) => {
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const firstDayOfWeek = new Date(firstDayOfMonth);
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() + (weekNumber - 1) * 7);

  const day = String(firstDayOfWeek.getDate()).padStart(2, '0');
  const month = String(firstDayOfWeek.getMonth() + 1).padStart(2, '0');
  const year = firstDayOfWeek.getFullYear();

  return `${day}-${month}-${year}`;
};

const getNextMonths = (startMonthOffset, monthCount) => {
  const months = [];
  const today = new Date();
  today.setMonth(today.getMonth() + startMonthOffset);

  for (let i = 0; i < monthCount; i++) {
    const month = today.toLocaleString('default', { month: 'long' });
    const year = today.getFullYear();
    months.push({ name: `${month} ${year}`, count: today.getMonth() + 1, currentYear: year });
    today.setMonth(today.getMonth() + 1);
  }

  return months;
};

const reportData = [
  {
    id: 1,
    eventName: 'Eco stone',
    soldUnits: 3,
    totalAmount: 1001010,
    monthly: {
      april: 25000,
      may: 25000,
      june: 10925500,
    },
    weekly: {
      week1: 5000,
      week2: 6000,
      week3: 7000,
      week4: 8000,
      week5: 9000,
    },
    oldDue: 150000,
  },
  {
    id: 2,
    eventName: 'green gardens',
    soldUnits: 5,
    totalAmount: 2002020,
    monthly: {
      april: 35000,
      may: 45000,
      june: 11925500,
    },
    weekly: {
      week1: 7000,
      week2: 8000,
      week3: 9000,
      week4: 10000,
      week5: 11000,
    },
    oldDue: 200000,
  },
];

const CrmProjectionReport = ({ projects }) => {
  const { user } = useAuth();
  const { orgId } = user;

  const [filter, setFilter] = useState('');
  const [dataView, setDataView] = useState('monthly');
  const [monthCount, setMonthCount] = useState(3);
  const [startMonthOffset, setStartMonthOffset] = useState(0);
  const [monthsA, setMonthsA] = useState(getNextMonths(startMonthOffset, monthCount));
  const [projectAValues, setProjectWithValues] = useState([]);
  const [loader, setLoaderIcon] = useState(false);

  useEffect(() => {
    setMonthsA(getNextMonths(startMonthOffset, monthCount));
  }, [monthCount, startMonthOffset]);

  useEffect(() => {
    calMonthlyValueNew(projects);
  }, [projects, monthsA]);

  const handleIncreaseMonth = () => {
    setMonthCount((prevCount) => prevCount + 1);
  };

  const handleDecreaseMonth = () => {
    setStartMonthOffset((prevOffset) => prevOffset - 1);
  };

  const filteredData = reportData.filter((item) => {
    return (
      (!filter || item.soldUnits === parseInt(filter)) &&
      (dataView === 'monthly' || dataView === 'weekly')
    );
  });

  const handleChangeView = (view) => {
    setDataView(view);
  };

  const calculateTotal = (data, key) => {
    return data.reduce((acc, item) => {
      return acc + (item[key] || 0);
    }, 0);
  };

  const totalSoldSummary = calculateTotal(projects, 'soldUnitCount');

  const calMonthlyValueNew = async (projects) => {
    try {
      setLoaderIcon(true);
      const insideValues = [];
      for (const projectData of projects) {
        const newProjectData = { ...projectData };
        const projectMonthArray = [];

        await Promise.all(
          monthsA.map(async (month) => {
            const payload = {
              pId: projectData.uid,
              monthNo: month.count,
              currentYear: month.currentYear,
            };

            const totalReceivableValue = await gretProjectionSum(orgId, payload);
            const updatedMonth = { ...month, receive: totalReceivableValue };

            projectMonthArray.push(updatedMonth);
          })
        );

        newProjectData.months = projectMonthArray;
        insideValues.push(newProjectData);
      }

      setProjectWithValues(insideValues);
    } catch (error) {
      console.error('Error calculating monthly values:', error);
    } finally {
      setLoaderIcon(false);
    }
  };

  const calMonthlyValue = (pId, monthNo, currentYear) => {
    const data = { pId, monthNo, currentYear };

    let totalReceivableValue = 0;

    gretProjectionSum(orgId, data)
      .then((payload) => {
        totalReceivableValue = payload;
        console.log(
          'Total receivable stored in variable:',
          totalReceivableValue
        );
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    return totalReceivableValue;
  };

  return (
    <div className="p-4 m-1 bg-white rounded-lg">
      <div className="flex justify-between">
        <div>
          <h2 className="mb-4 text-lg font-semibold text-black leading-light">
            CRM Projection Report
          </h2>
        </div>


        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">

          </label>
          <select
            id="view"
            className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={dataView}
            onChange={(e) => handleChangeView(e.target.value)}
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value=''>Anually</option>
            <option value=''>Quarterly</option>
            <option value=''>Halferly</option>
          </select>
        </div> */}

        <div className="flex mb-2 space-x-2">
          <button onClick={handleDecreaseMonth} className="flex items-center space-x-2  bg-gray-200 text-gray-800 px-4 py-2 rounded">
            <Remove /> <span>Previous Month</span>
          </button>
          <button onClick={handleIncreaseMonth} className="flex items-center space-x-2  bg-gray-200 text-gray-800 px-4 py-2 rounded">
            <Add /> <span>Next Month</span>
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white border border-black">
        <thead>
          <tr
            className={
              dataView === 'monthly'
                ? 'bg-orange-200 text-gray-600 text-sm leading-normal border border-black'
                : 'bg-green-200 text-gray-600 text-sm leading-normal border border-black'
            }
          >
            <th
              className="py-3 px-6 text-center border border-black"
              colSpan="1"
            ></th>
            <th
              className="py-3 px-6 text-center border border-black"
              colSpan="1"
            ></th>
            <th
              className="py-3 px-6 text-center border border-black"
              colSpan="1"
            ></th>
            {dataView === 'weekly' && (
              <th
                className="py-3 px-6 text-center border border-black"
                colSpan="4"
              >
                Weekly
              </th>
            )}
            {dataView === 'monthly' && (
              <th
                className="py-3 px-6 text-center border border-black"
                colSpan="4"
              >
                Monthly
              </th>
            )}
          </tr>
          <tr className="bg-blue-200 text-gray-600 text-sm leading-normal">
            <th className="py-3 px-3 text-left border border-black">
              Event Name
            </th>
            <th className="py-3 px-6 text-left border border-black">
              Sold Stalls
            </th>
            <th className="py-3 px-6 text-right border border-black">
              Total Amount
            </th>
            {dataView === 'monthly' ? (
              <>
                {monthsA.map((month, i) => {
                  return (
                    <th
                      key={i}
                      className="py-3 px-6 text-right border border-black"
                    >
                      {month?.name}
                    </th>
                  );
                })}
              </>
            ) : (
              <>
                <th className="py-3 px-6 text-right border border-black">
                  Week 1 <br /> ({getDateForWeek(1)})
                </th>
                <th className="py-3 px-6 text-right border border-black">
                  Week 2 <br /> ({getDateForWeek(2)})
                </th>
                <th className="py-3 px-6 text-right border border-black">
                  Week 3 <br /> ({getDateForWeek(3)})
                </th>
                <th className="py-3 px-6 text-right border border-black">
                  Week 4 <br /> ({getDateForWeek(4)})
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {/* <tr className="bg-gray-100">
            <td
              colSpan={dataView === 'monthly' ? 7 : 6}
              className="border border-black"
            ></td>
          </tr> */}

          {loader && <TableSkeleton rows={3} columns={7} />}
          {projectAValues?.map((data, index) => {
            const monthlyData = data?.monthly;
            let totalReceived = 0;
            let totalOutstanding = 0;
            let week1 = data?.weekly?.week1;
            let week2 = data?.weekly?.week2;
            let week3 = data?.weekly?.week3;
            let week4 = data?.weekly?.week4;

            const getMonthlyValues = (data, dataView) => {
              const monthly = data.monthly;
              const weekly = data.weekly;
              const total = 0;
              if (dataView === 'weekly') {
                return weekly?.week1 + weekly?.week2 + weekly?.week3 + weekly?.week4;
              } else {
                return monthly?.april + monthly?.may + monthly?.june;
              }
            };

            if (dataView === 'weekly') {
              totalReceived = week1 + week2 + week3 + week4;
              totalOutstanding = data?.totalAmount - totalReceived - data?.oldDue;
            } else {
              totalReceived = getMonthlyValues(data, 'monthly');
              totalOutstanding = data?.totalAmount - totalReceived - data?.oldDue;
            }
            const monthData = () => {
              if (dataView === 'monthly') {
                return (
                  <>
                    {data?.months?.map((month, i) => {
                      return (
                        <td
                          key={i}
                          className="py-3 px-6 text-right border border-black"
                        >
                          {`${month?.receive?.toLocaleString('en-IN')}`}
                        </td>
                      );
                    })}
                  </>
                );
              } else {
                return (
                  <>
                    <td className="py-3 px-6 text-right border border-black">
                      {data?.weekly?.week1.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-6 text-right border border-black">
                      {data?.weekly?.week2.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-6 text-right border border-black">
                      {data?.weekly?.week3.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-6 text-right border border-black">
                      {data?.weekly?.week4.toLocaleString('en-IN')}
                    </td>
                  </>
                );
              }
            };

            return (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap border border-black">
                  {capitalizeFirstLetter(data?.eventName)}
                </td>
                <td className="py-3 px-6 pr-10 text-right border border-black">
                  {data?.soldUnitCount?.toLocaleString('en-IN')}
                </td>
                <td className="py-3 px-6  border text-right border-black">
                  {data?.months
                    ?.reduce((accumulator, currentValue) => {
                      return accumulator + (currentValue?.receive || 0);
                    }, 0)
                    ?.toLocaleString('en-IN')}
                </td>
                {monthData()}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CrmProjectionReport;