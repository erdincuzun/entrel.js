// Entity RelationShip Model
// entrel.js, v1.0
// Chen Style
// Copyright (c)2018 Erdinç Uzun
// Distributed under MIT license

function FlatLine(object1, object2, position1, position2, _text, _text_size, _description, _stroke_color, _text_color, _arrow) {
    Line.call(this, object1, object2, position1, position2, _text, _text_size, _description, _stroke_color, _text_color, false);

    this.Draw = function () {
        if (object1 == null || object2 == null)
            return ""; //object error so no line draw   

        var temp = this.selection1[0] + "," + this.selection1[1] + " " + this.selection2[0] + "," + this.selection2[1]; //en kýsa mesafe
        //no collision detection
        //temp = findObjectArrayLinecollision(temp); //all objects        
        //var temp2 = findLineArraycollision(temp); //all lines 
        this.LinesData = temp;

        temp = polyline_start + " \"" + temp + "\" " + polyline_end.replace("black", this.stroke_color);

        if (!this.arrow)
            temp = temp.replace("marker-end=\"url(#arrow)\"", "");

        if (this.text.length > 0) {
            var _mid_xy = this.findLongestLinePoint();
            temp += writeText(this.text, this.text_size, "normal", (_mid_xy[0] + 3), (_mid_xy[1] - 10), 30, _mid_xy[2], this.text_color);
        }


        var temp_end = "<g id=\"" + this.ID + "\" ";
        if (onclick_enabled)
            temp_end += "onclick=\"doClick_Object(evt)\" ";
        temp_end += "style=\"cursor:pointer\">";
        temp_end += temp;
        temp_end += "</g>";

        return temp_end;
    }
}

function Entity(_middle_x, _middle_y, _size, _text, _attributes, _text_size, _weak, _description, _fill_color, _stroke_color, _text_color) {
    Process.call(this, _middle_x, _middle_y, _size, _text, _text_size, _description, _fill_color, _stroke_color, _text_color);
    this.Name = "Entity";
    this.attributes = [];
    if (typeof _attributes === 'undefined' || _attributes == null)
        this.attributes = [];
    else if (typeof _attributes === 'string')
        this.attributes = [_attributes];
    else
        this.attributes = _attributes;

    if (typeof _weak === 'undefined' || _weak == null)
        _weak = false;

    this.Draw = function () {
        _stroke_width = 2;
        temp = "<g id=\"" + this.ID + "\" ";
        if (onclick_enabled)
            temp += "onclick=\"doClick_Object(evt)\" ";
        temp += "style=\"cursor:pointer\">";
        if (_weak) {
            _stroke_width = 1;
            temp += "<rect x=\"" + (this.start_x - 2) + "\" y=\"" + (this.start_y - 2) + "\" width=\"" + (this.width + 4) + "\" height=\"" + (this.height + 4) + "\" fill-opacity=\"0.0\" style=\"fill:" + this.fill_color + ";stroke:" + this.stroke_color + ";stroke-width:" + _stroke_width + "\" />";
        }
            
        temp += "<rect x=\"" + this.start_x + "\" y=\"" + this.start_y + "\" width=\"" + this.width + "\" height=\"" + this.height + "\" fill-opacity=\"0.0\" style=\"fill:" + this.fill_color + ";stroke:" + this.stroke_color + ";stroke-width:" + _stroke_width + "\" />";
        
        if (this.text.length > 0)
            temp += writeText(this.text, this.text_size, "normal", this.middle_x, this.middle_y, this.height, "center", _text_color);

        //attributes
        var _att_count = this.attributes.length;
        var division = this.width / 5;
        var att_start_x = this.start_x - (65 * _size);
        var att_start_y = this.start_y - (60 * _size);
        this.probable_x_y[0][0] = this.start_x;
        for (var i = 0; i < _att_count; i++) {
            if (!(typeof this.attributes[i] === 'undefined' || this.attributes[i] == null || this.attributes[i] == ""))
            {
                var _att_value = this.attributes[i];
                var _underline = false;
                var _derived = false;
                var _multivalued = false;
                if (_att_value.includes("(")) {
                    if (_att_value.includes("PK"))//primary key
                        _underline = true;
                    if (_att_value.includes("DE"))//derived
                        _derived = true;
                    if (_att_value.includes("MV"))//multivalued 
                        _multivalued = true;

                    _att_value = _att_value.replace(_att_value.substring(_att_value.lastIndexOf("("), _att_value.lastIndexOf(")") + 1), "");
                }

                var object_att = new theAttribute(att_start_x, att_start_y, this.size, _att_value, this.text_size, null, _fill_color, _stroke_color, _text_color, _underline, _derived, _multivalued);
                object_att.ID = "Object_" + (object_array.length + 1);
                object_array.push(object_att);
                temp += object_att.Draw();                
            }

            
            if (i <= 3) {
                this.probable_x_y[0][0] += (25 * _size);

                if (!(typeof this.attributes[i] === 'undefined' || this.attributes[i] == null || this.attributes[i] == "")) {
                    var innerLine = new FlatLine(this, object_att, 0, 1);
                    temp += innerLine.Draw();
                }
                
                att_start_x += (85 * _size);
                if (i == 3) {
                    att_start_x = this.start_x - (60 * _size);
                    att_start_y = this.start_y + this.height + (60 * _size);
                    this.probable_x_y[1][0] = this.start_x;
                }
            }
            else
            {
                this.probable_x_y[1][0] += (25 * _size);
                if (!(typeof this.attributes[i] === 'undefined' || this.attributes[i] == null || this.attributes[i] == "")) {
                    var innerLine = new FlatLine(this, object_att, 1, 0);
                    temp += innerLine.Draw();
                }                
                att_start_x += (85 * _size);
            }        
        }

        //re middle
        this.probable_x_y[0][0] = this.middle_x;
        this.probable_x_y[1][0] = this.middle_x;

        temp += "</g>";
        return temp;
    }
}

function theAttribute(_middle_x, _middle_y, _size, _text, _text_size, _description, _fill_color, _stroke_color, _text_color, _underline, _derived, _multivalued) {
    Process.call(this, _middle_x, _middle_y, _size, _text, _text_size, _description, _fill_color, _stroke_color, _text_color);
    this.Name = "Attribute";
    this.rx = 40 * _size;
    this.ry = 20 * _size;

    if (typeof _derived === 'undefined' || _derived == null)
        _derived = false;
    if (typeof _multivalued === 'undefined' || _multivalued == null)
        _multivalued = false;

    //bottom and top configuration
    this.probable_x_y[0][0] = this.middle_x;
    this.probable_x_y[0][1] = this.middle_y - this.height / 2 + (5 * _size);
    this.probable_x_y[1][0] = this.middle_x;
    this.probable_x_y[1][1] = this.middle_y + this.height / 2 - (5 * _size);

    this.Draw = function () {
        temp = "";
        _stroke_width = 2;
        if (_multivalued) {
            _stroke_width = 1;
            temp += "<ellipse cx=\"" + this.middle_x + "\" cy=\"" + this.middle_y + "\" rx=\"" + (this.rx + 2) + "\" ry=\"" + (this.ry + 2) + "\" fill-opacity=\"0.0\" style=\"fill:" + this.fill_color + ";stroke:" + this.stroke_color + ";stroke-width:" + _stroke_width + "\"";
            if (_derived)
                temp += " stroke-dasharray=\"5, 5\"";
            temp += " />";
        }        
        temp += "<ellipse cx=\"" + this.middle_x + "\" cy=\"" + this.middle_y + "\" rx=\"" + this.rx + "\" ry=\"" + this.ry + "\" style=\"fill:" + this.fill_color + ";stroke:" + this.stroke_color + ";stroke-width:" + _stroke_width + "\"";
        if (_derived)
            temp += " stroke-dasharray=\"5, 5\"";        
        temp += " />";

        if (this.text.length > 0)
            temp += writeText(this.text, this.text_size, "normal", this.middle_x, this.middle_y, this.height, "center", _text_color, _underline);
        return temp;
    }
}