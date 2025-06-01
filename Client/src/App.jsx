import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const TemperatureChart = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://angerbunny.com/weather');
        const json = await res.json();
        const test = json.map((d, i) => {
          console.log(i,d.temp.tempf)

          return {
            date: d.date,
            temp: d.temp.tempf, // Adjust based on actual data structure
            // If the data structure is different, adjust accordingly
          }
        })
        console.log(test);
        // Adjust this mapping based on actual data structure
        const formattedData = test.map(d => ({
          
          time: new Date(d.date),
          temperature: d.temp,
        }));

        setData(formattedData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    // Set up dimensions
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    // Clear any existing chart
    d3.select(chartRef.current).selectAll('*').remove();

    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const x = d3
      .scaleTime()
      .domain(d3.extent(data, d => d.time))
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([d3.min(data, d => d.temperature) - 1, d3.max(data, d => d.temperature) + 1])
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x(d => x(d.time))
      .y(d => y(d.temperature));

    svg
      .append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(6).tickFormat(d3.timeFormat('%H:%M')));

    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#ff6600')
      .attr('stroke-width', 2)
      .attr('d', line);

  }, [data]);

  return <div ref={chartRef}></div>;
};

export default TemperatureChart;
