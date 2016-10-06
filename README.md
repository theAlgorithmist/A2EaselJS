# Angular2 CLI and EaselJS

This demo illustrates how to use the beta 16 (Webpack) version of the Angular 2 CLI and Angular 2 Final with EaselJS.  I published an A2/EaselJS demo in the past, but that used a now-obsolete CLI and a beta version of Angular 2.  I must also confess to taking a couple shortcuts in that demo, so, it's time for another look at the process :)

The current demo also serves as an interactive test for two Typescript Math Toolkit classes, _TSMT$Axis_ and _TSMT$GraphMarker_.  The Axis class is a computational helper for working with graph axes.  This class is composed into a graph axis class that is used to display horiztonal and vertical axes in the Typescript Math Toolkit function graphing engine.

A Graph Marker is a circular, interactive sprite that is overlaid on top of a function graph.  The marker location is indicated by user or graph coordinates instead of Canvas (pixel) coordinates.  The marker is also draggable.  Users may subscribe to marker updates via a low-level handler function.  The Axis class also accepts a callback function that is executed whenever axis extents (i.e. min and max) change.  The graph marker uses this capability to very rapidly reposition the sprite during graph operations such as zoom or pan, for example.

This demo (like the Angular 2 animation demo) continues the practice of using Directives for custom element selection.  In this case, a custom Canvas-selector Directive is used to isolate selection of the template Canvas used for EaselJS.  It also provides accessors for Canvas-related operations (query length/height, create the Stage).  This process results in cleaner template markup, and the Directive may be easily re-used in other applications involving EaselJS.

I have also migrated the Angular 2 demos to Bootstrap 4, starting with this one.  I think you will find the integration of third-party codes such as Bootstrap and EaselJS to be much simpler with the current CLI.

Author:  Jim Armstrong - [The Algorithmist]

@algorithmist

theAlgorithmist [at] gmail [dot] com

Angular 2: Final

Angular CLI: 1.0 Beta 16


## Installation

Installation involves all the usual suspects

  - npm, typings, and Angular 2 CLI installed globally (make sure to update to beta 16)
  - Clone the repository
  - npm install
  - get coffee (this is the most important step)


### Building and Running the demo

After installation, _ng-build_ and _ng-serve_ are your friends.  Build production or dev. as you see fit.  localhost:4200 to run the demo, at which point you should see the following.

![Image of Graph Marker Demo]
(http://algorithmist.net/image/graphmarker.jpg)

The 400x400 Canvas has been assigned the coordinate space (-5,5) horizontally and (-4,4) vertically with a y-up orientation as is common with function graphs.  The top-left corner is (-5,4) and the bottom-right corner corresponds to (5,-4).  The red circular marker is placed at the center of the 'coordinate' space based on TSMT$Axis instances with min and max extents set to the appropriate ranges for the horiztonal and vertical range.

The current x- and y-coordinates (in graph, not Canvas coordinates) are queried and displayed below the Canvas.  Drag the marker to change the coordinates.  

The scale may be changed to (-10,10) and (-8,8) by clicking the 'Zoom' button.  Click again to toggle back to the original coordinate extents.  Note that it is possible to move the marker too far to one end of the Canvas and then zoom-in and the marker will disappear.  That is because the marker is not supposed to be visible with the new axis extents.  A graph marker handler function is executed whenever the axis min or max changes.  This automatically repositions the marker for the newly assigned coordinates.

The graph marker is most often used as part of the Typescript Math Toolkit function graphing engine.  This demo, however, illustrates that it can be used in a standalone context with TSMT$Axis instances to represent horiztonal and vertical ranges.

The demo has been tested in late-model Chrome on a Mac. 


## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

License
----

Apache 2.0

**Free Software? Yeah, Homey plays that**

[//]: # (kudos http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

[The Algorithmist]: <http://algorithmist.net>
