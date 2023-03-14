const movieDataURL = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json';

let movieData

const canvas = d3.select('#canvas');
const tooltip = d3.select('#tooltip');

const drawTreeMap = () => {
    const hierarchy = d3.hierarchy(movieData, node => node.children)
                        .sum(node => node.value)
                        .sort((node1, node2) => node2.value - node1.value);

    const createTreeMap = d3.treemap()
                            .size([1000, 600]);

    createTreeMap(hierarchy);

    const movieTiles = hierarchy.leaves();

    const block = canvas.selectAll('g')
                        .data(movieTiles)
                        .enter()
                        .append('g')
                        .attr('transform', (movie) => 'translate(' + movie.x0 + ', ' + movie.y0 + ')');

    block.append('rect')
            .attr('class', 'tile')
            .attr('fill', (movie) => {
                let category = movie['data']['category']
                if(category === 'Action'){
                    return '#0077b6'
                }else if(category === 'Drama'){
                    return '#0096c7'
                }else if(category === 'Adventure'){
                    return '#00b4d8'
                }else if(category === 'Family'){
                    return '#48cae4'
                }else if(category === 'Animation'){
                    return '#90e0ef'
                }else if(category === 'Comedy'){
                    return '#ade8f4'
                }else if(category === 'Biography'){
                    return '#caf0f8'
                }
            })
            .attr('data-name', movie => movie.data.name)
            .attr('data-category', movie => movie.data.category)
            .attr('data-value', movie => movie.data.value)
            .attr('width', movie => movie.x1 - movie.x0)
            .attr('height', movie => movie.y1 - movie.y0)
            .on('mouseover', (event, movie) => {
                tooltip.transition()
                .style('visibility', 'visible')
                .style('left', event.pageX + 'px')
                .style('top', event.pageY - 10 + 'px')
                .attr('data-value', movie.data.value)

                tooltip.html(
                    '<p>' + movie.data.name + '</p>' +
                    '<p>' + Number(movie.data.value).toLocaleString('en-US', {style: 'currency', currency: 'USD', maximumFractionDigits: 0}) + '</p>'
                )
            })
            .on('mouseout', (event, movie) => {
                tooltip.transition()
                .style('visibility', 'hidden')
            });

    block.append('text')
            .text(movie => movie.data.name)
            .attr('x', 5)
            .attr('y', 20);
}

d3.json(movieDataURL).then(
    (data, error) => {
        if(error) {
            console.log(error);
        } else {
            movieData = data;
            drawTreeMap();
        }
    }
)