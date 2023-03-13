const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'

let baseTemp
let values = [];

let xScale
let yScale

let xAxis
let yAxis

const width = 1200;
const height = 600;
const padding = 60;

const svg = d3.select('svg');
const tooltip = d3.select('#tooltip');

const generateScales = () => {    
    const minYear = d3.min(values, item => item.year);
    
    const maxYear = d3.max(values, item => item.year);
    
    xScale = d3.scaleLinear()
    .domain([minYear, maxYear + 1])
    .range([padding, width - padding]);
    
    yScale = d3.scaleTime()
    .domain([new Date(0,0,0,0, 0, 0, 0), new Date(0,12,0,0,0,0,0)])
    .range([padding, height - padding]);
};

const drawCanvas = () => {
    svg.attr('width', width)
    svg.attr('height', height)
};

const drawCells = () => {
    svg.selectAll('rect')
    .data(values)
    .enter()
    .append('rect')
    .attr('class','cell')
    .attr('fill', (item) => {
        const variance = item.variance
        if(variance <= -1){
            return 'darkblue'
        }else if(variance <= 0){
            return 'lightblue'
        }else if(variance <= 1){
            return 'orange'
        }else{
            return 'darkred'
        }
    })
    .attr('data-year', item => item.year)
    .attr('data-month', item => item.month - 1)
    .attr('data-temp', item => baseTemp + item.variance)
    .attr('height', item => (height - (2 * padding)) / 12)
    .attr('y', item => yScale(new Date(0, item['month']-1, 0, 0, 0, 0, 0)))
    .attr('width', (item) => {
        const minYear = d3.min(values, item => item.year)
        
        const maxYear = d3.max(values, item => item.year)
        
        const yearCount = maxYear - minYear
        
        return (width - (2 * padding)) / yearCount
    })
    .attr('x', item => xScale(item.year))
    .on('mouseover', (event, item) => {
        tooltip.transition()
        .style('visibility', 'visible')
        .style('left', event.pageX + 'px')
        .style('top', event.pageY - 10 + 'px')
        
        const monthNames = [
            "January", 
            "February", 
            "March", 
            "April", 
            "May", 
            "June",
            "July", 
            "August", 
            "September", 
            "October", 
            "November", 
            "December"
        ]
    
    // tooltip.text(item.year + ' ' + monthNames[item.month -1 ] + ' : ' + item.variance + ' °C')
    tooltip.text(`${item.year} ${monthNames[item.month -1 ]}: ${item.variance} °C (${baseTemp + item.variance} °C)`)
    
    tooltip.attr('data-year', item.year)
    })
    .on('mouseout', (event, item) => {
        tooltip.transition()
        .style('visibility', 'hidden')
    });
};

const generateAxes = () => {
    const xAxis = d3.axisBottom(xScale)
    .tickFormat(d3.format('d'));
    
    const yAxis = d3.axisLeft(yScale)
    .tickFormat(d3.timeFormat('%B'));
    
    svg.append('g')
    .call(xAxis)
    .attr('id','x-axis')
    .attr('transform', 'translate(0, ' + (height-padding) + ')');
    
    svg.append('g')
    .call(yAxis)
    .attr('id', 'y-axis')
    .attr('transform', 'translate(' + padding + ', 0)');
};

d3.json(url)
.then(data => {
    baseTemp = data.baseTemperature;
    values = data.monthlyVariance;
    drawCanvas();
    generateScales();
    drawCells();
    generateAxes();
});
