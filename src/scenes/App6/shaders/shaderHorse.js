const ShaderHorse = {
        fragmentShader:`
            #define GLSLIFY 1
            varying vec2 vUv;
            uniform float iGlobalTime;
            uniform sampler2D iChannel0;
            uniform sampler2D iChannel1;
            uniform sampler2D iLookup;
            uniform vec3 diffuse;
            uniform float opacity;

            vec4 lookup(in vec4 textureColor, in sampler2D lookupTable) {
                #ifndef LUT_NO_CLAMP
                    textureColor = clamp(textureColor, 0.0, 1.0);
                #endif

                mediump float blueColor = textureColor.b * 63.0;

                mediump vec2 quad1;
                quad1.y = floor(floor(blueColor) / 8.0);
                quad1.x = floor(blueColor) - (quad1.y * 8.0);

                mediump vec2 quad2;
                quad2.y = floor(ceil(blueColor) / 8.0);
                quad2.x = ceil(blueColor) - (quad2.y * 8.0);

                highp vec2 texPos1;
                texPos1.x = (quad1.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.r);
                texPos1.y = (quad1.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.g);

                #ifdef LUT_FLIP_Y
                    texPos1.y = 1.0-texPos1.y;
                #endif

                highp vec2 texPos2;
                texPos2.x = (quad2.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.r);
                texPos2.y = (quad2.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.g);

                #ifdef LUT_FLIP_Y
                    texPos2.y = 1.0-texPos2.y;
                #endif

                lowp vec4 newColor1 = texture2D(lookupTable, texPos1);
                lowp vec4 newColor2 = texture2D(lookupTable, texPos2);

                lowp vec4 newColor = mix(newColor1, newColor2, fract(blueColor));
                return newColor;
            }

            void main() {
            vec4 diffuseColor = vec4(diffuse, opacity);
            vec3 outgoingLight = diffuseColor.rgb;

            vec2 uv = vUv * 0.5 + 0.5;
            uv.y -= 0.04; //offset coords a bit
            // uv.x += -0.0;
            vec4 color1 = texture2D(iChannel0, uv);
            vec4 color2 = texture2D(iChannel1, uv);

            float fade = smoothstep(0.7, 0.4, uv.y);
            //mix two images
            vec4 color = mix(color1, color2, fade);
            //N% tonemap
            vec4 toned = mix(color, lookup(color, iLookup), 0.45);
            //show some of the model
            outgoingLight = mix(outgoingLight, toned.rgb, 0.90);

            gl_FragColor = vec4(outgoingLight, opacity);
            //gl_FragColor = vec4(color1);
            }
        `,
    };

export default ShaderHorse;
