import {defs, tiny} from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene, Texture,
} = tiny;

const {Cube, Axis_Arrows, Textured_Phong, Square,} = defs

export class WeatherHeights extends Scene {
    /**
     *  **Base_scene** is a Scene that can be added to any display canvas.
     *  Setup the shapes, materials, camera, and lighting here.
     */
    constructor() {
        // constructor(): Scenes begin by populating initial values like the Shapes and Materials 
        super();

        this.shapes = {
            box_1: new Cube(),
            box_2: new Cube(),
            box_3: new Cube(),
            box_4: new Cube(),
            box_5: new Cube(),
            box_6: new Cube(),
            box_7: new Cube(),
            box_8: new Cube(),
            box_9: new Cube(),
            box_10: new Cube(),
            box_11: new Cube(),
            box_12: new Cube(),
            box_13: new Cube(),
            box_14: new Cube(),
            box_15: new Cube(),
            box_16: new Cube(),
            box_17: new Cube(),
            box_18: new Cube(),
            box_19: new Cube(),
            box_20: new Cube(),
            box_21: new Cube(),
            box_22: new Cube(),
            box_23:new Cube(),
            box_24:new Cube(),
            box_25: new Cube(),
            box_26: new Cube(),
            box_27: new Cube(),
            box_28: new Cube(),
            box_29: new Cube(),
            box_30: new Cube(),
            box_31: new Cube(),
            box_32: new Cube(),
            box_33: new Cube(),
            sqr_1: new Square(),
            sqr_2: new Square(),
            sqr_3:new Square(),
            sqr_4:new Square(),
            sqr_5: new Square(),
            sqr_6: new Square(),
            sqr_7:new Square(),
            sqr_8: new Square(),
            sqr_9: new Square(),
            sqr_10: new Square(),
            sqr_11: new Square(),
            sqr_12: new Square(),
            sqr_13: new Square(),
            floor: new Cube(),

            axis: new Axis_Arrows(),
   
        }

        console.log(this.shapes.box_1.arrays.texture_coord)

        this.materials = {
            phong: new Material(new Textured_Phong(), {
                color: hex_color("#ffffff"),
            }),
            brown: new Material(new Textured_Phong(),{
                color: hex_color("#b5651d")
            }),
            black: new Material(new Textured_Phong(), {
                color:hex_color("#000000")
            }),
            green: new Material(new Textured_Phong(),{
                color: hex_color("#0b6623")
            }),

            Wood: new Material(new Textured_Phong(), {
                color: hex_color("#cd7532"),
                ambient: 0.25, diffusivity: 0.05, specularity: 1,
                texture: new Texture("assets/wood.png")
            }),

            Gray_Wood:new Material(new Textured_Phong(),{
                color: hex_color("#808080"),
                ambient: 0.05, diffusivity: 1, specularity: 1,
                textures: new Texture("assets/gray_wood.png")
            }),
            Glass: new Material (new Textured_Phong(), {
                color: hex_color("#ffffff"),
                ambient: 0.25, diffusivity: 1, specularity: 1,
                textures: new Texture("assets/glass.png")
            }),
            
            Tinted_Glass: new Material (new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 0.1, diffusivity: 1, specularity: 1,
                textures: new Texture("assets/glass.png")
            })
        }


        this.initial_camera_location = Mat4.look_at(vec3(0, 10, 20), vec3(0, 0, 0), vec3(0, 1, 0));


        // Cube Positions

        this.box_1_transform= Mat4.identity().times(Mat4.scale(1,1.6,3));
        this.box_1_transform = this.box_1_transform.times(Mat4.translation(-2, 0.1, 0, 0));
        this.box_2_transform=Mat4.identity().times(Mat4.scale(0.5,1.5,2.5));
        this.box_2_transform = this.box_2_transform.times(Mat4.translation(-1, 0.02, 0, 0));
        this.box_3_transform= Mat4.identity().times(Mat4.scale(0.5,1.6,3));
        this.box_3_transform= this.box_3_transform.times(Mat4.translation(1,0.1,0,0));
        this.box_4_transform= Mat4.identity().times(Mat4.scale(0.5,1.6,2.3));
        this.box_4_transform= this.box_4_transform.times(Mat4.translation(3,0.1,0,0));
        this.box_5_transform=Mat4.identity().times(Mat4.scale(0.5,1.5,2.5));
        this.box_5_transform= this.box_5_transform.times(Mat4.translation(5,0,0.05,0));
        this.box_6_transform=Mat4.identity().times(Mat4.scale(0.1,1.1,3.1));
        this.box_6_transform=this.box_6_transform.times(Mat4.translation(29,-0.4,0.2,0));
        this.box_7_transform=Mat4.identity().times(Mat4.scale(0.91,1,3));
        this.box_7_transform=this.box_7_transform.times(Mat4.translation(2.1,-1,0,0));

        this.box_8_transform=Mat4.identity().times(Mat4.scale(1.1,0.05,3.4));
        this.box_8_transform=this.box_8_transform.times(Mat4.translation(-1.8,30,-0.1,0));
        this.box_9_transform=Mat4.identity().times(Mat4.scale(0.6,0.05,3));
        this.box_9_transform=this.box_9_transform.times(Mat4.translation(-1,30,-0.05,0));

        this.box_10_transform=Mat4.identity().times(Mat4.scale(0.5,0.1302,2.72));
        this.box_10_transform=this.box_10_transform.times(Mat4.translation(-1,12.525,0,0));

        this.box_11_transform=Mat4.identity().times(Mat4.scale(0.6,0.05,3.16));
        this.box_11_transform=this.box_11_transform.times(Mat4.translation(0.9,30,0,0));

        this.box_12_transform=Mat4.identity().times(Mat4.scale(1.2,0.05,3.2));
        this.box_12_transform=this.box_12_transform.times(Mat4.translation(1.7,30,-0.18,0));

        this.box_13_transform=Mat4.identity().times(Mat4.scale(0.5,0.130,2.5));
        this.box_13_transform=this.box_13_transform.times(Mat4.translation(5,12.525,0,0));

        this.box_14_transform=Mat4.identity().times(Mat4.scale(1.2,0.75,0.4));
        this.box_14_transform=this.box_14_transform.times(Mat4.translation(0,-0.93,-8,0));
        this.box_15_transform=Mat4.identity().times(Mat4.scale(1.2,1.6,0.34));
        this.box_15_transform=this.box_15_transform.times(Mat4.translation(0,0.1,-7.8,0));
        this.box_16_transform=Mat4.identity().times(Mat4.scale(1,1.60,2.9));
        this.box_16_transform=this.box_16_transform.times(Mat4.translation(2.05,0.1,-0.242,0));
        this.box_17_transform=Mat4.identity().times(Mat4.scale(1,1.6,0.4));
        this.box_17_transform=this.box_17_transform.times(Mat4.translation(-2,0.1,-8,0));
        this.box_18_transform=Mat4.identity().times(Mat4.scale(1,0.75,0.2));
        this.box_18_transform=this.box_18_transform.times(Mat4.translation(-2,-0.93,-19,0));
        this.box_19_transform=Mat4.identity().times(Mat4.scale(1,0.25,0.2));
        this.box_19_transform=this.box_19_transform.times(Mat4.translation(2,-1,16,0));
        
        this.box_20_transform=Mat4.identity().times(Mat4.scale(0.5,0.1,0.2));
        this.box_20_transform=this.box_20_transform.times(Mat4.translation(-4,1,16,0));

        this.box_21_transform=Mat4.identity().times(Mat4.scale(0.3,0.1,1));
        this.box_21_transform=this.box_21_transform.times(Mat4.translation(9.2,9,1.7,0));
        this.box_22_transform=Mat4.identity().times(Mat4.scale(1.2,0.1,1));
        this.box_22_transform=this.box_22_transform.times(Mat4.translation(0,-0.47,-3,0));
        this.box_23_transform=Mat4.identity().times(Mat4.scale(0.3,0.4,0.3));
        this.box_23_transform=this.box_23_transform.times(Mat4.translation(9.2,-1.5,4,0));
        this.box_24_transform=Mat4.identity().times(Mat4.scale(0.3,0.4,0.7));
        this.box_24_transform=this.box_24_transform.times(Mat4.translation(9.2,-1.5,-2,0));
        this.box_25_transform=Mat4.identity().times(Mat4.scale(0.3,0.4,0.7));
        this.box_25_transform=this.box_25_transform.times(Mat4.translation(9.2,2,-2,0));
        this.box_26_transform=Mat4.identity().times(Mat4.scale(0.3,0.4,0.7));
        this.box_26_transform=this.box_26_transform.times(Mat4.translation(-9.1,2,-2,0));
        this.box_27_transform=Mat4.identity().times(Mat4.scale(0.3,0.4,0.7));
        this.box_27_transform=this.box_27_transform.times(Mat4.translation(-9.1,-1.5,-2,0));
        this.box_28_transform=Mat4.identity().times(Mat4.scale(0.3,0.4,0.7));
        this.box_28_transform=this.box_28_transform.times(Mat4.translation(-9.1,-1.5,2,0));
        this.box_29_transform=Mat4.identity().times(Mat4.scale(0.3,0.4,0.7));
        this.box_29_transform=this.box_29_transform.times(Mat4.translation(-9.1,2,2,0));
        this.box_30_transform=Mat4.identity().times(Mat4.scale(4,0.25,0.1));
        this.box_30_transform=this.box_30_transform.times(Mat4.translation(0,-4.7,50,0));
        this.box_31_transform=Mat4.identity().times(Mat4.scale(0.1,0.25,5));
        this.box_31_transform=this.box_31_transform.times(Mat4.translation(-39,-4.7,0,0));
        this.box_32_transform=Mat4.identity().times(Mat4.scale(4,0.25,0.1));
        this.box_32_transform=this.box_32_transform.times(Mat4.translation(0,-4.7,-50,0));
        this.box_33_transform=Mat4.identity().times(Mat4.scale(0.1,0.25,5));
        this.box_33_transform=this.box_33_transform.times(Mat4.translation(39,-4.7,0,0));

        this.sqr_1_transform=Mat4.identity().times(Mat4.scale(0.3,0.6,1));
        this.sqr_1_transform=this.sqr_1_transform.times(Mat4.translation(-1.5,-1.2,2.55,0));
        this.sqr_2_transform=Mat4.identity().times(Mat4.scale(0.3,0.6,1));
        this.sqr_2_transform=this.sqr_2_transform.times(Mat4.translation(-1.5,1.2,2.55,0));
        this.sqr_3_transform=Mat4.identity().times(Mat4.scale(0.4,0.5,1));
        this.sqr_3_transform=this.sqr_3_transform.times(Mat4.translation(-5,-1.7,3.05,0));
        this.sqr_4_transform=Mat4.identity().times(Mat4.scale(0.4,0.5,1));
        this.sqr_4_transform=this.sqr_4_transform.times(Mat4.translation(-5,1.4,3.05,0));
        this.sqr_5_transform=Mat4.identity().times(Mat4.scale(0.43,1,1));
        this.sqr_5_transform=this.sqr_5_transform.times(Mat4.translation(1.15,0.2,3.05,0));
        this.sqr_6_transform=Mat4.identity().times(Mat4.scale(0.4,0.5,1));
        this.sqr_6_transform=this.sqr_6_transform.times(Mat4.translation(3.85,1,2.35,0));
        this.sqr_7_transform=Mat4.identity().times(Mat4.scale(0.7,1,1));
        this.sqr_7_transform=this.sqr_7_transform.times(Mat4.translation(3,-1,3.01));

        this.sqr_8_transform=Mat4.identity().times(Mat4.scale(0.4,0.3,1));
        this.sqr_8_transform=this.sqr_8_transform.times(Mat4.translation(-5,-2.3,-4.01,0));
        this.sqr_9_transform=Mat4.identity().times(Mat4.scale(0.4,0.3,1));
        this.sqr_9_transform=this.sqr_9_transform.times(Mat4.translation(-5,2.5,-3.61,0));
        this.sqr_10_transform=Mat4.identity().times(Mat4.scale(0.8,0.5,1));
        this.sqr_10_transform=this.sqr_10_transform.times(Mat4.translation(0,-1.8,-3.61,0));
        this.sqr_11_transform=Mat4.identity().times(Mat4.scale(0.6,0.4,1));
        this.sqr_11_transform=this.sqr_11_transform.times(Mat4.translation(0,1,-3.01,0));
        this.sqr_12_transform=Mat4.identity().times(Mat4.scale(0.4,0.3,1));
        this.sqr_12_transform=this.sqr_12_transform.times(Mat4.translation(5,-2.3,-3.61,0))
        this.sqr_13_transform=Mat4.identity().times(Mat4.scale(0.4,0.3,1));
        this.sqr_13_transform=this.sqr_13_transform.times(Mat4.translation(5,2.5,-3.61,0));

        this.floor_transform=Mat4.identity().times(Mat4.scale(10000,0.1,1000));
        this.floor_transform=this.floor_transform.times(Mat4.translation(0,-15,0,0));
        
    }
    draw_Function(context, program_state){
        //Boxes 1-6 Parts of the house
        this.shapes.box_1.draw(context, program_state, this.box_1_transform, this.materials.phong);            
        this.shapes.box_2.draw(context, program_state, this.box_2_transform, this.materials.Wood);
        this.shapes.box_3.draw(context,program_state,this.box_3_transform,this.materials.phong);
        this.shapes.box_4.draw(context, program_state, this.box_4_transform,this.materials.phong);
        this.shapes.box_5.draw(context, program_state, this.box_5_transform,this.materials.Wood);
        this.shapes.box_6.draw(context, program_state, this.box_6_transform, this.materials.Wood);
        //Garage
        this.shapes.box_7.draw(context, program_state, this.box_7_transform, this.materials.Gray_Wood);
        //Boxes 8-19 parts of the house
        this.shapes.box_8.draw(context,program_state,this.box_8_transform,this.materials.phong);
        this.shapes.box_9.draw(context,program_state,this.box_9_transform,this.materials.phong);
        this.shapes.box_10.draw(context, program_state, this.box_10_transform, this.materials.phong);  
        this.shapes.box_11.draw(context, program_state, this.box_11_transform, this.materials.phong); 
        this.shapes.box_12.draw(context, program_state, this.box_12_transform, this.materials.phong); 
        this.shapes.box_13.draw(context, program_state, this.box_13_transform, this.materials.phong); 
        this.shapes.box_14.draw(context, program_state, this.box_14_transform, this.materials.phong); 
        this.shapes.box_15.draw(context, program_state, this.box_15_transform, this.materials.phong); 
        this.shapes.box_16.draw(context, program_state, this.box_16_transform, this.materials.phong); 
        this.shapes.box_17.draw(context, program_state, this.box_17_transform, this.materials.phong); 
        this.shapes.box_18.draw(context,program_state,this.box_18_transform, this.materials.phong);
        // Front 2nd Floor Right Patio
        this.shapes.box_19.draw(context,program_state, this.box_19_transform, this.materials.Wood);
        //Front 2nd Floor Left Patio
        this.shapes.box_20.draw(context,program_state, this.box_20_transform, this.materials.Wood);
        //Window Front Wall Upper Right Corner to East Wall Upper Left Corner
        this.shapes.box_21.draw(context,program_state, this.box_21_transform, this.materials.Tinted_Glass);
        // Backyard 2nd Floor Patio
        this.shapes.box_22.draw(context,program_state, this.box_22_transform, this.materials.phong);
        //Window East Wall Lower Left
        this.shapes.box_23.draw(context,program_state, this.box_23_transform, this.materials.Tinted_Glass);
        //Window East Wall Lower Right
        this.shapes.box_24.draw(context,program_state, this.box_24_transform, this.materials.Tinted_Glass);
        //Window East Wall Upper Right
        this.shapes.box_25.draw(context,program_state, this.box_25_transform, this.materials.Tinted_Glass);
        //Window West Wall Upper Left Corner
        this.shapes.box_26.draw(context,program_state, this.box_26_transform, this.materials.Tinted_Glass);
        //Window West Wall Lower Left Corner
        this.shapes.box_27.draw(context,program_state, this.box_27_transform, this.materials.Tinted_Glass);
        //Window West Wall Lower Right Corner
        this.shapes.box_28.draw(context,program_state, this.box_28_transform, this.materials.Tinted_Glass);
        //Window West Wall Upper Right Corner
        this.shapes.box_29.draw(context,program_state, this.box_29_transform, this.materials.Tinted_Glass);
        //Fences
        this.shapes.box_30.draw(context, program_state,this.box_30_transform, this.materials.phong);
        this.shapes.box_31.draw(context, program_state,this.box_31_transform, this.materials.phong);
        this.shapes.box_32.draw(context, program_state,this.box_32_transform, this.materials.phong);
        this.shapes.box_33.draw(context, program_state,this.box_33_transform, this.materials.phong);
        //Front Door
        this.shapes.sqr_1.draw(context,program_state, this.sqr_1_transform, this.materials.Tinted_Glass);
        //Window Above Front Door
        this.shapes.sqr_2.draw(context, program_state, this.sqr_2_transform, this.materials.Tinted_Glass);
        //Window 2nd Floor Left Patio Door
        this.shapes.sqr_3.draw(context, program_state, this.sqr_3_transform, this.materials.Tinted_Glass);
        //Window Front Wall Upper Left Corner
        this.shapes.sqr_4.draw(context, program_state, this.sqr_4_transform, this.materials.Tinted_Glass);
        //Window to the Right of Front Door
        this.shapes.sqr_5.draw(context, program_state, this.sqr_5_transform, this.materials.Tinted_Glass);
        //Front 2nd Floor Right Patio Door
        this.shapes.sqr_6.draw(context, program_state, this.sqr_6_transform, this.materials.Tinted_Glass);
        //Garage Door
        this.shapes.sqr_7.draw(context, program_state, this.sqr_7_transform, this.materials.Tinted_Glass);
        //Window Back Wall Lower Right 
        this.shapes.sqr_8.draw(context, program_state, this.sqr_8_transform, this.materials.Tinted_Glass);
        //Window Back Wall Upper Right
        this.shapes.sqr_9.draw(context, program_state, this.sqr_9_transform, this.materials.Tinted_Glass);
        //1st Floor Backyard Patio Door
        this.shapes.sqr_10.draw(context, program_state, this.sqr_10_transform, this.materials.Tinted_Glass);
        //2nd Floor Backyard Patio Door
        this.shapes.sqr_11.draw(context, program_state, this.sqr_11_transform, this.materials.Tinted_Glass);
        //Window Back Wall Lower Left
        this.shapes.sqr_12.draw(context, program_state, this.sqr_12_transform, this.materials.Tinted_Glass);
        //Window Back Wall Upper Left
        this.shapes.sqr_13.draw(context, program_state, this.sqr_13_transform, this.materials.Tinted_Glass);
        //Floor
        this.shapes.floor.draw(context, program_state, this.floor_transform, this.materials.green);
    }


    display(context, program_state) {
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            // Define the global camera and projection matrices, which are stored in program_state.

            program_state.set_camera(Mat4.translation(0, 0, -8));
        }

        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, 1, 100);
        
        var light_position = vec4(10, 10, 10, 1);
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 10000)];

        let t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;
        let model_transform = Mat4.identity();


       this.draw_Function(context,program_state);
    }
}


