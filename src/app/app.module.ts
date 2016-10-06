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
 * This is the root application module for the Typescript Math Toolkkit GraphMarker demo.
 *
 * @author Jim Armstrong (www.algorithmist.net)
 * 
 * @version 1.0
 */

// platform imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule      } from '@angular/core';

// components and directives
import { AppComponent            } from './app.component';
import { CanvasSelectorDirective } from './canvas-selector.directive';

// this is a convenience to isolate the declarations of a module into separate definitions
export const graphMarkerComponents = [
  AppComponent
];

export const graphMarkerDirectives = [
  CanvasSelectorDirective
];

export const graphMarkerPipes = [
];

@NgModule({
  declarations: [
    ...graphMarkerComponents,
    ...graphMarkerDirectives,
    ...graphMarkerPipes
  ],

  imports: [
    BrowserModule
  ],

  providers: [],

  bootstrap: [AppComponent]
})

export class AppModule { }
