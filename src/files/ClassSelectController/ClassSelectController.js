(function () {
    'use strict';

    var assets = {
        ClassSelectS: {
            frames: 1,
            fname: 'ClassSelectS.png',
            centreX: 400,
            centreY: 120
        },
        ClassSelectPortraitS: {
            frames: 20,
            fname: 'ClassSelectPortraitS_strip20.png',
            centreX: 26,
            centreY: 26
        },
        ClassSelectSpritesS: {
            frames: 20,
            fname: 'ClassSelectSpritesS_strip20.png',
            centreX: 0,
            centreY: 0
        },
        ScoutPortraitAnimationS: {
            frames: 26,
            fname: 'ScoutPortraitAnimationS_strip26.png',
            centreX: 26,
            centreY: 26
        },
        PyroPortraitAnimationS: {
            frames: 30,
            fname: 'PyroPortraitAnimationS_strip30.png',
            centreX: 26,
            centreY: 26
        },
        SoldierPortraitAnimationS: {
            frames: 28,
            fname: 'SoldierPortraitAnimationS_strip28.png',
            centreX: 26,
            centreY: 26
        },
        HeavyPortraitAnimationS: {
            frames: 18,
            fname: 'HeavyPortraitAnimationS_strip18.png',
            centreX: 26,
            centreY: 26
        },
        DemomanPortraitAnimationS: {
            frames: 40,
            fname: 'DemomanPortraitAnimationS_strip40.png',
            centreX: 26,
            centreY: 26
        },
        MedicPortraitAnimationS: {
            frames: 20,
            fname: 'MedicPortraitAnimationS_strip20.png',
            centreX: 26,
            centreY: 26
        },
        EngineerPortraitAnimationS: {
            frames: 38,
            fname: 'EngineerPortraitAnimationS_strip38.png',
            centreX: 26,
            centreY: 26
        },
        SpyPortraitAnimationS: {
            frames: 34,
            fname: 'SpyPortraitAnimationS_strip34.png',
            centreX: 26,
            centreY: 26
        },
        SniperPortraitAnimationS: {
            frames: 30,
            fname: 'SniperPortraitAnimationS_strip30.png',
            centreX: 26,
            centreY: 26
        },
        RandomPortraitAnimationS: {
            frames: 18,
            fname: 'RandomPortraitAnimationS_strip18.png',
            centreX: 26,
            centreY: 26
        }
    },
    canvas,
    ctx,
    alpha, done, Class, newclass, mousedclass, drawx = [], y, portraitAnimations = [], text = [],
    portraitAnimation, portraitAnimationFrame = 0, portraitAnimationSpeed = 0.4;

    function loadAssets(callback) {
        var numLoaded = 0, keys;

        keys = Object.keys(assets);
        keys.forEach(function (key) {
            var img, data;

            data = assets[key];

            img = document.createElement('img');
            img.onload = function () {
                numLoaded++;
                data.img = img;
                console.log('Loaded asset ' + key + ' [' + numLoaded + '/' + keys.length + ']');
                if (numLoaded === keys.length) {
                    callback();
                }
            };
            img.src = window.classSelectControllerImgDir + data.fname;
        });
    }

    function initCanvas() {
        canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 240;
        canvas.onmousemove = function (e) {
            mouse_x = e.pageX - canvas.offsetLeft;
            mouse_y = e.pageY - canvas.offsetTop;
        };
        document.body.appendChild(canvas);

        ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.mozImageSmoothingEnabled = false;
    }

    // GML functions and constants
    var c_white = 'white', fa_left = 'left', mouse_x = 0, mouse_y = 0;

    function ds_list_create() {
        return [];
    }

    function ds_list_add(list, item) {
        list.push(item);
    }

    function draw_set_color(colour) {
        ctx.fillStyle = colour;
    }

    function draw_set_halign(align) {
        ctx.textAlign = align;
    }

    function draw_sprite_ext(sprite, subimg, x, y, xscale, yscale, rot, color, alpha) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rot * Math.PI/180);
        ctx.globalAlpha = alpha;
        ctx.drawImage(sprite.img, (sprite.img.width / sprite.frames) * subimg, 0, (sprite.img.width / sprite.frames), sprite.img.height, 0 - sprite.centreX * xscale, 0 - sprite.centreY * yscale, (sprite.img.width / sprite.frames) * xscale, sprite.img.height * yscale);
        ctx.restore();
    }

    function draw_text(x, y, string) {
        ctx.fillText(string, x, y);
    }

    function draw_set_font(font) {
        ctx.font = font;
    }

    function onCreate() {
        /*alpha=0.01;
        characters = ds_list_create();*/
        alpha = 1;
        done = false;
        newclass=-1;
        mousedclass=-1
        
        drawx[0]=24;
        drawx[1]=64;
        drawx[2]=104;
        drawx[3]=156;
        drawx[4]=196;
        drawx[5]=236;
        drawx[6]=288;
        drawx[7]=328;
        drawx[8]=368;
        drawx[9]=420;

        /*y=-120;
        portraitAnimations[0]=ScoutPortraitAnimation;
        portraitAnimations[1]=PyroPortraitAnimation;
        portraitAnimations[2]=SoldierPortraitAnimation;
        portraitAnimations[3]=HeavyPortraitAnimation;
        portraitAnimations[4]=DemomanPortraitAnimation;
        portraitAnimations[5]=MedicPortraitAnimation;
        portraitAnimations[6]=EngineerPortraitAnimation;
        portraitAnimations[7]=SpyPortraitAnimation;
        portraitAnimations[8]=SniperPortraitAnimation;
        portraitAnimations[9]=RandomPortraitAnimation;*/
        y=120;
        portraitAnimations[0]=assets.ScoutPortraitAnimationS;
        portraitAnimations[1]=assets.PyroPortraitAnimationS;
        portraitAnimations[2]=assets.SoldierPortraitAnimationS;
        portraitAnimations[3]=assets.HeavyPortraitAnimationS;
        portraitAnimations[4]=assets.DemomanPortraitAnimationS;
        portraitAnimations[5]=assets.MedicPortraitAnimationS;
        portraitAnimations[6]=assets.EngineerPortraitAnimationS;
        portraitAnimations[7]=assets.SpyPortraitAnimationS;
        portraitAnimations[8]=assets.SniperPortraitAnimationS;
        portraitAnimations[9]=assets.RandomPortraitAnimationS;
        
        /*switch(global.myself.team) {
            case TEAM_RED:
                ds_list_add(characters, ScoutRed);
                ds_list_add(characters, PyroRed);
                ds_list_add(characters, SoldierRed);
                ds_list_add(characters, HeavyRed);
                ds_list_add(characters, DemomanRed);
                ds_list_add(characters, MedicRed);
                ds_list_add(characters, EngineerRed);
                ds_list_add(characters, SpyRed);
                ds_list_add(characters, SniperRed);
                break;
            case TEAM_BLUE:
                ds_list_add(characters, ScoutBlue);
                ds_list_add(characters, PyroBlue);
                ds_list_add(characters, SoldierBlue);
                ds_list_add(characters, HeavyBlue);
                ds_list_add(characters, DemomanBlue);
                ds_list_add(characters, MedicBlue);
                ds_list_add(characters, EngineerBlue);
                ds_list_add(characters, SpyBlue);
                ds_list_add(characters, SniperBlue);
                break;
            default:
                instance_destroy();
                exit;
        }*/
    }

    function onStep() {
        /*if(not done) {
            if(alpha<0.99) alpha = power(alpha,0.7);
            else alpha = 0.99;
            if y<120 y+=15;
            if y>120 y=120;
        }
        else {
            if(alpha>0.01) alpha = power(alpha,1/0.7);
            y-=15;
            if y < -120 instance_destroy();
        }*/

        /*xoffset = view_xview[0];
        yoffset = view_yview[0];*/
        var xoffset = 0, yoffset = 0;

        /*if mouse_x>xoffset+24 && mouse_x <xoffset+60 && mouse_y<yoffset+50{*/
        if (mouse_x>xoffset+24 && mouse_x <xoffset+60 && mouse_y<yoffset+50){
            newclass=0;
            text[0]="Runner";
            text[1]="Weapon: Scattergun";
            text[2]="Quick as the wind, the Runner";
            text[3]="excels in recovering objectives.";
            text[4]="He can double jump in mid-air.";
        }

        /*else if mouse_x>xoffset+64 && mouse_x <xoffset+100 && mouse_y<yoffset+50{*/
        else if (mouse_x>xoffset+64 && mouse_x <xoffset+100 && mouse_y<yoffset+50){
            newclass=1;
            text[0]="Firebug";
            text[1]="Weapon: Flamethrower";
            text[2]="Gets close to burn his foes.";
            text[3]="Pushes enemies and projectiles";
            text[4]="away with a burst of air.";
        }

        /*else if mouse_x>xoffset+104 && mouse_x <xoffset+140 && mouse_y<yoffset+50{*/
        else if (mouse_x>xoffset+104 && mouse_x <xoffset+140 && mouse_y<yoffset+50){
            newclass=2;
            text[0]="Rocketman";
            text[1]="Weapon: Rocket Launcher";
            text[2]="Strong yet graceful, he can";
            text[3]="launch himself skyward with his";
            text[4]="rockets as well as do damage.";
        }

        /*else if mouse_x>xoffset+156 && mouse_x <xoffset+192 && mouse_y<yoffset+50{*/
        else if (mouse_x>xoffset+156 && mouse_x <xoffset+192 && mouse_y<yoffset+50){
            newclass=3;
            text[0]="Overweight";
            text[1]="Weapon: Minigun";
            text[2]="A mammoth of a man, carrying";
            text[3]="a heavy weapon that will shred";
            text[4]="enemies. He can sure eat, too!";
        }

        /*else if mouse_x>xoffset+196 && mouse_x <xoffset+232 && mouse_y<yoffset+50{*/
        else if (mouse_x>xoffset+196 && mouse_x <xoffset+232 && mouse_y<yoffset+50){
            newclass=4;
            text[0]="Detonator";
            text[1]="Weapon: Mine Launcher";
            text[2]="A master of explosives, the";
            text[3]="Detonator can stick mines to";
            text[4]="any surface and set them off.";
        }

        /*else if mouse_x>xoffset+236 && mouse_x <xoffset+272 && mouse_y<yoffset+50{*/
        else if (mouse_x>xoffset+236 && mouse_x <xoffset+272 && mouse_y<yoffset+50){
            newclass=5;
            text[0]="Healer";
            text[1]="Weapon: Needlegun";
            text[2]="His all-purpose healing gun can";
            text[3]="both heal his team from afar";
            text[4]="and rain syringes on foes.";
        }

        /*else if mouse_x>xoffset+288 && mouse_x <xoffset+324 && mouse_y<yoffset+50{*/
        else if (mouse_x>xoffset+288 && mouse_x <xoffset+324 && mouse_y<yoffset+50){
            newclass=6;
            text[0]="Constructor";
            text[1]="Weapon: Shotgun";
            text[2]="A brilliant inventor, the";
            text[3]="Constructor can build sentry";
            text[4]="guns that protect whole areas.";
        }

        /*else if mouse_x>xoffset+328 && mouse_x <xoffset+364 && mouse_y<yoffset+50{*/
        else if (mouse_x>xoffset+328 && mouse_x <xoffset+364 && mouse_y<yoffset+50){
            newclass=7;
            text[0]="Infiltrator";
            text[1]="Weapon: Revolver";
            text[2]="Can become invisible to slip";
            text[3]="behind enemy lines and deliver";
            text[4]="a fatal strike with his knife.";
        }

        /*else if mouse_x>xoffset+368 && mouse_x <xoffset+404 && mouse_y<yoffset+50{*/
        else if (mouse_x>xoffset+368 && mouse_x <xoffset+404 && mouse_y<yoffset+50){
            newclass=8;
            text[0]="Rifleman";
            text[1]="Weapon: Sniper Rifle";
            text[2]="Armed with his trusty rifle";
            text[3]="and dead aim, his zoom scope";
            text[4]="allows him to attack from afar.";
        }

        /*else if mouse_x>xoffset+420 && mouse_x <xoffset+456 && mouse_y<yoffset+50{*/
        else if (mouse_x>xoffset+420 && mouse_x <xoffset+456 && mouse_y<yoffset+50){
            newclass=9;
            text[0]="Random Select";
            text[1]="";
            text[2]="Can't decide? Let us choose";
            text[3]="a class for you to play.";
            text[4]="";
        }

        else newclass=-1;

        /*if newclass != mousedclass && newclass !=-1 && y=120{*/
        if (newclass != mousedclass && newclass !=-1){
            /*if instance_exists(CharacterPortraitAnimation){
                with(CharacterPortraitAnimation){
                    instance_destroy()
                }
            }
            if(newclass>=0 and newclass<=9) {
                instance_create(xoffset+230, yoffset+128, portraitAnimations[newclass]);
            }*/
            portraitAnimation = portraitAnimations[newclass];
            onPortraitAnimationCreate();
            
                mousedclass=newclass; //set the 'moused class' (current moused class) to that of newclass
        }       

        /*if mouse_check_button(mb_left) && newclass !=-1{
            if newclass==0 Class = CLASS_SCOUT;
            else if newclass==1 class = CLASS_PYRO;
            else if newclass==2 class = CLASS_SOLDIER;
            else if newclass==3 class = CLASS_HEAVY;
            else if newclass==4 class = CLASS_DEMOMAN;
            else if newclass==5 class = CLASS_MEDIC;
            else if newclass==6 class = CLASS_ENGINEER;
            else if newclass==7 class = CLASS_SPY;
            else if newclass==8 class = CLASS_SNIPER;
            else class=random(9);
            event_user(1);
        }*/
    }

    function onDraw() {
        /*var xoffset, yoffset, xsize, ysize;
        if(instance_exists(DeathCam)) exit;
        if(!(global.myself.team==TEAM_RED || global.myself.team==TEAM_BLUE)) {
            instance_destroy();
            exit;
        }

        xoffset = view_xview[0];
        yoffset = view_yview[0];
        xsize = view_wview[0];
        ysize = view_hview[0];*/

        var xoffset = 0, yoffset = 0, indexoffset;
            
        /*if alpha < 0.8 draw_set_alpha(alpha);
        else draw_set_alpha(0.8);
        draw_rectangle_color(xoffset,yoffset,xoffset+xsize,yoffset+ysize,c_black,c_black,c_black,c_black,0);*/
            
        /*draw_sprite_ext(sprite_index, 0, xoffset+400, yoffset+y, 1, 1, 0, c_white, alpha);*/
        draw_sprite_ext(assets.ClassSelectS, 0, xoffset+400, yoffset+y, 1, 1, 0, c_white, alpha);

        draw_set_color(c_white);
        draw_set_halign(fa_left);
            
        /*if newclass != -1 && y==120 {*/
        if (newclass != -1) {
            /*if(global.myself.team==TEAM_RED) {*/
                indexoffset=0;
            /*} else if(global.myself.team==TEAM_BLUE) {
                indexoffset=10;
            } else {
                exit;
            }*/
            /*draw_sprite_ext(ClassSelectSpritesS,newclass+indexoffset,xoffset+drawx[newclass],yoffset,1,1,0,c_white, alpha);*/
            draw_sprite_ext(assets.ClassSelectSpritesS,newclass+indexoffset,xoffset+drawx[newclass],yoffset,1,1,0,c_white, alpha);

            draw_set_font('9pt Lucida Console');
            draw_text(xoffset+495,yoffset+80,text[0]);
            draw_text(xoffset+495,yoffset+100,text[1]);
            draw_text(xoffset+495,yoffset+120,text[2]);
            draw_text(xoffset+495,yoffset+130,text[3]);
            draw_text(xoffset+495,yoffset+140,text[4]);
        }

        /*var classConstant, number, classCounter;
        var classConstant, number, classCounter = [], a, i;
        for (a=0; a<10; a+=1) classCounter[a] = 0

        with Player
        {
            if team == global.myself.team
            {
                classCounter[class] += 1
            }
        }
            
        for(i=0; i<9; i+=1)
        {
            if i==0 classConstant = CLASS_SCOUT;
            else if i==1 classConstant = CLASS_PYRO;
            else if i==2 classConstant = CLASS_SOLDIER;
            else if i==3 classConstant = CLASS_HEAVY;
            else if i==4 classConstant = CLASS_DEMOMAN;
            else if i==5 classConstant = CLASS_MEDIC;
            else if i==6 classConstant = CLASS_ENGINEER;
            else if i==7 classConstant = CLASS_SPY;
            else if i==8 classConstant = CLASS_SNIPER;
            if (i==0) classConstant = CLASS_SCOUT;
            else if (i==1) classConstant = CLASS_PYRO;
            else if (i==2) classConstant = CLASS_SOLDIER;
            else if (i==3) classConstant = CLASS_HEAVY;
            else if (i==4) classConstant = CLASS_DEMOMAN;
            else if (i==5) classConstant = CLASS_MEDIC;
            else if (i==6) classConstant = CLASS_ENGINEER;
            else if (i==7) classConstant = CLASS_SPY;
            else if (i==8) classConstant = CLASS_SNIPER;
            
            number = classCounter[classConstant]

            if global.classlimits[classConstant] < 255// Not disabled
            {
                if number < global.classlimits[classConstant]
                {
                    draw_set_color(c_white);
                }
                else
                {
                    draw_set_color(c_red);
                }
                draw_text(xoffset+drawx[i]+3, yoffset+43+(y-120), string(number)+"/"+string(global.classlimits[classConstant]));
            }
            else if number != 0
            {
                draw_set_color(c_white);
                draw_text(xoffset+drawx[i]+3, yoffset+43+(y-120), string(number));
            }
        }*/
    }

    function onPortraitAnimationCreate () {
        portraitAnimationSpeed = 0.4;
        portraitAnimationFrame = 0;
    }

    function onPortraitAnimationStep () {
        /*if image_index+(global.myself.team)*(image_number*0.5)>=((global.myself.team+1)*(image_number/2))-1 {
        image_speed=0
        }*/
        if (portraitAnimationFrame>=(1*(portraitAnimation.frames/2))-1) {
            portraitAnimationSpeed=0;
        }
        portraitAnimationFrame += portraitAnimationSpeed;
    }

    function onPortraitAnimationDraw () {
        /*xoffset = view_xview[0];
        yoffset = view_yview[0];
        xsize = view_wview[0];
        ysize = view_hview[0];*/
        var xoffset = 0, yoffset = 0;

        /*draw_sprite_ext(sprite_index,image_index+(global.myself.team)*(image_number*0.5),xoffset+230,yoffset+128,4,4,0,c_white, image_alpha);*/
        draw_sprite_ext(portraitAnimation,Math.floor(portraitAnimationFrame),xoffset+230,yoffset+128,4,4,0,c_white, 1);
    }

    window.onload = function () {
        loadAssets(function () {
            initCanvas();
            onCreate();
            window.setInterval(function () {
                onStep();
                onDraw();
                if (portraitAnimation) {
                    onPortraitAnimationStep();
                    onPortraitAnimationDraw();
                }
            }, 1000 / 30);
        });
    };
}());
