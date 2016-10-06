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
 * Typescript Math Toolkit: numbereractive Graph Marker.  A graph marker is a circular item rendered on top of a function graph to mark specific points in graph coordinates.
 * Other points in the graph may be queried by dragging and dragging is constrained to graph bounds.  Call the create() factory method to create a new marker.
 *
 * The Graph Marker is created on top of EaselJS, which is a hard dependency
 *
 * @author Jim Armstrong (www.algorithmist.net)
 * 
 * @version 1.0
 */

 // Graph axes from which the marker boundaries are determined
 import {TSMT$Axis} from './graphing/Axis';

 export class TSMT$GraphMarker
 {
   private _markerShape: createjs.Shape = null;       // direct reference to the marker shape
   private _stage: createjs.Stage       = null;       // direct reference to the CreateJS stage
   private _x: number                   = 0;          // current x-coordinate in graph coordinates
   private _y: number                   = 0;          // current y-coordinate in graph coordinates

   // subscribers to marker interactive updates
   private _subscribers: Array<Function>;
 
   // cache axis information
   private _xAxis: TSMT$Axis;                         // direct reference to x-axis information
   private _yAxis: TSMT$Axis;                         // direct reference to y-axis information
   private _xLen: number = 0;                         // length of x-axis in px
   private _yLen: number = 0;                         // length of y-axis in px

   constructor()
   {
     this._subscribers = new Array<Function>();
   }

  /**
   * Create a new GraphMarker
   * 
   * @param stage : Stage - Reference to user-created EaselJS Stage
   * 
   * @param radius : number - Radius of the graph marker in pixels
   * 
   * @param xAxis: TSMT$Axis - Reference to the graph x-axis
   * 
   * @param yAxis: TSMT$Axis - Reference to the graph y-axis
   * 
   * @param xAxisLength: number - Length of the x-axis in pixels
   * 
   * @param yAxisLength: number - Length of the y-axis in pixels
   * 
   * @param color: string - CSS color code, i.e. "#ffffff"
   * @default "#ff0000"
   * 
   * @return Nothing - The GraphMarker is interactive.  Place the marker using the coordinate setters and then move the marker across the graph area
   * to send the x- and y-coordinates to the callback function.  The marker assigns a callback to each of the axis instances to quickly react to changes
   * in the axis min. and max. extents.
   */
   public create(stage: createjs.Stage, radius: number=10, xAxis: TSMT$Axis, xAxisLength: number, yAxis: TSMT$Axis, yAxisLength: number, color: string="#ff0000"): void 
   {
     if (stage == null || xAxis == null || yAxis == null || xAxisLength < 1 || yAxisLength < 1)
       return;
    
     this._stage = stage;
     this._xAxis = xAxis;
     this._yAxis = yAxis;
     this._xLen  = xAxisLength;
     this._yLen  = yAxisLength;

     this._xAxis.callback = (min: number, max: number) => this.__onXAxisChanged(min, max);
     this._yAxis.callback = (min: number, max: number) => this.__onYAxisChanged(min, max);

     this._stage.enableMouseOver(10);
    
     this._markerShape        = new createjs.Shape();
     this._markerShape.cursor = 'pointer';
     let g: createjs.Graphics = this._markerShape.graphics;
     g.clear();
     g.beginFill(color);
     g.drawCircle(0,0,radius);
     g.endFill();
    
     stage.addChild(this._markerShape);
     stage.update();
    
     this._markerShape.addEventListener( 'pressmove', (evt: any) => {this.__onPressMove(evt)} );
   }
  
  /**
   * Access the current x-coordinate in graph coordinates
   *
   * @return number - Current x-value in graph coordinates
   */
   public get x(): number
   {
     return this._x;
   }

  /**
   * Access the current y-coordinate in graph coordinates
   *
   * @return number - Current y-value in graph coordinates
   */
   public get y(): number
   {
     return this._y;
   }

  /**
   * Assign the x-coordinate of the marker 
   * 
   * @param value: number - x-coordinate (in graph units) to place the marker.  For example, if the x-axis goes from 1.0 to 9.5, place the graph marker at x = 2.75.
   * 
   * @return Nothing - the marker is placed at the specified x-coordinate and the most recently assigned y-coordinate and the stage is updated.
   */
   public set x(value: number)
   { 
     if (this._markerShape && this._xAxis)
     {
       // compute the pixel coordinate based on the user coordinate
       let left: number = this._xAxis.min;
       let px: number   = this._xLen/(this._xAxis.max - left);

       this._markerShape.x = (value-left)*px;
       this._x            = value;

       this._stage.update();
     }
   }
  
  /**
   * Assign the y-coordinate of the marker 
   * 
   * @param value: number - y-coordinate (in graph units) to place the marker.  For example, if the y-axis goes from 0 to 10, place the marker at y = 5.25.
   * 
   * @return Nothing - The marker is placed at the specified y-coordinate and the most recently assigned x-coordinate and the stage is updated.
   */
   public set y(value: number)
   {
     if (this._markerShape && this._yAxis)
     {
       // compute the pixel coordinate based on the user coordinate
       let top: number = this._yAxis.max;
       let px: number  = this._yLen/(top - this._yAxis.min);
    
       this._markerShape.y = (top-value)*px;
       this._y             = value;

       this._stage.update();
     }
   }

  /**
   * Add a subscriber to react to interactive marker movement
   *
   * @param subscriber : Function Function that takes two numerical arguments, the x- and y-coordinates in graph space (not Canvas coordinates) of the new marker
   * position.
   *
   * @return Nothing The subscriber is added to the subscription list.
   */
   public addSubscriber(subscriber: Function): void
   {
     if (subscriber)
       this._subscribers.push(subscriber);
   }

   // handle press-move event
   private __onPressMove(evt: any): void
   {
     this._markerShape.x  = evt.stageX;
     this._markerShape.y  = evt.stageY;

     // compute the new x- and y-coordinates in user space and use them as arguments to the callback function
     let left: number = this._xAxis.min;
     let px: number   = this._xLen/(this._xAxis.max - left);
     this._x          = this._markerShape.x/px + left;
        
     let top: number  = this._yAxis.max;
     px               = this._yLen/(top - this._yAxis.min);
     this._y          = top - this._markerShape.y/px;

     // let all subscribers react to the update
     let len: number = this._subscribers.length;
     if (len > 0)
     {
       let i: number;

       for (i=0; i<len; ++i)
         this._subscribers[i](this._x, this._y);
     }

     this._stage.update();
   }

   // handle axis min/max changes
   private __onXAxisChanged(min: number, max: number): void
   {
     // reset the current x-value based on new axis extents
     this.x = this._x;
   }

   private __onYAxisChanged(min: number, max: number): void
   {
     // reset the current y-value based on new axis extents
     this.y = this._y;
   }
 
   // cleanup the marker 
   private __cleanup(): void
   {
     if (this._markerShape && this._stage)
     {
       this._stage.removeChild(this._markerShape);  

       if (this._markerShape.hasEventListener('pressmove'))
         this._markerShape.removeEventListener('pressmove', this.__onPressMove);
     }
   }
 }