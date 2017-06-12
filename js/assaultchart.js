   let color = d3.scale.ordinal()
           .range(["green","red"]);

                
   d3.json("output/assault.json", function(error, data) {
    data.forEach(function(d) {
       d.year=+d.year;
       d.arrested=+d.arrested;
       d.notarrested=+d.notarrested;
    });
color.domain(d3.keys(data[0]).filter(function(key) { return key !== "year"; }));


            data.sort(function(a,b){
                        return a.year - b.year;
                    });
                    let vis = d3.select("#visualisation"),
                        WIDTH = 750,
                        HEIGHT = 500,
                        MARGINS = {
                            top: 20,
                            right: 200,
                            bottom: 20,
                            left:60
                        },
                     xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([2001, 2016]),
                     yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([500, 25000]),
                        xAxis = d3.svg.axis()
                        .scale(xScale),
                        yAxis = d3.svg.axis()
                        .scale(yScale)
                        .orient("left");
                      vis.append("svg:g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
                        .call(xAxis);
                    vis.append("svg:g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
                        .call(yAxis);
               


                        let lineGen = d3.svg.line()
                        .x(function(d) {
                            return xScale(d.year);
                        })
                        .y(function(d) {
                            return yScale(d.arrested);
                        })
                        .interpolate("basis");
                    vis.append('svg:path')
                        .attr('d', lineGen(data))
                        .attr('stroke', 'green')
                        .attr('stroke-width', 2)
                        .attr('fill', 'none');
                        let lineGen = d3.svg.line()
                        .x(function(d) {
                            return xScale(d.year);
                        })
                        .y(function(d) {
                            return yScale(d.notarrested);
                        })
                        .interpolate("basis");
                         
                         vis.append('svg:path')
                        .attr('d', lineGen(data))
                        .attr('stroke', 'red')
                        .attr('stroke-width', 2)
                        .attr('fill', 'none');
                     
                    let legend = vis.selectAll(".legend")
                    .data(color.domain().slice().reverse())
                    .enter().append("g")
                    .attr("class", "legend")
                    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

                    legend.append("rect")
                    .attr("x", WIDTH - 18)
                    .attr("width", 18)
                    .attr("height", 18)
                    .style("fill", color);

                    legend.append("text")
                    .attr("x", WIDTH - 24)
                    .attr("y", 9)
                    .attr("dy", ".35em")
                    .style("text-anchor", "end")
                    .text(function(d) { return d; });
 
              });     