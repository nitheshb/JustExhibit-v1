import React, { useEffect, useState } from 'react';
import BubbleChart from '@weknow/react-bubble-chart-d3';

const BubbleChartComponent = () => {
  const data = [
    { label: 'Desktop', value: 20, color: '#ff6347' }, 
    { label: 'Mobile', value: 30, color: '#4682b4' }, 
    { label: 'Others', value: 40, color: '#32cd32' }, 
  ];
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
  
        const data = [
          { label: 'Desktop', value: 20, color: '#ff6347' },
          { label: 'Mobile', value: 30, color: '#4682b4' },
          { label: 'Others', value: 40, color: '#32cd32' },
        ];

        if (isMounted) {
          setChartData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Cleanup function to prevent state update on unmounted component
    };
  }, []);
  return (
    <div style={{ width: '600px', height: '400px' }}>
      <BubbleChart
        graph={{
          zoom: 1.1,
          offsetX: -0.05,
          offsetY: -0.01,
        }}
        width={600}
        height={400}
        padding={0}
        showLegend={false}
        valueFont={{
          family: 'Arial',
          size: 12,
          color: '#fff',
          weight: 'bold',
        }}
        labelFont={{
          family: 'Arial',
          size: 14,
          color: '#fff',
          weight: 'bold',
        }}
        data={chartData}
      />
    </div>
  );
};

export default BubbleChartComponent;
