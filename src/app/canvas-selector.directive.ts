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
 * A Directive to select a Canvas element that avoids adding to markup to identify the canvas.  An EaselJS stage is create from the canvas reference,
 * thus isolating Canvas selection and related manipulation from a Component.
 */

 // platform imports
 import { Directive
        , AfterViewInit
        , ElementRef
        } from '@angular/core';

 @Directive({
  selector: 'canvas'
 })

 export class CanvasSelectorDirective implements AfterViewInit
 {
   private _canvas: HTMLCanvasElement;  // direct reference to the canvas

   constructor(private _elRef: ElementRef)
   {
   }

   // angular2 life cycle event
   public ngAfterViewInit()
   {
     this._canvas = <HTMLCanvasElement> this._elRef.nativeElement;
   }

  /**
   * Create an easeljs stage from the cavas reference
   *
   * @return createjs.Stage Stage reference or null if no canvas is defined
   */
   public createStage(): createjs.Stage
   {
     return this._canvas ? new createjs.Stage(this._canvas) : null;
   }

  /**
   * Access the canvas width
   * 
   * @return number Canvas width or zero if the internal Canvas reference is not yet defined
   */
   public get width(): number
   {
     return this._canvas ? this._canvas.width : 0;
   }

  /**
   * Access the canvas height
   * 
   * @return number Canvas height or zero if the internal Canvas reference is not yet defined
   */
   public get height(): number
   {
     return this._canvas ? this._canvas.height : 0;
   }
 }