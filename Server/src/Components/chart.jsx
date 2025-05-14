import react, {useRef, useEffect} from 'react';
import * as d3 from 'd3';
const { select, scaleBand, scaleLinear, max, axisBottom, axisLeft } = d3;


const Chart = ({data, width=600, height=400}) => {

  const svgRef = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous content

    const margin = {top: 20, right: 30, bottom: 40, left: 40};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = scaleBand()
      .domain(data.map(d => d.date))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = scaleLinear()
      .domain([0, max(data, d => d.temperature)])
      .nice()
      .range([innerHeight, 0]);

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(axisBottom(xScale));

    g.append("g")
      .attr("class", "y-axis")
      .call(axisLeft(yScale));

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xScale(d.date))
        .attr("y", d => yScale(d.temperature))
        .attr("width", xScale.bandwidth())
        .attr("height", d => innerHeight - yScale(d.temperature));
  }, [data, width, height]);

  return (
    <svg ref={svgRef} width={width} height={height}></svg>
  );
}

export default Chart;