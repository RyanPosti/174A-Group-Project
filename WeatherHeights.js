import {defs, tiny} from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene, Texture,
} = tiny;

const { Cube, Axis_Arrows, Square, Textured_Phong } = defs;

export class WeatherHeights extends Scene {
    constructor() {
        // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
        super();

        // At the beginning of our program, load one of each of these shape definitions onto the GPU.
        this.shapes = {
            // Sun and Moon
            sun: new defs.Subdivision_Sphere(5),
            moon: new (defs.Subdivision_Sphere.prototype.make_flat_shaded_version())(2),
            
            // Environment
            block: new defs.Cube(),
            ground: new defs.Cube(),
            rain_drop: new defs.Subdivision_Sphere(4),
            pc: new defs.Cube(),
            snowflake: new defs.Subdivision_Sphere(4),

            // Building
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
        };

        this.shapes.ground.arrays.texture_coord.forEach(
            (v, i, l) => {
                v[0] = 100 * v[0];
                v[1] = 100 * v[1];
            }
        )
        this.shapes.rain_drop.arrays.texture_coord.forEach(
            (v, i, l) => {
                v[0] = 5 * v[0];
                v[1] = 5 * v[1];
            }
        )
        this.shapes.snowflake.arrays.texture_coord.forEach(
            (v, i, l) => {
                v[0] = 5 * v[0];
                v[1] = 5 * v[1];
            }
        )

        // *** Materials
        this.materials = {
            // Sun and Moon
            sun: new Material(new defs.Phong_Shader(),
                    {ambient: 1, diffusivity: 1, color: hex_color("#ECBD2C")}),
            moon: new Material(new defs.Phong_Shader(),
                    {ambient: 0, diffusivity: 1, color: hex_color("#FFFFFF"), specularity: 1}),
            
            // Environment
            grass: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1,
                texture: new Texture("assets/grass.png")
            }),
            water: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1,
                texture: new Texture("assets/rain.jpg")
            }),
            test: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#ffffff")}),
            snow: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1,
                texture: new Texture("assets/snow.jpg")
            }),
            // Building
            phong: new Material(new Textured_Phong(), {
                color: hex_color("#ffffff"),
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
                texture: new Texture("assets/grass.png")
            }),

            Gray_Wood:new Material(new Textured_Phong(),{
                color: hex_color("#808080"),
                ambient: 0.05, diffusivity: 1, specularity: 1,
                textures: new Texture("assets/grass.png")
            }),
            Glass: new Material (new Textured_Phong(), {
                color: hex_color("#ffffff"),
                ambient: 0.25, diffusivity: 1, specularity: 1,
                textures: new Texture("assets/grass.png")
            }),
            
            Tinted_Glass: new Material (new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 0.1, diffusivity: 1, specularity: 1,
                textures: new Texture("assets/grass.png")
            })
            
        }

        this.initial_camera_location = Mat4.look_at(vec3(0, 100, 1), vec3(0, 0, 0), vec3(0, 1, 0));
        // Initial Position of the planets
        this.sun_transform = Mat4.identity().times(Mat4.translation(20, 0, 0));
        this.moon_transform = Mat4.identity().times(Mat4.translation(-20, 0, 0));

        this.pc = {
            pos: Mat4.identity(),
        }
        this.rain = [];
        for (let i = 0; i < 300; i++) {
            this.rain.push({
                time: [0, 0],
                falling: false,
                is_puddle: false,
                pos: [0, 0, 0],
            });
            this.rain[i].time[1] += 5 * Math.random();
        }
        this.snow = [];
        for (let i = 0; i < 300; i++) {
            this.snow.push({
                time: [0, 0],
                falling: false,

                pos: [0, 0, 0],
            });
            this.snow[i].time[1] += 5 * Math.random();
        }
        this.pc = {
            pos: Mat4.identity().times(Mat4.translation(0, -1.3, 8, 1)).times(Mat4.scale(0.1, 0.1, 0.1)),
        }
    }

    PC_Control = class extends defs.Movement_Controls {
        constructor() {
            super();
        }
        make_control_panel() {
            // make_control_panel(): Sets up a panel of interactive HTML elements, including
            // buttons with key bindings for affecting this scene, and live info readouts.
            this.control_panel.innerHTML += "Click and drag the scene to spin your viewpoint around it.<br>";
            this.live_string(box => box.textContent = "- Position: " + this.pos[0].toFixed(2) + ", " + this.pos[1].toFixed(2)
                + ", " + this.pos[2].toFixed(2));
            this.new_line();
            // The facing directions are surprisingly affected by the left hand rule:
            this.live_string(box => box.textContent = "- Facing: " + ((this.z_axis[0] > 0 ? "West " : "East ")
                + (this.z_axis[1] > 0 ? "Down " : "Up ") + (this.z_axis[2] > 0 ? "North" : "South")));
            this.new_line();
            this.new_line();

            this.key_triggered_button("Up", [" "], () => this.thrust[1] = -1, undefined, () => this.thrust[1] = 0);
            // this.key_triggered_button("Forward", ["i"], () => this.thrust[2] = 1, undefined, () => this.thrust[2] = 0);
            // this.new_line();
            // this.key_triggered_button("Left", ["j"], () => this.thrust[0] = 1, undefined, () => this.thrust[0] = 0);
            // this.key_triggered_button("Back", ["k"], () => this.thrust[2] = -1, undefined, () => this.thrust[2] = 0);
            // this.key_triggered_button("Right", ["l"], () => this.thrust[0] = -1, undefined, () => this.thrust[0] = 0);
            // this.new_line();
            this.key_triggered_button("Down", ["z"], () => this.thrust[1] = 1, undefined, () => this.thrust[1] = 0);
            
            const speed_controls = this.control_panel.appendChild(document.createElement("span"));
            speed_controls.style.margin = "30px";
            this.key_triggered_button("-", ["o"], () =>
                this.speed_multiplier /= 1.2, undefined, undefined, undefined, speed_controls);
            this.live_string(box => {
                box.textContent = "Speed: " + this.speed_multiplier.toFixed(2)
            }, speed_controls);
            this.key_triggered_button("+", ["p"], () =>
                this.speed_multiplier *= 1.2, undefined, undefined, undefined, speed_controls);
            this.new_line();
            this.key_triggered_button("Roll left", [","], () => this.roll = 1, undefined, () => this.roll = 0);
            this.key_triggered_button("Roll right", ["."], () => this.roll = -1, undefined, () => this.roll = 0);
            this.new_line();
            this.key_triggered_button("(Un)freeze mouse look around", ["f"], () => this.look_around_locked ^= 1, "#8B8885");
            this.new_line();
            this.key_triggered_button("Go to world origin", ["r"], () => {
                this.matrix().set_identity(4, 4);
                this.inverse().set_identity(4, 4)
            }, "#8B8885");
            this.new_line();

            this.key_triggered_button("Look at origin from front", ["1"], () => {
                this.inverse().set(Mat4.look_at(vec3(0, 0, 10), vec3(0, 0, 0), vec3(0, 1, 0)));
                this.matrix().set(Mat4.inverse(this.inverse()));
            }, "#8B8885");
            this.new_line();
            this.key_triggered_button("from right", ["2"], () => {
                this.inverse().set(Mat4.look_at(vec3(10, 0, 0), vec3(0, 0, 0), vec3(0, 1, 0)));
                this.matrix().set(Mat4.inverse(this.inverse()));
            }, "#8B8885");
            this.key_triggered_button("from rear", ["3"], () => {
                this.inverse().set(Mat4.look_at(vec3(0, 0, -10), vec3(0, 0, 0), vec3(0, 1, 0)));
                this.matrix().set(Mat4.inverse(this.inverse()));
            }, "#8B8885");
            this.key_triggered_button("from left", ["4"], () => {
                this.inverse().set(Mat4.look_at(vec3(-10, 0, 0), vec3(0, 0, 0), vec3(0, 1, 0)));
                this.matrix().set(Mat4.inverse(this.inverse()));
            }, "#8B8885");
            this.new_line();
            this.key_triggered_button("Attach to global camera", ["Shift", "R"],
                () => {
                    this.will_take_over_graphics_state = true
                }, "#8B8885");
            this.new_line();
        }
    };

    make_control_panel() {
        this.key_triggered_button("Move forward", ["w"], () => {
            if (!this.is_environment_collision(this.pc.pos.times(Mat4.translation(0, 0, -1, 1)))) {
                this.pc.pos = this.pc.pos.times(Mat4.translation(0, 0, -1, 1));
            }
        });
        this.key_triggered_button("Move backward", ["s"], () => {
            if (!this.is_environment_collision(this.pc.pos.times(Mat4.translation(0, 0, 1, 1)))) {
                this.pc.pos = this.pc.pos.times(Mat4.translation(0, 0, 1, 1));
            }
        });
        this.new_line();
        this.key_triggered_button("Move left", ["a"], () => {
            if (!this.is_environment_collision(this.pc.pos.times(Mat4.translation(-1, 0, 0, 1)))) {
                this.pc.pos = this.pc.pos.times(Mat4.translation(-1, 0, 0, 1));
            }
        });
        this.key_triggered_button("Move right", ["d"], () => {
            if (!this.is_environment_collision(this.pc.pos.times(Mat4.translation(1, 0, 0, 1)))) {
                this.pc.pos = this.pc.pos.times(Mat4.translation(1, 0, 0, 1));
            }
        });
        this.new_line();
        this.key_triggered_button("Rotate left", ["j"], () => this.pc.pos = this.pc.pos.times(Mat4.rotation(0.1, 0, 1, 0)));
        this.key_triggered_button("Rotate right", ["l"], () => this.pc.pos = this.pc.pos.times(Mat4.rotation(0.1, 0, -1, 0)));

        // Control of the Times
        this.new_line;
        this.key_triggered_button("Sunrise", ["k"], () => {
            this.sun_transform = Mat4.identity().times(Mat4.translation(-20, -15, 0));
            this.moon_transform = Mat4.identity().times(Mat4.translation(20, 15, 0));
        });
        this.new_line;
        this.key_triggered_button("Noon", ["n"], () => {
            this.sun_transform = Mat4.identity().times(Mat4.translation(0, 20, 0));
            this.moon_transform = Mat4.identity().times(Mat4.translation(0, -20, 0));
        });
        this.new_line;
        this.key_triggered_button("Sunset", ["e"], () => {
            this.sun_transform = Mat4.identity().times(Mat4.translation(20, 15, 0));
            this.moon_transform = Mat4.identity().times(Mat4.translation(-20, -15, 0));
        });
        this.new_line();
        this.key_triggered_button("Midnight", ["m"], () => {
            this.sun_transform = Mat4.identity().times(Mat4.translation(0, -20, 0));
            this.moon_transform = Mat4.identity().times(Mat4.translation(0, 20, 0));
        });
        this.new_line();
    }

    display(context, program_state) {
        // display():  Called once per frame of animation.
        // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new this.PC_Control());
            // Define the global camera and projection matrices, which are stored in program_state.
            program_state.set_camera(this.initial_camera_location);
        }

        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, .1, 1000);

        const t = program_state.animation_time / 1000, dt = program_state.animation_delta_time / 1000;

        // vars
        var sunSize = 10000;
        var orange = hex_color("#F5B21E");
        var white= hex_color("#ffffff");

        // Lighting
        //  - the parameters of the Light are: position, color, size
        program_state.lights = [
                                new Light(this.sun_transform.times(vec4(0, 0, 0, 1)), orange, 10 ** sunSize),
                                new Light(this.moon_transform.times(vec4(0, 0, 0, 1)), white, 10 ** sunSize)
                               ];

        // Sun                   
        let orbital_speed = 1;
        this.sun_transform = Mat4.rotation(orbital_speed/-200, 0, 0, 1).times(this.sun_transform);
        this.shapes.sun.draw(context, program_state, this.sun_transform, this.materials.sun);

        // Moon
        this.moon_transform = Mat4.rotation(orbital_speed/-200, 0, 0, 1).times(this.moon_transform);
        this.shapes.moon.draw(context, program_state, this.moon_transform, this.materials.moon);
        
        // Environment
        this.draw_building(context, program_state);
        this.draw_map(context, program_state);
        this.draw_rain(context, program_state);
        this.draw_snow(context, program_state);
        this.draw_pc(context, program_state);
    }

    draw_building(context, program_state){
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
    }

    draw_map(context, program_state) {
        const grass_transform = Mat4.identity().times(Mat4.translation(0, -1.5, 0)).times(Mat4.scale(40, 0.1, 40));
        const river_transform = Mat4.identity().times(Mat4.translation(0, -1.51, 0)).times(Mat4.scale(140, 0.1, 140));
        this.shapes.ground.draw(context, program_state, grass_transform, this.materials.grass);
        this.shapes.ground.draw(context, program_state, river_transform, this.materials.water);
    }

    draw_pc(context, program_state) {
        this.shapes.pc.draw(context, program_state, this.pc.pos, this.materials.test);
        let desired = Mat4.inverse(this.pc.pos.times(Mat4.translation(0, 5, 17)).times(Mat4.rotation(0, 0, 1, 0)));
        program_state.camera_inverse = desired.map((x,i) => Vector.from(program_state.camera_inverse[i]).mix(x, 0.1))
    }

    draw_rain(context, program_state, t = program_state.animation_time / 1000) {
        for (let i = 0; i < this.rain.length; i++) {
            if (this.rain[i].falling === true) {
                const d = 100 - 0.5 * 9.8 *  Math.pow(t - this.rain[i].time[0], 2);
                const rain_transform = Mat4.translation(this.rain[i].pos[0], d, this.rain[i].pos[1]).times(Mat4.scale(0.2, 2, 0.2));
                this.shapes.rain_drop.draw(context, program_state, rain_transform, this.materials.water);
                if (d < 0) {
                    this.rain[i].falling = false;
                    // Time until rain stops being a puddle
                    this.rain[i].time[1] = t + 2 + 2 * Math.random();
                    this.rain[i].is_puddle = true;
                }
            }
            else if (this.rain[i].is_puddle === true) {
                const rain_transform = Mat4.translation(this.rain[i].pos[0], -1.4, this.rain[i].pos[1]).times(Mat4.scale(0.5, 0.1, 0.5));
                this.shapes.rain_drop.draw(context, program_state, rain_transform, this.materials.water);
                if (t > this.rain[i].time[1]) {
                    this.rain[i].is_puddle = false;
                }
            }
            else {
                if (t >= this.rain[i].time[1]) {
                    this.rain[i].falling = true;
                    this.rain[i].time[0] = t;
                    this.rain[i].pos = [0, 0, 0];
                    while (this.rain[i].pos[0] < 2 && this.rain[i].pos[0] > -2 && this.rain[i].pos[1] < 2.5 && this.rain[i].pos[1] > -2.5) {
                        this.rain[i].pos[0] = 80 * Math.random() - 40;
                        this.rain[i].pos[1] = 80 * Math.random() - 40;
                    }
                }
            }
        }
    }
    draw_snow(context, program_state, t = program_state.animation_time / 1000) {
        for (let i = 0; i < this.snow.length; i++) {
            if (this.snow[i].falling === true) {
                const d = 100 - 20 * (t - this.snow[i].time[0]);
                const snow_transform = Mat4.translation(this.snow[i].pos[0], d, this.snow[i].pos[1]).times(Mat4.scale(0.25, 0.5, 0.25));
                this.shapes.snowflake.draw(context, program_state, snow_transform, this.materials.snow);
                if (d < 0) {
                    this.snow[i].falling = false;
                    // Add delay before respawn
                    this.snow[i].time[1] = t + 2 + 2 * Math.random();
                    this.snow[i].is_puddle = true;
                }
            }
            else if (this.snow[i].is_puddle === true) {
                const snow_transform = Mat4.translation(this.snow[i].pos[0], -1.42, this.snow[i].pos[1]).times(Mat4.scale(0.5, 0.1, 0.5));
                this.shapes.snowflake.draw(context, program_state, snow_transform, this.materials.snow);
                if (t > this.snow[i].time[1]) {
                    this.snow[i].is_puddle = false;
                }
            }
            else {
                if (t >= this.snow[i].time[1]) {
                    this.snow[i].falling = true;
                    this.snow[i].time[0] = t;
                    this.snow[i].pos[0] = 80 * Math.random() - 40;
                    this.snow[i].pos[1] = 80 * Math.random() - 40;
                }
            }
        }
    }
    is_environment_collision(temp_pc_transform) {
        const pc_point = temp_pc_transform.times(vec4(0, 0, 0, 1));
        // check building collision
        if (pc_point[0] < 4.05 && pc_point[0] > -4.05 && pc_point[2] < 5.15 && pc_point[2] > -5.15) {
            return true;
        }
        // check map edge collision
        if (pc_point[0] > 39.5 || pc_point[0] < -39.5 || pc_point[2] > 39.5 || pc_point[2] < -39.5) {
            return true;
        }
        return false;
    }
}

