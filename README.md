# entrel.js
entrel.js is Javascript Library for creating ERDs with simple Javascript methods. This library is built on the obfc.js library. 

# Usage
Import <a href="https://www.e-adys.com/obfc-js/object-based-flow-charts-obfc-js/" target="_blank" rel="noopener">obfc</a>, entrel and <a href="https://www.e-adys.com/web_tasarimi_programlama/animation-for-your-web-pages/" target="_blank" rel="noopener">animation</a> libraries to your web page.

```javascript
<script src="obfc.min.js"></script>
<script src="entrel.min.js"></script> 
<script src="animation.min.js"></script>
```

There are two main attribute for creating diyagrams as FlatLine and Entity. The following code is a simple example:

```javascript
prepare_SVG("demo");
//Entity and Desicion
var object1 = add_theObject(new Entity(300, 350, 0.75, "Books", [null, null, null, null, null, "BookID(PK)", "Title"], 11));
 var object2 = add_theObject(new Entity(65, 150, 0.75, "Authors", [null, "AuthorID(PK)", "AName", "ASurname"], 11));
 var object3 = add_theObject(new Entity(300, 150, 0.75, "Types", [null, "TypeID(PK)", "TName"], 16));
 var object4 = add_theObject(new Entity(500, 150, 0.75, "Publishers", [null, "PubID(PK)", "PName", "Location"], 11));
 var object5 = add_theObject(new Decision(65, 250, 0.75, ["R1"], 12));
 var object6 = add_theObject(new Decision(300, 250, 0.75, ["R2"], 12));
 var object7 = add_theObject(new Decision(500, 250, 0.75, ["R3"], 12));

//Lines
var o_line1 = draw_theLine(new FlatLine(object2, object5, null, null, "N"));
var o_line2 = draw_theLine(new FlatLine(object5, object1, 1, 2, "N"));
var o_line3 = draw_theLine(new FlatLine(object3, object6, null, null, "N"));
var o_line4 = draw_theLine(new FlatLine(object6, object1, null, null, "N"));
var o_line5 = draw_theLine(new FlatLine(object4, object7, null, null, "N"));
var o_line6 = draw_theLine(new FlatLine(object7, object1, 1, 3, "1"));

//Animation 
var groups = [object1, [object5, object2], [o_line1, o_line2], [object6, object3], [o_line3, o_line4], [object7, object4], [o_line5, o_line6]];
prepareClassforAnimation(groups);
initializeAnimation(groups.length - 1);
```
Entity method derived from Process method of obfc.js. For understanding this object, you can examine this web page.

Entity(_middle_x, _middle_y, _size, _text, _attributes, _text_size, _weak, _description, _fill_color, _stroke_color, _text_color)

The fifth parameter contain extra information about attributes of an entity. You can define 8 attribute for an entity. For example:

[null, "AuthorID(PK)", "AuthorName", "AuthorSurName"]

The first attribute contain a null value so that it can be drawn. The first four attributes are in top and others are in bottom.

Weak parameter is used for  a weak entity that cannot be uniquely identified by its attributes alone.

FlatLine connects the objects. For more information enter this web page.

For creating animations, you can group the objects using an array. if two objects are together, these objects can be grouped together ([object5, object2]).

prepareClassforAnimation method prepares objects for animation. initializeAnimation method starts animation. 

Click for an <a href="https://www.e-adys.com/genel/entrel-js-creating-entity-relationship-diagrams-with-javascript-and-svg/" target="_blank" rel="noopener">example</a>.

# Publications
<b>Object-based Entity Relationship Diagram Drawing Library: EntRel.JS.</b> Uzun, E.; Yerlikaya, T.; and Kırat, O. In 7th International Scientific Conference “TechSys 2018” – Engineering, Technologies and Systems, Technical University of Sofia, Plovdiv Branch May 17-19, pages 114-119, 2018. 

<a href="https://www.e-adys.com/yayinlar/" target="_blank">Click for bibtex, downloads, all publications...</a>

# Licence
Copyright (c) 2018 Erdinç Uzun

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
