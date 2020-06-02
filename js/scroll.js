let scroller = scrollama();

// dimensions svg
let svgWidth = window.innerWidth;
let svgHeight = window.innerHeight;
let svgPadding = { x: 0, y: 20 };

// durée transitions d3
let transition = 2000;

// données
let womenDataUrl = "/projet-cnc/data/data-women.csv";
let menDataUrl = "/projet-cnc/data/data-men.csv";
let dataUrl2018 = "/projet-cnc/data/data-2018.csv";
let dataPerYearUrl = "/projet-cnc/data/data-per-year-2.csv";

// préparation lancement automatique des fonctions
// en fonction du step actif
let dataStep;

// réf fonctions dans l'ordre graph 1
let stepParamsGraph1 = [];
let stepParamsGraph1Reverse = [];

stepParamsGraph1.push(
  [womenDataUrl, "budget", displayGraphWomen],
  [womenDataUrl, "total", updateGraphWomen],
  [menDataUrl, "total", displayGraphMen],
  [womenDataUrl, "total", highlight1000],
  [womenDataUrl, "total", reverse1000],
  [womenDataUrl, "total", highlight2015],
  [womenDataUrl, "total", highlight2016],
  [womenDataUrl, "total", reverse2016]
);

stepParamsGraph1Reverse.push(
  [womenDataUrl, "budget", reverseGraphWomen],
  [womenDataUrl, "budget", reverseUpdateGraphWomen],
  [menDataUrl, "total", reverseUpdateMen],
  [womenDataUrl, "total", reverse1000],
  [womenDataUrl, "total", highlight1000],
  [womenDataUrl, "total", reverse2015],
  [womenDataUrl, "total", highlight2015],
  [womenDataUrl, "total", highlight2016]
);

// réf fonctions dans l'ordre graph 2
let stepParamsGraph2 = [];
let stepParamsGraph2Reverse = [];

stepParamsGraph2.push(
  [],
  [dataUrl2018, displayCircles],
  [dataUrl2018, splitCircles],
  [dataUrl2018, highlightCirclesWomen],
  [dataUrl2018, highlightCirclesMen],
  [dataUrl2018, highlightCirclesBoth],
  [dataUrl2018, highlightCirclesMen],
  [dataUrl2018, resetOpacityCircles],
  [dataUrl2018, updateCircles],
  [],
  [dataUrl2018, highlightCirclesBudget],
  [],
  [dataUrl2018, resetCirclesBudget],
  [dataUrl2018, highlightCirclesMen],
  [dataUrl2018, resetOpacityCircles],
  [dataUrl2018, resetCirclesSize]
);
stepParamsGraph2Reverse.push(
  [dataUrl2018, displayCirclesReverse],
  [dataUrl2018, unsplitCircles],
  [dataUrl2018, resetOpacityCircles],
  [dataUrl2018, highlightCirclesWomen],
  [dataUrl2018, highlightCirclesMen],
  [dataUrl2018, highlightCirclesBoth],
  [dataUrl2018, highlightCirclesMen],
  [dataUrl2018, resetCirclesSize],
  [],
  [dataUrl2018, resetLabelsBudget],
  [],
  [dataUrl2018, highlightCirclesBudget],
  [dataUrl2018, highlightCirclesWomen],
  [dataUrl2018, highlightCirclesMen],
  [dataUrl2018, updateCircles]
);

// réf fonctions dans l'ordre graph 3
let stepParamsGraph3 = [];
let stepParamsGraph3Reverse = [];

stepParamsGraph3.push([],
    [dataPerYearUrl, dispGraphYears],
    [dataPerYearUrl, highlightSmallBudget],
    [dataPerYearUrl, highlightBigBudget],
    [dataPerYearUrl, highlightVeryBigBudget],
    [dataPerYearUrl, highlightBigBudgetMen],
    [dataPerYearUrl, resetOpacityGraphYears],
    [],
    [dataPerYearUrl, highlightFirstFilms],
    [],
    [dataPerYearUrl, highlightFirstFilmsBigBudget],
    [],
    [dataPerYearUrl, resetOpacityGraphYears],
    [dataPerYearUrl, highlightFirstFilmsWomen],
    [dataPerYearUrl, highlightFirstFilmsMen],
    [dataPerYearUrl, resetOpacityGraphYears],
    [dataPerYearUrl, hideGraphYears]);

stepParamsGraph3Reverse.push([dataPerYearUrl, hideGraphYears],
    [dataPerYearUrl, resetOpacityGraphYears],
    [dataPerYearUrl, highlightSmallBudget],
    [dataPerYearUrl, highlightBigBudget],
    [dataPerYearUrl, highlightVeryBigBudget],
    [dataPerYearUrl, highlightBigBudgetMen],
    [],
    [dataPerYearUrl, resetOpacityStrokeGraphYears],
    [],
    [dataPerYearUrl, highlightFirstFilms],
    [],
    [dataPerYearUrl, highlightFirstFilmsBigBudget],
    [dataPerYearUrl, resetOpacityGraphYears],
    [dataPerYearUrl, highlightFirstFilmsWomen],
    [dataPerYearUrl, highlightFirstFilmsMen],
    [dataPerYearUrl, dispGraphYearsStroke],
    []
    )

// appel des fonctions liées au graphique
// en fonction du step actif
function handleStepEnter(response) {
  console.log("reeep", response.element);
  dataStep = response.element.getAttribute("data-step");
  console.log("step", dataStep);

  if (response.element.getAttribute("data-graph") == "graph-1") {
    if (response.direction == "down" && stepParamsGraph1[dataStep]) {
      callGraphFunction(...stepParamsGraph1[dataStep]);
      return;
    }
    if (response.direction == "up" && stepParamsGraph1Reverse[dataStep]) {
      callGraphFunction(...stepParamsGraph1Reverse[dataStep]);
      return;
    }
  } else if (response.element.getAttribute("data-graph") == "graph-2") {
    // console.log("2) step", dataStep);
    if (response.direction == "down" && stepParamsGraph2[dataStep] !== 0) {
      if (dataStep == 0) {
        return;
      }
      callCirclesFunction(...stepParamsGraph2[dataStep]);
      // console.log("3) step", dataStep);
      return;
    }
    if (response.direction == "up" && stepParamsGraph2Reverse[dataStep]) {
      console.log("UP step", dataStep, stepParamsGraph2Reverse[dataStep]);
      callCirclesFunction(...stepParamsGraph2Reverse[dataStep]);
      return;
    }
  } else if (response.element.getAttribute("data-graph") == "graph-3") {
    // console.log("2) step", dataStep);
    if (response.direction == "down" && stepParamsGraph3[dataStep] !== 0) {
      if (dataStep == 0) {
        return;
      }
      console.log("yo", ...stepParamsGraph3[dataStep]);
      callCirclesFunction(...stepParamsGraph3[dataStep]);
      return;
    }

    if (response.direction == "up" && stepParamsGraph3Reverse[dataStep]) {
        console.log("yo REVERSE!!", ...stepParamsGraph3[dataStep]);
      
        callCirclesFunction(...stepParamsGraph3Reverse[dataStep]);
      return;
    }
  } else if (response.element.getAttribute("data-graph") == "outro") {
    if (response.direction == "down") {
      legDisplayNone();
    }
  }
}

// scrollama setup
scroller
  .setup({
    step: ".step",
    offset: 0.75,
    debug: false,
  })
  .onStepEnter(handleStepEnter);

// création des éléments du graph réalisatrices (flat)
function createGraphWomen(data, yMax) {
  if (!d3.select(".chart-women").empty()) {
    return;
  }

  // création du container .chart-women
  let svg = d3
    .select("#chart-1")
    .append("svg")
    .classed("chart-women", true)
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // échelle y flat
  let scaleY = d3.scaleLinear().domain([0, yMax]).range([svgHeight, svgHeight]);

  // axe y flat
  let yAxis = d3.axisRight(scaleY).tickFormat(d3.format(".0f"));

  // échelle x
  let scaleX = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => parseInt(d.year)))
    .range([svgPadding.x, svgWidth - svgPadding.x]);

  // axe x
  let xAxis = d3.axisTop(scaleX).tickFormat(d3.format(".0f"));

  // aire flat
  let area = d3
    .area()
    .curve(d3.curveMonotoneX)
    .x((d) => scaleX(d.year))
    .y0(svgHeight)
    .y1(svgHeight);

  // append aire
  svg
    .append("path")
    .data(data)
    .attr("class", "area-women")
    .attr("d", area(data));

  // append axe x
  svg
    .append("g")
    .classed("xAxis", true)
    .call(xAxis)
    .attr("transform", "translate(0," + svgHeight + ")");

  // append axe y
  svg.append("g").classed("yAxis", true).call(yAxis);

  // append label axe y
  svg
    .append("text")
    .classed("label", true)
    .attr("y", svgHeight + 10)
    .attr("x", 10)
    .attr("dy", "1em")
    .attr("font-size", "1.2em")
    .text("Budget, en millions d'euros");
}

// création des éléments du graph réalisateurs (flat)
function createGraphMen(data, yMax) {
  if (!d3.select(".chart-men").empty()) {
    return;
  }

  // création du container .chart-men
  let svg = d3
    .select("#chart-1")
    .append("svg")
    .classed("chart-men", true)
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // échelle x
  let scaleX = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => parseInt(d.year)))
    .range([svgPadding.x, svgWidth - svgPadding.x]);

  // aire flat
  let area = d3
    .area()
    .curve(d3.curveMonotoneX)
    .x((d) => scaleX(d.year))
    .y0(svgHeight)
    .y1(svgHeight);

  // append aire flat
  svg.append("path").data(data).attr("class", "area-men").attr("d", area(data));
}

// affichage graph réalisatrices (première échelle)
function displayGraphWomen(data, yMax) {
  let svg = d3.select(".chart-women");

  // échelle x
  let scaleX = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => parseInt(d.year)))
    .range([svgPadding.x, svgWidth - svgPadding.x]);

  // échelle y
  let scaleY = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([svgHeight, svgPadding.y]);

  // axe y
  let yAxis = d3.axisRight(scaleY).tickFormat(d3.format(".0f"));

  // aire colorée ok
  let area = d3
    .area()
    .curve(d3.curveMonotoneX)
    .x((d) => scaleX(d.year))
    .y0(svgHeight)
    .y1((d) => scaleY(d.budget));

  // transition aire
  svg
    .select(".area-women")
    .transition("area-women-first")
    .duration(transition)
    .attr("d", area(data));

  // transition axe y
  svg
    .select(".yAxis")
    .transition("yaxis-first")
    .duration(transition)
    .call(yAxis)
    .attr("opacity", 1);

  // opacité axe x
  svg
    .select(".xAxis")
    .transition("xaxis-first")
    .duration(transition)
    .attr("opacity", 1);

  // transition label axe y
  svg
    .select(".label")
    .transition("label")
    .duration(transition)
    .attr("y", 10)
    .attr("opacity", 1);
}

// màj graph réalisatrices (deuxième échelle)
function updateGraphWomen(data, yMax) {
  let svg = d3.select(".chart-women");

  // échelle x
  let scaleX = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => parseInt(d.year)))
    .range([svgPadding.x, svgWidth - svgPadding.x]);

  // échelle y changement d'échelle
  let scaleY = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([svgHeight, svgPadding.y]);

  // axe y changement d'échelle
  let yAxis = d3.axisRight(scaleY).tickFormat(d3.format(".0f"));

  // aire changement d'échelle
  let area = d3
    .area()
    .curve(d3.curveMonotoneX)
    .x((d) => scaleX(d.year))
    .y0(svgHeight)
    .y1((d) => scaleY(d.budget));

  // transiton aire changement d'échelle
  svg
    .select(".area-women")
    .transition("area-women-second")
    .duration(transition)
    .attr("d", area(data));

  // transition axe y changement d'échelle
  svg
    .select(".yAxis")
    .transition("yaxis-second")
    .duration(transition)
    .call(yAxis);
}

// affichage graph réalisatrices (échelle commune)
function displayGraphMen(data, yMax) {
  let svg = d3.select(".chart-men");

  // échelle x
  let scaleX = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => parseInt(d.year)))
    .range([svgPadding.x, svgWidth - svgPadding.x]);

  // échelle y ok
  let scaleY = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([svgHeight, svgPadding.y]);

  // aire ok
  let area = d3
    .area()
    .curve(d3.curveMonotoneX)
    .x((d) => scaleX(d.year))
    .y0(svgHeight)
    .y1((d) => scaleY(d.budget));

  // transition aire flat -> aire ok
  svg
    .select(".area-men")
    .transition("area-men-first")
    .duration(transition)
    .attr("d", area(data));
}

// retour graph réalisatrices flat
function reverseGraphWomen(data, yMax) {
  let svg = d3.select(".chart-women");

  // échelle y flat
  let scaleY = d3.scaleLinear().domain([0, yMax]).range([svgHeight, svgHeight]);

  // axe y flat
  let yAxis = d3.axisRight(scaleY).tickFormat(d3.format(".0f"));

  // échelle x
  let scaleX = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => parseInt(d.year)))
    .range([svgPadding.x, svgWidth - svgPadding.x]);

  // axe x
  let xAxis = d3.axisTop(scaleX).tickFormat(d3.format(".0f"));

  // aire flat
  let area = d3
    .area()
    .curve(d3.curveMonotoneX)
    .x((d) => scaleX(d.year))
    .y0(svgHeight)
    .y1(svgHeight);

  // transition aire ok -> aire flat
  svg
    .select(".area-women")
    .transition("area-women-flat")
    .duration(transition)
    .attr("d", area(data));

  // transition axe y -> axe y flat
  svg
    .select(".yAxis")
    .transition("yaxis-flat")
    .duration(transition)
    .call(yAxis)
    .attr("opacity", 0);

  // transition axe x invisible
  svg
    .select(".xAxis")
    .transition("xaxis-invisible")
    .duration(transition)
    .attr("opacity", 0);

  // transition label invisible
  svg
    .select(".label")
    .transition("label-invisible")
    .duration(transition)
    .attr("y", svgHeight + 10)
    .attr("opacity", 0);
}

// retour graph réalisatrices première échelle
function reverseUpdateGraphWomen(data, yMax) {
  let svg = d3.select(".chart-women");

  // échelle x
  let scaleX = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => parseInt(d.year)))
    .range([svgPadding.x, svgWidth - svgPadding.x]);

  // échelle y première échelle
  let scaleY = d3
    .scaleLinear()
    .domain([0, yMax])
    .range([svgHeight, svgPadding.y]);

  // axe y
  let yAxis = d3.axisRight(scaleY).tickFormat(d3.format(".0f"));

  // aire première échelle
  let area = d3
    .area()
    .curve(d3.curveMonotoneX)
    .x((d) => scaleX(d.year))
    .y0(svgHeight)
    .y1((d) => scaleY(d.budget));

  // transition aire nouvelle échelle -> première échelle
  svg
    .select(".area-women")
    .transition("area-women-back")
    .duration(transition)
    .attr("d", area(data));

  // transition axe nouvelle échelle -> première échelle
  svg
    .select(".yAxis")
    .transition("yaxis-back")
    .duration(transition)
    .call(yAxis);
}

// retour graph réalisateurs flat
function reverseUpdateMen(data, yMax) {
  let svg = d3.select(".chart-men");

  // échelle x
  let scaleX = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => parseInt(d.year)))
    .range([svgPadding.x, svgWidth - svgPadding.x]);

  // aire flat
  let area = d3
    .area()
    .curve(d3.curveMonotoneX)
    .x((d) => scaleX(d.year))
    .y0(svgHeight)
    .y1(svgHeight);

  // transition aire ok -> aire flat
  svg
    .select(".area-men")
    .transition("area-men-flat")
    .duration(transition)
    .attr("d", area(data));
}

function highlight1000(data, yMax) {
  d3.select(".chart-women")
    .select(".yAxis")
    .selectAll(".tick")
    .filter((d) => d == 1000)
    .attr("class", "tick highlight")
    .select("line")
    .transition("highlight-1000")
    .duration(transition / 2)
    .attr("x2", svgWidth)
    .attr("stroke-dashoffset", "6")
    .attr("stroke-dasharray", "3 3");
}

function reverse1000(data, yMax) {
  d3.select(".chart-women")
    .select(".yAxis")
    .selectAll(".tick")
    .filter((d) => d == 1000)
    .attr("class", "tick")
    .select("line")
    .transition("rev-highlight-1000")
    .duration(transition / 2)
    .attr("x2", 6);
}

function highlight2015(data, yMax) {
  d3.select(".chart-women")
    .select(".xAxis")
    .selectAll(".tick")
    .filter((d) => d == 2015)
    .attr("class", "tick highlight")
    .select("line")
    .transition("highlight-2015")
    .duration(transition / 2)
    .attr("y2", -svgHeight)
    .attr("stroke-dasharray", "3 3");

  d3.select(".chart-women")
    .select(".xAxis")
    .selectAll(".tick")
    .filter((d) => d == 2016)
    .attr("class", "tick")
    .select("line")
    .transition("rev-highlight-2016")
    .duration(transition / 2)
    .attr("y2", -6);
}

function reverse2015(data, yMax) {
  d3.select(".chart-women")
    .select(".xAxis")
    .selectAll(".tick")
    .filter((d) => d == 2015)
    .attr("class", "tick")
    .select("line")
    .transition("rev-highlight-2015")
    .duration(transition / 2)
    .attr("y2", -6);
}

function highlight2016(data, yMax) {
  d3.select(".chart-women")
    .select(".xAxis")
    .selectAll(".tick")
    .filter((d) => d == 2016)
    .attr("class", "tick highlight")
    .select("line")
    .transition("highlight-2016")
    .duration(transition / 2)
    .attr("y2", -svgHeight)
    .attr("stroke-dasharray", "3 3");

  d3.select(".chart-women")
    .select(".xAxis")
    .selectAll(".tick")
    .filter((d) => d == 2015)
    .attr("class", "tick")
    .select("line")
    .transition("rev-highlight-2015")
    .duration(transition / 2)
    .attr("y2", -6);
}

function reverse2016(data, yMax) {
  d3.select(".chart-women")
    .select(".xAxis")
    .selectAll(".tick")
    .filter((d) => d == 2016)
    .attr("class", "tick")
    .select("line")
    .transition("rev-highlight-2016")
    .duration(transition / 2)
    .attr("y2", -6);
}

// fonction d'appel
function callGraphFunction(dataUrl, domainRef, functionName) {
  d3.csv(dataUrl).then(function (data) {
    let yMax = d3.max(data.map((d) => parseFloat(d[domainRef])));
    // console.log(yMax)
    functionName(data, yMax);
  });
}

// création éléments graph réalisatrices
callGraphFunction(womenDataUrl, "budget", createGraphWomen);
// création éléments graph réalisateurs
callGraphFunction(menDataUrl, "total", createGraphMen);

// append the svg object to the body of the page
// console.log(d3.select("#chart-2"));
let circlesSvg = d3
  .select("#chart-2")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// let yearGroup = ["2008", "2009", "2010", "2011", "2012", "2013",
//                     "2014", "2015", "2016", "2017", "2018"];

// let dropdownBtn = d3.select("#chart-2")
//                     .append("select")
//                     .selectAll("myOptions")
//                     .data(yearGroup)
//                     .enter()
//                     .append("option")
//                     .text(d)
//                     .attr("value", d);

let simulation;
let node;
let elements = [];

// a scale that gives a X target position for each group
let xTarget = d3
  .scaleOrdinal()
  .domain(["F", "M", "F/M"])
  .range([
    (2 * svgWidth) / 3 - 200,
    (2 * svgWidth) / 3,
    (2 * svgWidth) / 3 + 150,
  ]);

// a color scale
let colorScale = d3
  .scaleOrdinal()
  .domain(["F", "M", "F/M"])
  .range(["#00D6C0", "#25476D", "#a31d5c"]);
//["#women", "#men", "#both"]

function createCircles(data) {
  //let yearGroup = d3.map(data, d => d.year).keys();
  /*
    d3.select("#select-year-btn")
    .selectAll("myOptions")
    .data(yearGroup)
    .enter()
    .append("option")
    .text(d => d) // text showed in the menu
    .attr("value", d => d); // corresponding value returned by the button
*/

  // initialization of the circles: all located at the center of the svg area
  node = circlesSvg
    .append("g")
    .selectAll("circle")
    .data(data) // .filter(d => d.year=="2018"))
    .enter()
    .append("circle")
    .attr("class", "node")
    .classed("ten", function (d, i) {
      if (i < 10) {
        return true;
      } else {
        return false;
      }
    })
    .attr("r", 0)
    .attr("cx", (2 * svgWidth) / 3)
    .attr("cy", svgHeight / 2)
    .style("opacity", 1)
    .style("fill", "#cccccc");

  // definition of the forces applied to the circles
  simulation = d3
    .forceSimulation()
    .force(
      "x",
      d3
        .forceX()
        .strength(0.5)
        .x((2 * svgWidth) / 3)
    )
    .force(
      "y",
      d3
        .forceY()
        .strength(0.5)
        .y(svgHeight / 2)
    )
    .force(
      "center",
      d3
        .forceCenter()
        .x((2 * svgWidth) / 3)
        .y(svgHeight / 2)
    ) // attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(0.5)) // attraction between one another
    .force("collide", d3.forceCollide().strength(0.5).radius(10)); // avoids circle overlapping

  // application of these forces to the circles
  simulation.nodes(data).on("tick", function (d) {
    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  });

  /* 
                // essai pour récupérer les x et les y de ch node
                // problème : ne s'éxecute que si on attend à cette étape que la transition finisse
                // sinon, renvoie tableau vide

                .on("end", function(d) {
                    simulation.nodes().forEach(function(node) {
                        elements.push(
                            {"name": node.filmName,
                            "budget": node.filmBudget,
                            "x": node.x,
                            "y": node.y}
                            );

                    })
                    console.log("elX", elements)
                });
                */
}

function displayCircles(data) {
  circlesSvg
    .selectAll(".node")
    .transition("nodes-to-5")
    .duration(transition)
    .attr("r", 5);
}

function displayCirclesReverse(data) {
  circlesSvg
    .selectAll(".node")
    .transition("nodes-to-0")
    .duration(transition)
    .attr("r", 0);
}

function splitCircles(data) {
  console.log("hehehehehoh ???");
  circlesSvg
    .selectAll(".node")
    .transition("split")
    .duration(transition)
    .style("fill", d => colorScale(d.realGender));

  simulation.stop();
  simulation.force(
    "x",
    d3
      .forceX()
      .strength(0.5)
      .x((d) => xTarget(d.realGender))
  );
  simulation.alpha(0.1).restart();
}

function unsplitCircles(data) {
  circlesSvg
    .selectAll(".node")
    .transition("unsplit")
    .duration(transition)
    .style("fill", "#cccccc");

  simulation.stop();
  simulation.force(
    "x",
    d3
      .forceX()
      .strength(0.5)
      .x(svgWidth / 2)
  );
  simulation.alpha(0.1).restart();
}

function highlightCirclesWomen(data) {
  let opacityScale = d3
    .scaleOrdinal()
    .domain(["F", "M", "F/M"])
    .range([1, 0.2, 0.2]);

  circlesSvg
    .selectAll(".node")
    .transition("opacity-women")
    .duration(transition / 2)
    .style("opacity", (d) => opacityScale(d.realGender));
}

function highlightCirclesMen(data) {
  let opacityScale = d3
    .scaleOrdinal()
    .domain(["F", "M", "F/M"])
    .range([0.2, 1, 0.2]);

  circlesSvg
    .selectAll(".node")
    .transition("opacity-men")
    .duration(transition / 2)
    .style("opacity", (d) => opacityScale(d.realGender));
}

function highlightCirclesBoth(data) {
  let opacityScale = d3
    .scaleOrdinal()
    .domain(["F", "M", "F/M"])
    .range([0.2, 0.2, 1]);

  circlesSvg
    .selectAll(".node")
    .transition("opacity-both")
    .duration(transition / 2)
    .style("opacity", (d) => opacityScale(d.realGender));
}

function resetOpacityCircles(data) {
  circlesSvg
    .selectAll(".node")
    .transition("opacity-reset")
    .duration(transition / 2)
    .style("opacity", 1);
}

function updateCircles(data) {
  let radius = d3
    .scaleSqrt()
    .domain(d3.extent(data, (d) => parseFloat(d.filmBudget)))
    .range([0.1, 40]);

  circlesSvg
    .selectAll(".node")
    .transition("size-budget")
    .duration(transition * 2)
    .attr("r", (d) => radius(d.filmBudget));

  simulation.stop();
  simulation
    .force("collide")
    .strength(0.5)
    .radius((d) => radius(d.filmBudget) + 5); // avoids circle overlapping
  simulation.alpha(0.1).restart();
}

function highlightCirclesBudget(data) {
  if (!d3.select(".film-ten-budget-label").empty()) {
    return;
  }

  let radius = d3
    .scaleSqrt()
    .domain(d3.extent(data, (d) => parseFloat(d.filmBudget)))
    .range([0.1, 1.8]);

  circlesSvg
    .selectAll(".node")
    .transition("opacity-budget")
    .duration(transition)
    .style("opacity", function (d, i) {
      if (i < 10) {
        return 1;
      } else {
        return 0.2;
      }
    });

  circlesSvg.selectAll(".ten").each(function (c) {
    circlesSvg
      .select("g")
      .append("text")
      .classed("film-ten-budget-label", true)
      .append("tspan")
      .text(c.filmBudget)
      .attr("font-size", radius(c.filmBudget) + "em")
      .attr("opacity", 0)
      .attr("x", c.x)
      .attr("y", c.y + radius(c.filmBudget) * 3)
      .transition()
      .duration(transition)
      .attr("opacity", 1);
  });

  // simulation.on("end", function() {
  // })
}

function resetCirclesBudget(data) {
  let opacityScale = d3
    .scaleOrdinal()
    .domain(["F", "M", "F/M"])
    .range([1, 0.2, 0.2]);

  circlesSvg
    .selectAll(".node")
    .transition("opacity-budget-reset-men")
    .duration(transition / 2)
    .style("opacity", (d) => opacityScale(d.realGender));

  circlesSvg
    .selectAll(".film-ten-budget-label")
    .attr("opacity", 1)
    .transition("opacity-budget-label-reset")
    .duration(transition / 2)
    .attr("opacity", 0)
    .remove();
}

function resetLabelsBudget(data) {
  circlesSvg
    .selectAll(".node")
    .transition("opacity-budget-reset")
    .duration(transition)
    .style("opacity", 1);

  circlesSvg
    .selectAll(".film-ten-budget-label")
    .attr("opacity", 1)
    .transition("opacity-budget-label-reset")
    .duration(transition / 2)
    .attr("opacity", 0)
    .remove();
}

function resetCirclesSize(data) {
  circlesSvg
    .selectAll(".node")
    .transition("circles-size-reset")
    .duration(transition)
    .style("opacity", 1)
    .attr("r", 5);

  simulation.stop();
  simulation.force("collide").strength(0.5).radius(10); // avoids circle overlapping
  simulation.alpha(0.1).restart();
}

function updateCirclesByYear(yr, data) {
  console.log("année ", yr);
  console.log(
    "filtre ",
    data.filter((d) => d.year == "2011")
  );
  node = node.data(data.filter((d) => d.year == yr));
  node.exit().remove();

  let radius = d3
    .scaleSqrt()
    .domain(d3.extent(data, (d) => parseFloat(d.filmBudget)))
    .range([0.1, 60]);

  console.log("he ho tu fais quoi là");
  // Give these new data to update line

  node
    .style("fill", (d) => colorScale(d.realGender))
    .style("opacity", 0.2)
    .attr("r", (d) => radius(d.filmBudget));

  let newNode = node
    .enter()
    .append("circle")
    .attr("class", "node")
    .transition("year-change")
    .duration(transition)
    .attr("r", (d) => radius(d.filmBudget))
    .attr("cx", svgWidth / 2)
    .attr("cy", svgHeight / 2)
    .style("opacity", 1)
    .style("fill", (d) => colorScale(d.realGender));

  node = node.merge(newNode);

  simulation.stop();

  simulation = d3
    .forceSimulation()
    .force(
      "x",
      d3
        .forceX()
        .strength(0.1)
        .x((d) => xTarget(d.realGender))
    )
    .force(
      "y",
      d3
        .forceY()
        .strength(0.1)
        .y(svgHeight / 2)
    )
    .force(
      "center",
      d3
        .forceCenter()
        .x(svgWidth / 2)
        .y(svgHeight / 2)
    ) // attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(1)) // attraction between one another
    .force(
      "collide",
      d3
        .forceCollide()
        .strength(1)
        .radius((d) => radius(d.filmBudget) + 2)
    ); // avoids circle overlapping

  simulation.nodes(data.filter((d) => d.year == yr)).on("tick", function (d) {
    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  });
}

function callCirclesFunction(dataUrl, functionName) {
  d3.csv(dataUrl).then(function (data) {
    functionName(data);

    // d3.select("#select-year-btn").on("change", function(d) {
    //     // recover the option that has been chosen
    //     let selectedOption = d3.select(this).property("value");
    //     // run the updateChart function with this selected option
    //     updateCirclesByYear(selectedOption, data);
    // })
  });
}

callCirclesFunction(dataUrl2018, createCircles);

let dot;

function graphYears(data) {
  console.log("coucou graph 3 ?");

  let svg = d3
    .select("#chart-3")
    .append("svg")
    .classed("chart-years", true)
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // échelle x
  let scaleX = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d.year))
    .range([svgPadding.y * 3, svgWidth / 1.2 - svgPadding.y * 3]);

  // axe x
  let xAxis = d3.axisTop(scaleX).tickFormat(d3.format(".0f"));

  // échelle y
  // let scaleY = d3.scaleQuantile()
  //     .domain(d3.extent(data, d => d.filmBudget))
  //     // .range([svgHeight - 4*svgPadding.y, 13*svgHeight/14, 12*svgHeight/14, 11*svgHeight/14,
  //     //     10*svgHeight/14, 9*svgHeight/14, 8*svgHeight/14, 7*svgHeight/14,
  //     //     6*svgHeight/14, 5*svgHeight/14, 4*svgHeight/14, 3*svgHeight/14,
  //     //     2*svgHeight/14, 1*svgHeight/14, 2*svgPadding.y]);

  let scaleHeight = svgHeight - 2 * svgPadding.y;
  let div = 14;

  let scaleY = d3
    .scaleThreshold()
    // 14 groupes
    .domain([0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20])
    .range([
      scaleHeight,
      (13 * scaleHeight) / div,
      (12 * scaleHeight) / div,
      (11 * scaleHeight) / div,
      (10 * scaleHeight) / div,
      (9 * scaleHeight) / div,
      (8 * scaleHeight) / div,
      (7 * scaleHeight) / div,
      (6 * scaleHeight) / div,
      (5 * scaleHeight) / div,
      (4 * scaleHeight) / div,
      (3 * scaleHeight) / div,
      (2 * scaleHeight) / div,
      (1 * scaleHeight) / div,
    ]);
  // .range([svgHeight - 4*svgPadding.y, 4*svgHeight/5, 3*svgHeight/5,
  //     2*svgHeight/5, 1*svgHeight/5, 2*svgPadding.y]);

  // axe y
  let yAxis = d3
    .axisRight(scaleY)
    .tickValues([1, 5, 10])
    .tickFormat(d3.format(".0f"));

  let colorScale = d3
    .scaleOrdinal()
    .domain(["F", "M", "F/M"])
    .range(["#00D6C0", "#25476D", "#a31d5c"]);
  //["#women", "#men", "#both"]

  // append axe x
  svg
    .append("g")
    .classed("xAxis", true)
    .call(xAxis)
    .attr("transform", `translate(0 40)`);

  // append axe y
  // svg.append("g")
  //     .classed("yAxis", true)
  //     .call(yAxis);

  dot = svg
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "movie-dot")
    .attr("r", 0)
    .attr("cx", (d) => scaleX(d.year))
    .attr("cy", (d) => scaleY(d.filmBudget))
    .style("fill", (d) => colorScale(d.realGender))
    .style("stroke", function (d) {
      if (d.firstFilm == "true") {
        return colorScale(d.realGender);
      } else {
        return "none";
      }
    })
    .style("stroke-width", 0)
    .style("paint-order", "stroke")
    .style("stroke-opacity", 0.3);

  // definition of the forces applied to the circles
  let simu = d3
    .forceSimulation()
    .force(
      "x",
      d3
        .forceX()
        .strength(0.5)
        .x((d) => scaleX(d.year))
    )
    .force(
      "y",
      d3
        .forceY()
        .strength(0.5)
        .y((d) => scaleY(d.filmBudget))
    )
    // .force("center", d3.forceCenter().x(svgWidth/2).y(svgHeight/2)) // attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(0.5)) // attraction between one another
    .force("collide", d3.forceCollide().strength(1).radius(4)); // avoids circle overlapping

  // application of these forces to the circles
  simu.nodes(data).on("tick", function (d) {
    dot.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  });
}

function dispGraphYears(data) {
  let svg = d3.select(".chart-years");

  d3.select("#chart-3-leg")
    .transition("leg-appear")
    .duration(transition)
    .style("opacity", 1);

  svg
    .selectAll(".movie-dot")
    .transition()
    .duration(transition)
    .attr("r", 2.6);
}

function dispGraphYearsStroke(data) {
    let svg = d3.select(".chart-years");
  
    d3.select("#chart-3-leg")
      .transition("leg-rereappear")
      .duration(transition)
      .style("opacity", 1)
      .style("display", "block");  
  
    svg
      .selectAll(".movie-dot")
      .transition("radius-stroke")
      .duration(transition)
      .style("stroke-width", 8)
      .attr("r", 2.6);
  }

function hideGraphYears(data) {
  let svg = d3.select(".chart-years");

  d3.select("#chart-3-leg")
    .transition("leg-disappear")
    .duration(50)
    .style("opacity", 0);

  svg
    .selectAll(".movie-dot")
    .transition("graph-disappear")
    .duration(transition)
    .style("stroke-width", 0)
    .attr("r", 0);
}

function dispGraphYearsLeg(data) {
  d3.select("#chart-3-leg")
    .transition("leg-reappear")
    .duration(transition / 2)
    .style("opacity", 1);
}

function highlightSmallBudget(data) {
  let svg = d3.select(".chart-years");

  svg
    .selectAll(".movie-dot")
    .transition("hl-small-budget")
    .duration(transition/2)
    .style("opacity", function (d) {
      if (d.filmBudget < 5) {
        return 1;
      } else {
        return 0.2;
      }
    });
}

function highlightBigBudget(data) {
    let svg = d3.select(".chart-years");
  
    svg
      .selectAll(".movie-dot")
      .transition("hl-big-budget")
      .duration(transition/2)
      .style("opacity", function (d) {
        if (d.filmBudget >= 10) {
          return 1;
        } else {
          return 0.2;
        }
      });
}

function highlightVeryBigBudget(data) {
    let svg = d3.select(".chart-years");
  
    svg
      .selectAll(".movie-dot")
      .transition("hl-v-big-budget")
      .duration(transition/2)
      .style("opacity", function (d) {
        if (d.filmBudget >= 20) {
          return 1;
        } else {
          return 0.2;
        }
      });
}

function highlightBigBudgetMen(data) {
    let svg = d3.select(".chart-years");
  
    svg
      .selectAll(".movie-dot")
      .transition("hl-big-budget")
      .duration(transition/2)
      .style("opacity", function (d) {
        if (d.filmBudget >= 10 && d.realGender == "M") {
          return 1;
        } else {
          return 0.2;
        }
      });
}


function highlightFirstFilms(data) {
    let svg = d3.select(".chart-years");
  
    svg
      .selectAll(".movie-dot")
      .transition("hl-first-films")
      .duration(transition/2)
      .style("opacity", function (d) {
        if (d.firstFilm == "true") {
          return 1;
        } else {
          return 0.2;
        }
      })
      .transition("stroke-first-films")
      .duration(transition)
      .style("stroke-width", 8)

}

function highlightFirstFilmsBigBudget(data) {
    let svg = d3.select(".chart-years");
  
    svg
      .selectAll(".movie-dot")
      .transition("hl-first-films-big-budget")
      .duration(transition/2)
      .style("opacity", function (d) {
        if (d.firstFilm == "true" && d.filmBudget >= 10) {
          return 1;
        } else {
          return 0.2;
        }
      });
}

function highlightFirstFilmsWomen(data) {
    let svg = d3.select(".chart-years");
  
    svg
      .selectAll(".movie-dot")
      .transition("hl-first-films-big-budget")
      .duration(transition/2)
      .style("opacity", function (d) {
        if (d.firstFilm == "true" && d.realGender == "F") {
          return 1;
        } else {
          return 0.2;
        }
      });
}

function highlightFirstFilmsMen(data) {
    let svg = d3.select(".chart-years");
  
    svg
      .selectAll(".movie-dot")
      .transition("hl-first-films-big-budget")
      .duration(transition/2)
      .style("opacity", function (d) {
        if (d.firstFilm == "true" && d.realGender == "M") {
          return 1;
        } else {
          return 0.2;
        }
      });
}

function resetOpacityGraphYears(data) {
    let svg = d3.select(".chart-years");
  
    svg
      .selectAll(".movie-dot")
      .transition("reset-opacity")
      .duration(transition/2)
      .style("opacity", 1);
}


function resetOpacityStrokeGraphYears(data) {
    let svg = d3.select(".chart-years");
  
    svg
      .selectAll(".movie-dot")
      .transition("reset-opacity-stroke")
      .duration(transition/2)
      .style("stroke-width", 0)
      .style("opacity", 1);
}

function callYearsFunction(dataUrl, functionName) {
  d3.csv(dataUrl).then(function (data) {
    functionName(data);
  });
}

callYearsFunction(dataPerYearUrl, graphYears);

function legDisplayNone() {
  d3.select("#chart-3-leg")
    .style("display", "none");
}



// graphique horizontal : abandonné (à suppr)

function createGraphYears(data) {
  let graphWidth = svgWidth * 30;
  let jitter = svgHeight / 11 - 40;

  console.log("coucou ?");

  let svg = d3
    .select("#chart-3")
    .append("svg")
    .classed("chart-years", true)
    .attr("width", graphWidth)
    .attr("height", svgHeight);

  // échelle x
  let scaleX = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => parseInt(d.filmBudget)))
    .range([svgPadding.y, svgPadding.y]);

  // axe x
  let xAxis = d3.axisTop(scaleX).tickFormat(d3.format(".0f"));

  // échelle y
  let scaleY = d3
    .scaleLinear()
    .domain([2008, 2018])
    .range([svgPadding.y * 4, svgHeight - svgPadding.y * 4]);

  // axe y
  let yAxis = d3.axisRight(scaleY).tickFormat(d3.format(".0f"));

  let colorScale = d3
    .scaleOrdinal()
    .domain(["F", "M", "F/M"])
    .range(["#00D6C0", "#25476D", "#a31d5c"]);
  //["#women", "#men", "#both"]

  // append axe x
  svg
    .append("g")
    .classed("xAxis", true)
    .call(xAxis)
    .attr("opacity", 0)
    .attr("transform", `translate(0 ${svgHeight - svgPadding.y})`);

  // append axe y
  svg.append("g").classed("yAxis", true).call(yAxis);

  svg
    .append("g")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "movie-dot")
    .attr("r", 0)
    .attr("cx", 0)
    .attr("cy", (d) => scaleY(d.year) - jitter / 2 + Math.random() * jitter)
    .style("fill", (d) => colorScale(d.realGender))
    .style("stroke", (d) => colorScale(d.realGender))
    .style("stroke-opacity", 1)
    .style("fill-opacity", 0.5)
    .style("stroke", (d) => colorScale(d.realGender));

  /*
        .style("stroke-width", 2)
        .style("stroke", function(d) {
            if (d.firstFilm == "true") {
                return "#ffbb33";
            } else { return "none"; }
        })*/

  /*.style("opacity", "0.6")
        .style("fill", "none")
        .style("stroke-width", 1)
        .style("stroke", d => colorScale(d.realGender))*/
}

function distributeGraphYears(data) {
  let graphWidth = svgWidth * 30;
  let jitter = 0;
  let radius = d3
    .scaleSqrt()
    .domain(d3.extent(data, (d) => parseFloat(d.filmBudget)))
    .range([2, 70]);

  let svg = d3.select(".chart-years");

  // échelle x
  let scaleX = d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => parseInt(d.filmBudget)))
    .range([svgPadding.y, graphWidth - 200]);

  // échelle y
  let scaleY = d3
    .scaleLinear()
    .domain([2008, 2018])
    .range([svgPadding.y * 4, svgHeight - svgPadding.y * 4]);

  // axe x
  let xAxis = d3.axisTop(scaleX).tickFormat(d3.format(".0f"));

  // append axe x
  svg
    .select(".xAxis")
    .attr("opacity", 1)
    .transition()
    .duration(4000)
    .call(xAxis);

  svg
    .selectAll(".movie-dot")
    .transition()
    .duration(10)
    .attr("r", (d) => radius(d.filmBudget))
    .transition()
    .duration(10000)
    .attr("cx", (d) => scaleX(d.filmBudget));

  svg
    .selectAll(".movie-dot")
    .data(data)
    .enter()
    .append("text")
    .text((d) => d.filmName)
    .attr("x", (d) => scaleX(d.filmBudget))
    .attr("y", (d) => scaleY(d.year))
    .style("text-anchor", "start");
}

/*

// fonction responsive
// à écrire

function updateWindow() {
    console.log("yo", d3.selectAll("svg"))
    d3.selectAll("svg").attr("width", window.innerWidth).attr("height", 0.8 * window.innerHeight);
}

window.addEventListener("resize", updateWindow)


*/
