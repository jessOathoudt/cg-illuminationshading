#version 300 es

precision mediump float;

in vec3 ambient;
in vec3 diffuse;
in vec3 specular;
in vec2 frag_texcoord;

uniform vec3 material_color;    // Ka and Kd
uniform vec3 material_specular; // Ks
uniform sampler2D image;        // use in conjunction with Ka and Kd

out vec4 FragColor;

void main() {
    
    vec3 matColor =  texture(image, frag_texcoord).rgb * material_color;
    vec3 finalColor = (ambient * matColor) + (diffuse * matColor) + (specular * material_specular);
    
    if (finalColor.x>1.0) {
        finalColor = vec3(1.0, finalColor.y, finalColor.z);
    } if(finalColor.y>1.0) {
        finalColor = vec3(finalColor.x, 1.0, finalColor.z);
    } if (finalColor.z>1.0) {
        finalColor = vec3(finalColor.x, finalColor.y, 1.0);
    }

    FragColor = vec4(finalColor, 1.0);
}
