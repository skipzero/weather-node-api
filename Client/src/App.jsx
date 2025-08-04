import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const WeatherBarChart = () => {
  const [data, setData] = useState([]);
  const svgRef = useRef();

  useEffect(() => {
    fetch('https://angerbunny.com/weather')
      .then(res => res.json())
      .then(json => {
        return json.map((d => {
          return {
            temp: d.temp.tempf,
            date: new Date(d.date),
          }
        }))
      })
      .then(setData)
      .catch(console.error);
  }, []);

  useEffect(() => {
    console.log(data)
    if (!data.length) return;

    const svg = d3.select(svgRef.current);
    const width = 900;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    svg.selectAll('*').remove(); // clear previous renders

    const x = d3.scaleBand()
      .domain(data.map(d => d.day))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.temp)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = g =>
      g.attr("transform", `translate(0,${height - margin.bottom})`)
       .call(d3.axisBottom(x));

    const yAxis = g =>
      g.attr("transform", `translate(${margin.left},0)`)
       .call(d3.axisLeft(y));

    svg.append("g").call(xAxis);
    svg.append("g").call(yAxis);

    svg.selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.date))
      .attr("y", d => y(d.temp))
      .attr("height", d => y(0) - y(d.temp))
      .attr("width", x.bandwidth())
      // .attr("fill", "#69b3a2");

  }, [data]);

  return (
    <div>
      <h2>Weekly Temperatures</h2>
      <svg ref={svgRef} width={600} height={300}></svg>
    </div>
  );
};

export default WeatherBarChart;






// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';
// 
// const TemperatureChart = () => {
//   const [data, setData] = useState([]);
//   const chartRef = useRef();
// 
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch('https://angerbunny.com/weather');
//         const json = await res.json();
// 
//         // Adjust this mapping based on actual data structure
//         const formattedData = json.map((d,i) => {
//           let ret = []
//           if (d.temp && d.date) {
//             console.log('DATE & TEMP:')
//             ret.push({
//               time: new Date(d.date),
//               temp: d.temp.tempf,
//             });
//           }
//           console.log('Invalid data point:', d);
//           return ret;          
//           });
// 
//         setData(formattedData);
//       } catch (err) {
//         console.error('Error fetching data:', err);
//       }
//     };
// 
//     fetchData();
//   }, []);
// 
//   useEffect(() => {
//     if (data.length === 0) return;
// 
//     // Set up dimensions
//     const width = 600;
//     const height = 300;
//     const margin = { top: 20, right: 30, bottom: 30, left: 40 };
// 
//     // Clear any existing chart
//     d3.select(chartRef.current).selectAll('*').remove();
// 
//     const svg = d3
//       .select(chartRef.current)
//       .append('svg')
//       .attr('width', width)
//       .attr('height', height);
// 
//     const x = d3
//       .scaleTime()
//       .domain(d3.extent(data, d => d.time))
//       .range([margin.left, width - margin.right]);
// 
//     const y = d3
//       .scaleLinear()
//       .domain([d3.min(data, d => d.temp) - 1, d3.max(data, d => d.temp) + 1])
//       .range([height - margin.bottom, margin.top]);
// debugger
//     const line = d3
//       .line()
//       .x(d => x(d.time))
//       .y(d => y(d.temp));
// debugger
//     svg
//       .append('g')
//       .attr('transform', `translate(0,${height - margin.bottom})`)
//       .call(d3.axisBottom(x).ticks(6).tickFormat(d3.timeFormat('%H:%M')));
// 
//     svg
//       .append('g')
//       .attr('transform', `translate(${margin.left},0)`)
//       .call(d3.axisLeft(y));
// 
//     svg
//       .append('path')
//       .datum(data)
//       .attr('fill', 'none')
//       .attr('stroke', '#ff6600')
//       .attr('stroke-width', 2)
//       .attr('d', line);
// 
//   }, [data]);
// 
//   return <div ref={chartRef}></div>;
// };
// 
// export default TemperatureChart;
