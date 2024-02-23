import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const ProgressRadialChart = ({ progress }) => {
  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current).selectAll('svg').remove();

    const width = 200;
    const height = 200;
    const thickness = 10;
    const strokeWidth = 1;

    const radius = Math.min(width, height) / 2 - strokeWidth; // Subtract stroke width from radius

    const arc = d3.arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius)
      .startAngle(0); // Explicitly set startAngle for clarity

    const svg = d3.select(ref.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const fullCircle = svg.append('path')
        .datum({ endAngle: Math.PI * 2 })
        .style('fill', '#dcdcdc')
        .attr('d', arc)
        // .attr('stroke', 'black')
        // .attr('stroke-width', 1);
        

    const endAngleCalc = ((progress || 0) / 100) * Math.PI * 2;

    const foreground = svg.append('path')
      .datum({ endAngle: endAngleCalc })
      .style('fill', '#22C55E')
      .attr('d', arc)
      .attr('stroke', 'black')
      .attr('stroke-width', 1);

    const text = svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .style('font-size', '20px')
    
      text.text(`Complete: ${progress}%`)
  }, [progress]);

  return <div className={`p-5`} ref={ref}></div>;
};
