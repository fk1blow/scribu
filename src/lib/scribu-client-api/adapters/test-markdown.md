visjs issues
------------

- self referencing nodes
- multiple connections to-from pair


## multiple connections to-from pair

when a from-to nodes pair have more than one connection(edge) between them, the labels will overlap
and so the user might find it very hard to select a one of the connection(or the one below)

Currently visjs doesn't provide an option to configure this scenario


## self referencing nodes

_when a node is both source and target_

1. use custom node drawin(pff)
2. use the `selfReference` option on the `edges`
3. use ``before/afterDrawing` callback (visjs.github.io/vis-network/examples/network/events/renderEvents.html)
4. get the coordinates and render a custom element(even an svg)(what to do on node drag?)

using the second option seems limited and can suffer from the same issue of having multiple edges
going from/to node(in this case, same node as both target and source)


#### use before/afterDrawing

the only drawback is that it needs to constantly check if the node meets the requirements: self referencing itself.

Need to check every edge that has the same `source` and `target`


---------------------------------------

## tasks


#### overlaping edges

https://stackoverflow.com/questions/50766239/avoiding-overlapping-edges-with-minimal-physics-in-vis-js

http://jsbin.com/wojanuboxi/edit?html,js,output


#### self referencing

see if the browser hangs or attach an iconz






asdasdasd asd as d
