// Search for "!!! IMPLEMENT ME" comments

/**
 * Edge class
 */
class Edge {
  constructor(destination, weight=1) {
    this.destination = destination;
    this.weight = weight;
  }
}

/**
 * Vertex class
 */
class Vertex {
  constructor(value='vertex') {
    this.value = value;
    this.edges = [];
    // Give each vert a default color of white
    this.visited = false;
    // Set each vert to have a parent property ready in case of a subsequent node
    this.parent = null;
  }
}

/**
 * Graph class
 */
class Graph {

  /**
   * Constructor
   */
  constructor() {
    this.vertexes = [];
  }

  /**
   * This function looks through all the vertexes in the graph and returns the
   * first one it finds that matches the value parameter.
   *
   * Used from the main code to look up the verts passed in on the command
   * line.
   *
   * @param {*} value The value of the Vertex to find
   *
   * @return null if not found.
   */

   // This function looks through all the vertices and returns the first match to the value parameter
  findVertex(value) {
    // !!! IMPLEMENT ME - Completed
    // Looping through all the verticies
    for (let i = 0; i < this.vertexes.length; i++) {
      // If vertex matches the value parameter...
      if (this.vertexes[i].value === value) {
        // Return the vertex
        return this.vertexes[i];
      }
    }
  }

  /**
   * Breadth-First search from a starting vertex. 
   * This should keep parent pointers back from neighbors to their parent.
   *
   * @param {Vertex} start The starting vertex for the BFS
   */
  bfs(start) {
    // !!! IMPLEMENT ME
    // Create a queue array to store vertices as we traverse the graph
    const queue = [];

    // Have each vertex default to gray
    start.visited = 'true';
    // Push the first node into the queue array
    queue.push(start);

    // The following code will execute as long as there are vertices in the queue
    while (queue.length > 0) {

      // Set the variable "currentNode" to equal the first (0th) place in the queue
      const currentNode = queue[0];
      
      // Searching the current node for edges in the "edges" array...
      currentNode.edges.forEach(edge => {
        // if an edge is found, it is added to the "destination" property
        const { destination } = edge;

        // If the vertex was previously unvisited..
        if (destination.visited === false) {
          // Switch its status to "visited"
          destination.visited = true;
          // Add the name of the currentNode to the edge's parent property
          destination.parent = currentNode;
          // Push the new vertex under the "destination" label from the edge into the the queue
          queue.push(destination);
        }

        // destination.parent = currentNode;

      });

      queue.shift();
      
      currentNode.visited = true;

    }

  }

  /**
   * Print out the route from the start vert back along the parent
   * pointers (set in the previous BFS)
   *
   * @param {Vertex} start The starting vertex to follow parent
   *                       pointers from
   */
  outputRoute(start) {
    // !!! IMPLEMENT ME
    const nodes = [];
    while (start !== null) {
      nodes.push(start.value);
      start = start.parent;
    }
    const path = nodes.join(' --> ');
    console.log(path);
  }

  /**
   * Show the route from a starting vert to an ending vert.
   */
  route(start, end) {
    // Do BFS and build parent pointer tree
    this.bfs(end);

    // Show the route from the start
    this.outputRoute(start);
  }
}

/**
 * Helper function to add bidirectional edges
 */
function addEdge(v0, v1) {
  v0.edges.push(new Edge(v1));
  v1.edges.push(new Edge(v0));
}

/**
 * Main
 */

// Test for valid command line
const args = process.argv.slice(2);

if (args.length != 2) {
  console.error('usage: routing hostA hostB');
  process.exit(1);
}

// Build the entire Internet
// (it's only a model)
const graph = new Graph();
const vertA = new Vertex('HostA');
const vertB = new Vertex('HostB');
const vertC = new Vertex('HostC');
const vertD = new Vertex('HostD');
const vertE = new Vertex('HostE');
const vertF = new Vertex('HostF');
const vertG = new Vertex('HostG');
const vertH = new Vertex('HostH');

addEdge(vertA, vertB);
addEdge(vertB, vertD);
addEdge(vertA, vertC);
addEdge(vertC, vertD);
addEdge(vertC, vertF);
addEdge(vertG, vertF);
addEdge(vertE, vertF);
addEdge(vertH, vertF);
addEdge(vertH, vertE);

graph.vertexes.push(vertA);
graph.vertexes.push(vertB);
graph.vertexes.push(vertC);
graph.vertexes.push(vertD);
graph.vertexes.push(vertE);
graph.vertexes.push(vertF);
graph.vertexes.push(vertG);
graph.vertexes.push(vertH);

// Look up the hosts passed on the command line by name to see if we can
// find them.

const hostAVert = graph.findVertex(args[0]);

if (hostAVert === null) {
  console.error('routing: could not find host: ' + args[0]);
  process.exit(2);
}

const hostBVert = graph.findVertex(args[1]);

if (hostBVert === null) {
  console.error('routing: could not find host: ' + args[1]);
  process.exit(2);
}

// Show the route from one host to another

graph.route(hostAVert, hostBVert);