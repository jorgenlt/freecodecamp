const countyURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';
const educationURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';

let countyData
let educationData

const canvas = d3.select('#canvas')
const tooltip = d3.select('#tooltip');

const drawMap = () => {
    canvas.selectAll('path')
            .data(countyData)
            .enter()
            .append('path')
            .attr('d', d3.geoPath())
            .attr('class', 'county')
            .attr('fill', (countyDataItem) => {
                const id = countyDataItem.id;
                const county = educationData.find(item => item.fips === id);
                const percentage = county.bachelorsOrHigher;
                if(percentage < 15) {
                    return 'darkred'
                } else if(percentage <= 30) {
                    return 'orange'
                } else if(percentage <= 45) {
                    return 'lightgreen'
                }else {
                    return 'darkgreen'
                }
            })
            .attr('data-fips', countyDataItem => countyDataItem.id)
            .attr('data-education', (countyDataItem) => {
                const id = countyDataItem.id;
                const county = educationData.find(item => item.fips === id);
                const percentage = county.bachelorsOrHigher;
                return percentage;
            })
            .on('mouseover', (event, countyDataItem) => {
                tooltip.transition()
                .style('visibility', 'visible')
                .style('left', event.pageX + 'px')
                .style('top', event.pageY - 10 + 'px')
                const id = countyDataItem.id;
                const county = educationData.find(item => item.fips === id);
                
            tooltip.text(`${county.area_name}, ${county.state}: ${county.bachelorsOrHigher}%`)
            
            tooltip.attr('data-education', county.bachelorsOrHigher)
            })
            .on('mouseout', (event, countyDataItem) => {
                tooltip.transition()
                .style('visibility', 'hidden')
            });
};

d3.json(countyURL).then(
    (data, error) => {
        if(error) {
            console.log(error);
        } else {
            countyData = topojson.feature(data, data.objects.counties).features;
            console.log(countyData);
            d3.json(educationURL).then(
                (data, error) => {
                    if(error) {
                        console.log(error);
                    } else {
                        educationData = data;
                        console.log(educationData);
                        drawMap();
                    }
                }
            )
        };
    }
);
