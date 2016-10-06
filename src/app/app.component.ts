/** 
 * Copyright 2016 Jim Armstrong (www.algorithmist.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Typescript Math Toolkit GraphMarker demo.  A GraphMarker is a circular, draggable sprite that can be overlaid on top of a function graph.  When moved, it
 * converts pixel location in a Canvas to graph coordiantes.  The marker may also be used outside of a function graph as long as Typescript Math Toolkit Axes 
 * are available to define the coordinate extents of the canvas (i.e. top-left and bottom-right).  
 *
 * The Graph Marker is created on top of EaselJS, which is a hard dependency
 *
 * @author Jim Armstrong (www.algorithmist.net)
 * 
 * @version 1.0
 */

 // platform imports
 import { Component 
        , OnInit 
        , AfterViewInit
        , ViewChild
        } from '@angular/core';

 // Canvas selector (all canvas-related operations)
 import {CanvasSelectorDirective} from './canvas-selector.directive';

 // Typescript Math Toolkit imports
 import {TSMT$Axis       } from './shared/graphing/Axis'; // An Axis is a representation of an axis in computational form only (i.e. no visual representation)
 import {TSMT$GraphMarker} from './shared/GraphMarker';   // Alpha version of the Typescript Math Toolkit GraphMarker 

 @Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
 })

 export class AppComponent implements OnInit, AfterViewInit
 {
   private _xAxis: TSMT$Axis;         // the x-axis or horzontal extent of the Canvas
   private _yAxis: TSMT$Axis;         // the y-axis or vertical extent of the Canvas
   private _marker: TSMT$GraphMarker; // reference to the graph marker
   private _markerX: string;          // internal reference to marker x-coordinate in graph or user coordinates, not Canvas pixel coordinates
   private _markerY: string;          // internal reference to marker y-coordinate in graph or user coordinates, not Canvas pixel coordinates

   // top-left and bottom-right bounds of graph space
   private _top: string;
   private _left: string;
   private _bottom: string;
   private _right: string;

   // zoom direction context
   private _dir: string = 'Out';

   // access the canvas selector
   @ViewChild(CanvasSelectorDirective) _canvasSelector: CanvasSelectorDirective;

   constructor()
   {
     // define a boundary (top-left to bottom-right) in real coordinates for the Canvas - the boundary is hardcoded for this demo
     this._xAxis = new TSMT$Axis();
     this._yAxis = new TSMT$Axis();

     this.__setAxes(-5, 5, -4, 4);

     this._markerX = (0.5*(this._xAxis.min + this._xAxis.max)).toFixed(2);
     this._markerY = (0.5*(this._yAxis.min + this._yAxis.max)).toFixed(2);

     // instantiate the marker - it will be fully created and display later in the life cycle with a factory method
     this._marker = new TSMT$GraphMarker();  
   }

   // life-cyle method - post-component creation
   public ngOnInit()
   {
   }

   // life cycle method - after view init
   public ngAfterViewInit()
   {
     // create the stage and use the GraphMarker factory to create the marker using the default red color
     let stage: createjs.Stage = this._canvasSelector.createStage();

     this._marker.create(stage, 10 , this._xAxis, this._canvasSelector.width, this._yAxis, this._canvasSelector.height);

     // position the marker at the center of the coordinate system
     this._marker.x = 0.5*(this._xAxis.min + this._xAxis.max);
     this._marker.y = 0.5*(this._yAxis.min + this._yAxis.max);

     this._marker.addSubscriber( (x:number, y:number) => this.__onMarkerMoved(x, y) );  
   }

   // react to interactive marker updates
   private __onMarkerMoved(x: number, y: number): void
   {
     this._markerX = x.toFixed(2);
     this._markerY = y.toFixed(2);
   }

   // assign axis values and binding variables
   private __setAxes(xMin: number, xMax: number, yMin: number, yMax: number): void
   {
     this._xAxis.min = xMin;
     this._xAxis.max = xMax;
     this._yAxis.min = yMin;
     this._yAxis.max = yMax;

     this._top     = this._yAxis.max.toString();
     this._left    = this._xAxis.min.toString();
     this._bottom  = this._yAxis.min.toString();
     this._right   = this._xAxis.max.toString(); 
   }

   // 'zoom' click handler
   private __onZoom(): void
   {
     if (this._dir.toLowerCase() == "out")
     {
       this.__setAxes(-10, 10, -8, 8);
       this._dir = "In ";
     }
     else
     {
       this.__setAxes(-5, 5, -4, 4);
       this._dir = "Out";
     }
   }
 }
