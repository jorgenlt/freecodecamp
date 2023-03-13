const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

const width = 800;
const height = 600;
const padding = 40;

let values = [];
let xScale
let yScale


const svg = d3.select('svg')

const drawCanvas = () => {
    svg.attr('width', width);
    svg.attr('height', height);
};

let generateScales = () => {
    xScale = d3.scaleLinear()
                .domain([d3.min(values, item => item.Year - 1), d3.max(values, item => item.Year + 2)])
                .range([padding, width - padding]);

    yScale = d3.scaleTime()
                .domain([d3.min(values, item => new Date((item.Seconds) * 1000 - 10000)), d3.max(values, item => new Date(item.Seconds * 1000 + 10000))])
                .range([padding ,height - padding])

};

let drawPoints = () => {
    svg.selectAll('circle')
        .data(values)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('r', 5)
        .attr('data-xvalue', (item) => item.Year)
        .attr('data-yvalue', (item) => new Date(item.Seconds * 1000))
        .attr('cx', item => xScale(item.Year))
        .attr('cy', item => yScale(new Date(item.Seconds * 1000)))
        .attr('fill', item => item.Doping != "" ? 'darkred' : 'darkgreen')
        .on('mouseover', (event, item) => {
            tooltip.style('opacity', 0.9)
                    .attr('data-year', item.Year)
                    .style('left', event.pageX + 'px')
                    .style('top', event.pageY - 10 + 'px')
                    .html(
                        item.Name +
                        ': ' +
                        item.Nationality +
                        '<br/>' +
                        'Year: ' +
                        item.Year +
                        ', Time: ' +
                        item.Time +
                        (item.Doping ? '<br/><br/>' + item.Doping : '')
                    )
        })
        .on('mouseout', function() {
            tooltip.style('opacity', 0);
        });
};

let generateAxes = () => {
    let xAxis = d3.axisBottom(xScale)
                    .tickFormat(d3.format('d'));

    let yAxis = d3.axisLeft(yScale)
                    .tickFormat(d3.timeFormat('%M:%S'))

    svg.append('g')
       .call(xAxis)
       .attr('id', 'x-axis')
       .attr('transform', 'translate(0, ' + (height - padding) + ')');

    svg.append('g')
       .call(yAxis)
       .attr('id', 'y-axis')
       .attr('transform', 'translate(' + padding + ', 0)')
};

let tooltip = d3.select('#scatterplot-graph')
                .append('div')
                .attr('class', 'tooltip')
                .attr('id', 'tooltip')
                .style('opacity', 0);

d3.json(url)
  .then(data => {
    values = data
     
    drawCanvas();
    generateScales();
    drawPoints();
    generateAxes();
});