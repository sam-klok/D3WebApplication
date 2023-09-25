var Page = (function () {

    var barData = [
          { letter: "A", "frequency": 0.08167 }
        , { letter: "B", "frequency": 0.01492 }
        , { letter: "C", "frequency": 0.02782 }
        , { letter: "D", "frequency": 0.04253 }
        , { letter: "E", "frequency": 0.12702 }
        , { letter: "F", "frequency": 0.02288 }
        , { letter: "G", "frequency": 0.02015 }
        , { letter: "H", "frequency": 0.06094 }
        , { letter: "I", "frequency": 0.06966 }
        , { letter: "J", "frequency": 0.00153 }
        , { letter: "K", "frequency": 0.00772 }
        , { letter: "L", "frequency": 0.04025 }
        , { letter: "M", "frequency": 0.02406 }
        , { letter: "N", "frequency": 0.06749 }
        , { letter: "O", "frequency": 0.07507 }
        , { letter: "P", "frequency": 0.01929 }
        , { letter: "Q", "frequency": 0.00095 }
        , { letter: "R", "frequency": 0.05987 }
        , { letter: "S", "frequency": 0.06327 }
        , { letter: "T", "frequency": 0.09056 }
        , { letter: "U", "frequency": 0.02758 }
        , { letter: "V", "frequency": 0.00978 }
        , { letter: "W", "frequency": 0.0236 }
        , { letter: "X", "frequency": 0.0015 }
        , { letter: "Y", "frequency": 0.01974 }
        , { letter: "Z", "frequency": 0.00074 }
    ];

    var unemploymentData = [
          { id: 1001, state: "Alabama", county: "Autauga County", rate: 5.1 }
        , { id: 1003, state: "Alabama", county: "Baldwin County", rate: 4.9 }
        , { id: 1005, state: "Alabama", county: "Barbour County", rate: 8.6 }
        , { id: 1007, state: "Alabama", county: "Bibb County", rate: 6.2 }
        , { id: 1009, state: "Alabama", county: "Blount County", rate: 5.1 }
        , { id: 1011, state: "Alabama", county: "Bullock County", rate: 7.1 }
        , { id: 1013, state: "Alabama", county: "Butler County", rate: 6.7 }
        , { id: 1015, state: "Alabama", county: "Calhoun County", rate: 6.1 }
        , { id: 1017, state: "Alabama", county: "Chambers County", rate: 5 }
        , { id: 1019, state: "Alabama", county: "Cherokee County", rate: 5 }
        , { id: 1021, state: "Alabama", county: "Chilton County", rate: 5.2 }
        , { id: 1023, state: "Alabama", county: "Choctaw County", rate: 7.9 }
        , { id: 1025, state: "Alabama", county: "Clarke County", rate: 11.1 }
        , { id: 1027, state: "Alabama", county: "Clay County", rate: 5.9 }
        , { id: 1029, state: "Alabama", county: "Cleburne County", rate: 5.5 }
        , { id: 1031, state: "Alabama", county: "Coffee County", rate: 5.6 }
        , { id: 1033, state: "Alabama", county: "Colbert County", rate: 6.5 }
        , { id: 1035, state: "Alabama", county: "Conecuh County", rate: 7.7 }
        , { id: 1037, state: "Alabama", county: "Coosa County", rate: 5.7 }
        , { id: 1039, state: "Alabama", county: "Covington County", rate: 6.7 }
        , { id: 1041, state: "Alabama", county: "Crenshaw County", rate: 5.7 }
        , { id: 1043, state: "Alabama", county: "Cullman County", rate: 4.8 }
        , { id: 1045, state: "Alabama", county: "Dale County", rate: 5.6 }
        , { id: 1047, state: "Alabama", county: "Dallas County", rate: 9.5 }
        , { id: 1049, state: "Alabama", county: "DeKalb County", rate: 5.7 }
        , { id: 1051, state: "Alabama", county: "Elmore County", rate: 4.7 }
        , { id: 1053, state: "Alabama", county: "Escambia County", rate: 6.3 }
        , { id: 1055, state: "Alabama", county: "Etowah County", rate: 5.7 }
        , { id: 1057, state: "Alabama", county: "Fayette County", rate: 6.6 }
        , { id: 1059, state: "Alabama", county: "Franklin County", rate: 5.5 }
        , { id: 1061, state: "Alabama", county: "Geneva County", rate: 5.4 }
        , { id: 1063, state: "Alabama", county: "Greene County", rate: 9.3 }
        , { id: 1065, state: "Alabama", county: "Hale County", rate: 7.6 }
        , { id: 1067, state: "Alabama", county: "Henry County", rate: 6.3 }
        , { id: 1069, state: "Alabama", county: "Houston County", rate: 5.6 }
        , { id: 1071, state: "Alabama", county: "Jackson County", rate: 5.9 }
        , { id: 1073, state: "Alabama", county: "Jefferson County", rate: 5.5 }
        , { id: 1075, state: "Alabama", county: "Lamar County", rate: 5.2 }
        , { id: 1077, state: "Alabama", county: "Lauderdale County", rate: 6 }
        , { id: 1079, state: "Alabama", county: "Lawrence County", rate: 6.4 }
    ];

    function genGraph() {
        function simpleBarGraph() {

            // Declare the chart dimensions and margins.
            const width = 928;
            const height = 500;
            const marginTop = 30;
            const marginRight = 0;
            const marginBottom = 30;
            const marginLeft = 40;

            // Declare the x (horizontal position) scale.
            const x = d3.scaleBand()
                .domain(d3.groupSort(barData, ([d]) => -d.frequency, (d) => d.letter)) // descending frequency
                .range([marginLeft, width - marginRight])
                .padding(0.1);

            // Declare the y (vertical position) scale.
            const y = d3.scaleLinear()
                .domain([0, d3.max(barData, (d) => d.frequency)])
                .range([height - marginBottom, marginTop]);

            // Create the SVG container.
            const svg = d3.create("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("viewBox", [0, 0, width, height])
                .attr("style", "max-width: 100%; height: auto;");

            // Add a rect for each bar.
            svg.append("g")
                .attr("fill", "steelblue")
                .selectAll()
                .data(barData)
                .join("rect")
                .attr("x", (d) => x(d.letter))
                .attr("y", (d) => y(d.frequency))
                .attr("height", (d) => y(0) - y(d.frequency))
                .attr("width", x.bandwidth());

            // Add the x-axis and label.
            svg.append("g")
                .attr("transform", `translate(0,${height - marginBottom})`)
                .call(d3.axisBottom(x).tickSizeOuter(0));

            // Add the y-axis and label, and remove the domain line.
            svg.append("g")
                .attr("transform", `translate(${marginLeft},0)`)
                .call(d3.axisLeft(y).tickFormat((y) => (y * 100).toFixed()))
                .call(g => g.select(".domain").remove())
                .call(g => g.append("text")
                    .attr("x", -marginLeft)
                    .attr("y", 10)
                    .attr("fill", "currentColor")
                    .attr("text-anchor", "start")
                    .text("↑ Frequency (%)"));

            // Return the SVG element.
            return svg.node();
        }

        container.append(simpleBarGraph()); // Append the SVG element.
    }

    function genHistogram() {

        // Declare the chart dimensions and margins.
        const width = 960;
        const height = 500;
        const marginTop = 20;
        const marginRight = 20;
        const marginBottom = 30;
        const marginLeft = 40;

        // Bin the data.
        const bins = d3.bin()
            .thresholds(40)
            .value((d) => d.rate)
            (unemploymentData);

        // Declare the x (horizontal position) scale.
        const x = d3.scaleLinear()
            .domain([bins[0].x0, bins[bins.length - 1].x1])
            .range([marginLeft, width - marginRight]);

        // Declare the y (vertical position) scale.
        const y = d3.scaleLinear()
            .domain([0, d3.max(bins, (d) => d.length)])
            .range([height - marginBottom, marginTop]);

        // Create the SVG container.
        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto;");

        // Add a rect for each bin.
        svg.append("g")
            .attr("fill", "steelblue")
            .selectAll()
            .data(bins)
            .join("rect")
            .attr("x", (d) => x(d.x0) + 1)
            .attr("width", (d) => x(d.x1) - x(d.x0) - 1)
            .attr("y", (d) => y(d.length))
            .attr("height", (d) => y(0) - y(d.length));

        // Add the x-axis and label.
        svg.append("g")
            .attr("transform", `translate(0,${height - marginBottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
            .call((g) => g.append("text")
                .attr("x", width)
                .attr("y", marginBottom - 4)
                .attr("fill", "currentColor")
                .attr("text-anchor", "end")
                .text("Unemployment rate (%) →"));

        // Add the y-axis and label, and remove the domain line.
        svg.append("g")
            .attr("transform", `translate(${marginLeft},0)`)
            .call(d3.axisLeft(y).ticks(height / 40))
            .call((g) => g.select(".domain").remove())
            .call((g) => g.append("text")
                .attr("x", -marginLeft)
                .attr("y", 10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("↑ Frequency (no. of counties)"));

        
        container2.append(svg.node());
    }

    return {
        Init: function () {
            genGraph();
            genHistogram();
        }
    };
})(); // so called "dog balls"...

$(function () {
    Page.Init();
});